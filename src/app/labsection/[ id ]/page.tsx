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
    } , []);

  const params = useParams();
  const id = typeof params[' id '] === 'string' ? params[' id '].trim() : null;

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
      
          <div className='relative flex w-full h-auto'>
                  

                    {/* Image Section */} 

                  <div className='relative lgs:h-[50rem] lgs:w-[50vw] justify-center items-center bg-transparent'>
                    
                    <div className='relative flex lgs:w-[50vw] h-full bg-transparent z-20'>
                      <Image src={data?.image || '/default-image.jpg'} alt={data?.name || 'Default Alt Text'} width={2400} height={2400}  className='object-cover' />
                    </div> 


                              <div className='absolute top-0 left-0 lgs:w-[50vw] z-30 h-full bg-gradient-to-r from-secondary to-transparent opacity-50'/>
                              <div className='absolute top-0 left-0 lgs:w-[50vw] z-30 h-full bg-gradient-to-b from-secondary to-transparent opacity-50'/>
                              <div className='absolute top-0 left-0 lgs:w-[50vw] z-30 h-full bg-gradient-to-t from-secondary to-transparent opacity-50'/>
                              <div className='absolute top-0 right-0 lgs:w-[50vw] z-30 h-full bg-gradient-to-l from-secondary to-transparent opacity-50'/>
                              <div className='absolute top-0 left-0 lgs:w-[50vw] z-30 h-full bg-gradient-to-r from-secondary to-transparent opacity-50'/>
                              <div className='absolute top-0 left-0 lgs:w-[50vw] z-30 h-full bg-gradient-to-b from-secondary to-transparent opacity-50'/>



                  <div className='absolute flex  top-0 left-0 lgs:w-[50vw] z-30 h-full items-center overflow-hidden justify-center bg-transparent'>

                    <div className='flex flex-col justify-center items-center bg-transparent overflow-hidden'>

                        <div className="absolute lgs:mb-48 left-12  items-start justify-start lgs:pl-6 overflow-hidden">
                                                      
                                                      <div className="flex w-auto h-auto  overflow-hidden">

                                                      <h2 className="flex font-bricolagegrotesque text-primary lgs:text-xl bg-orange-600 lgs:p-2"
                                                      style={{
                                                        fontWeight:'100'
                                                      }}>
                                                      Garage Section
                                                      </h2>
                                                      <span className="font-bricolagegrotesque text-orange-600 lgs:text-xl bg-primary lgs:p-2">
                                                          {data?.subName}
                                                      </span>

                                                      </div>

                                                      
                        </div> 

                        <div className="absolute lgs:mt-60 right-12  items-start justify-start lgs:p-5">
                                                      
                                                      <div className="flex w-2xl h-3xl">

                                                     

                                                      </div>

                                                      
                        </div> 

                        <h2 className='absolute font-dmsans z-30 lgs:text-8xl text-orange-600'>
                          {data?.name}
                        </h2>

                        <h2 className='absolute font-dmsans z-20 lgs:ml-2 lgs:text-8xl text-primary'>
                          {data?.name}
                        </h2>

                        <h2 className='absolute z-20 font-dmsans lgs:text-nowrap animate-textScaling01 lgs:mt-16 text-gray-500 blur-sm opacity-30'style={{
                          fontSize:'120px'
                        }}>
                          {data?.name}
                        </h2>

                    </div>    

                  </div>

                   </div>  


                    {/* Section Section */}  

                    <div className='flex h-[50rem] lgs:w-[50vw] justify-start items-start bg-transparent overflow-y-scroll'>

                          <div className='flex h-auto bg-transparent lgs:w-[50vw]'>

                              <div className='flex flex-col w-auto h-auto justify-center items-center bg-transparent z-50 lgs:p-5'>

                                {/* Main Topic and Description */}
                                <div className='flex flex-col lgs:w-[45vw] h-auto justify-start items-start bg-transparent'>

                                <div className='flex w-auto h-auto'>
                                 <h2 className='font-dmsans text-lg text-shadow-xl bg-orange-600 text-primary lgs:p-2'>
                                  Introduction
                                  </h2>
                                </div>  

                                  <p className='font-dmsans lgs:w-[45vw] lgs:mt-2 text-md text-secondary bg-transparent lgs:p-2'
                                  style={{
                                    fontWeight:'200'
                                  }}>
                                    {data?.Introduction}
                                  </p>
                                </div>  

                                {/* Main Topic and Description */}
                                <div className='flex flex-col lgs:w-[45vw] lgs:h-[30rem] justify-start items-start bg-transparent'>

                                
                                </div>  

                                 {/* Sub Topic and Sub Description */}
                                   <div className='flex flex-col lgs:w-[45vw] h-auto justify-start items-start bg-transparent'>

                                 <div className='flex w-auto h-auto lgs:p-8'>

                                  <h2 className='font-dmsans text-lg text-shadow-xl bg-orange-600 text-primary lgs:p-2'>
                                     {data?.name} Sections
                                    </h2>
                                </div>    

                                    {data?.subTopics.map((subTopic, index) => (

                                      <div key={index} className='relative flex bg-transparent w-full h-[25rem] items-center justify-center'>
                                      <div className='relative flex  w-[20vw] h-[25rem] top-0 bg-transparent items-start justify-center z-20  overflow-hidden'>
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
                                      <div className='flex w-[80vw] h-[25rem] items-start justify-start top-0 bg-transparent z-30 mds:p-5 p-2'>
                                        <div className={`flex flex-col w-full h-[22rem] items-start rounded-3xl justify-start p-5`}
                                        style={{
                                          boxShadow:'0px 2px 10px 10px rgba(0,0,0,0.2)'
                                        }}>
                                            <h2 className='font-dmsans text-lg text-shadow-xl bg-gray-400 text-primary lgs:p-1'>
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
