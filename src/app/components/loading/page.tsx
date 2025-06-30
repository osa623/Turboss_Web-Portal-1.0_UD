'use client';

import Image from 'next/image';

//import images
import backGround from '../../assests/mainBackground.jpg';
import logo from '../../assests/turbossLogo.png';

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
        <div className='absolute bg-transparent inset-0 flex items-center justify-center z-30 h-screen w-full'>
          <div className='absolute flex  items-center justify-center sms:w-[50%] sms:h-[50%] z-40 w-[20%] h-[20%] bg-transparent'>
                <Image className='flex  object-cover w-auto' src={logo} alt="Logo" />
          </div>
          <div className='absolute flex  items-center justify-center sms:w-full sms:h-[60%] w-full h-[100%] bg-transparent'>
                <div className='flex w-[15rem] h-[15rem] lgs:w-[20rem] lgs:h-[20rem] border-4 bg-transparent border-t-0 animate-spin border-orange-600 rounded-full  object-cover' />
          </div>
           <div className='absolute flex  items-center justify-center sms:w-full sms:h-[60%] w-[20%] h-[20%] mds:w-full bg-transparent'>
                <div className='flex w-[14rem] h-[14rem] lgs:w-[19rem] lgs:h-[19rem] border-4 bg-transparent border-t-0 animate-spin border-white rounded-full  object-cover'
                style={{
                  animationDirection: 'reverse',
                  animationDuration: '2s',
                }} />
          </div>
                     <div className='absolute flex  items-center justify-center sms:w-full sms:h-[60%] w-[20%] mds:w-full h-[20%] bg-transparent'>
                <div className='flex w-[13rem] h-[13rem] lgs:w-[18rem] lgs:h-[18rem] border-4 bg-transparent border-t-0 animate-spin border-yellow-500 rounded-full  object-cover'
                style={{
                  animationDuration: '3s',
                }} />
          </div>

         </div>
       </div>

    
  );
}