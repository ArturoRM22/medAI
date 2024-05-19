"use client"; // Indicar que es un componente cliente

import { useRouter } from 'next/navigation';
import Chat from '@/components/components/Chat';
import Navdiagnostic from '@/components/components/navdiagnostic';

const DiagnosticChat = () => {
  return (
    <div className="chat-container">
      <Navdiagnostic title="Chat de Diagnóstico" />
      <div className="pt-[4rem]">
        <Chat />
      </div>
    </div>
  );
};

export default DiagnosticChat;
