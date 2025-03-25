"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";


// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../homepage/base.css";
import Axila from '../compo/pixelcard/page';




// Images
import image1 from "../assests/background.png";
import subHeroSec1 from '../assests/subherosec1.png';
import herobackground3 from '../assests/herosec3.png';
import herobackground4 from '../assests/herosec4.png';
import herobackground5 from '../assests/herosec5.jpg';
import tuning from "../assests/engineTuning.png";
import wheelAlignments from "../assests/WheelAlignments.png";
import TransissonAlignments from "../assests/TransissonAlignments.png";
import mainBackground from "../assests/mainBackground.jpg";
import turbossLogo from "../assests/turbossLogo.png";
import carbonFiber from "../assests/carbonFiber.jpg";



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
import SplitText from  './headingText/page';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeDown, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";





const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };


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
    const [activeIndex, setActiveIndex] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [parallex1 , setParallex1] = useState(0);
    const [currentIndex , setCurrentIndex] = useState(0);
    const [hover, setHover] = useState<number | null>(null);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const sectionAudioRefs = useRef<(HTMLAudioElement | null)[]>([]);

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
        subname: string;
        subTopic: string

    }

    const [dnaData, setDnaData] = useState<Tools[]>([]);
    const [labData, setLabData] = useState<LabData[]>([]);

    //navigation

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
    })

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = sectionRefs.current.indexOf(entry.target as HTMLDivElement);
                    if (entry.isIntersecting) {
                        if (audioRef.current) {
                            fadeVolume(audioRef.current, 0.2, 1000); // Fade out to 0.2 volume over 1 second
                        }
                        if (sectionAudioRefs.current[index]) {
                            sectionAudioRefs.current[index]!.play().catch(error => {
                                console.error('Error playing section audio:', error);
                            });
                        }
                    } else {
                        if (sectionAudioRefs.current[index]) {
                            sectionAudioRefs.current[index]!.pause();
                        }
                        if (audioRef.current) {
                            fadeVolume(audioRef.current, 1, 1000); // Fade in to 1 volume over 1 second
                        }
                    }
                });
            },
            { threshold: 0.5 }
        );

        sectionRefs.current.forEach((section) => {
            if (section) {
                observer.observe(section);
            }
        });

        return () => {
            sectionRefs.current.forEach((section) => {
                if (section) {
                    observer.unobserve(section);
                }
            });
        };
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


        <div className="relative h-auto w-full">

            {/* First Section */}           
            <div className='relative lgs:h-[200vh] w-full  overflow-hidden'>

                <Image src={mainBackground} alt='turbo' className='object-cover w-full h-full z-20' layout='fill' />

                <div className="relative bg-transparent z-30 lgs:h-[200vh] w-full">
                    <div className="absolute lgs:w-1/2 h-[200vh] bg-gradient-to-r left-0 from-secondary to-transparent"/>
                    <div className="absolute lgs:w-full h-[200vh] bg-gradient-to-l right-0 from-secondary to-transparent"/>
                    <div className="absolute lgs:w-full h-full bg-gradient-to-b top-0 from-secondary to-transparent"/>
                    <div className="absolute lgs:w-full h-1/2 bg-gradient-to-t bottom-0 from-secondary to-transparent"/>

                    
                    <div className="relative flex bg-transparent items-center justify-center z-50 lgs:h-[200vh] w-full">

                        {/* Turboss Main Topic */}
                        <div className="absolute flex flex-col items-start justify-center top-0 lgs:h-auto w-full">

                            <div className="flex flex-col w-full h-auto justify-center items-center">

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



                            </div>
                          
                         </div>   

                        {/* Sub Paragrapgh Main Topic */}
                        <div className="absolute flex flex-col items-center justify-center lgs:bottom-0 lgs:h-[60vh] w-full">

                            <div className="flex flex-col w-auto h-auto justify-center items-center">

                            <h2 className="font-dmsans text-primary text-shadow-xl lg:text-2xl text-nowrap text-center" style={{ 
                                  fontWeight: '100',
                                  }}>  
                            Scroll down to step into the garage and ignite the experience
                            </h2> 



                            </div>
                            <div className="absolute  flex-col w-auto h-auto justify-center opacity-15 blur-sm items-center">

                            <h2 className="font-dmsans text-primary text-shadow-xl animate-textScaling01 lg:text-3xl mt-4 text-nowrap text-center" style={{ 
                                fontWeight: '100',
                                }}>  
                            Scroll down to step into the garage and ignite the experience
                            </h2> 



                            </div>
                          
                         </div>   


                        {/* Sub Upper Topic */}
                         <div className="absolute flex items-start justify-center lgs:top-20 lgs:right-48 lgs:h-[50vh] w-full">

                                <div className="flex flex-col w-full h-auto justify-center items-end">

                                    <h2 className="font-bricolagegrotesque text-primary lgs:text-2xl text-shadow-xl text-center" style={{ 
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

 

                        {/* Text Data set */}
                        <div className="absolute flex  flex-col bg-transparent items-center justify-start z-10  lgs:h-[200vh] w-full">
                            <SplitText
                                text="Turboss"
                                className="flex lgs:mt-0 font-bricolagegrotesque opacity-10 lgs:text-[45rem] animate-movingText text-primary font-thin text-center"
                                delay={150}
                                animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                threshold={0.2}
                                rootMargin="-50px"
                                onLetterAnimationComplete={handleAnimationComplete}
                                />        
       
                        </div>    



                      {/* Cogwheel Setup */}
                        <div className="relative flex bg-transparent items-center justify-center lgs:mt-12 lgs:h-auto w-full">
           
                            <div className="absolute bg-orange-600 h-[30rem] w-[70vw] opacity-20 blur-3xl z-0"/>

                            {/* Middle Cogwheel */}
                            <div className="absolute flex bg-transparent h-auto w-auto lgs:h-[40rem] lgs:w-[40rem]  items-center justify-center z-40">

                            
                                    <Image src={flywheel0} alt="" className="absolute object-cover z-10 lgs:h-[35rem] lgs:w-[35rem] animate-spin" style={{
                                    animationDuration:'10s'
                                    }}/>   

                                        <div className="flex bg-primary lgs:h-[20rem] lgs:w-[20rem] rounded-full items-center overflow-hidden justify-center z-20" style={{
                                        boxShadow:'inset 0px 0px 20px 5px rgba(0,0,0,0.9) , 0px 0px 20px 20px rgba(0,0,0,0.9)'
                                    }}> 
                                        <Image src={turbossLogo} alt="" className="flex object-cover z-50 lgs:h-[22rem] lgs:w-[22rem]"/>
                                        <div className="absolute flex bg-gradient-to-t from-secondary to-transparent cursor-pointer items-center justify-start h-[20rem] w-[20rem] group-hover:scale-110 duration-700 overflow-hidden transition-all ease-in-out rounded-full z-50"/>
                                                
                                                <div className="absolute flex cursor-pointer items-center justify-start h-[20rem] w-[20rem] group-hover:scale-110 duration-700 overflow-hidden transition-all ease-in-out rounded-full z-50"
                                                style={{
                                                    boxShadow:'inset 0px 0px 20px 5px rgba(255,255,255,0.4)'
                                                }}/>

                                    
                                    </div> 

                            </div>

                            {/* 1rd Cogwheel */}
                            <div className="absolute flex bg-transparent justify-start items-center lgs:h-[50rem] lgs:w-[80rem] z-20" style={{

                                }}>
                                <Image src={flywheel1} alt="" className="absolute object-cover z-30 w-[35rem] lgs:h-[30rem] animate-spin" style={{
                                    animationDuration:'10s',
                                    animationDirection:'reverse'
                                }}/>   
                           </div>

                            {/* 3rd Cogwheel */}
                            <div className="absolute flex bg-transparent justify-end items-center lgs:h-[50rem] lgs:w-[80rem] z-10">

                                <div className="absolute flex lgs:w-[40rem] lgs:h=[40rem] items-center justify-center z-10">


                                       
                                    <Image src={flywheel2} alt="" className="absolute object-cover z-10 w-[40rem] lgs:h-[40rem] animate-spin" style={{
                                    animationDuration:'20s'
                                    }}/>   



                                </div>        

                            </div>

                            {/* 4th blue Cogwheel */}
                            <div className="absolute flex bg-transparent justify-start items-start lgs:h-[50rem] lgs:w-[80rem] z-20">

                                <div className="absolute flex lgs:w-[20rem] lgs:h-[20rem] items-center lgs:ml-64 lgs:mt-12 justify-center z-10">


                                    
                                    <Image src={flywheel3} alt="" className="absolute object-cover z-20 w-[20rem] lgs:h-[20rem] animate-spin" style={{
                                    animationDuration:'20s'
                                    }}/>   




                                </div>        

                            </div>

                            {/* 5th blue Cogwheel */}
                            <div className="absolute flex bg-transparent justify-start items-end lgs:h-[50rem] lgs:w-[80rem] z-40">

                            <div className="absolute group flex lgs:w-[20rem] lgs:h-[20rem] items-center lgs:ml-64 lgs:mb-24  justify-center z-10">


                                
                                <Image src={flywheel2} alt="" className="absolute object-cover z-40 w-[20rem] lgs:h-[20rem] animate-spin-fast group-hover:animate-spin-slow" style={{
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
                            <div className="absolute flex bg-transparent justify-end items-end lgs:h-[50rem] lgs:w-[80rem] z-30">

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
                            <div className="relative bg-transparent lgs:h-auto lgs:w-[80rem] z-50">

    
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

                    </div>





                
                </div>



            </div>

            {/* Sound Check Section */}   
            <div className="fixed flex items-center justify-center text-center  bg-secondary lgs:w-[3rem] lgs:h-[3rem] rounded-full z-50 top-4 left-4"
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
            <div ref={(el) => { sectionRefs.current[0] = el; }} className='relative flex lgs:h-[35rem] w-full overflow-hidden z-40'>
                 {/*<audio ref={(el) => { sectionAudioRefs.current[0] = el; }} >
                    <source src="/welcomingSection.wav" type="audio/wav" />
                    Your browser does not support the audio element.
                </audio> */}
                <Image 
                    src={herobackground3} 
                    alt='turbo' 
                    className='object-cover w-full animate-scaling01 blur-sm h-full' 
                    layout='fill' 
                    style={{
                        transform: `translateY(${parallex1 * 0.2}px)`, 
                        transition: "transform 0.4s ease-out",
                    }}
                />
                <div className="aboslute flex flex-col items-center justify-center bg-gradient-to-t from-secondary via-transparent to-transparent w-full h-auto z-30">

                     <h2 className="font-bricolagegrotesque lgs:text-7xl text-primary text-shadow-xl text-center" style={{
                        fontWeight:'200'
                     }}>
                        Welcome to <span className="bg-orange-600 p-4" style={{
                            fontWeight:'800'
                        }}>Turboss</span>
                     </h2>

                     <p className="font-dmsans lgs:text-xl lgs:w-[60vw] lgs:mt-12 text-primary text-shadow-xl text-center" style={{
                        fontWeight:'200'
                     }}>
                        Where every ride is fueled by passion and power meets accuracy. Explore a world where engineering is at the cutting edge, machines come to life, and every little detail reveals a tale of creativity and performance. This is an experience rather than merely a journey. </p>

                     <p className="font-dmsans text-2xl lgs:w-[40vw] lgs:mt-20 text-orange-500 text-shadow-xl text-center" style={{
                        fontWeight:'600'
                     }}>
                        <span className="bg-orange-600 text-primary lgs:p-3" style={{
                            fontWeight:'600'
                        }}>Explore. Learn. Innovate.</span><span className="lgs:ml-2" style={{
                            fontWeight:'200'
                        }}> Your Virtual Garage Awaits</span>
                        </p> 

                </div>
            </div>

             {/* DNA Section */}
            <div className="relative flex  justify-center items-center bg-transparent z-40">
                {/* Background Image */}

                <div className="relative flex flex-col h-auto w-full bg-transparent overflow-hidden z-40">

                        <div
                        className="absolute w-full h-auto items-center lgs:mt-12 justify-center z-30"
                        style={{
                            transform: `translateY(${offsetY}px)`,
                            transition: "transform 0.1s ease-out",
                        }}
                    >
                        <Image src={image1} alt="background" className="object-cover lgs:h-[65rem] w-full" />
                        </div>

                        {/* Primary Section */}
                        <div className="relative flex lgs:h-[15rem] w-full z-40 justify-center items-center">
                            <div className="absolute flex items-center justify-center w-full lgs:h-[25rem] bg-gradient-to-b from-primary via-primary to-transparent">
                               <div className="flex w-auto h-auto mt-12">
                                  <h2 className="font-bricolagegrotesque text-primary bg-orange-600 lgs:p-4 text-8xl text-center"
                                  style={{
                                    fontWeight:'200'
                                  }}>
                                    Turboss
                                  </h2>
                                  <h2 className="flex bg-primary p-1 flex-col font-bricolagegrotesque text-orange-600 lgs:p-2 text-8xl text-center" style={{
                                    fontWeight:'900',
                                    boxShadow:'0px 1px 20px 2px rgba(0,0,0,0.4)'
                                  }}>
                                    DNA<span className="lgs:text-sm font-dmsans text-secondary" style={{
                                        fontWeight:'200'
                                    }}>
                                        Turboss Garage Section 01
                                    </span>
                                  </h2>
                               </div>
                            </div>
                        </div>

                        {/* Swiper Container */}
                        <div className="relative flex w-full items-center justify-center bg-transparent z-30">
                            
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
                                modules={[EffectCoverflow, Pagination, Navigation]}
                                className="flex lgs:h-[55rem]  items-center justify-center p-12"
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
                                                className="absolute group flex lgs:h-[6rem] lgs:w-[15rem] lgs:mb-48 rounded-2xl cursor-pointer items-center text-primary justify-center z-50 bg-transparent overflow-hidden"
                                                style={{
                                                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1), inset 0px 5px 10px 2px rgba(255, 255, 255, 0.5)",
                                                    fontWeight:'200'
                                                }}>
                                                    <div className="absolute flex z-10 w-auto h-auto bg-transparent items-center justify-center">
                                                        <Image src={carbonFiber} alt="carbonFiber" className="object-cover lgs:w-[20rem] lgs:h-[6rem]"/>                                 
                                                    </div>   
                                                    <div className="absolute flex lgs:h-[6rem] lgs:w-[15rem] bg-gradient-to-t from-secondary to-transparent z-20 items-center justify-center"/>
                                                    <div className="absolute flex lgs:h-[6rem] lgs:w-[15rem] bg-gradient-to-r from-secondary to-transparent z-30 items-center justify-center"
                                                    style={{
                                                        boxShadow:'inset 0px 0px 10px 2px rgba(255,255,255,0.5)'
                                                    }}/>
                                                    <h2 className="font-dmsans lgs:text-lg group-hover:text-2xl transition-all duration-700 ease-in-out text-primary z-20">{tool?.name}</h2>
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


                </div>


            </div>

            {/* Secondary Section */}
            <div className="flex lgs:h-[25rem] w-full bg-secondary z-40" >
                <div className="flex lgs:h-[25rem] lgs:w-[40vw] items-center justify-center"/>
                <div className="relative flex lgs:h-[25rem] lgs:w-[60vw] items-center justify-start overflow-hidden">
                        <Image src = {subHeroSec1} alt="fwef" className="object-cover animate-moving02  lgs:h-[30rem] lgs:w-[60vw] z-30"/>
                        <div className="flex absolute bg-gradient-to-r lgs:h-[30rem] lgs:w-[80vw]  from-secondary to-transparent z-40"/>
                        <div className="flex absolute bg-gradient-to-l lgs:h-[30rem] lgs:w-[20vw] right-0  from-secondary to-transparent z-40"/>
                </div>
                
                <div className="absolute flex w-[30vw] lgs:h-[4rem] lgs:rounded-br-2xl bg-orange-600  items-center justify-center z-50"
                style={{
                    boxShadow:'0px 0px 20px 5px rgba(0,0,0,0.4), inset 0px 0px 10px 2px rgba(0,0,0,0.8)'
                }}>

                    <h2 className="font-dmsans lgs:text-2xl text-primary text-center" style={{
                        fontWeight:'200'
                    }}>
                        #SpotToFindMoreAboutCars
                    </h2>
                </div>

                <div className="absolute flex w-full lgs:h-[25rem] items-center justify-center z-50">
                    <div className="flex flex-col h-[25rem]  lgs:w-[60vw] items-center justify-center">
                        <div className="flex w-auto h-auto">

                                <h2 className="flex lgs:text-lg font-dmsans text-center items-start lgs:pt-5 text-primary" style={{
                                    fontWeight:'100'
                                }}>
                                Want to know
                                </h2>

                                <span className="flex lgs:text-6xl font-dmsans text-center items-center p-2 text-primary"
                                    style={{
                                        fontWeight:'100'
                                    }}>
                                    About Automobiles?
                                </span>
                        </div>

                            <p className="font-dmsans lgs:w-[40vw] lgs:text-xl text-center lgs:mt-8 text-primary h-auto items-center"
                            style={{
                                fontWeight:'100'
                            }}>
                                    <span className="lgs:mr-2 lgs:text-2xl font-russoone lgs:p-1" style={{ fontWeight: '400' }}>
                                        {"\u0022"}
                                    </span>Explore <span className="lgs:mr-2 lgs:text-2xl text-baseprimary lgs:p-1"
                              style={{
                                fontWeight:'300'
                              }}>
                              Baos Wheels 
                                 </span>for expert car reviews, in-depth articles, and the latest auto industry updates. Stay informed with insights, tips, and engaging videos.
                                 <span className="lgs:mr-2 lgs:text-2xl font-russoone lgs:p-1" style={{ fontWeight: '400' }}>
                                        {"\u0022"}
                                    </span></p>
                    </div>
                        <div className="flex h-[30rem] lgs:w-[40vw]  items-center justify-center overflow-hidden">
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
            <div className='relative flex flex-col lgs:h-[55rem] items-center justify-start w-full z-40 overflow-hidden'>

                <div className="absolute bg-gradient-to-b lgs:h-[15rem] w-full from-primary via-primary to-transparent top-0 z-20"/>
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
                <div className="aboslute flex flex-col items-center justify-center lgs:mt-12  w-full h-auto z-30">

                       <div className="flex w-auto h-auto mt-12">
                                  <h2 className="font-bricolagegrotesque text-primary bg-orange-600 lgs:p-4 text-8xl text-center"
                                  style={{
                                    fontWeight:'200'
                                  }}>
                                    Turboss
                                  </h2>
                                  <h2 className="flex bg-primary p-1 flex-col font-bricolagegrotesque text-orange-600 lgs:p-2 text-8xl text-center" style={{
                                    fontWeight:'900',
                                    boxShadow:'0px 1px 20px 2px rgba(0,0,0,0.4)'
                                  }}>
                                    Lab<span className="text-xs font-dmsans text-secondary" style={{
                                        fontWeight:'200'
                                    }}>
                                        Turboss Garage Lesson 01
                                    </span>
                                  </h2>
                        </div>

                </div>

                        <div className="aboslute flex flex-col items-center justify-center  w-full h-auto z-40">

                            <div className="flex w-auto h-auto lgs:space-x-8">
                            {labData.slice(0,3).map((tool, index) => (

                                <div 
                                onClick={() => router.push(`/labsection/${tool.id}`)}
                                key={tool.id} className={`group relative w-auto   ${hover === index ? "scale-110" : hover !== null ? "scale-95" : "scale-100"}  transition-all duration-700 ease-in-out h-auto cursor-pointer`
                            }  
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(null)}
                                >

                                    <div  className={`relative group flex-col lgs:w-[20rem] drop-shadow-2xl sms:w-[22rem] mds:w-[20rem] bg-transparent cursor-pointer items-center justify-start rounded-lg lgs:h-[25rem]`}
                                      
                                    data-aos='fade-up'
                                            data-aos-delay={`${200 + tool.id * 50}`} style={{
                                        
                                }}

                                >
                                        <div className='relative flex flex-col  lgs:w-[20rem] lgs:h-[25rem]  mds:w-[15rem] sms:w-[22rem] bg-transparent justify-center rounded-t-md  items-center '>
                                        <div className='flex lgs:w-[20rem] sms:w-[22rem] mds:w-[20rem] lgs:h-[25rem]   z-50'> 
                                            <Image src={tool.image} alt='' width={500} height={500} className='object-cover rounded-xl lgs:scale-150 mds:h-20'
                                            style={{
                                                transform: `translateY(${parallex1 * 0.8}px)`,
                                                transition: "transform 0.4s ease-out",
                                            }}/>
                                        </div>
                                        </div>


                                </div>

                                <div className="absolute flex flex-col bg-gradient-to-t from-secondary rounded-xl items-end justify-center to-transparent z-40 w-full lgs:h-[25rem] bottom-0"
                                                                    style={{
                                                                        boxShadow:' inset 0px 5px 10px 8px rgba(255,255,255,0.4)',
                                                                        transform: `translateY(${parallex1 * 0.8}px)`,
                                                                        transition: "transform 0.4s ease-out",
                                                                        
                                                                    }}>

                                            <div className="flex lgs:w-[20rem] lgs:h-[25rem] items-start justify-start lgs:p-5">
                                                
                                                <div className="flex w-auto h-auto">

                                                <h2 className="flex font-bricolagegrotesque text-primary text-sm bg-orange-600 lgs:p-2">
                                                Garage Section
                                                </h2>
                                                <span className="font-bricolagegrotesque text-orange-600 text-sm bg-primary lgs:p-2">
                                                    {tool.subname}
                                                </span>

                                                </div>

                                                
                                            </div> 
                                            
                                            <div className="flex lgs:w-[20rem] lgs:h-[25rem] items-end justify-center ">

                                                    <h2 className="absolute font-dmsans text-primary group-hover:scale-125  transition-all duration-700 ease-in-out lgs:text-xl lgs:p-2 lgs:mb-12"
                                                    style={{
                                                        fontWeight:'200'
                                                    }}>
                                                        {tool.name}
                                                    </h2> 

                                                    <div className="relative flex z-20 items-center opacity-10 justify-center overflow-hidden">

                                                    <h2 className="flex lgs:w-auto text-center text-nowrap group-hover:scale-125  transition-all duration-700 ease-in-out   font-dmsans text-primary lgs:text-6xl lgs:p-2 lgs:mb-4"
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

                            <div className="flex w-auto h-auto lgs:space-x-8">
                            {labData.slice(0,3).map((tool, index) => (
                                <div key={tool.id} className={`group relative ${hover === index ? "scale-110" : hover !== null ? "scale-95" : "scale-100"}  lgs:mt-32 w-auto transition-all duration-700 ease-in-out  h-auto cursor-pointer`}
                                  onMouseEnter={() => setHover(index)}
                                    onMouseLeave={() => setHover(null)}
                                >



                                <div className="flex flex-col bg-gradient-to-b from-secondary rounded-xl blur-lg items-end justify-center to-transparent z-40 w-full lgs:h-[4rem] bottom-0"
                                                                    style={{
                                                                        transform: `translateY(${parallex1 * 0.8}px)`,
                                                                        transition: "transform 0.4s ease-out",
                                                                        boxShadow:'0px 1px 20px 5px rgba(0,0,0,0.4) , inset 0px 5px 10px 5px rgba(0,0,0,0.4)'
                                                                    }}>

                                            <div className="flex lgs:w-[20rem] lgs:h-[5rem] items-start justify-start lgs:p-5"/>
                                            



                                    
                                
                                </div>



                                

                                </div>   


                                ))}    
                            </div>



                            </div>

            </div>

          
            {/* Sub Secondary Section */}
            <div className="relative w-auto h-auto overflow-hidden z-40">

            <div className="absolute flex lgs:w-[25vw] lgs:h-[4rem] lgs:rounded-bl-2xl bg-orange-600 right-0  items-center justify-center z-50"
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
                    <div className="flex lgs:h-[25rem] w-[100vw] bg-secondary" >

                        <div className="relative flex lgs:h-[25rem]  lgs:w-[60vw] items-center justify-start overflow-hidden">
                                <Image key={currentIndex} src = {tool.image} alt="fwef" className="object-cover animate-moving01  lgs:h-[25rem]  lgs:w-[60vw] z-30"/>
                                <div className="flex absolute bg-gradient-to-r lgs:h-[25rem]  lgs:w-[40vw]  from-secondary to-transparent z-40"/>
                                <div className="flex absolute bg-gradient-to-l lgs:h-[25rem]  lgs:w-[30vw] right-0  from-secondary via-secondary to-transparent z-40"/>
                                <div className="flex absolute bg-gradient-to-t lgs:h-[5rem] lgs:w-[60vw] bottom-0  from-secondary to-transparent z-40"/>
                                <div className="flex absolute bg-gradient-to-b lgs:h-[10rem] lgs:w-[80vw] top-0 from-secondary to-transparent z-40"/>
                                
                                

                        
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

          
            {/* Tools Section */}
            <div className='relative flex flex-col lgs:h-[60rem] w-full overflow-hidden z-40'>
                <div className="absolute bg-gradient-to-b lgs:h-[20rem] w-full from-primary via-primary to-transparent top-0 z-20"/>
                <Image 
                    src={herobackground5} 
                    alt='turbo' 
                    className='object-cover w-full h-full' 
                    layout='fill' 
                    style={{
                        transform: `translateY(${parallex1}px)`, // Adjust the multiplier for the intensity of the effect
                        transition: "transform 0.2s ease-out",
                    }}
                />
                <div className="aboslute flex flex-col items-center justify-start lgs:mt-12  w-full h-auto z-30">

                <div className="flex w-auto h-auto mt-12">
                                  <h2 className="font-bricolagegrotesque text-primary bg-orange-600 lgs:p-4 text-8xl text-center"
                                  style={{
                                    fontWeight:'200'
                                  }}>
                                    Turboss
                                  </h2>
                                  <h2 className="flex bg-primary p-1 flex-col font-bricolagegrotesque text-orange-600 lgs:p-2 text-8xl text-center" style={{
                                    fontWeight:'900',
                                    boxShadow:'0px 1px 20px 2px rgba(0,0,0,0.4)'
                                  }}>
                                    Tools<span className="text-xs font-dmsans text-secondary" style={{
                                        fontWeight:'200'
                                    }}>
                                        Turboss Garage Lesson 03
                                    </span>
                                  </h2>
                        </div>

                </div>

                <div className="aboslute flex flex-col items-center justify-center  w-full h-auto z-40">



                    </div>

            </div>

             {/* Axila Section */}
            <div className="relative flex lgs:h-[20rem] w-full bg-secondary z-40" >
                
                

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

                    <div className="relative flex flex-col lgs:h-[20rem] lgs:w-[60vw] bg-transparent items-center justify-center overflow-hidden">

                        <h2 className="flex font-poppins  text-center text-5xl text-primary z-30" style={{
                            fontWeight:'100'
                        }}>
                              Your AI Mechanic is on the Way
                        </h2>


                        <h2 className="flex font-poppins  text-center lgs:mt-2 text-2xl text-orange-600 z-30" style={{
                            fontWeight:'100'
                        }}>
                              Axila will be in the garage soon
                        </h2>

                        <div className="absolute flex lgs:h-[2rem] lgs:w-[30vw] animate-coloring blur-3xl items-center justify-center z-20"/>

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



            </div>
                                        
            
        </div>
        
    );
};

export default Home;
