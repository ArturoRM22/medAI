"use client";
import React, { useState, useEffect } from 'react';
import { PlusCircle, MessageSquare, Home, Camera } from 'react-feather';
import Link from 'next/link';
import useWebSocketConnection from '../socket/connection';
import useChatSocket from '../socket/functions';


const Navlow = () => {
  const { socket, messages } = useWebSocketConnection();
  const [modalOpen, setModalOpen] = useState(false);
  const [symptoms, setSymptoms] = useState('');
  const [files, setFiles] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [location, setLocation] = useState(null);
  const [budget, setBudget] = useState('');

  const {
    message,
    setMessage,
    sendMessage,
    deleteMessage,
} = useChatSocket(socket);

  useEffect(() => {
    if (modalOpen) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }
  }, [modalOpen]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleInputChange = (e) => {
    setSymptoms(e.target.value);
  };

  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Image = reader.result.split(',')[1];
        setFiles(base64Image);
      };
    }
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
        video.pause();
        stream.getTracks().forEach(track => track.stop());
        openModal();
      };
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Síntomas:', symptoms);
    console.log('Archivos adjuntos:', files);
    console.log('Imagen:', imageData);
    console.log('Ubicación:', location);
    console.log('Presupuesto:', budget);

    if (!files) {
      alert('Please select an image file.');
      return;
    }

    const payload = {
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: `
            Eres un experto en diagnóstico de enfermedades y se te presenta una lista de síntomas, una imagen, una ubicación y un presupuesto. Analiza la imagen, los síntomas, la ubicación y el presupuesto y en base a estos proporciona un diagnóstico, recomienda tratamientos o medicamentos y daa una lista de hospitales cercanos en base a la ubbicacion y el presupuesto.
            Descripción síntomas: ${symptoms}
            Ubicación: ${location ? `Latitud: ${location.latitude}, Longitud: ${location.longitude}` : 'No disponible'}
            Presupuesto: ${budget}
            Diagnóstico:
          `
        },
        {
          role: 'system',
          content: `data:image/jpeg;base64,${files}`
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
      
      console.log(JSON.stringify(data, null, 2)); 
    } catch (error) {
      console.error('Error:', error);
    }

    closeModal(); // Close the modal after form submission
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
      <div className="flex justify-between items-center">
        <Link href="/Diagnostics" className='bg-green-800 rounded-full p-2'>
          <MessageSquare size={32} className="text-white cursor-pointer" />
        </Link>
        <button onClick={openModal} className="text-white bg-green-800 rounded-full p-2">
          <PlusCircle size={32} />
        </button>
        <Link href="/" className='bg-green-800 rounded-full p-2'>
          <Home size={32} className="text-white cursor-pointer" />
        </Link>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg overflow-y-auto max-h-full mt-10"> {/* Agregamos mt-10 para el espacio entre la barra de navegación y el modal */}
            <h2 className="text-lg font-bold mb-4">Formulario de Síntomas</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="symptoms" className="block text-gray-700 font-bold mb-2">Síntomas:</label>
                <textarea id="symptoms" name="symptoms" value={symptoms} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2 w-full h-24"></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="budget" className="block text-gray-700 font-bold mb-2">Presupuesto:</label>
                <input type="text" id="budget" name="budget" value={budget} onChange={handleBudgetChange} className="border border-gray-300 rounded-md p-2 w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="attachments" className="block text-gray-700 font-bold mb-2">Adjuntar archivos:</label>
                <input type="file" id="attachments" name="attachments" onChange={handleFileInputChange} className="border border-gray-300 rounded-md p-2" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Tomar foto:</label>
                <button type="button" onClick={handleTakePhoto} className="bg-green-400 text-white py-2 px-4 rounded-md flex items-center">
                  <Camera className="mr-2" /> Tomar foto
                </button>
              </div>
              {imageData && (
                <div>
                  <h3 className="text-lg font-bold mb-2">Foto capturada:</h3>
                  <img src={imageData} alt="Captured" className="mb-2" />
                </div>
              )}
              <div className="flex justify-between">
                <button type="submit" className="bg-green-400 text-white py-2 px-4 rounded-md">Enviar</button>
                <button type="button" onClick={closeModal} className="bg-green-400 text-white py-2 px-4 rounded-md">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navlow;