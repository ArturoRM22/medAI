import React from 'react';

const ChatPreview = ({ nombreChat,onClick, fechaCreacion }) => {
  return (
    <div className="bg-green-200 rounded-full p-4 flex justify-between items-center mb-4 mx-auto max-w-screen-md" onClick={onClick}>
      <div className="flex-grow">
        <h2 className="text-lg font-bold  text-gray-700">{nombreChat}</h2>
      </div>
      <div className="text-xs text-gray-700">
        {fechaCreacion}
      </div>
    </div>
  );
};

export default ChatPreview;
