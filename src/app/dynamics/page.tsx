"use client";

import React, { useState } from 'react'
import Image from 'next/image'

//images
import heroBackground from '../assests/dynamics/subBackground.jpg';
import sub1 from '../assests/subset/sub1.png';
import sub2 from '../assests/subset/sub2.png';
import sub3 from '../assests/subset/sub3.png';
import sub4 from '../assests/subset/sub4.png';


const subset =[

    {id:1, image:sub1, title:'Torque'},
    {id:2, image:sub2, title:'Displacement'},
    {id:3, image:sub3, title:'Compression Ratio'},
    {id:4, image:sub4, title:'Fuel Consumption'}
]

const Dynamics = () => {

    const [hover, setHover] = useState<number | null>(null);

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
                        {/* Under command Section */}
                        <div className='flex w-full lgs:h-[30vh] items-center justify-center bg-transparent'>

                                <div className="flex h-[10rem] lgs:w-[40vw] items-center justify-center">
                           
                                                     {subset.map((tool, index)=> (
                                                              
                                                           <div key={index}  className='group relative flex w-auto h-auto cursor-pointer'
                                                           onMouseEnter={()=> setHover(index)}
                                                           onMouseLeave={()=> setHover(null)}
                                                           >
                                                                 
                                                              <div className='relative h-[10rem] lgs:w-[10vw] bg-orange-400 overflow-hidden'>
                                                                 <Image src={tool?.image} alt='turbo' className='flex object-cover group-hover:scale-125 w-full h-full transition-all border-2 duration-700 ease-in-out' layout='fill' />
                                                                 <div className='absolute flex w-full h-1/4 items-center justify-center bg-gradient-to-b top-0 from-secondary to-transparent z-30'/>
                                                                 <div className='absolute flex w-full h-3/4 items-center justify-center bg-gradient-to-t bottom-0 from-secondary to-transparent z-30'/>
                                                                 <div className='absolute flex w-3/4 h-full items-center justify-center bg-gradient-to-r left-0 from-secondary to-transparent z-30'/>
                                                                 <div className='absolute flex w-full h-full items-center justify-center left-0 z-30' style={{
                                                                    boxShadow: hover == index ?
                                                                     'inset 0px 0px 100px 1px rgba(255, 69, 0 , 0.9)' : 'inset 0px 0px 10px 1px rgba(255, 69, 0 , 0.9)',
                                                                     transition:"box-shadow 0.5s ease-in-out",
                                                                 }}/>
                                                                 
                           
                            
                                                                 <div className='absolute flex w-full h-full items-end justify-center bg-transparent z-40'>
                                                                     <h2 className='font-poppins lgs:w-[8vw] lgs:h-[5rem] group-hover:scale-125 transition-all duration-700 ease-in-out  text-md text-center text-primary'
                                                                     style={{
                                                                       fontWeight:'100'
                                                                     }}>
                                                                       {tool?.title}
                                                                     </h2>
                           
                                                                 </div>  
                                                                 <div className='absolute flex w-full h-full items-end justify-center bg-transparent z-30'>
                                                                     <h2 className='font-poppins lgs:h-[5rem]  text-3xl text-center group-hover:scale-125 transition-all duration-700 ease-in-out opacity-15 text-primary'
                                                                     style={{
                                                                       fontWeight:'100'
                                                                     }}>
                                                                       {tool?.title}
                                                                     </h2>
                           
                                                                 </div>  
                                                             </div> 
                                                           </div>   
                                                     ))}
                                                       
                           
                                                   
                        </div>

                    </div> 
               

            </div>


        </div>
      
    </div>
  </div>  
  )
}

export default Dynamics;
