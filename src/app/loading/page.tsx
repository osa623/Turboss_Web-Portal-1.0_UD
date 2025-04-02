"use client";

import React from 'react'
import Image from 'next/image'

//images
import heroBackground from '../assests/dynamics/subBackground.jpg';





const Dynamics = () => {



  return (
    <div className='relative flex h-screen w-full'>
        <div className='relative  w-full h-screen bg-transparent overflow-hidden'>

            {/* Section */}
            <div className='flex flex-col lgs:w-full h-[100vh] items-center justify-center overflow-hidden'>
  

                    <Image src={heroBackground} layout='fill' objectFit='cover' objectPosition='center' alt='hero background' className='lgs:h-[100rem]' />
                    <div className='absolute top-0 w-full h-full bg-gradient-to-t bottom-0 from-secondary to-transparent z-20'/>
                    <div className='absolute top-0 w-full h-full bg-gradient-to-r left-0 from-secondary to-transparent z-20'/>
                    <div className='absolute flex flex-col top-0 w-full h-full bg-transparent z-30'>
                       {/* Upper Content Section */}
                        <div className='flex w-full lgs:h-[70vh] bg-transparent'>

                        </div>
                        
               

            </div>


        </div>
      
    </div>
  </div>  
  )
}

export default Dynamics;
