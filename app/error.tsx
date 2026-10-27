"use client"
import Link from 'next/link';
import Lottie from 'lottie-react';
import errorLottie from '../assets/404 error.json'
import { FaHome } from 'react-icons/fa';

const error = () => {
    return (
        <div className="relative">
            <div className="fixed inset-0 z-0 flex justify-center items-center">
                <div>
                    <Lottie
                        animationData={errorLottie}
                        loop={true}
                        autoplay={true}
                        className="md:w-240" />
                </div>
            </div>

            <div className='relative z-10 top-140 flex justify-center items-center'>
                <Link href={"/"} className='bg-red-500 border-0 hover:bg-red-700 mt-10 p-2 px-3 rounded-xl hover:scale-[1.01] transition-all duration-300 font-semibold cursor-pointer flex justify-center items-center gap-2 text-sm md:text-md'>
                    Back to Home <FaHome />
                </Link>
            </div>
        </div>
    );
};

export default error