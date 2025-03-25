"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeDown, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';


// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";




// Images
import background from '../../assests/detailbackground1.jpg';
import background2 from '../../assests/detailbackground3.jpg';
import subsetback01 from '../../assests/subSetBack01.png';
import turbossLOgo from '../../assests/turbossLogo.png';

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
    const [activeIndex, setActiveIndex] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [parallex1 , setParallex1] = useState(0);
    const [playingIndex, setPlayingIndex] = useState<number | null>(null);
    const [audioInstance, setAudioInstance] = useState<HTMLAudioElement | null>(null);
    const [data, setData] = useState<labData | null>(null);
    const [loading, isLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedname , setSelectedName] = useState<string | null>(null);
    const [selectedDescription , setSelectedDescription] = useState<string | null>(null);
    const [expandSection , setExpandSection] = useState(false);
    const [hover, setHover] = useState<number | null>(null);
    const [click, setClick] = useState(false);     

  
    const handleAudioToggle = (index: number, sound: string) => {
      if (playingIndex === index) {
        if (audioInstance) {
          audioInstance.pause();
          audioInstance.currentTime = 0;
        }
        setPlayingIndex(null);
        setAudioInstance(null);
      } else {
        if (audioInstance) {
          audioInstance.pause();
        }
        const newAudio = new Audio(sound);
        newAudio.play();
        newAudio.onended = () => setPlayingIndex(null);
        setPlayingIndex(index);
        setAudioInstance(newAudio);
      }
    };
    
    const handleClick = () => {

      setClick(!click);
    }


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


    
    
    <div className='w-full bg-transparent transition-none overflow-hidden'>
      
      <div className='relative flex w-full h-[100vh]'>
       

        
    




        <div className='absolute flex  lgs:w-auto right-0 h-auto bottom-0 z-50'>

         {/* Topic Section */}
          <div className='flex w-auto h-auto bg-transparent z-50 items-end justify-end'>

              <div className='flex w-auto h-auto  right-2 transform rotate-90 origin-top-right'>


                <h2 className='flex flex-col font-bricolagegrotesque text-xl items-center justify-center lgs:p-3  bg-secondary text-primary'style={{
                  boxShadow:'0px 0px 10px 1px rgba(0, 0, 0, 0.2)',
                  fontWeight:'700'
                }}>
                  <span className='flex font-thin'>Garage</span>
                  <span className='flex text-6xl'>101</span>
                  
                </h2>

                <h2 className='font-bricolagegrotesque text-6xl lgs:p-2 place-content-center bg-orange-600 text-primary'style={{
                  boxShadow:'0px 0px 10px 1px rgba(0, 0, 0, 0.2)',
                  fontWeight:'700'
                }}>
                  {data?.name}
                </h2>

                

              </div>    

          </div>

        </div>



        

        <div className={`relative flex flex-col items-center justify-start scrollbar-hide drop-shadow-lgs ${expandSection ? 'lgs:w-[100vw]' : 'lgs:w-[50vw]'} transition-all duration-1000 ease-in-out overflow-y-scroll bg-primary h-auto z-40`}
        style={{
          boxShadow:'inset 0px 0px 10px 1px rgba(0, 0, 0, 0.9)'
        }}>

        <div className={`absolute flex flex-col items-center justify-center ${expandSection ? 'lgs:w-[80vw]' : 'lgs:w-[60vw]'} bg-primary overflow-auto right-0 h-auto z-30`}/>
 


        </div>

         {/*       
         
         <div className='absolute flex flex-col items-center justify-center w-full h-full bg-transparent z-30'>

           <h2 className='font-dmsans text-7xl text-slate-500'>
              {data?.name}
           </h2>11
           <p className='font-dmsans text-xl text-slate-500'>
              {data?.description}
           </p>

        </div>      
         
         */}



      </div>

      


      



    </div>


)}


    </div>
  );
} ;

export default Detailpage;
