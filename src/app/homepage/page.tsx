"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import MouseAnimation from '../components/mouseanimation/page';
import AOS from "aos";
import "aos/dist/aos.css";




// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../homepage/base.css";
import Axila from '@/app/compo/pixelcard/page';




// Images
import image1 from "../assests/background.png";
import bwlogo from '../assests/bwlogo.png';
import subHeroSec1 from '../assests/subherosec2.png';
import herobackground3 from '../assests/herosec3.png';
import herobackground4 from '../assests/herosec4.png';
import herobackground5 from '../assests/herosec5.jpg';
import mainBackground from "../assests/mainBackground.jpg";
import turbossLogo from "../assests/turbossLogo.png";
import carbonFiber from "../assests/carbonFiber.jpg";
import toolbackgroundimage from '../assests/toolbackgroundimage.png';
import toolbackgroundimage10 from '../assests/toolbackgroundimage10.png';
import chatBAckground from '../assests/chatBacklground.jpg';
//import toolset from '../assests/toolSet.jpg';

//chat_pupils
import chatPupil1 from '../assests/pupil01.jpg';
import chatPupil2 from '../assests/pupil02.jpg';
import chatPupil3 from '../assests/pupil03.jpg';


//DYN Images
import birthaBenz from '../assests/DYN/birthaBenz.png';
import jesko from '../assests/DYN/Jejsko.png';
import dropTail from '../assests/DYN/droptail.png';
import carSpeed from '../assests/DYN/carSpeed.png';
import windShield from '../assests/DYN/windShieldWipers.png';


//navigationImages
import engine from '../assests/navigation/engine.png';
import lab from '../assests/navigation/Labs.png';
import tools from '../assests/navigation/Tools.png';
import aboutUs from '../assests/navigation/AboutUs.png';
import auto from '../assests/navigation/auto.png';




//flywheel images
import flywheel0 from '../assests/flywheel.png';
import flywheel1 from '../assests/flywheel2.png';
import flywheel2 from '../assests/flywheel3.png';
import flywheel3 from '../assests/flywheel4.png';



//files

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarSide,  faSearch, faTrafficLight, faVolumeDown, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";








// Slide data with images


// Slide data with images
const DYN = [

    { id: 1, name: 'Bertha Benzs historic drive?', image: birthaBenz, statement: 'In 1888, Bertha Benz completed the first long-distance car journey, driving 106 km in Germany, showcasing the automobile potential.' },
    { id: 2, name: 'the fastest car in the world?', image: jesko, statement: 'The Koenigsegg Jesko Absolut set a record by reaching 412.72 km/h (256.6 mph) in June 2024.' },
    { id: 3, name: 'the worlds most expensive car?', image: dropTail, statement: 'The Rolls-Royce Droptail, limited to four units, is estimated to cost between $25-30 million.' },
    { id: 4, name: 'the invention of windshield wipers?', image: windShield, statement: 'Mary Anderson patented the first windshield wiper in 1903 after observing drivers struggle to clear their windshields.' },
    { id: 5, name: 'the first speeding ticket?', image: carSpeed, statement: 'In 1896, a driver in England received the first speeding ticket for going 8 mph, exceeding the 2 mph limit in towns.' }
];

const Home = () => {
    // Removed duplicate declaration of showPopup and setShowPopup


    //useEffet for the animation
      useEffect(() => {
        AOS.init({
          duration: 1000, // Animation duration in milliseconds
        });
      }, []);



    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (audioRef.current) {
            audioRef.current.muted = !audioRef.current.muted;
        }
    };

    
    //craete an interface of that dataset from the json file

    interface Tools {

        id: number;
        name: string;
        image: string;
        shadow: string;
        description: string;
        details: string[];
    }

    interface LabData {
        
        id: number;
        name: string;
        image: string;
        subName: string;
        subTopic: string

    }

    interface toolsData {
        
        id: number;
        name: string;
        description: string;
        images: Array<{
            url: string;
            equipment: string; 
          }>
        image: string;

    }

   
    const [activeIndex, setActiveIndex] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [parallex1 , setParallex1] = useState(0);
    const [currentIndex , setCurrentIndex] = useState(0);
    const [hover, setHover] = useState<number | null>(null);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const [dnaData, setDnaData] = useState<Tools[]>([]);
    const [labData, setLabData] = useState<LabData[]>([]);
    const [toolsData, setToolsData] = useState<toolsData[]>([]);

    //navigationd

    const router = useRouter();



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

        useEffect(()=> {
            const interval =  setInterval(()=> {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % DYN.length);
            }, 50000);

            return () => clearInterval(interval);
        } ,[]);

        //hook for fetch DNA data Section
        useEffect(()=> {
            fetch('/data/DnaData.json').then((response) => response.json()).then((json) => setDnaData(json));
        } ,[]);

        //hook for the lab data section
        useEffect(()=> {
            fetch('data/LabData.json').then((response) => response.json()).then((json) => setLabData(json));
        }, []);


        //hook for the Tool data section
        useEffect(()=> {
            fetch('data/toolsData.json').then((response) => response.json()).then((json) => setToolsData(json));
        }, []);


        useEffect(() => {
            const handleUserInteraction = () => {
                if (audioRef.current) {
                    audioRef.current.play().catch(error => {
                        console.error('Error playing background audio:', error);
                    });
                }
                document.removeEventListener('click', handleUserInteraction);
            };

            document.addEventListener('click', handleUserInteraction);

            return () => {
                document.removeEventListener('click', handleUserInteraction);
            };
        }, []);


    


    return (


        <div className="relative sms:overflow-hidden h-auto w-full"> 

            {/* First Section */}           
            <div className='relative lgs:h-[200vh] mds:h-[100vh] sms:h-[100vh] w-full  overflow-hidden'>

                <Image src={mainBackground} alt='turbo' className='object-cover w-full h-full z-20' layout='fill' />

                <div className="relative bg-transparent z-30 h-[200vh] mds:h-[100vh] w-full">
                    
                    <div className="absolute w-1/2 h-[200vh] mds:h-[100vh] bg-gradient-to-r left-0 from-secondary to-transparent"/>
                    <div className="absolute w-full h-[200vh] mds:h-[100vh]  bg-gradient-to-l right-0 from-secondary to-transparent"/>
                    <div className="absolute w-full h-full mds:h-[100vh] bg-gradient-to-b top-0 from-secondary to-transparent"/>
                    <div className="absolute w-full h-1/2 bg-gradient-to-t bottom-0 from-secondary to-transparent"/>

                   
                    <div className="relative flex bg-transparent items-center justify-center z-50 lgs:h-[200vh] mds:h-[100vh]   sms:h-[100vh] w-full">

                                
                        {/* Turboss Main Topic */}
                        <div className="absolute flex flex-col lgs:mt-0 items-start justify-center top-0 lgs:h-auto w-full" data-aos='fade-up'>


                                {/* Turboss Main Topic for lgs */}
                                <div className="hidden lgs:flex relative flex-col w-full h-auto justify-center items-center" >

                                            <h2 className="font-bricolagegrotesque text-primary text-shadow-xl text-center" style={{ 
                                                fontWeight: '100',
                                                fontSize:'22rem'
                                                }}>  
                                            Tur<span className="text-orange-600" style={{
                                                fontWeight:'200'
                                            }}>boss
                                            <div className="absolute w-auto h-auto bg-primary"/>
                                            </span>
                                            </h2> 
                                            <h2 className="font-bricolagegrotesque flex items-center absolute bottom-28 left-60 text-primary text-shadow-xl text-center" style={{ 
                                                fontWeight: '100',

                                                }}>  
                                            Concept By<Image src={bwlogo} className="object-contain mx-2 w-6 h-6" alt="BW logo" />
                                            <div className="absolute w-auto h-auto bg-primary"/>
                                            
                                            </h2> 


                                </div>

                                {/* Turboss Main Topic for mds */}
                                <div className="hidden mds:flex flex-col w-full h-auto justify-center items-center" >

                                            <h2 className="font-bricolagegrotesque text-primary text-shadow-xl text-center" style={{ 
                                                fontWeight: '100',
                                                fontSize:'12rem'
                                                }}>  
                                            Tur<span className="text-orange-600" style={{
                                                fontWeight:'200'
                                            }}>boss
                                            <div className="absolute w-auto h-auto bg-primary"/>
                                            </span>
                                            </h2> 
                                             <h2 className="font-bricolagegrotesque flex items-center absolute bottom-12 left-20 text-primary text-shadow-xl text-center" style={{ 
                                                fontWeight: '100',

                                                }}>  
                                            Concept By<Image src={bwlogo} className="object-contain mx-2 w-6 h-6" alt="BW logo" />
                                            <div className="absolute w-auto h-auto bg-primary"/>
                                            
                                            </h2> 

                                </div>

                            
                               {/* Turboss Main Topic for sms */}
                               <div className="hidden sms:flex flex-col w-full h-auto justify-center items-center">


                                        <h2 className="font-bricolagegrotesque text-primary mt-12 text-shadow-xl text-center" style={{ 
                                            fontWeight: '400',
                                            fontSize:'7rem'
                                            }}>  
                                        Tur<span className="text-orange-600" style={{
                                            fontWeight:'100'
                                        }}>boss
                                        <div className="absolute w-auto h-auto bg-primary"/>
                                        </span>
                                        </h2> 
                                       <h2 className="font-bricolagegrotesque absolute top-36 flex text-primary left-12 mt-10 text-shadow-xl text-center" style={{ 
                                            fontWeight: '400',
                                            fontSize:'1rem'
                                            }}>  
                                        Concept By<Image src={bwlogo} className="object-contain mx-2 w-6 h-6" alt="BW logo" />
                                        </h2> 

                                </div>
                          
                         </div>   

                        {/* Sub Paragrapgh Main Topic */}
                        <div className="absolute flex flex-col items-center justify-center bottom-0 lgs:h-[60vh] mds:h-[25vh] sms:h-[30vh] w-full">

                            <div className="flex flex-col w-auto h-auto justify-center items-center">

                            <h2 className="font-dmsans text-primary text-shadow-xl lg:text-2xl sms:text-md sms:w-[70vw] lgs:text-nowrap text-center" style={{ 
                                  fontWeight: '100',
                                  }}>  
                            Scroll down to step into the garage and ignite the experience
                            </h2> 



                            </div>
                            <div className="absolute  flex-col w-auto h-auto justify-center opacity-15 sms:opacity-80 blur-sm items-center">

                            <h2 className="font-dmsans text-primary text-shadow-xl sms:w-[70vw] animate-textScaling01 lg:text-3xl mt-4 sms:mt-16 lg:text-nowrap text-center" style={{ 
                                fontWeight: '100',
                                }}>  
                            Scroll down to step into the garage and ignite the experience
                            </h2> 



                            </div>
                          
                         </div>   


                        {/* Sub Upper Topic for larger screen */}
                         <div className="hidden absolute lgs:flex mds:flex mt-0 items-start justify-center mds:top-12 lgs:top-20 lgs:right-48 mds:right-12 lgs:h-[50vh] w-[100vw]">

                              
                                <div className="flex flex-col w-full h-auto justify-center items-end">


                                <div className="hidden lgs:flex mds:flex bg-transparent z-50 w-auto h-auto space-x-3">
                                      <div className="flex bg-orange-600 mds:h-[2rem] mds:w-[2rem] h-[3rem] w-[3rem] cursor-pointer rounded-full items-center justify-center"
                                      style={{
                                        boxShadow:'inset 0px 0px 5px 2px rgba(255,255,255 ,0.4) , 0px 0px 20px 20px rgba(0,0,0,0.2)'
                                      }}>
                                            <FontAwesomeIcon icon={faSearch} className="text-primary" />
                                     </div>

                                      <div className="flex bg-orange-600 mds:h-[2rem] mds:w-[2rem] h-[3rem] w-[3rem] rounded-full items-center justify-center">

                                      <FontAwesomeIcon icon={faCarSide} className="text-primary" />

                                      </div>

                                      <div className="flex bg-orange-600 mds:h-[2rem] mds:w-[2rem] h-[3rem] w-[3rem] rounded-full items-center justify-center">

                                      <FontAwesomeIcon icon={faTrafficLight} className="text-primary" />

                                      </div>

                                      <div className="flex bg-orange-600 mds:h-[2rem] mds:w-[2rem] h-[3rem] w-[3rem] rounded-full items-center justify-center">

                                      <FontAwesomeIcon icon={faCarSide} className="text-primary" />


                                      </div>
                                </div>




                                    <h2 className="font-bricolagegrotesque text-primary lgs:mt-5 lgs:text-2xl text-shadow-xl text-center" style={{ 
                                        fontWeight: '100',
                                        }}>  
                                    The Ultimate Digital <span className="text-orange-600 font-poppins" style={{
                                        fontWeight:'100'
                                    }}>Garage Experience</span>
                                    </h2> 

                                

                                </div>

                               



                                
                                
                         </div> 

                        {/* Sub Upper Topic for smaller screen */}
                         <div className="hidden absolute sms:flex items-start justify-center top-16 lgs:h-[50vh] w-full">

                            <div className="flex flex-col w-full h-auto justify-center items-center">

                                <h2 className="font-bricolagegrotesque text-primary text-sm text-shadow-xl text-center" style={{ 
                                    fontWeight: '100',
                                    }}>  
                                The Ultimate Digital <span className="text-orange-600 font-poppins" style={{
                                    fontWeight:'100'
                                }}>Garage Experience</span>
                                </h2> 

                            {/*                                    <div className="flex bg-transparent space-x-5 items-center justify-center lgs:h-[4rem] lgs:w-[20rem]">

                                    <div className="flex bg-orange-600 h-[3rem] w-[3rem] rounded-full"/>
                                    <div className="flex bg-orange-600  h-[3rem] w-[3rem] rounded-full"/>
                                    <div className="flex bg-orange-600  h-[3rem] w-[3rem] rounded-full"/>
                                    <div className="flex bg-orange-600  h-[3rem] w-[3rem] rounded-full"/>


                                </div>
                            */}

                            </div>




                         </div> 

 

                      


                      {/* Cogwheel Setup */}
                        <div className="relative  flex bg-transparent items-center justify-center mt-20 mds:mt-0  lgs:h-auto w-full">
           
                            <div className="absolute bg-orange-600 h-[30rem] w-[70vw] opacity-20 blur-3xl z-0"/>

                            {/* Middle Cogwheel */}
                            <div className="absolute flex bg-transparent lgs:h-[40rem] mds:w-[35rem] mds:h-[35rem] lgs:w-[40rem] sms:w-auto sms:h-[30rem]  items-center justify-center z-40">

                            
                                    <Image src={flywheel0} alt="" className="hidden absolute mds:flex lgs:flex object-cover z-10 sms:w-auto sms:h-[20rem] lgs:h-[35rem] animate-spin lgs:w-[35rem]  " style={{
                                    animationDuration:'10s'
                                    }}/>   

                                        <div className="flex bg-primary h-[20rem] w-[20rem] sms:w-[20rem] sms:h-[20rem]   rounded-full items-center overflow-hidden justify-center z-20" style={{
                                        boxShadow:'inset 0px 0px 20px 5px rgba(0,0,0,0.9) , 0px 0px 20px 20px rgba(0,0,0,0.9)'
                                    }}> 
                                        <Image src={turbossLogo} alt="" className="flex object-cover z-50 h-[22rem] sms:w-[20rem] w-[22rem]"/>
                                        <div className="absolute flex bg-gradient-to-t from-secondary to-transparent cursor-pointer items-center justify-start h-[20rem] w-[20rem] group-hover:scale-110 duration-700 overflow-hidden transition-all ease-in-out rounded-full z-50"/>
                                                
                                                <div className="absolute flex cursor-pointer items-center justify-start h-[20rem] w-[20rem] group-hover:scale-110 duration-700 overflow-hidden transition-all ease-in-out rounded-full z-50"
                                                style={{
                                                    boxShadow:'inset 0px 0px 20px 5px rgba(255,255,255,0.4)'
                                                }}/>

                                    
                                    </div> 

                            </div>

                            {/* Middle Cogwheel for small */}
                            <Image src={flywheel0} alt="" className="hidden absolute sms:flex object-cover z-30 sms:w-auto sms:h-[30rem]  animate-spin  lgs:h-[35rem] lgs:w-[35rem]  " style={{
                                    animationDuration:'10s'
                            }}/>  

                            {/* 1rd Cogwheel */}
                            <div className=" absolute flex bg-transparent justify-start items-center h-[50rem] sms:ml-24 w-[80rem] z-20" style={{

                                }}>
                                <Image src={flywheel1} alt="" className="hidden absolute lgs:flex sms:flex object-cover z-30 w-[35rem] lgs:h-[30rem] animate-spin" style={{
                                    animationDuration:'10s',
                                    animationDirection:'reverse'
                                }}/>   
                                <Image src={flywheel3} alt="" className="hidden absolute mds:flex object-cover z-30 w-[35rem] lgs:h-[30rem] animate-spin" style={{
                                    animationDuration:'10s',
                                    animationDirection:'reverse'
                                }}/>   
                           </div>

                            {/* 3rd Cogwheel */}
                            <div className=" absolute flex bg-transparent justify-end items-center h-[50rem] w-[80rem] z-10">

                                <div className="absolute flex w-[40rem] h-[40rem] items-center justify-center z-10">


                                       
                                    <Image src={flywheel2} alt="" className="absolute object-cover z-10 w-[40rem] h-[40rem] animate-spin" style={{
                                    animationDuration:'20s'
                                    }}/>   



                                </div>        

                            </div>

                            {/* 4th blue Cogwheel */}
                            <div className="hidden absolute lgs:flex mds:flex bg-transparent justify-start items-start h-[50rem] w-[80rem] z-20">

                                <div className="absolute flex lgs:w-[20rem] lgs:h-[20rem] items-center lgs:ml-64 lgs:mt-12 justify-center z-10">


                                    
                                    <Image src={flywheel3} alt="" className="absolute object-cover z-20 w-[20rem] lgs:h-[20rem] animate-spin" style={{
                                    animationDuration:'20s'
                                    }}/>   




                                </div>        

                            </div>

                            {/* 5th blue Cogwheel */}
                            <div className="absolute hidden lgs:flex bg-transparent justify-start items-end h-[50rem] w-[80rem]  z-40">

                            <div className="absolute group flex lgs:w-[20rem] lgs:h-[20rem] items-center lgs:ml-64 lgs:mb-24  justify-center z-10">


                                
                                <Image src={flywheel2} alt="" className="absolute object-cover z-40 w-[20rem] h-[20rem] animate-spin-fast group-hover:animate-spin-slow" style={{
                                animationDirection:'reverse',

                                }}/>   

                                <div className=" group flex bg-primary group-hover:bg-purple-600 cursor-pointer items-center justify-start h-[12rem] w-[12rem] overflow-hidden group-hover:scale-110 duration-700 transition-all ease-in-out rounded-full z-50"
                                style={{
                                    boxShadow:'inset 0px 0px 20px 5px rgba(0,0,0,0.9) , 0px 0px 20px 20px rgba(0,0,0,0.9)'
                                }}>

                                        <Image src={auto} alt="" className="flex object-cover z-50 w-[12rem] lgs:h-[12rem] lgs:scale-125 duration-700 transform-all ease-in-out"/>
                                        <div className="absolute flex bg-gradient-to-t from-secondary to-transparent cursor-pointer items-center justify-start h-[12rem] w-[12rem] group-hover:scale-110 duration-700 overflow-hidden transition-all ease-in-out rounded-full z-50"/>
                                                <div className="absolute flex bg-gradient-to-t from-secondary to-transparent cursor-pointer items-center justify-start h-[12rem] w-[12rem] group-hover:scale-110 duration-700 overflow-hidden transition-all ease-in-out rounded-full z-50"/>
                                                <div className="absolute flex cursor-pointer items-center justify-start h-[12rem] w-[12rem] group-hover:scale-110 duration-700 overflow-hidden transition-all ease-in-out rounded-full z-50"
                                                style={{
                                                    boxShadow:'inset 0px 0px 20px 5px rgba(255,255,255,0.4)'
                                                }}/>

                                    </div>
                                
                                     




                            </div>        

                            </div>
                            

                           {/* 6th blue Cogwheel */}
                            <div className="absolute hidden lgs:flex bg-transparent justify-end items-end h-[50rem] w-[80rem] z-30">

                            <div className="absolute group flex lgs:w-[20rem] lgs:h-[20rem] items-center lgs:mr-64 lgs:mb-48  justify-center z-10">


                                
                                <Image src={flywheel2} alt="" className="absolute object-cover z-40 w-[20rem] lgs:h-[20rem] animate-spin duration-700 transform-all ease-in-out" style={{
                                animationDuration:'20s'

                                }}/>   

                                <div className=" group flex bg-primary group-hover:bg-purple-600 cursor-pointer items-center justify-start h-[10rem] w-[10rem] group-hover:scale-125 duration-700 transition-all ease-in-out rounded-full z-50"
                                style={{
                                    boxShadow:'inset 0px 0px 20px 5px rgba(0,0,0,0.9) , 0px 0px 20px 20px rgba(0,0,0,0.9)'
                                }}>
                                    </div>
                                
                                     




                            </div>        

                           </div>

                            {/* 7th Navigation Cogwheel */}
                            <div className="hidden relative lgs:flex bg-transparent lgs:h-auto lgs:w-[80rem] z-50">

    
                                {/* 1st Navigation Cogwheel */}
                                <div className="absolute group flex lgs:w-[20rem] lgs:h-[20rem] left-32 lgs:-top-24 items-center justify-center z-10">


                                    
                                            <Image src={flywheel0} alt="" className="absolute object-cover z-40 w-[20rem] lgs:h-[20rem] animate-spin duration-700 transform-all ease-in-out" style={{
                                            animationDuration:'20s'

                                            }}/>   

                                            <div className=" group flex bg-primary group-hover:bg-purple-600 cursor-pointer items-center justify-start h-[12rem] w-[12rem] group-hover:scale-110 duration-700 transition-all ease-in-out overflow-hidden rounded-full z-50"
                                            style={{
                                                boxShadow:'inset 0px 20px 25px rgba(0,0,0,0.9) , 0px 0px 20px 20px rgba(0,0,0,0.9)'
                                            }}>

                                                <Image src={lab} alt="" className="flex object-cover z-50 w-[12rem] lgs:h-[12rem] lgs:scale-125 duration-700 transform-all ease-in-out"/>
                                                <div className="absolute flex bg-gradient-to-t from-secondary to-transparent cursor-pointer items-center justify-start h-[12rem] w-[12rem] group-hover:scale-110 duration-700 overflow-hidden transition-all ease-in-out rounded-full z-50"/>
                                                <div className="absolute flex bg-gradient-to-t from-secondary to-transparent cursor-pointer items-center justify-start h-[12rem] w-[12rem] group-hover:scale-110 duration-700 overflow-hidden transition-all ease-in-out rounded-full z-50"/>
                                                <div className="absolute flex cursor-pointer items-center justify-start h-[12rem] w-[12rem] group-hover:scale-110 duration-700 overflow-hidden transition-all ease-in-out rounded-full z-50"
                                                style={{
                                                    boxShadow:'inset 0px 0px 20px 5px rgba(255,255,255,0.4)'
                                                }}/>
                                                <div className="absolute flex items-center justify-center w-[12rem] lgs:h-[12rem]">
                                                    <h2 className="absolute flex font-poppins text-4xl text-primary text-shadow-xl text-center z-50"
                                                    style={{fontWeight:'100'}}>
                                                        Enignes
                                                    </h2>
                                                </div>


                                                </div>

                            
                                </div>  
                                    
                                {/* 2st Navigation Cogwheel */}
                                <div className="absolute group flex lgs:w-[15rem] lgs:h-[15rem] bottom-12 left-48 items-center justify-center z-10">


                                    
                                            <Image src={flywheel1} alt="" className="absolute object-cover z-40 w-[15rem] lgs:h-[15rem] animate-spin duration-700 transform-all ease-in-out" style={{
                                            animationDuration:'20s'

                                            }}/>   

                                            <div className=" group flex bg-primary group-hover:bg-purple-600 cursor-pointer items-center justify-start h-[8rem] w-[8rem] group-hover:scale-110 duration-700 overflow-hidden transition-all ease-in-out rounded-full z-50"
                                            style={{
                                                boxShadow:'inset 0px 0px 20px 5px rgba(0,0,0,0.9) , 0px 0px 20px 20px rgba(0,0,0,0.9)'
                                            }}>

                                                <Image src={tools} alt="" className="flex object-cover z-50 w-[10rem] lgs:h-[10rem] lgs:scale-125 duration-700 transform-all ease-in-out"/>
                                                <div className="absolute flex bg-gradient-to-t from-secondary to-transparent cursor-pointer items-center justify-start h-[8rem] w-[8rem] group-hover:scale-110 duration-700 overflow-hidden transition-all ease-in-out rounded-full z-50"/>
                                                <div className="absolute flex bg-gradient-to-t from-secondary to-transparent cursor-pointer items-center justify-start h-[8rem] w-[8rem] group-hover:scale-110 duration-700 overflow-hidden transition-all ease-in-out rounded-full z-50"/>
                                                <div className="absolute flex cursor-pointer items-center justify-start h-[8rem] w-[8rem] group-hover:scale-110 duration-700 overflow-hidden transition-all ease-in-out rounded-full z-50"
                                                style={{
                                                    boxShadow:'inset 0px 0px 20px 5px rgba(255,255,255,0.4)'
                                                }}/>
                                                <div className="absolute flex items-center justify-center w-[8rem] lgs:h-[8rem]">
                                                    <h2 className="absolute flex font-poppins text-xl text-primary text-shadow-xl text-center z-50"
                                                    style={{fontWeight:'100'}}>
                                                        Tools
                                                    </h2>
                                                </div>

                                            </div>

                            
                                </div>

                                {/* 3rd Navigation Cogwheel */}
                                <div className="absolute group flex lgs:w-[20rem] lgs:h-[20rem]  right-48 items-center justify-center z-10">


                                    
                                            <Image src={flywheel0} alt="" className="absolute object-cover z-40 w-[20rem] lgs:h-[20rem] animate-spin duration-700 transform-all ease-in-out" style={{
                                            animationDuration:'8s',
                                            animationDirection:'reverse'

                                            }}/>   

                                            <div className=" group flex bg-primary group-hover:bg-purple-600 cursor-pointer items-center justify-start h-[12rem] w-[12rem] overflow-hidden group-hover:scale-110 duration-700 transition-all ease-in-out rounded-full z-50"
                                            style={{
                                                boxShadow:'inset 0px 0px 20px 5px rgba(0,0,0,0.9) , 0px 0px 20px 20px rgba(0,0,0,0.9)'
                                            }}>


                                                <Image src={aboutUs} alt="" className="flex object-cover z-50 w-[12rem] lgs:h-[12rem] lgs:scale-110 duration-700 transform-all ease-in-out"/>
                                                <div className="absolute flex bg-gradient-to-t from-secondary to-transparent cursor-pointer items-center justify-start h-[12rem] w-[12rem] group-hover:scale-110 duration-700 overflow-hidden transition-all ease-in-out rounded-full z-50"/>
                                                <div className="absolute flex bg-gradient-to-t from-secondary to-transparent cursor-pointer items-center justify-start h-[12rem] w-[12rem] group-hover:scale-110 duration-700 overflow-hidden transition-all ease-in-out rounded-full z-50"/>
                                                <div className="absolute flex cursor-pointer items-center justify-start h-[12rem] w-[12rem] group-hover:scale-110 duration-700 overflow-hidden transition-all ease-in-out rounded-full z-50"
                                                style={{
                                                    boxShadow:'inset 0px 0px 20px 5px rgba(255,255,255,0.4)'
                                                }}/>
                                                <div className="absolute flex items-center justify-center w-[12rem] lgs:h-[12rem]">
                                                    <h2 className="absolute flex font-poppins lgs:text-2xl text-primary text-shadow-xl text-center z-50"
                                                    style={{fontWeight:'100'}}>
                                                        Turboss???
                                                    </h2>
                                                </div>




                                            </div>

                            
                                </div>   

                                 {/* 4th Navigation Cogwheel */}
                                <div className="absolute group flex lgs:w-[25rem] lgs:h-[25rem] right-48 -bottom-10 items-center justify-center z-10">


                                    
                                    <Image src={flywheel3} alt="" className="absolute object-cover z-40 w-[25rem] lgs:h-[25rem] animate-spin duration-700 transform-all ease-in-out" style={{
                                    animationDuration:'10s',
                                    animationDirection:'reverse'

                                    }}/>   

                                    <div className=" group flex bg-primary group-hover:bg-purple-600 cursor-pointer items-center justify-start h-[12rem] w-[12rem] overflow-hidden group-hover:scale-110 duration-700 transition-all ease-in-out rounded-full z-50"
                                    style={{
                                        boxShadow:'inset 0px 0px 20px 5px rgba(0,0,0,0.9) , 0px 0px 20px 20px rgba(0,0,0,0.9)'
                                    }}>

                                        <Image src={engine} alt="" className="flex object-cover z-50 w-[12rem] lgs:h-[12rem] lgs:scale-125 duration-700 transform-all ease-in-out"/>
                                        <div className="absolute flex bg-gradient-to-t from-secondary to-transparent cursor-pointer items-center justify-start h-[12rem] w-[12rem] group-hover:scale-110 duration-700 overflow-hidden transition-all ease-in-out rounded-full z-50"/>
                                                <div className="absolute flex bg-gradient-to-t from-secondary to-transparent cursor-pointer items-center justify-start h-[12rem] w-[12rem] group-hover:scale-110 duration-700 overflow-hidden transition-all ease-in-out rounded-full z-50"/>
                                                <div className="absolute flex cursor-pointer items-center justify-start h-[12rem] w-[12rem] group-hover:scale-110 duration-700 overflow-hidden transition-all ease-in-out rounded-full z-50"
                                                style={{
                                                    boxShadow:'inset 0px 0px 20px 5px rgba(255,255,255,0.4)'
                                                }}/>

                                                <div className="absolute flex items-center justify-center w-[12rem] lgs:h-[12rem]">
                                                    <h2 className="absolute flex font-poppins lgs:text-4xl text-primary text-shadow-xl text-center z-50"
                                                    style={{fontWeight:'100'}}>
                                                        Labs
                                                    </h2>
                                                </div>


                                        </div>


                                </div>  




                            </div>



                       </div>


                      {/* Scrolling animation for the hero section */}
                       <div className=" absolute flex w-[10rem] sms:scale-75 items-center justify-center lgs:h-[10rem] bottom-20">
                         <MouseAnimation />
                       </div>

                    </div>





                
                </div>



            </div>


            {/* Sound Check Section */}   
            <div className="fixed flex items-center border-4 justify-center text-center  bg-secondary w-[3rem] h-[3rem] rounded-full z-50 top-4 left-4"
            style={{
                boxShadow:'0px 0px 20px 5px rgba(0,0,0,0.3) , inset 0px 0px 5px 1px rgba(255,255,255,0.3)'
            }}>
            
            <audio ref={audioRef} autoPlay loop>
                <source src="/backgroundAudio.wav" type="audio/wav" />
                Your browser does not support the audio element.
            </audio>
            <button onClick={toggleMute}>
                {isMuted ? <FontAwesomeIcon className="text-primary" icon={faVolumeDown}/>: <FontAwesomeIcon className="text-primary" icon={faVolumeHigh}/>}
            </button>
            
            </div>

            {/* Second Section */}
            <div className='relative flex lgs:h-[35rem] mds:h-[30rem] sms:h-[45rem] w-full overflow-hidden z-30'>
                 {/*<audio ref={(el) => { sectionAudioRefs.current[0] = el; }} >
                    <source src="/welcomingSection.wav" type="audio/wav" />
                    Your browser does not support the audio element.
                </audio> */}
                <Image 
                    src={herobackground3} 
                    alt='turbo' 
                    className='object-cover w-full animate-scaling01 blur-sm sms:blur-md h-full' 
                    layout='fill' 
                    style={{
                        transform: `translateY(${parallex1 * 0.2}px)`, 
                        transition: "transform 0.4s ease-out",
                    }}
                />
                <div className="aboslute flex mds:scale-95  flex-col items-center overflow-hidden  justify-center bg-gradient-to-t from-secondary via-transparent to-transparent w-full h-auto z-30">

                     <h2 className="sms:flex mds:flex flex-col font-bricolagegrotesque text-7xl mt-8 text-primary text-shadow-xl text-center" data-aos='zoom-in' style={{
                        fontWeight:'200'
                     }}>
                        Welcome to <span className="bg-orange-600 p-4 sms:p-2" data-aos='fade-right' data-aos-delay='1200' style={{
                            fontWeight:'800'
                        }}>Turboss</span>
                     </h2>

                     <p className="font-dmsans text-xl sms:text-xl w-[60vw] mds:w-[80vw] overflow-hidden sms:w-[80vw] lgs:mt-12  mt-8 text-primary text-shadow-xl text-center" data-aos='zoom-in' style={{
                        fontWeight:'200'
                     }}>
                        Where every ride is fueled by passion and power meets accuracy. Explore a world where engineering is at the cutting edge, machines come to life, and every little detail reveals a tale of creativity and performance. This is an experience rather than merely a journey. </p>

                     <div className="sms:flex mds:mb-6 flex-col sms:mt-16 mds:mt-8 font-dmsans text-2xl lgs:w-[40vw] lgs:mt-20 text-orange-500 text-shadow-xl text-center" style={{
                        fontWeight:'600'
                     }}>
                        <span className="bg-orange-600 text-primary p-3 sms:p-2" data-aos='fade-left' style={{
                            fontWeight:'600'
                        }}>Explore. Learn. Innovate.</span><span className="lgs:ml-2 sms:mt-2" data-aos='fade-right'  style={{
                            fontWeight:'200'
                        }}> Your Virtual Garage Awaits</span>
                        </div> 

                </div>
            </div>

             {/* Chat Section */}
            <div className="flex h-[25rem] sms:flex-col sms:h-[50rem] w-full bg-orange-600 z-40" >


                <div className="relative flex h-[25rem] sms:h-[50rem] w-[60vw] sms:w-full items-center justify-start overflow-hidden">
                        <Image src = {chatBAckground} alt="fwef" className="object-cover sms:h-[50rem]  sms:w-full  h-[30rem] w-full z-30"/>
                        <div className="flex absolute bg-gradient-to-r h-[30rem] sms:h-[50rem] w-[80vw] from  sms:w-full from-secondary to-transparent z-30"/>
                        <div className="flex absolute bg-gradient-to-l sms:bg-gradient-to-b h-[30rem] sms:h-[50rem] w-[20vw] sms:w-full right-0  from-orange-600 via-orange-600 to-transparent z-30"/>
                        <div className="flex absolute bg-gradient-to-r h-[30rem] sms:h-[50rem] w-[100vw] sms:w-full right-0  from-secondary to-transparent z-43"/>
                        <div className="hidden sms:flex absolute bg-gradient-to-r h-[30rem] sms:h-[50rem] sms:w-full w-[100vw] right-0  from-secondary to-transparent z-30"/>
                </div>

                <div className="hidden lgs:flex h-[25rem] sms:h-[50rem] w-[40vw] sms:w-[60vw] items-center justify-center"/>

                {/* floating text */}
                <div className="absolute overflow-hidden  flex flex-col w-full h-[50rem] p-0 sms:h-[50rem] sms:w-full bg-transparent items-start justify-center z-30">

                    <h2 className="flex font-dmsans animate-movingText02 text-primary opacity-20 text-center" style={{
                        fontSize:'50rem'
                    }}>
                        COMMUNITY
                    </h2>

                    <h2 className="flex font-dmsans text-primary text-center" style={{
                        fontSize:'15rem'
                    }}>
                        CommunityHub
                    </h2>

                </div>

                {/* Upper corner text */}
                <div className="absolute flex right-0 w-[20vw] lgs:h-[4rem] h-[3rem] sms:w-[60vw] rounded-bl-full bg-primary items-center justify-center z-30"
                style={{
                    boxShadow:'0px 0px 20px 5px rgba(0,0,0,0.4), inset 0px 0px 10px 2px rgba(0,0,0,0.8)'
                }}>

                    <h2 className="font-dmsans lgs:text-2xl sms:text-xl text-orange-600 text-center" style={{
                        fontWeight:'200'
                    }}>
                        #ChatCommunity
                    </h2>


                </div>

                     {/* Upper corner text */}
                <div className="absolute hidden sms:flex left-0 sms:w-[30vw] h-[3rem] rounded-br-full bg-orange-600 items-center justify-center z-30"
                style={{
                    boxShadow:'0px 0px 20px 5px rgba(0,0,0,0.4), inset 0px 0px 10px 2px rgba(0,0,0,0.8)'
                }}>

                    <Link href={'https://www.baoswheels.com/community'} className="font-dmsans lgs:text-2xl sms:text-xl text-primary text-center" style={{
                        fontWeight:'200'
                    }}>
                        Go
                    </Link>


                </div>



                {/* text Sections */}
                <div className="absolute overflow-hidden flex sms:flex-col w-full sms:h-auto sms:mt-20 h-[25rem] mds:bg-gradient-to-l from-secondary to-transparent  items-center justify-center mds:z-50 z-40">

                        <div className="flex lgs:h-[30rem] w-[40vw] sms:w-[60vw]  items-center justify-center overflow-hidden">
  
                        
                        </div>

                        <div className="flex flex-col lgs:h-[25rem] z-50 w-[60vw] sms:w-[80vw] items-center justify-center">
                        <div className="flex flex-col w-auto h-auto sms:items-center overflow-hidden">

                                <h2 className="flex lgs:text-lg sms:text-xl mds:text-xl font-dmsans text-center items-center  text-primary" data-aos='fade-right' style={{
                                    fontWeight:'100'
                                }}>
                                Join the Turboss<span className="flex bg-primary lgs:ml-5 lgs:w-[20rem] lgs:h-[0.1rem]"/>
                                </h2>

                                <span className="flex lgs:text-6xl mds:text-5xl font-dmsans sms:bg-orange-600 sms:text-primary bg-primary text-orange-600 sms:text-4xl text-center items-center p-4 rounded-lg "
                                data-aos='fade-up' data-aos-delay='200'
                                    style={{
                                        fontWeight:'800'
                                    }}>
                                     Community Chat
                                </span>
                        </div>

                            <p className="font-dmsans w-[40vw] sms:w-[60vw] mt-6 sms:text-xl lgs:text-xl text-center lgs:mt-8 text-primary h-auto items-center"
                            data-aos='zoom-in' data-aos-delay='300'
                            style={{
                                fontWeight:'200'
                            }}>
                                    Whether you love cars, work in a garage, or are just starting to explore the world of automobiles — this is your place to connect, share, and chat with others.</p>
                             <Link href="https://www.baoswheels.com/community" className="hidden lgs:flex mds:flex bg-primary mt-8 lgs:mt-4 sms:mt-4 items-center justify-center w-[20vw] sms:w-[60vw] h-[3rem] rounded-lg text-orange-600 font-dmsans text-lg"
                             data-aos='fade-up' data-aos-delay='400'>
                                Join Now
                             </Link>
                       </div>

                </div>

                {/* Chat Sections */}
                <div className="absolute z-40 sms:mt-8 lgs:overflow-hidden flex sms:flex-col sms:h-[70rem] w-[60%] mds:w-[70%] sms:scale-90 sms:w-full bg-transparent h-[25rem] items-center justify-center">
                        
                        <div className="flex flex-col sms:mt-12 lgs:h-auto lgs:w-full items-start lgs:space-y-8 lgs:p-12 justify-center overflow-hidden">

                            <div className="flex lgs:w-auto lgs:scale-90 scale-75 sms:scale-75 lgs:ml-12 items-start justify-center">
                                
                                <div className="flex bg-primary overflow-hidden border-4 w-[4rem] h-[4rem] rounded-full" data-aos='zoom-in' data-aos-delay='350'>
                                    <Image src={chatPupil2} alt="" className="flex object-cover z-50 h-[4rem] sms:w-[4rem] w-[4rem]"/>
                                </div>

                                <div className="flex flex-col bg-gray-900 rounded-2xl ml-2 items-start p-5 justify-center w-[30rem] lgs:h-[8rem]" data-aos='fade-left' data-aos-delay='400'
                                style={{
                                    boxShadow:'0px 0px 20px 5px rgba(0,0,0, 0.4), inset 0px 0px 10px 2px rgba(255,255,255, 0.4)'
                                }}>
                                    <h2 className="flex font-dmsans text-orange-600 lgs:text-sm"
                                    style={{
                                        fontWeight:'800'
                                    }}>
                                        Jessica Anderson<span className="ml-2 text-primary"
                                        style={{
                                            fontWeight:'200'
                                        }}>
                                            Tue 03:01
                                        </span>
                                    </h2>
                                    <p className="flex font-dmsans text-primary lgs:text-lg"
                                    style={{
                                        fontWeight:'100'
                                    }}>
                                        Why does my car make a ticking noise when I start it, and then the sound goes away after a few minutes?
                                    </p>
                                </div>

                            </div>

                            <div className="flex lgs:w-auto sms:ml-12  lgs:scale-110 items-start scale-90 justify-center">
                                
                                <div className="flex bg-primary overflow-hidden border-4 w-[4rem] h-[4rem] rounded-full" data-aos='zoom-in' data-aos-delay='450'>
                                    <Image src={chatPupil1} alt="" className="flex object-cover z-50 lgs:h-[4rem] sms:w-[4rem] lgs:w-[4rem]"/>
                                </div>

                                <div className="flex flex-col bg-blue-950 rounded-2xl ml-2 items-start p-5 justify-center w-[30rem] sms:w-[25rem] lgs:h-[8rem]" 
                                data-aos='fade-left' data-aos-delay='500'
                                style={{
                                    boxShadow:'0px 0px 20px 5px rgba(0,0,0, 0.4), inset 0px 0px 10px 2px rgba(255,255,255, 0.4)'
                                }}>

                                    <div className="flex bg-transparent items-center justify-start w-full h-auto">
                                    <h2 className="flex font-dmsans text-orange-600 lgs:text-sm"
                                    style={{
                                        fontWeight:'800'
                                    }}>
                                        Jhon Dewik<span className="ml-2 text-primary"
                                        style={{
                                            fontWeight:'200'
                                        }}>
                                            Tue 03:15
                                        </span>
                                    </h2>
                                    <h2 className="flex font-dmsans ml-2 text-primary bg-orange-600 p-1 rounded-full"
                                    style={{
                                        fontWeight:'800',
                                        fontSize:'0.5rem'
                                    }}>
                                        Auto Expert
                                    </h2>
                                    </div>
                                    <p className="flex font-dmsans lgs:mt-1 text-primary text-sm"
                                    style={{
                                        fontWeight:'100'
                                    }}>
                                        A ticking noise at startup that fades after a few minutes is often due to low oil levels, cold engine parts, or worn valve lifters. It’s usually harmless if it stops quickly, but if it continues, it’s best to get it checked to avoid engine damage
                                    </p>
                                </div>

                            </div>

                            
                            <div className="flex lgs:w-auto lgs:scale-90 lgs:ml-2 scale-75 s  items-start justify-center">
                                
                                <div className="flex bg-primary overflow-hidden border-4 w-[4rem] h-[4rem] rounded-full" data-aos='zoom-in' data-aos-delay='550'>
                                    <Image src={chatPupil3} alt="" className="flex object-cover z-50 lgs:h-[4rem] sms:w-[4rem] lgs:w-[4rem]"/>
                                </div>

                                <div className="flex flex-col bg-gray-900 rounded-2xl ml-2 items-start p-5 justify-center lgs:w-[30rem] lgs:h-[8rem]" data-aos='fade-left' data-aos-delay='600'
                                style={{
                                    boxShadow:'0px 0px 20px 5px rgba(0,0,0, 0.4), inset 0px 0px 10px 2px rgba(255,255,255, 0.4)'
                                }}>
                                    <h2 className="flex font-dmsans text-orange-600 lgs:text-sm"
                                    style={{
                                        fontWeight:'800'
                                    }}>
                                        David Jhohanson<span className="ml-2 text-primary"
                                        style={{
                                            fontWeight:'200'
                                        }}>
                                            Wed 08:01
                                        </span>
                                    </h2>
                                    <p className="flex font-dmsans text-primary lgs:text-lg"
                                    style={{
                                        fontWeight:'100'
                                    }}>
                                        When I brake at high speeds, my car starts shaking. What could be the cause?
                                    </p>
                                </div>

                            </div>


                        </div>


                </div>


                {/*  Sections */}
                <div className="absolute z-30 flex sms:flex-col w-[20%] bg-gradient-to-r sms:h-[50rem] from-secondary via-transparent to-transparent sms:mt-12 h-[25rem] items-center justify-center overflow-hidden"/>


            </div>

             {/* DNA Section */}
            <div className="relative flex  justify-center items-center bg-transparent z-30">
                {/* Background Image */}

                <div className="relative flex flex-col h-auto w-full bg-transparent overflow-hidden z-40">

                        <div
                        className="absolute w-full h-auto items-center  mt-12 justify-center z-30"
                        style={{
                            transform: `translateY(${offsetY}px)`,
                            transition: "transform 0.1s ease-out",
                        }}
                    >
                        <Image src={image1} alt="background" className="object-cover h-[65rem] w-full" />
                        </div>

                        {/* Primary Section */}
                        <div className="relative flex h-[15rem] sms:h-[10rem] w-full z-40 justify-center items-center">
                            <div className="absolute flex items-center justify-center w-full h-[25rem] bg-gradient-to-b from-primary via-primary to-transparent">
                               <div className="flex w-auto h-auto mt-12">
                                  <h2 className="font-bricolagegrotesque text-primary bg-orange-600 p-4 lgs:text-8xl text-5xl text-center"
                                  style={{
                                    fontWeight:'200'
                                  }}>
                                    Turboss
                                  </h2>
                                  <h2 className="flex bg-primary p-4 flex-col items-center font-bricolagegrotesque text-orange-600 text-5xl lgs:p-2 lgs:text-8xl text-center" style={{
                                    fontWeight:'900',
                                    boxShadow:'0px 1px 20px 2px rgba(0,0,0,0.4)'
                                  }}>
                                    DNA<span className="hidden lgs:flex mds:flex text-xs font-dmsans text-secondary" style={{
                                        fontWeight:'200'
                                    }}>
                                        Turboss Garage Lesson 01
                                    </span>
                                  </h2>
                               </div>
                            </div>
                        </div>

                        {/* Swiper Container for a larger screen */}
                        <div className="hidden relative lgs:flex mds:flex w-full items-center justify-center bg-transparent z-30">
                            
                            <Swiper
                                effect="coverflow"
                                grabCursor={true}
                                centeredSlides={true}
                                loop={true}
                                slidesPerView="auto"
                                coverflowEffect={{
                                    rotate: 0,
                                    stretch: 0,
                                    depth: 100,
                                    modifier: 2.5,
                                }}
                                pagination={{ clickable: true }}
                                navigation={true}
                                modules={[EffectCoverflow, Navigation]}
                                className="flex h-[55rem]  items-center justify-center p-12"
                                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                            >
                                {dnaData.map((tool, index) => {
                                    let opacity = 0.8;

                                    if (index === activeIndex) {
                                        opacity = 1;
                                    } else if (index === activeIndex - 1 || index === activeIndex + 1) {
                                        opacity = 1;
                                    }

                                    return (
                                        <SwiperSlide className="group" key={index}>

                                            <div className="flex lgs:h-[30rem] bg-transparent  items-center justify-center">
                                                <Image
                                                    src={tool.image}
                                                    alt="tool_id"
                                                    width={450}
                                                    height={450}
                                                    className="object-cover animate-floating w-auto h-auto"
                                                    style={{
                                                        opacity
                                                    }}
                                                />
                                            </div>
                                            <div
                                                className="flex h-[30rem] items-center justify-center w-full transition-opacity duration-500"
                                                style={{ opacity }}
                                            >
                                                <button 
                                                onClick={() => router.push(`/detailpage/${tool.id}`)}
                                                className="absolute group flex h-[6rem] w-[15rem] mb-48  rounded-2xl cursor-pointer items-center text-primary justify-center z-50 bg-transparent overflow-hidden"
                                                style={{
                                                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1), inset 0px 5px 10px 2px rgba(255, 255, 255, 0.5)",
                                                    fontWeight:'200'
                                                }}>
                                                    <div className="absolute flex z-10 w-auto h-auto bg-transparent items-center justify-center">
                                                        <Image src={carbonFiber} alt="carbonFiber" className="object-cover w-[20rem] h-[6rem]"/>                                 
                                                    </div>   
                                                    <div className="absolute flex lgs:h-[6rem] lgs:w-[15rem] bg-gradient-to-t from-secondary to-transparent z-20 items-center justify-center"/>
                                                    <div className="absolute flex lgs:h-[6rem] lgs:w-[15rem] bg-gradient-to-r from-secondary to-transparent z-30 items-center justify-center"
                                                    style={{
                                                        boxShadow:'inset 0px 0px 10px 2px rgba(255,255,255,0.5)'
                                                    }}/>
                                                    <h2 className="font-dmsans lgs:text-lg mds:text-2xl group-hover:text-2xl transition-all duration-700 ease-in-out text-primary z-20">{tool?.name}</h2>
                                                    <h2 className="absolute font-dmsans lgs:text-5xl group-hover:text-8xl  transition-all duration-700 ease-in-out text-nowrap bottom-2 text-primary opacity-15 z-20">{tool?.name}</h2>
                                                </button>
                                                <button className="absolute h-[0.8rem] w-[15rem] font-dmsans lgs:mb-0 lgs:mt-12 rounded-full blur-lg items-center justify-center bg-secondary"/>
                                                <Image src={tool?.shadow}
                                                     width={450}
                                                    height={450} alt="turbo shadow" className="object-cover lgs:mt-60 animate-floatingRev  justify-center items-center" />
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                            
                        </div>

                        {/* Swiper Container for a smaller screen */}
                        <div className="hidden relative sms:flex w-full items-center justify-center bg-transparent z-30">
                            
                            <Swiper
                                effect="coverflow"
                                grabCursor={true}
                                centeredSlides={true}
                                loop={true}
                                slidesPerView="auto"
                                coverflowEffect={{
                                    rotate: 0,
                                    stretch: 0,
                                    depth: 100,
                                    modifier: 2.5,
                                }}
                                pagination={{ clickable: true }}
                                navigation={true}
                                modules={[EffectCoverflow, Navigation]}
                                className="flex h-[55rem]  items-center justify-center p-12"
                                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                            >
                                {dnaData.map((tool, index) => {
                                    let opacity = 0.8;

                                    if (index === activeIndex) {
                                        opacity = 1;
                                    } else if (index === activeIndex - 1 || index === activeIndex + 1) {
                                        opacity = 1;
                                    }

                                    return (
                                        <SwiperSlide className="group" key={index}>

                                            <div className="flex lgs:h-[30rem] bg-transparent  items-center justify-center">
                                                <Image
                                                    src={tool.image}
                                                    alt="tool_id"
                                                    width={450}
                                                    height={450}
                                                    className="object-cover animate-floating w-auto h-auto"
                                                    style={{
                                                        opacity
                                                    }}
                                                />
                                            </div>
                                            <div
                                                className="flex h-[30rem] items-center justify-center w-full transition-opacity duration-500"
                                                style={{ opacity }}
                                            >
                                                <button 
                                                onClick={() => router.push(`/detailpage/${tool.id}`)}
                                                className="absolute group flex h-[6rem] w-[15rem] mb-48 rounded-2xl cursor-pointer items-center text-primary justify-center z-50 bg-transparent overflow-hidden"
                                                style={{
                                                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1), inset 0px 5px 10px 2px rgba(255, 255, 255, 0.5)",
                                                    fontWeight:'200'
                                                }}>
                                                    <div className="absolute flex z-10 w-auto h-auto bg-transparent items-center justify-center"
>
                                                        <Image src={carbonFiber} alt="carbonFiber" className="object-cover lgs:w-[20rem] lgs:h-[6rem]"
                                                        />                                 
                                                    </div>   
                                                    <div className="absolute flex lgs:h-[6rem] lgs:w-[15rem] bg-gradient-to-t from-secondary to-transparent z-20 items-center justify-center"
                                                                                                        style={{
                                                                                                            boxShadow:'inset 0px 0px 20px 5px rgba(255,255,255,0.8)'
                                                                                                        }}/>
                                                    <div className="absolute flex lgs:h-[6rem] lgs:w-[15rem] bg-gradient-to-r from-secondary to-transparent z-30 items-center justify-center"
                                                    style={{
                                                        boxShadow:'inset 0px 0px 10px 2px rgba(255,255,255,0.5)'
                                                    }}/>
                                                    <h2 className="font-dmsans text-2xl group-hover:text-2xl transition-all duration-700 ease-in-out text-primary z-20">{tool?.name}</h2>
                                                    <h2 className="absolute font-dmsans text-5xl group-hover:text-8xl sms:blur-sm  transition-all duration-700 ease-in-out text-nowrap bottom-2 text-primary opacity-15 z-20">{tool?.name}</h2>
                                                </button>
                                                <button className="absolute h-[0.8rem] w-[15rem] font-dmsans lgs:mb-0 lgs:mt-12 rounded-full blur-lg items-center justify-center bg-secondary"/>
                                                <Image src={tool?.shadow}
                                                     width={450}
                                                    height={450} alt="turbo shadow" className="object-cover mt-32 animate-floatingRev  justify-center items-center" />
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                            
                        </div>


                </div>


            </div>

            {/* Secondary Section */}
            <div className="flex h-[25rem] sms:h-[35rem] overflow-hidden w-full bg-secondary z-30" >
                <div className="flex h-[25rem] sms:h-[35rem] lgs:w-[40vw] sms:w-[60vw] items-center justify-center"/>

                <div className="relative flex h-[25rem] sms:h-[35rem] lgs:w-[60vw] mds:w-full items-center justify-start overflow-hidden">
                        <Image src = {subHeroSec1} alt="fwef" className="object-cover animate-moving02 sms:h-[35rem]  h-[30rem] w-full z-30"/>
                        <div className="flex absolute bg-gradient-to-r h-[30rem] sms:h-[35rem] mds:w-full  w-[80vw]  from-secondary to-transparent z-30"/>
                        <div className="flex absolute bg-gradient-to-l h-[30rem] sms:h-[35rem] mds:w-full  w-[20vw] right-0  from-secondary to-transparent z-30"/>
                        <div className="flex absolute bg-gradient-to-r h-[30rem] sms:h-[35rem] w-[100vw] right-0  from-secondary to-transparent z-43"/>
                        <div className="hidden sms:flex absolute bg-gradient-to-r h-[30rem] sms:h-[35rem] w-[100vw] right-0  from-secondary to-transparent z-30"/>
                </div>
                
                <div className="absolute flex w-[30vw] lgs:h-[4rem] h-[3rem] sms:w-[60vw] rounded-br-2xl bg-orange-600  items-center justify-center z-40"
                style={{
                    boxShadow:'0px 0px 20px 5px rgba(0,0,0,0.4), inset 0px 0px 10px 2px rgba(0,0,0,0.8)'
                }}>

                    <h2 className="font-dmsans lgs:text-2xl text-primary text-center" style={{
                        fontWeight:'200'
                    }}>
                        #SpotToFindMoreAboutCars
                    </h2>
                </div>

                <div className="absolute overflow-hidden flex sms:flex-col w-full sms:h-auto sms:mt-12 h-[25rem] items-center justify-center z-40">
                    <div className="flex flex-col h-[25rem] w-[60vw] sms:w-[80vw] items-center justify-center">
                        <div className="flex flex-col w-auto h-auto lgs:mt-8 sms:items-center overflow-hidden">

                                <h2 className="flex lgs:text-lg mds:text-xl font-dmsans text-center items-start lgs:pt-2 text-primary" style={{
                                    fontWeight:'100'
                                }}
                                data-aos='fade-right' data-aos-delay='200'>
                                Want to know
                                </h2>

                                <span className="flex lgs:text-6xl font-dmsans text-5xl text-center items-center p-2 text-primary"
                                    style={{
                                        fontWeight:'100'
                                    }}
                                    data-aos='fade-right' data-aos-delay='250'>
                                    About Automobiles?
                                </span>
                        </div>

                            <p className="font-dmsans w-[40vw] sms:w-[60vw] sms:mt-6 sms:text-xl lgs:text-xl text-center lgs:mt-2 text-primary h-auto items-center"
                            style={{
                                fontWeight:'100'
                            }}
                            data-aos='zoom-in' data-aos-delay='300'>
                                    <span className="lgs:mr-2 lgs:text-2xl font-russoone lgs:p-1" style={{ fontWeight: '400' }}>
                                        {"\u0022"}
                                    </span>Explore <span className="mr-2 sms:ml-2 lgs:text-2xl text-primary lgs:p-1"
                              style={{
                                fontWeight:'300'
                              }}>
                              Baos Wheels 
                                 </span>for expert car reviews, in-depth articles, and the latest auto industry updates. Stay informed with insights, tips, and engaging videos.
                                 <span className="lgs:mr-2 lgs:text-2xl font-russoone lgs:p-1" style={{ fontWeight: '400' }}>
                                        {"\u0022"}
                                    </span></p>
                                    <Link href="https://www.baoswheels.com" className="flex bg-orange-600 mt-8 lgs:mt-4 sms:mt-4 items-center justify-center w-[20vw] sms:w-[60vw] h-[3rem] rounded-lg text-primary font-dmsans text-lg"
                                    data-aos='fade-up' data-aos-delay='400'>
                                        Visit Now
                                    </Link>
                    </div>
                        <div className="flex lgs:h-[30rem] w-[40vw] sms:w-[60vw]  items-center justify-center overflow-hidden">
                        <video
                                src='/baoswheels.webm'
                                autoPlay
                                muted
                                loop
                                width={1000}
                                height={1000}
                                className="lgs:scale-100"
                                playsInline // Ensures playback restarts if it ever stops
                            />
                        
                        </div>

                </div>

            </div>

            {/* Lab Section */}
            <div className='relative flex flex-col h-[55rem] mds:h-[45rem] sms:h-[150vh] items-center justify-start w-full z-30 overflow-hidden'>

                <div className="absolute bg-gradient-to-b h-[15rem] w-full from-primary via-primary to-transparent top-0 z-20"/>
                <Image 
                    src={herobackground4} 
                    alt='turbo' 
                    className='object-cover w-full h-full' 
                    layout='fill' 
                    style={{
                        transform: `translateY(${parallex1}px)`,
                        transition: "transform 0.2s ease-out",
                    }}
                />
                <div className="aboslute flex flex-col items-center justify-center mt-12  w-full h-auto z-30">

                       <div className="flex w-auto h-auto lgs:mt-12">
                                  <h2 className="font-bricolagegrotesque text-primary bg-orange-600 p-4 sms:p-2 lgs:text-8xl text-5xl text-center"
                                  style={{
                                    fontWeight:'200'
                                  }}>
                                    Turboss
                                  </h2>
                                  <h2 className="flex bg-primary p-2 flex-col font-bricolagegrotesque text-orange-600 text-5xl lgs:text-8xl text-center" style={{
                                    fontWeight:'900',
                                    boxShadow:'0px 1px 20px 2px rgba(0,0,0,0.4)'
                                  }}>
                                    Lab<span className="hidden lgs:flex mds:flex text-xs font-dmsans text-secondary" style={{
                                        fontWeight:'200'
                                    }}>
                                        Turboss Garage Lesson 02
                                    </span>
                                  </h2>
                        </div>

                </div>

                        <div className="aboslute flex flex-col items-center justify-center mds:mt-6  w-full h-auto z-40">

                            <div className="flex sms:flex-col sms:items-center w-auto h-auto lgs:space-x-8 mds:space-x-4 sms:space-y-8">
                            {labData.slice(0,3).map((tool, index) => (

                                <div 
                                onClick={() => router.push(`/labsection/${tool.id}`)}
                                key={tool.id} className={`group relative w-auto   ${hover === index ? "scale-110" : hover !== null ? "scale-95" : "scale-100"}  transition-all duration-700 ease-in-out h-auto cursor-pointer`
                            }  
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(null)}
                                >

                                    <div  className={`relative group flex-col lgs:w-[20rem] drop-shadow-2xl sms:w-[22rem] mds:w-[15rem] bg-transparent cursor-pointer mds:h-[20rem] items-center justify-start rounded-lg lgs:h-[25rem]`}
                                      
                                    style={{
                                        
                                }}

                                >
                                        <div className='relative flex flex-col  lgs:w-[20rem] lgs:h-[25rem]  mds:w-[15rem] mds:h-[20rem] sms:w-[22rem] bg-transparent justify-center rounded-t-md  items-center '>
                                        <div className='flex lgs:w-[20rem] sms:w-[22rem] sms:h-[20rem] mds:w-[15rem] mds:h-[20rem] lgs:h-[25rem]  z-50'> 
                                            <Image src={tool.image} alt='' width={500} height={500} className='object-cover mds:w-[40rem] rounded-xl lgs:scale-150 mds:h-[20rem]'
                                            style={{
                                                transform: `translateY(${parallex1 * 0.8}px)`,
                                                transition: "transform 0.4s ease-out",
                                            }}/>
                                        </div>
                                        </div>


                                </div>

                                <div className="absolute flex flex-col bg-gradient-to-t from-secondary rounded-xl lgs:items-end justify-center items-center to-transparent z-40 w-full h-[25rem] sms:h-[20rem] mds:h-[20rem] bottom-0"
                                                                    style={{
                                                                        boxShadow:' inset 0px 5px 10px 8px rgba(255,255,255,0.4)',
                                                                        transform: `translateY(${parallex1 * 0.8}px)`,
                                                                        transition: "transform 0.4s ease-out",
                                                                        
                                                                    }}>

                                            <div className="flex lgs:w-[20rem] lgs:h-[25rem] sms:h-[20rem] mds:w-[15rem] mds:h-[20rem] sms:w-full items-start justify-start p-5">
                                                
                                                <div className="flex w-auto h-auto">

                                                <h2 className="flex font-bricolagegrotesque text-primary text-sm sms:text-md bg-orange-600 p-2">
                                                Garage Section
                                                </h2>
                                                <span className="font-bricolagegrotesque text-orange-600 text-sm sms:text-2xl bg-primary p-2">
                                                    {tool.subName}
                                                </span>

                                                </div>

                                                
                                            </div> 
                                            
                                            <div className="flex sms:absolute w-[20rem] lgs:h-[25rem] mds:h-[20rem] mds:w-[15rem] items-end justify-center ">

                                                    <h2 className="absolute font-dmsans text-primary group-hover:scale-125 sms:text-2xl  transition-all duration-700 ease-in-out lgs:text-xl lgs:p-2 lgs:mb-12"
                                                    style={{
                                                        fontWeight:'200'
                                                    }}>
                                                        {tool.name}
                                                    </h2> 

                                                    <div className="relative flex z-20 items-center opacity-10 justify-center overflow-hidden">

                                                    <h2 className="flex lgs:w-auto text-center text-nowrap group-hover:scale-125  transition-all duration-700 ease-in-out   font-dmsans text-primary text-6xl lgs:p-2 lgs:mb-4"
                                                    style={{
                                                        fontWeight:'200'
                                                    }}>
                                                        {tool.name}
                                                    </h2> 

                                                    </div>
                                                
                                            </div> 


                                    
                                
                                </div>



                                

                                </div>   


                                ))}    
                            </div>

                            <div className="flex w-auto h-auto lgs:space-x-8 mds:space-x-4">
                            {labData.slice(0,3).map((tool, index) => (
                                <div key={tool.id} className={`group relative ${hover === index ? "scale-110" : hover !== null ? "scale-95" : "scale-100"}  mt-32 w-auto transition-all duration-700 ease-in-out  h-auto cursor-pointer`}
                                  onMouseEnter={() => setHover(index)}
                                    onMouseLeave={() => setHover(null)}
                                >



                                <div className="flex flex-col bg-gradient-to-b from-secondary rounded-xl blur-lg items-end justify-center to-transparent z-40 w-full h-[4rem] bottom-0"
                                                                    style={{
                                                                        transform: `translateY(${parallex1 * 0.8}px)`,
                                                                        transition: "transform 0.4s ease-out",
                                                                        boxShadow:'0px 1px 20px 5px rgba(0,0,0,0.4) , inset 0px 5px 10px 5px rgba(0,0,0,0.4)'
                                                                    }}>

                                            <div className="flex w-[20rem] h-[5rem] items-start justify-start lgs:p-5"/>
                                            



                                    
                                
                                </div>



                                

                                </div>   


                                ))}    
                            </div>



                            </div>

            </div>
         
            {/* Sub Secondary Section */}
            <div className="hidden relative  lgs:flex w-auto h-auto overflow-hidden z-30">

            <div className="absolute flex w-[25vw] lgs:h-[4rem] h-[3rem] sms:w-[50vw] rounded-bl-2xl bg-orange-600 right-0  items-center justify-center z-50"
                        style={{
                            boxShadow:'0px 0px 20px 5px rgba(0,0,0,0.4), inset 0px 0px 10px 2px rgba(0,0,0,0.8)'
                        }}>

                            <h2 className="font-dmsans lgs:text-2xl text-primary text-center" style={{
                                fontWeight:'200'
                            }}>
                                #SlideIntoAutoWise
                            </h2>
                     </div>
                
            <div
                className="w-[100vw] h-auto flex transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                        {
                DYN.map((tool)=>(
                    <div key={tool.id} className="relative w-auto h-auto flex-shrink-1">
                    <div className="flex  h-[25rem] w-[100vw] bg-secondary" >

                        <div className="relative flex lgs:h-[25rem]  lgs:w-[60vw] mds:w-[100vw] items-center justify-start overflow-hidden">
                                <Image key={currentIndex} src = {tool.image} alt="fwef" className="object-cover animate-moving01  lgs:h-[25rem]  lgs:w-[60vw] z-30"/>
                                <div className="flex absolute bg-gradient-to-r h-[25rem]  w-[40vw]  from-secondary to-transparent z-40"/>
                                <div className="flex absolute bg-gradient-to-l h-[25rem]  w-[30vw] mds:w-[70vw] right-0  from-secondary via-secondary to-transparent z-40"/>
                                <div className="flex absolute bg-gradient-to-t h-[5rem] w-[60vw] bottom-0  from-secondary to-transparent z-40"/>
                                <div className="flex absolute bg-gradient-to-b h-[10rem] w-[80vw] top-0 from-secondary to-transparent z-40"/>
                                
                                

                        
                        </div>



       
                        <div className="absolute flex lgs:w-[100vw] lgs:h-[25rem]  items-center justify-center z-50">
                        
                       
                            <div key={currentIndex} className="flex flex-col lgs:h-[25rem] mds:h-[40rem]    lgs:w-[100vw] items-center justify-center">
                                <div
                                  className="flex sms:flex-col w-auto h-auto  p-5 animate-moving04">
        
                                        <h2 className="flex lgs:text-md font-dmsans text-shadow-xl text-center items-start lgs:pt-5 text-primary" style={{
                                            fontWeight:'100'
                                        }}>
                                        Do You Know About
                                        </h2>
        
                                        <span className="flex lgs:text-5xl font-dmsans text-center items-center p-2 text-primary"
                                            style={{
                                                fontWeight:'100'
                                            }}>
                                            {tool.name}
                                        </span>
                                </div>
        
                                    <p className="font-dmsans w-[40vw] text-xl text-center animate-moving03 border-2 border-gray-400 lgs:p-5 lgs:mt-8 text-primary h-auto items-center"
                                    style={{
                                        fontWeight:'100'
                                    }}>
                                       {tool.statement}
                                           </p>
                            </div>
                            

        
                        </div>

                        <div className="absolute flex lgs:w-[100vw] lgs:h-[25rem]  items-center justify-center z-50">
                        
                       
                        <div key={currentIndex} className="flex flex-col lgs:h-[25rem]    lgs:w-[100vw] items-center justify-center">
                            <div
                              className="flex w-auto h-auto  lgs:p-5 animate-moving04">
    
                                    <h2 className="flex lgs:text-md font-dmsans text-shadow-xl text-center items-start lgs:pt-5 text-primary" style={{
                                        fontWeight:'100'
                                    }}>
                                    Do You Know About
                                    </h2>
    
                                    <span className="flex lgs:text-5xl font-dmsans text-center items-center p-2 text-primary"
                                        style={{
                                            fontWeight:'100'
                                        }}>
                                        {tool.name}
                                    </span>
                            </div>
    
                                <p className="font-dmsans lgs:w-[40vw] text-xl text-center animate-moving03 border-2 border-gray-400 lgs:p-5 lgs:mt-8 text-primary h-auto items-center"
                                style={{
                                    fontWeight:'100'
                                }}>
                                   {tool.statement}
                                       </p>
                        </div>
                        

    
                       </div>


                       


                        
        
                    </div>
                    </div>
                ))
            }

            </div>
            
            </div>

              {/* Axila Section */}
           <div className="hidden relative lgs:flex mds:flex h-[20rem] sms:h-auto w-full bg-secondary z-30" >
                

           <div className="relative flex flex-col h-[20rem] lgs:w-[60vw] mds:w-full bg-transparent items-center justify-center overflow-hidden">

            <h2 className="flex font-poppins  text-center text-5xl text-primary z-30" data-aos='zoom-in' data-aos-delay='250' style={{
                fontWeight:'100'
            }}>
                Your AI Mechanic is on the Way
            </h2>


            <h2 className="flex font-poppins  text-center lgs:mt-2 text-2xl text-orange-600 z-30" data-aos='zoom-in' data-aos-delay='300' style={{
                fontWeight:'100'
            }}>
                Axila will be in the garage soon
            </h2>

            <div className="absolute flex lgs:h-[2rem] lgs:w-[30vw] mds:h-[5rem] mds:w-full animate-coloring blur-3xl items-center justify-center z-20"/>

            <div className="absolute flex flex-col blur-sm lgs:h-[20rem] lgs:p-5 lgs:w-full items-center justify-start z-40">
                
                        <h2 className="flex font-poppins animate-moving05 text-nowrap opacity-10 lgs:mt-8 text-center lgs:text-8xl text-primary"
                        style={{
                            fontWeight:'100'
                        }}>
                        Your AI Mechanic is on the Way
                        </h2>

                        <h2 className="flex font-poppins animate-moving06 text-nowrap opacity-10 lgs:mt-6 text-center lgs:text-8xl text-primary"
                        style={{
                            fontWeight:'100'
                        }}>
                        Axila will be in the garage soon
                        </h2>

            </div>    

            <div className="absolute flex flex-col  lgs:h-[20rem] lgs:w-full items-center justify-start z-40">
                
                    <div className="absolute left-0 bg-gradient-to-r lgs:h-[20rem] from-secondary to-transparent lgs:w-[15vw]"/>

                    <div className="absolute right-0 bg-gradient-to-l lgs:h-[20rem] from-secondary to-transparent lgs:w-[15vw]"/>

            </div>    


            </div>
                

                <div className="flex relative lgs:h-[20rem] lgs:w-[40vw] items-center justify-center overflow-hidden">

                    <div className="absolute  lgs:h-[20rem] items-center justify-center z-40">

                       <Axila/>
            
            

                    </div>
                    <div className="absolute flex lgs:h-[20rem] items-center justify-center z-30">

                        <h2 className="flex font-kanit text-primary text-5xl text-center" style={{
                            fontWeight:'100'
                        }}>
                            Axila
                        </h2>



                    </div>

                    <div className="absolute flex lgs:h-[10rem] w-full bg-gradient-to-t from-secondary  bottom-0 to-transparent items-center justify-center z-40"/>


                    <div className="absolute flex lgs:h-[10rem] w-full bg-gradient-to-b from-secondary  top-0 to-transparent items-center justify-center z-40"/>





                </div>





            </div>
          
            {/* Tools Section */}
            <div className='relative flex flex-col lgs:h-auto w-full overflow-hidden z-30 '>
                <div className="absolute bg-gradient-to-b h-[20rem] w-full from-primary via-primary to-transparent top-0 z-20"/>
                <Image 
                    src={herobackground5} 
                    alt='turbo' 
                    className='object-cover w-full h-full blur-md bg-gradient-to-t from-secondary to-transparent' 
                    layout='fill' 
                    style={{
                        transform: `translateY(${parallex1}px)`,
                        transition: "transform 0.2s ease-out",
                    }}
                />
                <div className="aboslute flex flex-col items-center justify-start lgs:mt-12  w-full h-auto z-30">

                <div className="flex w-auto h-auto mt-12">
                                  <h2 className="font-bricolagegrotesque text-primary text-5xl bg-orange-600 p-4 lgs:text-8xl text-center"
                                  style={{
                                    fontWeight:'200'
                                  }}>
                                    Turboss
                                  </h2>
                                  <h2 className="flex bg-primary p-4 flex-col font-bricolagegrotesque text-5xl items-center justify-center text-orange-600 lgs:p-2 lgs:text-8xl text-center" style={{
                                    fontWeight:'900',
                                    boxShadow:'0px 1px 20px 2px rgba(0,0,0,0.4)'
                                  }}>
                                    Tools<span className="hidden lgs:flex mds:flex text-xs font-dmsans text-secondary" style={{
                                        fontWeight:'200'
                                    }}>
                                        Turboss Garage Lesson 03
                                    </span>
                                  </h2>
                </div>

                </div>

                <div className={`aboslute flex flex-col items-center justify-center lgs:mt-24 sms:mb-12  w-full h-auto z-40`}>

                       
                       
                        {/* Large View medium screens*/}
                        <div className='hidden lgs:flex  w-auto h-auto items-center justify-center'>

                            <div className="flex flex-col w-auto h-auto items-center justify-center">
                            {toolsData.slice(0, 5).map((tool, index) => (
                                <div key={index} className={`relative w-[35rem]  h-[50rem] items-start justify-start bg-transparent z-30 lgs:p-2 `} data-aos="fade-left">

                                       <div className="absolute flex w-auto h-auto">
                                        </div>
                                        {index === 0 || index === 2 || index === 4 || index === 6 || index === 8 || index === 10 ? (
                                        <div className="flex flex-col items-end w-auto h-auto">
                                        <h2
                                    className={`flex font-dmsans lgs:mt-4 text-xl items-center  justify-center  rounded-full rounded-tr-none bg-orange-600 text-primary lgs:p-4`}
                                    style={{ fontWeight: "500",
                                             boxShadow: "inset  2px 10px 10px rgba(255,255,255 ,0.5) 0px 0px 20px 5px rgba(0,0,0,0.4)" 
                                    }}
                                    >
                                    {tool.name}
                                    </h2>



                                     {/* Add a description 1 */}
                                        <div
                                    className={`flex flex-col bg-primary-400 lgs:mt-4 lgs:w-[30rem] h-[10rem]  rounded-tr-none items-start bg-secondary rounded-3xl justify-start lgs:p-5`}
                                    style={{
                                        boxShadow: "inset  2px 10px 10px rgba(255,255,255,0.2)",
                                    }}
                                    >
                                    
                                    <p
                                        className={`flex font-dmsans text-primary lgs:mt-4 text-md`}
                                        style={{ fontWeight: "200" }}
                                    >
                                        {tool.description}
                                    </p>
                                       </div>


                                     {/* Add a Joint */}
                                     <div className="flex lgs:w-[30rem] h-auto items-center justify-center">
                                     <div className="flex bg-gradient-to-b from-transparent to-primary lgs:w-[0.2rem] lgs:h-[2rem]"/>
                                     </div>

                                     {/* Add a description */}
                                    <div
                                    className={`flex flex-col bg-primary-400 lgs:w-[30rem] h-[10rem] rounded-3xl  items-start bg-secondary justify-start lgs:p-5`}
                                    style={{
                                        boxShadow: "inset  2px 10px 10px rgba(255,255,255,0.2)",
                                    }}
                                    >
                                    
                                    <p
                                        className={`flex font-dmsans text-primary lgs:mt-4 text-md`}
                                        style={{ fontWeight: "200" }}
                                    >
                                        {tool.description}
                                    </p>
                                    </div>
                                        </div>    
                                ) : index === 1 || index === 3 || index === 5 || index === 7 || index === 9  ? (
                                        <div className="grid grid-cols-2 place-content-center border-2 rounded-3xl  gap-6 lgs:p-6 items-center w-auto h-auto"
                                        style={{
                                            boxShadow:'inset 0px 5px 10px 5px rgba(255,255,255,0.5)'
                                        }}>
                                            {tool.images.map((item, index) => (
                                                <div key={index}  className="flex flex-col w-auto items-center justify-center h-auto">
                                                    <div className=" flex items-end w-auto h-auto">
                                                            <Image src={item.url} alt='tool' width={100} height={100} className='object-cover rounded-full border-2 border-primary  lgs:w-[8rem] lgs:h-[8rem] mds:w-[4rem] mds:h-[4rem] sms:w-[3rem] sms:h-[3rem]'
                                                            style={{
                                                                 boxShadow: '0px 5px 10px 5px rgba(0,0,0,0.4)'
                                                            }}/>
                                                    </div>
                                                    <div className="flex lgs:w-[0.2rem] bg-gradient-to-b from-transparent to-primary lgs:h-[2rem]"/>
                                                    <div className="flex bg-orange-600 lgs:w-[10rem] lgs:h-[3rem] items-center rounded-3xl justify-center"
                                                    style={{
                                                        boxShadow:'1px 5px 10px 5px rgba(0,0,0, 0.4) , inset 0px 5px 5px 2px rgba(255,255,255, 0.5)'
                                                    }}>
                                                            <h2 className="flex font-dmsans text-primary text-center text-xs lgs:p-2">
                                                            {item.equipment}
                                                            </h2>
                                                    </div>   
                                                </div> 
                                            ))}

                                        </div> 
                                ) : null}
                                </div>
                            ))}
                            </div>

                            <div className='flex flex-col w-auto h-auto items-center justify-center'>
                            {toolsData.slice(0,5).map((tool, index)=> (     

                            <div key={index} className='relative flex bg-transparent w-auto lgs:h-[50rem] items-center justify-center'>

                            <div className='relative flex  w-[10rem] lgs:h-[50rem] top-0 bg-transparent items-start justify-center z-30  overflow-hidden'>
                                <div className='absolute flex bg-primary rounded-full w-[6rem] h-[6rem] items-center justify-center z-30' data-aos='zoom-in' data-aos-delay='100' style={{
                                boxShadow:'inset 0px 5px 5px rgba(0,0,0,0.5)'
                                }}>
                                <Image src={toolbackgroundimage} width={'1200'} height={'1200'} alt='tree' className='absolute z-30 rounded-full border-4 border-orange-500 object-cover lgs:w-[5.3rem] lgs:h-[5.3rem]'
                                       style={{
                                        boxShadow: 'inset 10px 5px 5px rgba(255,255,255,0.9)'
                                       }} />


                                    <Image src={flywheel2} width={'1200'} height={'1200'} alt='tree' className='absolute z-40 rounded-full animate-spin  object-cover lgs:w-[5rem] lgs:h-[5rem]'
                                       style={{
                                        animationDuration:'10s'
                                       }} />    

                                <Image src={toolbackgroundimage10} width={'1200'} height={'1200'} alt='tree' className='absolute z-40 rounded-full border-4 border-orange-500 object-cover lgs:w-[5.3rem] lgs:h-[5.3rem]'
                                       style={{
                                        boxShadow: 'inset 10px 5px 5px rgba(255,255,255,0.9)'
                                       }} />       
                                       
                                </div>
                                <div className='absolute flex rounded-full w-[5rem] h-[5rem] items-center justify-center z-20'/>
                                { index !== 4 && (
                                <div className={`absolute flex bg-primary animate-water-dropping rounded-b-full  w-[0.2rem] h-[200vh] items-center justify-center z-20`} style={{

                                }}/>
                                )}
                                

                            </div>


                            </div>

                            ))}  
                            </div>   

                            <div className="flex flex-col w-auto h-auto items-center justify-center">
                            {toolsData.slice(0, 5).map((tool, index) => (
                                <div key={index} className={`relative lgs:w-[35rem]  lgs:h-[50rem] items-start justify-start bg-transparent z-30 lgs:p-2 `} data-aos="fade-right">

                                       <div className="absolute flex w-auto h-auto">
                                        </div>
                                        { index === 1 || index === 3 || index === 5 || index === 7 || index === 9 ? (
                                        <div className="flex flex-col items-start w-auto h-auto">
                                        <h2
                                    className={`flex font-dmsans lgs:mt-4 text-xl items-center  justify-center rounded-full rounded-tl-none bg-orange-600 text-primary lgs:p-4`}
                                    style={{ fontWeight: "500",
                                             boxShadow: "inset  2px 10px 10px rgba(255,255,255 ,0.5)" ,
                                     }}
                                    >
                                    {tool.name}
                                    </h2>

                                     {/* Add a description 1 */}
                                     <div
                                    className={`flex flex-col bg-primary-400 lgs:mt-4 lgs:w-[30rem] h-[10rem]  rounded-tr-none items-start bg-secondary rounded-3xl justify-start lgs:p-5`}
                                    style={{
                                        boxShadow: "inset  2px 10px 10px rgba(255,255,255,0.2)",
                                    }}
                                    >
                                    
                                    <p
                                        className={`flex font-dmsans text-primary lgs:mt-4 text-md`}
                                        style={{ fontWeight: "200" }}
                                    >
                                        {tool.description}
                                    </p>
                                       </div>


                                     {/* Add a Joint */}
                                     <div className="flex lgs:w-[30rem] h-auto items-center justify-center">
                                     <div className="flex bg-gradient-to-b from-transparent to-primary rounded-t-full lgs:w-[0.2rem] lgs:h-[2rem]"/>
                                     </div>

                                     {/* Add a description */}
                                    <div
                                    className={`flex flex-col bg-primary-400 lgs:w-[30rem] h-[10rem] rounded-3xl  items-start bg-secondary justify-start lgs:p-5`}
                                    style={{
                                        boxShadow: "inset  2px 10px 10px rgba(255,255,255,0.2)",
                                    }}
                                    >
                                    
                                    <p
                                        className={`flex font-dmsans text-primary lgs:mt-4 text-md`}
                                        style={{ fontWeight: "200" }}
                                    >
                                        {tool.description}
                                    </p>
                                    </div>
                                        </div>    
                                ) : index === 0 || index === 2 || index === 4 || index === 6 || index === 8  ? (
                                    <div className="grid grid-cols-2 place-content-center border-2 rounded-3xl  gap-6 lgs:p-4 items-center w-auto h-auto"
                                    style={{
                                        boxShadow:'inset 0px 5px 10px 5px rgba(255,255,255,0.5) 0px 0px 20px 5px rgba(0,0,0,0.4)'
                                    }}>
                                      {tool.images.map((item, index) => (
                                        <div key={index}  className="flex flex-col w-auto items-center justify-center h-auto">
                                            <div className=" flex items-end w-auto h-auto">
                                                    <Image src={item.url} alt='tool' width={100} height={100} className='object-cover rounded-full border-2  lgs:w-[8rem] lgs:h-[8rem] mds:w-[4rem] mds:h-[4rem] sms:w-[3rem] sms:h-[3rem]'
                                                    style={{
                                                        boxShadow: '0px 5px 10px 5px rgba(0,0,0,0.4)'
                                                    }}/>
                                            </div>
                                            <div className="flex lgs:w-[0.2rem] bg-gradient-to-b from-transparent to-primary lgs:h-[2rem]"/>
                                            <div className="flex bg-orange-600 lgs:w-[10rem] lgs:h-[3rem] items-center rounded-3xl justify-center"
                                            style={{
                                                boxShadow:'1px 5px 10px 5px rgba(0,0,0, 0.4) , inset 0px 5px 5px 2px rgba(255,255,255, 0.5)'
                                            }}>
                                                    <h2 className="flex font-dmsans text-primary text-center text-xs lgs:p-2">
                                                    {item.equipment}
                                                    </h2>
                                            </div>   
                                         </div> 
                                      ))}

                                    </div> 
                            )  : null}
                                </div>
                            ))}
                            </div> 

                        </div>

                         {/* mobile View medium screens*/}
                        <div className='hidden sms:flex mds:flex w-auto h-auto sms:mt-12 items-center justify-center'>
                            {/* First One */}
                                <div className='flex flex-col w-auto h-auto items-center justify-center'>
                                {toolsData.slice(0,5).map((tool, index)=> (     

                                <div key={index} className='relative flex bg-transparent w-full h-[50rem] items-start justify-center'>
                                <div className='relative flex  w-[20vw] h-[50rem] top-0 bg-transparent items-start justify-center z-20  overflow-hidden'>
                                <div className='absolute flex bg-primary rounded-full w-[5rem] h-[5rem] items-center justify-center z-30' data-aos='zoom-in' data-aos-delay='100' style={{
                                boxShadow:'inset 0px 5px 5px rgba(0,0,0,0.5)'
                                }}>
                                <Image src={toolbackgroundimage} width={'1200'} height={'1200'} alt='tree' className='absolute z-30 rounded-full border-4 border-orange-500 object-cover lgs:w-[5.3rem] lgs:h-[5.3rem]'
                                       style={{
                                        boxShadow: 'inset 10px 5px 5px rgba(255,255,255,0.9)'
                                       }} />


                                    <Image src={flywheel2} width={'1200'} height={'1200'} alt='tree' className='absolute z-40 rounded-full animate-spin  object-cover lgs:w-[5rem] lgs:h-[5rem]'
                                       style={{
                                        animationDuration:'10s'
                                       }} />    

                                <Image src={toolbackgroundimage10} width={'1200'} height={'1200'} alt='tree' className='absolute z-40 rounded-full border-4 border-orange-500 object-cover lgs:w-[5.3rem] lgs:h-[5.3rem]'
                                       style={{
                                        boxShadow: 'inset 10px 5px 5px rgba(255,255,255,0.9)'
                                       }} />       
                                       
                                </div>
                                    { index !== 4 && (
                                    <div className={`absolute  w-[0.2rem] bg-primary h-[200vh] animate-water-dropping items-center  justify-center z-20`} data-aos='fade-down' style={{

                                    }}/>
                                    )}
                                    

                                </div>
                                <div className='flex flex-col w-[80vw] h-auto items-start justify-start top-0 bg-transparent z-30 mds:p-5 p-2' data-aos='fade-right'>
                                    <div className={`flex flex-col w-full h-[22rem] border-2  items-start rounded-3xl justify-start p-5`}
                                    style={{
                                    boxShadow:'0px 2px 10px 10px rgba(0,0,0,0.2)'
                                    }}>
                                    <h2 className={`flex bg-orange-600 p-4 rounded-lg text-center text-shadow-xl  font-dmsans text-primary  text-2xl `}
                                    style={{
                                        fontWeight:'300'
                                    }}>
                                        {tool.name}
                                    </h2>
                                    <p
                                        className={`flex bg-secondary text-center p-4 rounded-xl font-dmsans text-primary mt-4 text-md `}
                                        style={{ fontWeight: "200" }}
                                    >
                                        {tool.description}
                                    </p>

                                                                        <p
                                        className={`hidden lgs:flex mds:flex bg-secondary text-center p-4 rounded-xl font-dmsans text-primary mt-4 text-md `}
                                        style={{ fontWeight: "200" }}
                                    >
                                        {tool.description}
                                    </p>
                                    
                                    </div>

                                    <div className={`flex flex-col w-full mt-4 h-[25rem]   items-start rounded-3xl justify-start p-5`}>
                                    <div className="grid grid-cols-2 place-content-center place-items-center rounded-3xl  gap-6  items-center w-auto h-[25rem]">
                                      {tool.images.map((item, index) => (
                                        <div key={index}  className="flex flex-col w-auto items-center justify-center h-auto">
                                            <div className=" flex items-end w-auto h-auto">
                                                    <Image src={item.url} alt='tool' width={100} height={100} className='object-cover rounded-full border-2  w-[7rem] h-[7rem]'
                                                    style={{
                                                        boxShadow: '0px 5px 10px 5px rgba(0,0,0,0.4)'
                                                    }}/>
                                            </div>
                                            <div className="flex lgs:w-[0.2rem] bg-gradient-to-b from-transparent to-primary lgs:h-[2rem]"/>

                                         </div> 
                                      ))}

                                    </div> 
                                    
                                    </div>
                                </div>

                                </div>

                                ))}  
                                </div>   


                        </div>

                        
 


                </div>

            </div>


                                        
            
        </div>
        
    );
};

export default Home;

