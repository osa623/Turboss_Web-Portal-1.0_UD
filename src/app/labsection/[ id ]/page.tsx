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

    const [offsetY, setOffsetY] = useState(0);
    const [parallex1 , setParallex1] = useState(0);
    const [data, setData] = useState<labData | null>(null);
    const [loading, isLoading] = useState(true);
    const [expandSection , setExpandSection] = useState(false);
    const [click, setClick] = useState(false);     

  

    //naviga
    useEffect(() => {
        const handleScroll = () => {
            setOffsetY(window.scrollY * 0.05);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    useEffect(()=> {
        const handleScroll = () => {
            setParallex1(window.scrollY * 0.02);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);






  //handle expands 001
  const handleExpand = () => {

    setExpandSection(!expandSection);
    
  }


  useEffect(() => {
    if (!sessionStorage.getItem("refreshed")) {
      sessionStorage.setItem("refreshed", "true");
      window.location.reload();
    }
  }, []);

  const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);


    const [angle, setAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => prev + 30);
    }, 2000);

    return () => clearInterval(interval);
  }, []);


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
              <div className='flex h-[50rem] lgs:w-[50vw] justify-center items-center overflow-hidden bg-transparent'>

                  <Image src={data?.image} alt={data?.name} width={1200} height={1200}  className='object-cover scale-150' />

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
