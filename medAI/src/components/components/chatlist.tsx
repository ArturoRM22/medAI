"use client"; // Asegúrate de que el componente sea un componente del cliente

import React from 'react';
import { useRouter } from 'next/navigation';
import ChatPreview from './ChatPreview'; // Asegúrate de importar el componente ChatPreview desde su ubicación correcta

const ChatList = () => {
  const router = useRouter();

  const handleChatClick = (nombreChat) => {
    router.push(`/Diagnostics/${nombreChat}`);
  };

  return (
    <div>
      <ChatPreview 
        nombreChat="Chat de Familia" 
        fechaCreacion="10 de mayo, 2024" 
        onClick={() => handleChatClick('Chat de Familia')} 
      />
      <ChatPreview 
        nombreChat="Grupo de Trabajo" 
        fechaCreacion="2 de abril, 2024" 
        onClick={() => handleChatClick('Grupo de Trabajo')} 
      />
      <ChatPreview 
        nombreChat="Amigos" 
        fechaCreacion="20 de febrero, 2024" 
        onClick={() => handleChatClick('Amigos')} 
      />
    </div>
  );
};

export default ChatList;
