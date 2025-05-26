'use client';

import Image from 'next/image';

//import images
import backGround from '../../assests/mainBackground.jpg';

export default function Loading() {
  


  return (
    <div className="relative items-center justify-center h-screen w-full overflow-hidden">

       {/* Background Image */}
         <div className='absolute inset-0 z-0 w-full h-screen'>
                <Image src={backGround} alt="Background" layout="fill" objectFit="cover" />
         </div>

        {/* Text Set Layout */}
        <div className='absolute flex flex-col inset-0 z-10 w-full h-screen'>
            <h2 className='flex -top-96 h-[50%] text-9xl animate-movingText01 font-bricolagegrotesque text-primary'
            style={{
              fontWeight:'100',
              fontSize:'30rem',
            }}>
                Turboss
              </h2>  
              <h2 className='flex bottom-0 h-[50%] text-9xl animate-movingText01Reverse font-bricolagegrotesque text-primary'
            style={{
              fontWeight:'100',
              fontSize:'30rem',
            }}>
                Turboss
              </h2>        
         </div>

        {/* Gradient Set Layout */}
        <div className='relative inset-0 z-20 w-full h-screen'>
                <div className='absolute  w-[100%] h-full bg-gradient-to-r left-0 from-secondary to-transparent opacity-100'/>
                <div className='absolute  w-[100%] h-full bg-gradient-to-l right-0 from-secondary to-transparent opacity-100'/>
                <div className='absolute  h-[50%] w-[100%] bg-gradient-to-t bottom-0 from-secondary to-transparent opacity-100'/>
                <div className='absolute  h-[100%] w-[100%] bg-gradient-to-b top-0 from-secondary to-transparent opacity-100'/>
         </div>

        {/* Logo Set Layout */}
        <div className='absolute flex-col bg-transparent inset-0 flex items-center justify-center z-30 h-screen w-full'>
            <div className='flex py-2 border-4 bg-orange-600 items-center justify-center b-4 rounded-full lgs:h-[10rem] lgs:w-[10rem] md:w-[8rem] md:h-[8rem] sm:w-[6rem] sm:h-[6rem] xs:w-[4rem] xs:h-[4rem]'>
                    <h2 className='text-4xl font-dmsans text-white'>
                        404
                    </h2>
             </div>   
            
            <span className="text-xl font-dmsans py-1 text-white bg-opacity-60 px-8 rounded-lg shadow-lg"
            style={{
                fontWeight:'200',
            }}>
            The page you are looking for is not available.
            </span>
            <button
              onClick={() => window.history.back()}
              className="mt-4 px-6 py-2 bg-orange-600 font-kanit text-white rounded hover:bg-primary/80 hover:text-orange-600 transition"
            >
              Go Back
            </button>
        </div>
       </div>

    
  );
}