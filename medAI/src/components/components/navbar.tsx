import Link from 'next/link';
import React from 'react';
import medAILogo from './medAI-logo.png';
import Image from 'next/image';

const Navbar: React.FC = () => {

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 flex justify-between bg-green-800 items-center h-[4rem] w-full shadow-md'>
      <div className="flex items-center">
        <Link href="/" legacyBehavior>
          <a className='pl-5 w-auto h-10'>
            <Image src={medAILogo} alt='Logo' className='max-h-[3rem] max-w-[50px]' />
          </a>
        </Link>
        <h1 className='text-white pl-5 font-bold text-base'>Home</h1>
      </div>
      <ul className='flex items-center'>
        <li className='underline text-white mr-4 font-bold'>
          <Link href="/Login" legacyBehavior>
            <a>Sign Up</a>
          </Link>
        </li>
        <li className='flex items-center mr-4 text-white bg-green-500 font-bold rounded-full h-[40px] w-[80px]'>
          <Link href="/Login" legacyBehavior>
            <a className='pl-4'>Log In</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
