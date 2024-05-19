import React, { useState, ChangeEvent } from 'react';

interface Props {
  onSendMessage: (data: { message: string, files: File[] }) => void;
}

const MessageFooter: React.FC<Props> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      setFiles([...files, ...Array.from(selectedFiles)]);
    }
  };

  const handleSendMessage = () => {
    if (message.trim() || files.length > 0) {
      onSendMessage({ message, files });
      setMessage('');
      setFiles([]);
    }
  };

  return (
    <div className="message-footer p-4 bg-green-200 flex items-center">
      <input type="file" multiple onChange={handleFileChange} className="mr-2" />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write a message..."
        className="flex-grow p-2 rounded-lg border-2 border-green-300 text-green-800 mr-2"
      />
      <button onClick={handleSendMessage} className="px-4 py-2 bg-green-500 text-white rounded-lg">Send</button>
    </div>
  );
};

export default MessageFooter;
