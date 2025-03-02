"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from './assets/Logo.png';

//fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen, faEarth } from '@fortawesome/free-solid-svg-icons';
import { faPortrait } from '@fortawesome/free-solid-svg-icons/faPortrait';

const Page = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate styles based on scroll position
  const upperSectionOpacity = Math.max(0.9 - scrollPosition / 100, 0);
  const lowerSectionTransform = Math.min(scrollPosition / 2, 100);
  const lowerSectionHeight = Math.min(50 + scrollPosition / 5, 100);
  const lowerSectionOpacity = Math.min(0.8 + scrollPosition / 200, 1);

  return (
    <div className="fixed flex-col bg-transparent w-full lgs:h-[8rem] z-50">
      {/* Upper Section */}
      <div
        className="flex bg-gold lgs:w-[100vw] items-center justify-center lgs:h-[5rem]"
        style={{ opacity: upperSectionOpacity }} 
      >
        <div className='absolute flex lgs:w-[100vw] bg-transparent z-50' >

                   <div className='flex items-center justify-start lgs:w-[40vw] lgs:mt-2 lgs:ml-5'>

                   <h2 className='flex font-dmsans text-sm text-primary font-thin items-center justify-center' style={{ fontWeight: '200' }}>
                      www.hotels.anavara.com{''}<FontAwesomeIcon icon={faEarth} className='text-primary lgs:ml-2'/>
                    </h2>


                  </div>
                  <div className='flex justify-center items-center lgs:w-[20vw] lgs:mt-2'>
                  <Image src={logo} alt="Logo" width={150} priority />
                  </div>


                  <div className='flex items-center justify-center lgs:w-[40vw] lgs:mt-2'>

                  <div className='flex justify-end items-center lgs:w-[25vw]'>

                  <div className='flex flex-col lgs:w-[12rem] lg:h-[2.5rem] bg-goldd items-center justify-center cursor-pointer'
                  style={{
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  }}>
                        <h2 className='font-dmsans text-md text-primary font-thin' style={{ fontWeight: '700' }}>
                            Book Now
                          </h2>
                  </div> 

                  </div>

                  <div className='flex justify-center items-center lgs:w-[15vw] lgs:space-x-5'>
                    <h2 className='flex font-dmsans text-sm text-primary font-thin items-center justify-center' style={{ fontWeight: '300' }}>
                      Sign In{''}<FontAwesomeIcon icon={faDoorOpen} className='text-primary lgs:ml-1'/>
                    </h2>
                    <h2 className='flex font-dmsans text-sm text-primary font-thin items-center justify-center' style={{ fontWeight: '300' }}>
                      Login In{''}<FontAwesomeIcon icon={faPortrait} className='text-primary lgs:ml-1'/>
                    </h2>


                  </div>



                    
                  </div>



        </div>


      </div>

      {/* Lower Section */}
      <div
        className="flex bg-transparent lgs:w-[100vw] items-center justify-center"
        style={{
          transform: `translateY(-${lowerSectionTransform}px)`,
          transition: 'transform 0.2s ease-out, height 0.2s ease-out',
          opacity: `${lowerSectionOpacity}`,
          height: `${lowerSectionHeight}px`,
        }}
      >
        <div className="absolute flex lg:w-[100vw] bg-gold opacity-100 z-30" style={{ height: '100%' }} />
        <div className={`flex lg:w-[100vw] h-auto z-40  ${scrollPosition ? 'lgs:mt-2' : 'lgs:mt-0'} items-center justify-center `}>
          <div className={`flex justify-center items-center lgs:w-[20vw] ${scrollPosition ? 'opacity-100' : 'opacity-0'} items-center h-auto lgs:w-[10vw] transform-all duration-1000 ease-in-out`} >
            <Image src= {logo} alt="Logo" width={150} />
          </div>
          <div
            className="flex justify-center items-center font-kanit h-autolgs: lgs:w-[60vw] lg:space-x-6"
            style={{ fontWeight: '200' }}
          >
            <Link href="/" className="text-primary">
              Retreats
            </Link>
            <Link href="/" className="text-primary">
              Offers
            </Link>
            <Link href="/" className="text-primary">
              Cuisine
            </Link>
            <Link href="/" className="text-primary">
              Dining
            </Link>
            <Link href="/" className="text-primary">
              Meetings
            </Link>
            <Link href="/" className="text-primary">
              Weddings
            </Link>
            <Link href="/" className="text-primary">
              Spa & Wellness
            </Link>
            <Link href="/" className="text-primary">
              Private Jets
            </Link>
            <Link href="/" className="text-primary">
              Contact Us
            </Link>
            <Link href="/" className="text-primary">
              Feature
            </Link>
          </div>
          <div className={`flex justify-center items-center ${scrollPosition ? 'opacity-100' : 'opacity-0'} h-auto lgs:w-[20vw] lgs:space-x-4 transform-all duration-1000 ease-in-out`}>
          <div className='flex flex-col lg:w-[5rem] lg:h-[2rem] lg:mt-2 bg-goldd items-center justify-center cursor-pointer'>
               <h2 className='font-bubblerOne text-sm text-primary font-thin' style={{ fontWeight: '300' }}>
                   Sign Up
                </h2>
              <div className='bg-goldd h-[0.03rem] w-full'/>
              </div>
              <div className='flex flex-col lg:w-[5rem] lg:h-[2rem] lg:mt-2 bg-goldd items-center justify-center cursor-pointer'>
               <h2 className='font-bubblerOne text-sm text-primary font-thin' style={{ fontWeight: '300' }}>
                   Log In
                </h2>
              <div className='bg-goldd h-[0.03rem] w-full'/>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
