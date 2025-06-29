"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";


//css imports
import '../../detailpage/base.css';




//craete an interface for the data

interface labData {

  id: number;
  name: string;
  image: string;
  subName: string;
  mainTopic: string;
  Introduction: string;
  Images: string[];
  subTopics: {
    subTopicTitle: string;
    subIntro: string;
  }[];  
 
}




const Detailpage = () => {

    //hooks


    const [data, setData] = useState<labData | null>(null);
    const [loading, isLoading] = useState(true);
  

  const router = useRouter();

    useEffect(() => {
      router.replace(window.location.href);
    }, [router]); // Added router to dependency array

  const params = useParams();
  const id = params && typeof params[' id '] === 'string' ? params[' id '].trim() : null;

  console.log("Paramas:" , params); // Debugging
  console.log("ID:" , id); // Debugging

  useEffect(() => {
    if (id) { 
        console.log("Fetching data for ID:", id); 
       

        fetch('/data/LabData.json')
            .then((res) => res.json())
            .then((json) => {
                console.log("Fetched JSON Data:", json); // Debugging

                const selectedTool = json.find((item: labData) => item.id === Number(id));

                if (selectedTool) {
                    console.log("Selected Tool Data:", selectedTool); // Debugging
                    setData(selectedTool);
                } else {
                    console.error("No data found for ID:", id);
                }
            })
            .catch((error) => console.error('Error fetching data:', error))
            .finally(() => isLoading(false));
            
    }
}, [id]); 

useEffect(() => {
  console.log("Page ID:", id);  // Debugging
}, [id]);



  

 

   
  return (




    <div className='w-auto h-auto relative'>

          {loading ? (
            
            <h2 className='text-xl'>
              loading..
            </h2>
          ) : (


    
    
    <div className='w-full relative bg-transparent transition-none overflow-hidden'>
      
          <div className='relative flex sms:flex-col w-full sms:overflow-y-auto h-auto'>
                  

                    {/* Image Section */} 

                  <div className='relative lgs:h-[50rem] sms:h-[40rem] lgs:w-[50vw] sms:w-[100vw] justify-center items-center bg-transparent'>
                    
                    <div className='relative flex w-[50vw] sms:w-[100vw] h-full bg-transparent z-20'>
                      <Image src={data?.image || '/default-image.jpg'} alt={data?.name || 'Default Alt Text'} width={2400} height={2400}  className='object-cover' />
                    </div> 

                    <div className='absolute z-50 flex top-0 w-[40%] h-20 left-0 bg-transparent'>
                      <button 
                        onClick={() => router.back()} 
                        className="flex items-center justify-center p-1 px-8 border-2 m-4 bg-transparent text-primary rounded-full hover:bg-transparent transition-colors shadow-lg"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="ml-2 font-dmsans">Back</span>
                      </button>
                    </div>



                              <div className='absolute top-0 left-0 w-[50vw] sms:w-[50vw] z-30 h-full bg-gradient-to-r from-secondary to-transparent opacity-50'/>
                              <div className='absolute top-0 left-0 w-[50vw] sms:w-[100vw] lgs:h-[5rem] z-30 h-full bg-gradient-to-b from-secondary to-transparent opacity-50'/>
                              <div className='absolute top-0 left-0 w-[50vw] sms:w-[100vw] lgs:h-[5rem] z-30 h-full bg-gradient-to-t from-secondary to-transparent opacity-50'/>
                              <div className='absolute top-0 right-0 w-[50vw] sms:w-[50vw] z-30 h-full bg-gradient-to-l from-secondary to-transparent opacity-50'/>
                              <div className='absolute top-0 left-0 w-[50vw] z-30 lgs:h-full sms:w-[100vw] bg-gradient-to-r from-secondary to-transparent opacity-50'/>
                              <div className='absolute top-0 left-0 w-[50vw] z-30 lgs:h-full sms:w-[100vw] sms:h-[10rem] bg-gradient-to-b from-secondary to-transparent opacity-50'/>



                  <div className='absolute flex  top-0 left-0 w-[50vw] mds:h-[50%]  sms:w-[100vw] z-30 h-full items-center overflow-hidden justify-center bg-transparent'>

                    <div className='flex flex-col justify-center items-center bg-transparent overflow-hidden'>

                        <div className="sms:absolute mds:absolute lgs:mb-48 lgs:left-12 sms:right-2 mds:right-7 mds:top-5 sms:p-6 top-0 sms:items-start justify-start lgs:pl-6 overflow-hidden">
                                                      
                                                      <div className="flex w-auto h-auto  overflow-hidden">

                                                      <h2 className="flex font-bricolagegrotesque text-primary text-xl bg-orange-600 p-2"
                                                      style={{
                                                        fontWeight:'100'
                                                      }}>
                                                      Garage Section
                                                      </h2>
                                                      <span className="font-bricolagegrotesque text-orange-600 lgs:text-xl px-2 bg-primary lgs:p-2">
                                                          {data?.subName}
                                                      </span>

                                                      </div>

                                                      
                        </div> 

                        <div className="absolute lgs:mt-60 right-12  items-start justify-start lgs:p-5">
                                                      
                                                      <div className="flex w-2xl h-3xl">

                                                     

                                                      </div>

                                                      
                        </div> 

                        <h2 className='absolute text-center font-dmsans w-[80%] z-30 text-8xl text-orange-600'>
                          {data?.name}
                        </h2>

                        <h2 className='absolute  text-center  font-dmsans  w-[80%] z-20 ml-2 text-8xl text-primary'>
                          {data?.name}
                        </h2>

                        <h2 className='absolute z-20  sms:text-center  font-dmsans lgs:text-nowrap animate-textScaling01 lgs:mt-16 text-gray-500 blur-sm opacity-30'style={{
                          fontSize:'120px'
                        }}>
                          {data?.name}
                        </h2>

                    </div>    

                  </div>

                   </div>  


                    {/* Section Section */}  

                    <div className='flex h-[50rem] lgs:w-[50vw] sms:w-[100vw] justify-start items-start bg-transparent overflow-hidden overflow-y-scroll'>

                          <div className='flex h-auto bg-transparent lgs:w-[50vw]'>

                              <div className='flex flex-col w-auto h-auto justify-center items-center bg-transparent z-50 p-5 sms:p-0'>

                                {/* Main Topic and Description */}
                                <div className='flex flex-col lgs:w-[45vw] sms:w-[100vw] h-auto justify-start sms:p-5 items-start bg-transparent'>

                                <div className='flex w-auto h-auto'>
                                 <h2 className='font-dmsans text-lg sms:text-2xl text-shadow-xl bg-orange-600 text-primary p-2'>
                                  Introduction
                                  </h2>
                                </div>  

                                  <p className='font-dmsans lgs:w-[45vw] sms:w-[90vw] mt-2 text-md sms:text-xl text-secondary bg-transparent p-2'
                                  style={{
                                    fontWeight:'200'
                                  }}>
                                    {data?.Introduction}
                                  </p>
                                </div>  

                                {/* Main Topic and Description */}
                                <div className='flex flex-col lgs:w-[45vw] lgs:h-[1rem] justify-start items-start bg-transparent'>

                                
                                </div>  

                                 {/* Sub Topic and Sub Description */}
                                   <div className='flex flex-col lgs:w-[45vw] sms:w-auto h-auto justify-start items-start bg-transparent'>

                                 <div className='flex w-auto h-auto sms:mt-12 mds:mt-6 lgs:p-8 sms:mb-12'>

                                  <h2 className='font-dmsans text-lg text-shadow-xl bg-orange-600 text-primary p-2'>
                                     {data?.name} Sections
                                    </h2>
                                </div>    

                                    {data?.subTopics.map((subTopic, index) => (

                                      <div key={index} className='relative flex bg-transparent w-full lgs:h-[25rem] sms:h-[40rem] items-start justify-center'>
                                      <div className='relative flex sms:w-[15vw]  lgs:w-[20vw] h-[25rem] sms:h-[40rem] top-0 bg-transparent items-start justify-center z-20  overflow-hidden'>
                                        <div className='absolute flex bg-primary rounded-full w-[4rem] h-[4rem] items-center justify-center z-30' style={{
                                          boxShadow:'inset 0px 2px 10px 10px rgba(0,0,0,0.2)'
                                        }}>
                                          <Image src={data?.image} alt='tree' width={'1200'} height={'1200'} className='rounded-full border-2 border-gray-500 object-cover w-[4rem] h-[4rem]' />
                                        </div>
                                        { index !== 5 && (
                                        <div className={`absolute w-[0.05rem] h-screen bg-secondary items-center justify-center z-20`} style={{

                                        }}/>
                                        )}
                                        

                                      </div>
                                      <div className='flex w-[80vw] h-[25rem] sms:h-[30rem] items-start justify-start top-0 bg-transparent z-30 mds:p-5 p-2'>
                                        <div className={`flex flex-col w-full h-[22rem] mds:h-auto sms:h-auto items-start rounded-3xl justify-start p-5`}
                                        style={{
                                          boxShadow:'0px 2px 10px 10px rgba(0,0,0,0.2)'
                                        }}>
                                            <h2 className='font-dmsans text-lg text-shadow-xl bg-gray-400 text-primary sms:p-2 lgs:p-1'>
                                              {subTopic.subTopicTitle}
                                              </h2>
                                          <p
                                            className={`flex font-dmsans mt-4 text-md`}
                                            style={{ fontWeight: "200" }}
                                          >
                                            {subTopic.subIntro}
                                          </p>
                                        </div>
                                      </div>

                                      </div>

                                    )) 

                                    }
                                 
                                  </div>  









                              </div>



                          </div> 

                    </div>  




          </div>

    </div>


)}


    </div>
  );
} ;

export default Detailpage;
