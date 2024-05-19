import { useState } from 'react';
import { Socket } from "socket.io-client";
import { messageModel } from "../components/message";

const useChatSocket = (socket: Socket | null) => {
    const [message, setMessage] = useState<string>("");
    const [message2, setMessage2] = useState<string>("");
    const [messages, setMessages] = useState<messageModel[]>([]);
    const [messages2, setMessages2] = useState<messageModel[]>([]);
    const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
    const [updatedMessage, setUpdatedMessage] = useState<string>("");
    //console.log(socket)
    const sendMessage = () => {
        if (socket) {
            const newMessage: messageModel = {
                _id: "",
                sender: 'Messi',
                message: message,
                createdAt: "",
                updatedAt: "",
                __v: 0
            };
            console.log('new message: ',newMessage.message)
            socket.emit("client:saveMessage", newMessage);
            setMessage("");
        }
    };
    const sendMessage2 = () => {
        if (socket) {
            const newMessage: messageModel = {
                _id: "",
                sender: 'Messi',
                message: message2,
                createdAt: "",
                updatedAt: "",
                __v: 0
            };
            console.log('new message: ',newMessage.message)
            socket.emit("client:saveMessage", newMessage);
            setMessage("");
        }
    };
  
    const selectMessage = (messageId: string) => {
        setSelectedMessageId(messageId);
    };

    const updateMessage = () => {
        if (socket && selectedMessageId) {
            socket.emit("client:updateMessage", { messageId: selectedMessageId, message: updatedMessage });
            setUpdatedMessage("");
            setSelectedMessageId(null);
        }
    };

    const deleteMessage = (messageId: string) => {
        if (socket) {
            socket.emit("client:deleteMessage", messageId);
        }
    };

    return {
        message,
        message2,
        setMessage,
        setMessage2,
        messages,
        selectedMessageId,
        updatedMessage,
        sendMessage,
        sendMessage2,
        selectMessage,
        updateMessage,
        deleteMessage,
        setSelectedMessageId,
        setUpdatedMessage
    };
};

export default useChatSocket;
