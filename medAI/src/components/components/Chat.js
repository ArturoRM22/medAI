// components/Chat.js
"use client";
import React, { useState, useRef } from 'react';
import useWebSocketConnection from '../socket/connection';
import useChatSocket from '../socket/functions';
import { FaPaperclip, FaCamera, FaPaperPlane } from 'react-icons/fa';

const Chat = () => {
    const [symptoms, setSymptoms] = useState('');
    const { socket, messages } = useWebSocketConnection();
    const [imageData, setImageData] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);     
    const fileInputRef = useRef(null);
    const {
        message,
        setMessage,
        sendMessage,
        setMessage2,
        sendMessage2,
        deleteMessage,
    } = useChatSocket(socket);

    const handleFileUpload = (e) => {
        const files = e.target.files;
        setSelectedFiles(Array.from(files));
    };  

    const triggerFileUpload = () => {
        fileInputRef.current.click();
    };

    const handleTakePhoto = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    
            const video = document.createElement('video');
            video.srcObject = stream;
    
            video.onloadedmetadata = () => {
                video.play();
    
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const context = canvas.getContext('2d');
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
                const imageDataURL = canvas.toDataURL('image/jpeg');
                setImageData(imageDataURL);
    
                // Detener la transmisión de video y limpiar
                video.pause();
                stream.getTracks().forEach(track => track.stop());
            };
        } catch (error) {
            console.error('Error al acceder a la cámara:', error);
        }
    };
    const handleInputChange = (e) => {
        setMessage(e.target.value);
        setSymptoms(e.target.value);
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        sendMessage();
        console.log('Síntomas:', symptoms);
        console.log('Archivos adjuntos:', selectedFiles);
        console.log('Imagen:', imageData);

    
        if (!selectedFiles) {
          alert('Please select an image file.');
          return;
        }
    
        const payload = {
          model: 'gpt-4o',
          messages: [
            {
              role: 'user',
              content: `
                Eres un experto en diagnóstico de enfermedades y se te presenta una lista de síntomas y talvez una imagen. Analiza la imagen, los síntomas y en base a estos proporciona un diagnóstico, recomienda tratamientos o medicamentos.
                Descripción síntomas: ${message}
                Diagnóstico:
              `
            },
            {
              role: 'system',
              content: `data:image/jpeg;base64,${selectedFiles}`
            }
          ],
          max_tokens: 300
        };
    
        try {
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });
    
          const data = await response.json();
          setMessage2(data.choices[0].message.content);
            console.log(data.choices[0].message.content);
          console.log(JSON.stringify(data, null, 2)); 
          setTimeout(sendMessage2(data.choices[0].message.content), 50000);
            console.log("ggs");
        } catch (error) {
          console.error('Error:', error);
        }
    };

    return (
        <div className="flex flex-col ">
            <div className="flex-grow overflow-auto p-4">
                <div className="messages">
                    {messages.map((msg) => (
                        <div key={msg._id} className="message mb-2">
                            <p><strong>{msg.sender}:</strong> {msg.message}</p>
                            <button onClick={() => deleteMessage(msg._id)} className="text-red-500">Delete</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center p-4  border-t border-gray-300">
                {imageData && (
                    <div className="mr-4">
                        <h3 className="text-lg font-bold mb-2">Foto capturada:</h3>
                        <img src={imageData} alt="Captured" className="mb-2" />
                    </div>
                )}
                {selectedFiles.length > 0 && (
                    <div className="mr-4">
                        <h3 className="text-lg font-bold mb-2">Archivos seleccionados:</h3>
                        <ul className="list-disc list-inside">
                            {selectedFiles.map((file, index) => (
                                <li key={index}>{file.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit} className="fixed bottom-0 left-0 right-0 bg-white flex items-center p-4  border-t border-gray-300">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                />
                <button type="button" className="mr-2" onClick={triggerFileUpload}>
                    <FaPaperclip className="text-xl" color='green' />
                </button>
                <button type="button" className="mr-2" onClick={handleTakePhoto}>
                    <FaCamera className="text-xl" color='green' />
                </button>
                <input
                    type="text"
                    value={message} onChange={handleInputChange}
                    placeholder="Type a message..."
                    className="flex-grow bg-green-200 border border-gray-600 rounded-full pl-5"
                />
                <button type="submit" className="ml-2">
                    <FaPaperPlane className="text-xl" color='green' />
                </button>
            </form>
        </div>
    );
};

export default Chat;
