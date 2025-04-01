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
  subname: string;
  subTopic: string
 
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



                  <div className='absolute flex  top-0 left-0 lgs:w-[50vw] z-30 h-full items-center justify-center bg-transparent'>

                  <div className="absolute top-0  items-start justify-start lgs:p-5">
                                                
                                                <div className="flex w-auto h-auto">

                                                <h2 className="flex font-bricolagegrotesque text-primary lgs:text-2xl bg-orange-600 lgs:p-2">
                                                Garage Section
                                                </h2>
                                                <span className="font-bricolagegrotesque text-orange-600 lgs:text-2xl bg-primary lgs:p-2">
                                                    {data?.subname}
                                                </span>

                                                </div>

                                                
                  </div> 
                    

                   <h2 className='flex font-dmsans z-30 lgs:text-9xl text-orange-600'>
                       {data?.name}
                    </h2>

                    <h2 className='absolute font-dmsans z-30 lgs:text-9xl text-orange-600'>
                       {data?.name}
                    </h2>
                    
                    <h2 className='absolute font-dmsans z-20 lgs:ml-3 lgs:text-9xl text-primary'>
                       {data?.name}
                    </h2>
                    <h2 className='absolute z-20 font-dmsans lgs:text-nowrap  lgs:mt-16 text-gray-500 blur-sm opacity-30'style={{
                      fontSize:'150px'
                    }}>
                       {data?.name}
                    </h2>

                  </div>

                   </div>  


                    {/* Section Section */}  

                    <div className='flex h-[50rem] lgs:w-[50vw] justify-center items-center bg-transparent'>


                    </div>  




          </div>

    </div>


)}


    </div>
  );
} ;

export default Detailpage;
