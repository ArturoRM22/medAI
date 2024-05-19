import Link from 'next/link';
import React from 'react';
import medAILogo from './medAI-logo.png';
import Image from 'next/image';

const Bar: React.FC = () => {

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 flex justify-between bg-green-800 items-center h-[4rem] w-full shadow-md'>
      <div className="flex items-center">
        <Link href="/" legacyBehavior>
          <a className='pl-5 w-auto h-10'>
            <Image src={medAILogo} alt='Logo' className='max-h-[3rem] max-w-[50px]' />
          </a>
        </Link>
        <h1 className='text-white pl-5 font-bold text-base'>Diagnostics</h1>
      </div>
    </nav>
  );
};

export default Bar;