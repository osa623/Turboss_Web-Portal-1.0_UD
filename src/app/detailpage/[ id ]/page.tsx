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
import carbonFiberHood from '../../assests/carbonFiberHood.jpg'

//css imports
import '../../detailpage/base.css';




//craete an interface for the data

interface ToolData {

  id: number;
  name: string;
  image: string;
  shadow: string;
  description: string;
  details: string[];
  subTopic1: string;
  subTopic2: string;
  subSection: Array<{
    subName1: string;
    subImage1: string; 
  }>;
  maindetailset1: {
    topic: string;
    Description: string;
  };
  detailset1: Array<{
    topic: string;
    Description: string;
  }>;
  maindetailset2: {
    topic: string;
    Description: string;
  };
  detailset2: Array<{
    topic: string;
    Description: string;
    image: string;
    Advantages: string;
    Issues: string;
  }>;
  partset1: Array<{
    name: string;
    image: string;
    description: string;
  }>;
  variations: Array<{
      name: string;
      image: string;
      sound: string;
  }>;
}




const Detailpage = () => {

    //hooks
    const [activeIndex, setActiveIndex] = useState(0);
    const [playingIndex, setPlayingIndex] = useState<number | null>(null);
    const [audioInstance, setAudioInstance] = useState<HTMLAudioElement | null>(null);
    const [data, setData] = useState<ToolData | null>(null);
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

      setClick(true);

      setTimeout(() => {
        setClick(false);
      }, 20); 
    }

    const handleClickNavigate = () => {
      router.push(`/homepage`);
    }








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






  const router = useRouter();

    useEffect(() => {
      router.replace(window.location.href);
    }, [router]); // Added router to the dependency array

  const params = useParams();
  const id = params && typeof params[' id '] === 'string' ? params[' id '].trim() : null;

  console.log("Paramas:" , params); // Debugging
  console.log("ID:" , id); // Debugging

  useEffect(() => {
    if (id) { 
        console.log("Fetching data for ID:", id); 
       

        fetch('/data/DnaData.json')
            .then((res) => res.json())
            .then((json) => {
                console.log("Fetched JSON Data:", json); // Debugging

                const selectedTool = json.find((item: ToolData) => item.id === Number(id));

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
      
            <div className='relative flex w-full h-[100vh] sms:h-[80vh]'>
            
              <Image
                src={background}
                alt='background'
                className='hidden lgs:flex mds:flex object-cover w-full h-full'
                layout='fill'
              />
              
              <Image
                src={background}
                alt='background'
                className='object-cover w-full h-full'
                layout='fill'
              />
              
          
            
              <div className='absolute flex w-[50vw] sms:w-[100vw] right-0 h-full z-30'>
                {/* Portal Video */}
                <div className='absolute flex w-[50vw] h-[50vh] sms:h-[20vh] sms:w-[100vw] sms:scale-125 sms:bottom-0 -bottom-5 lgs:left-12 bg-transparent items-center justify-center z-40'>
                  <video
                    src='/portalVideo.webm'
                    autoPlay
                    muted
                    loop
                    width={'500'}
                    height={'500'}
                    playsInline
                  />
                </div>

                {/* Engine Image */}
                <div className='absolute flex w-[50vw] sms:h-[50vh] mds:h-[100vh] lgs:h-[50vh] sms:bottom-16 sms:w-full lgs:bottom-48 lgs:left-12 bg-transparent animate-floating1 items-center justify-center z-50'>
                {data && data.image && (
                    <Image
                      src={data.image}
                      width={'300'}
                      height={'300'}
                      alt={data.name}
                      className='flex object-cover lgs:h-auto sms:w-[100vw] mds:w-[100vw]  mds:scale-75 mds:h-[30rem]  w-[30vw]'
                    />
                  )}
                </div>
              </div>




              <div className='hidden absolute lgs:flex sms:flex mds:flex  lgs:w-auto right-0 h-auto bottom-0 sms:bottom-72 z-50'>

              {/* Topic Section */}
                <div className='flex w-auto h-auto bg-transparent z-50 items-end justify-end'>

                    <div className='flex w-auto h-auto  right-2 transform rotate-90 origin-top-right'>


                      <h2 className='flex flex-col font-bricolagegrotesque lgs:text-xl mds:text-md sms:text-sm  items-center justify-center p-3  bg-secondary text-primary'style={{
                        boxShadow:'0px 0px 10px 1px rgba(0, 0, 0, 0.2)',
                        fontWeight:'700'
                      }}>
                        <span className='flex font-thin'>Garage</span>
                        <span className='flex lgs:text-6xl mds:text-5xl sms:text-3xl'>101</span>
                        
                      </h2>

                      <h2 className='font-bricolagegrotesque lgs:text-6xl mds:text-5xl sms:text-4xl p-2 place-content-center bg-orange-600 text-primary'style={{
                        boxShadow:'0px 0px 10px 1px rgba(0, 0, 0, 0.2)',
                        fontWeight:'700'
                      }}>
                        {data?.name}
                      </h2>

                      

                    </div>    

                </div>

              </div>



              
            {/*main detail Section for larger screen */}
              <div className={`hidden relative lgs:flex mds:flex lgs:overflow-x-hidden mds:overflow-x-hidden flex-col items-center justify-start w-[100vw] drop-shadow-lgs ${expandSection ? 'w-[100vw] sms:h-auto' : 'w-[50vw] sms:h-[5vh]'} transition-all duration-1000 ease-in-out overflow-y-scroll bg-primary h-auto z-40`}
              style={{
                boxShadow:'inset 0px 0px 10px 1px rgba(0, 0, 0, 0.9)'
              }}>

              <div className={`absolute flex flex-col items-center justify-center ${expandSection ? 'lgs:w-[80vw] mds:w-[80vw]' : 'lgs:w-[60vw] mds:w-[60vw]'} bg-primary overflow-auto right-0 h-auto z-30`}/>
      
                         {/* Upper Section */}
                        <div className={`flex ${expandSection ? 'lgs:w-[50vw] mds:w-[100vw]' : 'lgs:w-[50vw] mds:w-[50vw]'} h-[40rem] bg-orange-600  z-40 items-center`}>

                            <div className='flex lgs:w-[50vw] w-full h-[40rem] z-40 bg-transparent items-center justify-center'>

                                <h2 className='font-poppins opacity-20 text-nowrap p-2 place-content-center z-40 text-primary'style={{
                                  fontWeight:'100',
                                  fontSize:'30rem'
                                }}>
                                  {
                                  selectedname ? `${selectedname}` : 'Parts'
                                }
                                </h2>

                                <div className='absolute h-[40rem] w-full bg-orange-600 z-20'/>
                                
                                {/* Content Area for upper section */}
                                <div className='absolute flex flex-col  h-[40rem] w-full bg-transparent z-50'>


                                {/* Navigation Section */}
                                  <div className='relative flex w-full h-[5rem] bg-primary overflow-hidden z-50 items-center justify-center'>

                                     <Image src={carbonFiberHood} alt='' width={'1200'} className='object-cover w-full'/>
                                        <div onClick={()=> handleExpand() } className= {`absolute flex cursor-pointer bg-secondary rounded-3xl mds:text-sm  w-[8rem] h-[3rem] mds:w-[6rem] mds:h-[2rem]  right-6 text-primary font-dmsans items-center justify-center
                                        ${click ? 'scale-75' : 'scale-100'} transition-all duration-500 ease-in-out`}
                                          style={{
                                            boxShadow:'inset 0px 0px 10px 1px rgba(255, 255, 255, 0.6), 0px 0px 10px 5px rgba(0, 0, 0, 0.6)'
                                          }}>

                                            Move

                                        </div> 
                                  <div  className= {`absolute flex cursor-pointer bg-secondary  w-[15rem] h-[5rem] left-0 text-primary font-dmsans items-center justify-center`}
                                    style={{
                                      boxShadow:'inset 0px 0px 10px 1px rgba(255, 255, 255, 0.3), 0px 0px 10px 5px rgba(0, 0, 0, 0.6)'
                                    }}>
                                      <button onClick={handleClickNavigate}  className={`absolute flex cursor-pointer mds:text-sm  lgs:w-[10rem] lgs:h-[3rem]  mds:w-[6rem] mds:h-[2rem]   text-primary bg-gray-600 rounded-3xl font-dmsans items-center justify-center`}
                                      style={{
                                        boxShadow:'inset 0px 0px 10px 1px rgba(0, 0, 0, 0.6), 0px 0px 10px 1px rgba(255, 255, 255, 0.2)'
                                      }}>
                                           Back
                                      </button>
                                      

                                  </div> 


                                  </div>
                                  
                                  
                                {/* Upper Parts Section Section */}
                                <div className='flex w-full h-[35rem] bg-transparent z-50 items-center justify-center'>

                                  
                                    {/* View Part Section */}
                                    <div className={`flex flex-col lgs:h-[35rem] ${expandSection ? 'w-[15vw] mds:w-[20vw]' : 'w-[0vw] mds:w-[10vw]'} transition-all duration-1000 ease-in-out items-start justify-start bg-secondary opacity-50`}>

                                    </div> 
                                    {/* Parts Section */}
                                    <div className={`flex flex-col lgs:h-[35rem] ${expandSection ? 'lgs:w-[25vw]' : 'lgs:w-[20vw]'} transition-all duration-1000 ease-in-out place-content-center z-50 place-items-center scrollbar-hide overflow-y-scroll bg-transparent`}>

                                      <div className='absolute flex sms:flex-col items-center justify-center flex-col space-y-2 h-[35rem] lgs:w-[20vw] z-40'>
                                        {data?.partset1.map((tool, index) => (

                                            <div key={index} onClick={() => { setSelectedImage(tool?.image); setSelectedName(tool?.name); setSelectedDescription(tool?.description); }} className='flex flex-col border-2 rounded-lg cursor-pointer w-[4rem] h-[4rem]'>
                                              <Image
                                                src={tool?.image}
                                                width={'100'}
                                                height={'100'}
                                                alt={tool?.name}
                                                className='object-cover lgs:w-[4rem] hover:scale-150 lgs:h-[4rem] transition-all duration-500 ease-in-out'
                                              />
                                            </div>

                                        ))}
                                        </div>

                                        <div className={`absolute opacity-40  bg-orange-700 lgs:h-[35rem] ${expandSection ? 'lgs:w-[25vw]' : 'lgs:w-[20vw] mds:w-[100vw]'} transition-all duration-1000 ease-in-out  z-20`}/>

                                    </div> 

                                      {/* View Part Section */}
                                      <div className={`flex flex-col h-[35rem] ${expandSection ? 'lgs:w-[60vw] mds:w-[100vw]' : 'lgs:w-[80vw] mds:w-[100vw]'} transition-all duration-1000 ease-in-out items-start justify-start bg-transparent`}>
      
                                          <div className='flex w-full items-center justify-center h-auto mt-12'>


                                            
                                          {
                                            selectedImage ? (
                                              <div className="relative flex items-center justify-center">
                                                    <div className='flex  w-auto h-auto z-30'>  
                                                          <Image
                                                            src={selectedImage}
                                                            width={400} 
                                                            height={400}
                                                            alt="Selected Image"
                                                            className="object-cover lgs:w-[20rem] lgs:h-[20rem]  mds:w-[15rem] mds:h-[15rem]  scale-125 z-40"
                                                          />
                                                    </div>

                                            </div>
                                            ) : (
                                              <div className="py-40 flex flex-col items-center justify-center">
                                              <h2 className='flex font-bricolagegrotesque text-4xl text-primary lgs:p-2'
                                                style={{
                                                  fontWeight: 200   
                                                }}>
                                                Select a Part
                                              </h2>
                                               <div className="h-20 flex items-center w-20 mt-6 rounded-full border-4 border-white animate-spin border-t-orange-600 relative"></div>
                                              </div>
                                            )
                                          }
                                          </div>

                                          <div className='absolute w-auto h-auto items-center justify-center'>
                                              <div className='absolute flex  w-[18rem] opacity-25 h-auto items-center justify-center z-20'>
                                                        <h2 className='flex  font-bricolagegrotesque text-center text-9xl text-nowrap  z-30  text-primary lgs:p-2 '
                                                      style={{
                                                        fontWeight:'600'
                                                      }}>
                                                        {selectedImage ? `${selectedname}` : 'Select a Part'}
                                                    </h2>
                                              </div>
                                          </div>

                                          <div className='flex w-full items-center justify-center h-[25rem]'>
                                              
                                              <p className='flex flex-col font-bricolagegrotesque lgs:w-[30vw] mds:w-[30vw] text-center text-shadow-xl lgs:text-lg lgs:p-2 text-primary'style={{
                                                fontWeight:'100'
                                              }}>
                                                {selectedImage ? `${selectedDescription}` : ''}
                                                
                                                </p>

                                            

                                          </div>



                                      </div> 

                                </div>



                                </div>  

                            </div>

                            <div className='absolute flex h-auto w-auto items-center justify-center z-40'>

                            </div>  

                        </div>

                        

                        {/* Content Section */}
                        <div className='flex flex-col w-auto h-auto bg-transparent z-50'>

                        {/* Main Topic 01 */}
                        <div  className={`flex flex-col ${expandSection ? 'w-[60vw]' : 'w-[45vw]'} h-auto space-y-5 transition-all duration-1000 ease-in-out bg-transparent items-start p-8 justify-center`}
                            style={{
                              
                            }}>
                                <div className='flex w-auto h-auto'>

                                          
                                <h2 className='flex flex-col font-bricolagegrotesque text-2xl p-2  bg-orange-600 text-primary'style={{
                                  boxShadow:'0px 0px 10px 1px rgba(0, 0, 0, 0.2)',
                                  fontWeight:'700'
                                }}>
                                  <span className='flex font-thin'>{data?.maindetailset1.topic}</span>
                                  
                                </h2>


                                </div>  

                                <div className='flex w-auto h-auto'>


                                  <p className='flex flex-col font-bricolagegrotesque text-lg mds:text-md lgs:p-2  text-secondary'style={{
                                    fontWeight:'100'
                                  }}>
                                    {data?.maindetailset1.Description}
                                    
                                  </p>


                                </div> 
                        </div> 


                        {/* Main Description 01 */}
                        <div className={`flex flex-col ${expandSection ? 'w-[100vw]' : 'w-[50vw]'} h-auto bg-orange-800 space-y-5 transition-all duration-1000 ease-in-out items-start pr-5  p-8 justify-center`}>

                          {data?.detailset1.map((tool, index) => (

                            <div key={index}  className={`flex ${expandSection ? 'lgs:w-[60vw]' : 'lgs:w-[45vw]'} transition-all mt-6 duration-1000 ease-in-out h-auto`}
                            style={{
                       
                            }}>
                                <div className=' flex flex-col'>
                                    <div className='flex w-[1rem] h-[1rem] mt-3 bg-primary rounded-full'>

                                    </div>  
                                </div>

                               <div className='flex flex-col'>
                                    <div className='flex w-auto h-auto'>

                                              
                                    <h2 className='flex flex-col font-bricolagegrotesque text-xl p-2   text-primary'style={{
                                    
                                      fontWeight:'900'
                                    }}>
                                      <span className='flex'>{tool?.topic}</span>
                                      
                                    </h2>


                                    </div>  

                                    <div className='flex w-auto h-auto'>


                                      <p className='flex flex-col font-bricolagegrotesque text-md p-2  text-primary'style={{
                                        fontWeight:'100'
                                      }}>
                                        {tool?.Description}
                                        
                                      </p>


                                    </div> 
                                </div>
                            </div>    

                          ))}





                        </div>

                        {/* Main Topic 02 */}                 
                        <div  className={`flex flex-col ${expandSection ? 'w-[100vw] items-start' : 'w-[50vw] items-start'} h-auto space-y-5 transition-all duration-1000 ease-in-out bg-transparent p-8 justify-center`}
                            style={{
                              
                            }}>
                              <div className={`flex flex-col ${expandSection ? 'w-[60vw]' : 'w-[45vw]'} transition-all duration-1000 ease-in-out h-auto`}
                            style={{
                            
                            }}>
                                <div className='flex w-auto h-auto'>

                                          
                                <h2 className='flex flex-col font-bricolagegrotesque text-2xl p-2  bg-orange-600 text-primary'style={{
                                  boxShadow:'0px 0px 10px 1px rgba(0, 0, 0, 0.2)',
                                  fontWeight:'700'
                                }}>
                                  <span className='flex'>{data?.maindetailset2.topic}</span>
                                  
                                </h2>


                                </div>  

                                <div className='flex w-auto h-auto'>


                                  <p className='flex flex-col font-bricolagegrotesque text-lg p-2  text-secondary'style={{
                                    fontWeight:'100'
                                  }}>
                                    {data?.maindetailset2.Description}
                                    
                                  </p>


                                </div> 
                            </div>    
                        </div> 


                        {/* Main Description 02 */}
                        <div className={`relative flex flex-col ${expandSection ? 'w-[100vw] items-end justify-end' : 'w-[50vw] items-start justify-start'} h-auto bg-orange-850 space-y-5 transition-all duration-1000 ease-in-out items-start  justify-center overflow-hidden`}>

                              <div className='flex flex-col w-auto h-auto lgs:pr-5 p-8 z-40'>

                              {data?.detailset2.map((tool, index) => (

                                <div key={index}  className={`flex  ${expandSection ? 'lgs:w-full' : 'lgs:w-[45vw]'} transition-all duration-1000 items-center ease-in-out h-auto`}
                                style={{
                                }}>

                                    {/* Image Section */}
                                  <div className={`flex flex-col ${expandSection ? 'lgs:w-[40vw] opacity-100' : 'lgs:w-[0vw] opacity-0'} items-center h-auto`}>
                                    <div className='relative flex lgs:h-[25rem] lgs:w-[25rem] bg-primary rounded-full  animate-animation overflow-hidden'
                                    style={{
                                      boxShadow:' inset 10px 10px 10px rgba(255, 255, 255, 0.6)'
                                      
                                    }}>
                                        <Image src={tool?.image} alt='turbo' layout='fill' objectFit='cover' className='scale-95 z-40 ' />
                                        <div className='absolute flex lgs:h-[30rem] lgs:w-[40rem]  to-transparent z-30 overflow-hidden '>
                                        <Image src={turbossLOgo} alt='turbo' layout='fill' objectFit='cover' className='scale-125 z-30 pr-48 ' />
                                        <div className='flex lgs:h-[30rem] lgs:w-[40rem] bg-gradient-to-l from-white via-primary to-transparent z-40  overflow-hidden'/>
                                        
                                        </div>  
                                    
                                    </div>
                                  </div>  

                                  {/* other Section */}
                                  <div className={`flex flex-col ${expandSection ? 'w-[60vw]' : 'w-[45vw]'} `}>
                                    
                                    {/* Main Topic and Description */}
                                    <div className='flex w-auto h-auto mt-5'>

                                              
                                    <h2 className='flex flex-col font-bricolagegrotesque w-full text-xl p-2 bg-orange-600   text-primary'style={{
                                    
                                      fontWeight:'900'
                                    }}>
                                      <span className='flex'>{tool?.topic}</span>
                                      
                                    </h2>


                                    </div>  

                                    <div className={`flex flex-col ${expandSection ? 'lgs:w-[0vw] opacity-0 lgs:h-[0rem]' : 'lgs:w-[45vw] opacity-100'} items-center lgs:mt-4 h-auto`}>
                                   
                                   {tool?.image ? (
                                    <div className='relative lgs:h-[20rem] lgs:w-[20vw]'>                    
                                        <Image src={tool?.image} alt='turbo' layout='fill' objectFit='cover' className='scale-100' />
                                     </div>
                                      ) : (
                                        <div className='flex py-2'/>
                                      )}
                                      
                                  </div>  

                                    {/*  Description */}
                                    <div className='flex w-auto h-auto mt-5'>


                                      <p className='flex flex-col font-bricolagegrotesque text-md p-2  text-secondary'style={{
                                        fontWeight:'100'
                                      }}>
                                        {tool?.Description}
                                        
                                      </p>


                                    </div> 

                                    {/* Advantages */}
                                    {tool?.Advantages ? (
    
                                        <div className='flex flex-col w-auto h-auto mt-5'>
    
                                              <h2 className='flex flex-col font-bricolagegrotesque text-xl p-2  text-orange-600'style={{
                                              
                                              fontWeight:'900'
                                            }}>
                                              <span className='flex'>Advantages</span>
                                              
                                            </h2>
    
    
                                            <p className='flex flex-col font-bricolagegrotesque text-md p-2  text-secondary'style={{
                                              fontWeight:'100'
                                            }}>
                                              {tool?.Advantages}
                                              
                                            </p>
    
    
                                        </div> 
                                        
                                        ) : (
                                          <div className='flex'>
    
                                          </div>
    
                                        )}

                                    {/* Issues */}
                                    {/* Advantages */}
                                    {tool?.Issues ? (
    
                                        <div className='flex flex-col w-auto h-auto mt-5'>
    
                                              <h2 className='flex flex-col font-bricolagegrotesque text-xl p-2  text-orange-600'style={{
                                              
                                              fontWeight:'900'
                                            }}>
                                              <span className='flex'>Issues</span>

                                            </h2>
    
    
                                            <p className='flex flex-col font-bricolagegrotesque text-md p-2  text-secondary'style={{
                                              fontWeight:'100'
                                            }}>
                                              {tool?.Issues}

                                            </p>
    
    
                                        </div> 
                                        
                                        ) : (
                                          <div className='flex'>
    
                                          </div>
    
                                        )}

                                    <div className='lgs:h-[5rem] bg-transparent'/>

                                    
                                  </div>  
                                </div>    

                              ))}

                              </div>







                        </div>


                      </div>

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
            <div className='hidden absolute sms:flex top-2 left-2 border-2 bg-black h-12 w-auto items-center justify-center z-50 rounded-lg shadow-md'>
              <button 
              onClick={handleClickNavigate} 
              className='flex items-center justify-center px-8 py-2 font-bricolagegrotesque text-primary font-bold'
              >
              &larr; Back
              </button>
            </div>
      
            {/* Sub Section for more details for a larger screen */}

            
            <div className='hidden lgs:flex mds:flex bg-secondary w-full  lgs:h-auto'>


                    <div className="relative flex h-[25rem] w-[60vw] items-center justify-start overflow-hidden">
                            <Image src={subsetback01} alt='turbo' className='object-cover w-full h-full' layout='fill' />
                            <div className="flex absolute bg-gradient-to-r h-[30rem] w-[80vw]  from-secondary to-transparent z-40"/>
                            <div className="flex absolute bg-gradient-to-l h-[30rem] w-[20vw] right-0  from-secondary to-transparent z-40"/>
                    </div>


                    <div className="flex h-[25rem] w-[40vw] items-center justify-center">

                    </div>


                    <div className="absolute flex w-full h-[25rem] items-center justify-center z-50">

                            <div className="flex flex-col h-[25rem] w-[60vw]  items-center justify-center overflow-hidden">

                                <h2 className='flex flex-col font-bricolagegrotesque w-[40vw] text-5xl text-primary' style={{
                                  fontWeight: '200'
                                }}>
                                Analyze and optimize key <span>{data?.subTopic1} parameters,</span><span className='flex flex-col text-orange-600 text-lg' style={{ fontWeight:'400'}}>including<span className='flex flex-col text-primary lgs:text-nowrap'>{data?.subTopic2}
                                  <span className='text-start italic'
                                  style={{
                                    fontWeight:'100'
                                  }}>
                                    for enhanced performance.
                                  </span></span></span>
                                </h2>
                            
                            </div>
                            
                            {data?.name === 'Engine' || data?.name === 'Turbo' ? (
                            <div className="flex h-[25rem]  w-[40vw] items-end justify-end">

                              {data?.subSection.map((tool, index)=> (
                                      
                                    <div key={index}  className='group relative flex w-auto h-auto cursor-pointer'
                                    onMouseEnter={()=> setHover(index)}
                                    onMouseLeave={()=> setHover(null)}
                                    >
                                          
                                      <div className='relative h-[25rem] w-[10vw] bg-orange-400 overflow-hidden'>
                                          <Image src={tool?.subImage1} alt='turbo' className='flex object-cover group-hover:scale-125 w-full h-full transition-all border-2 duration-700 ease-in-out' layout='fill' />
                                          <div className='absolute flex w-full h-1/4 items-center justify-center bg-gradient-to-b top-0 from-secondary to-transparent z-30'/>
                                          <div className='absolute flex w-full h-3/4 items-center justify-center bg-gradient-to-t bottom-0 from-secondary to-transparent z-30'/>
                                          <div className='absolute flex w-3/4 h-full items-center justify-center bg-gradient-to-r left-0 from-secondary to-transparent z-30'/>
                                          <div className='absolute flex w-full h-full items-center justify-center left-0 z-30' style={{
                                            boxShadow: hover == index ?
                                              'inset 0px 0px 100px 1px rgba(255, 69, 0 , 0.9)' : 'inset 0px 0px 10px 1px rgba(255, 69, 0 , 0.9)',
                                              transition:"box-shadow 0.5s ease-in-out",
                                          }}/>
                                          

    
                                          <div className='absolute flex w-full h-full items-end justify-center bg-transparent z-40'>
                                              <h2 className='font-poppins w-[8vw] h-[5rem] group-hover:scale-125 transition-all duration-700 ease-in-out  text-md text-center text-primary'
                                              style={{
                                                fontWeight:'100'
                                              }}>
                                                {tool?.subName1}
                                              </h2>

                                          </div>  
                                          <div className='absolute flex w-full h-full items-end justify-center bg-transparent z-30'>
                                              <h2 className='font-poppins lgs:h-[5rem]  text-3xl text-center group-hover:scale-125 transition-all duration-700 ease-in-out opacity-15 text-primary'
                                              style={{
                                                fontWeight:'100'
                                              }}>
                                                {tool?.subName1}
                                              </h2>

                                          </div>  
                                      </div> 
                                    </div>   
                              ))}
                                

                            </div> ) : (
                              <div className="flex h-[25rem]  w-[40vw] items-center justify-center">
                                <h2 className='font-poppins text-3xl text-center text-primary'>
                                  No Tools Available
                                </h2>
                              </div>
                            )}

                    </div>


            </div>  



           {/*left hanging Topic Section */}
           <div className='hidden absolute lgs:flex mds:flex w-auto h-auto bg-transparent z-50 mt-24  items-end justify-end'>

            <div className='flex w-auto h-auto  right-0 transform origin-top-left -rotate-90'>


              <h2 className='flex flex-col font-bricolagegrotesque text-xl mds:text-sm items-center justify-center p-3  bg-secondary text-primary'style={{
                boxShadow:'0px 0px 10px 1px rgba(0, 0, 0, 0.2)',
                fontWeight:'700'
              }}>
                <span className='flex font-thin'>Garage</span>
                <span className='flex text-6xl mds:text-2xl'>101</span>
                
              </h2>

              <h2 className='font-bricolagegrotesque text-6xl mds:text-4xl p-2 place-content-center bg-orange-600 text-primary'style={{
                boxShadow:'0px 0px 10px 1px rgba(0, 0, 0, 0.2)',
                fontWeight:'700'
              }}>
                Dynamics
              </h2>

              

            </div>    

          </div>



          {/*main detail Section for smaller screen */}
          <div className={`hidden relative sms:flex flex-col items-center justify-start scrollbar-hide sms:w-[100vw] drop-shadow-lgs ${expandSection ? 'lgs:w-[100vw]' : 'lgs:w-[50vw]'} sms:overflow-hidden transition-all duration-1000 ease-in-out overflow-y-scroll bg-primary h-auto z-40`}
          style={{
            boxShadow:'inset 0px 0px 10px 1px rgba(0, 0, 0, 0.9)'
          }}>

          <div className={`absolute flex flex-col items-center justify-center ${expandSection ? 'lgs:w-[100vw]' : 'lgs:w-[100vw]'} bg-primary overflow-auto right-0 h-auto z-30`}/>
  
                    {/* Upper Section */}
                    <div className={`flex sms:relative overflow-hidden ${expandSection ? 'w-[100vw]' : 'lgs:w-[100vw]'} h-[40rem] bg-orange-600  z-40 items-center`}>

                        <div className='flex w-[100vw] h-[40rem] z-40 bg-transparent items-center justify-center mt-12'>

                            <h2 className='font-poppins opacity-20 text-nowrap p-2 place-content-center z-40 text-primary'style={{
                              fontWeight:'100',
                              fontSize:'30rem'
                            }}>
                              {
                              selectedname ? `${selectedname}` : 'Parts'
                            }
                            </h2>

                            <div className='absolute h-[40rem] lgs:w-full bg-orange-600 z-20'/>
                            
                            {/* Content Area for upper section */}
                            <div className='absolute flex flex-col  h-[40rem] lgs:w-full bg-transparent z-50'>


                          

                              
                              
                            {/* Upper Parts Section Section */}
                            
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
                                modules={[EffectCoverflow, Pagination, Navigation]}
                                className="flex h-[55rem]  items-center justify-center p-12"
                                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                            >
                                {data?.partset1.map((tool, index) => {
                                    let opacity = 0.8;

                                    if (index === activeIndex) {
                                        opacity = 1;
                                    } else if (index === activeIndex - 1 || index === activeIndex + 1) {
                                        opacity = 1;
                                    }

                                    return (
                                        <SwiperSlide className="group" key={index}>

                                            <div className="flex h-[20rem] bg-transparent  items-center justify-center overflow-hidden">
                                                <Image
                                                    src={tool.image}
                                                    alt="tool_id"
                                                    width={200}
                                                    height={250}
                                                    className="object-cover  w-auto h-auto"
                                                    style={{
                                                        opacity
                                                    }}
                                                />
                                            </div>
                                            <div
                                                className="flex flex-col h-[30rem] items-center justify-center w-full transition-opacity duration-500"
                                                style={{ opacity }}
                                            >
                                            <div className='flex flex-col w-auto h-[30rem]'>
                                              <p className='h-auto w-[70vw] text-center mt-4 font-dmsans text-primary text-lg'
                                              style={{fontWeight:'300'}}>
                                                {tool.description}
                                              </p>
                                              <h2 className='h-auto w-auto bg-secondary mt-5 rounded-2xl text-center font-dmsans text-primary text-3xl p-4'
                                              style={{fontWeight:'300'}}>
                                                {tool.name}
                                              </h2>
                                            </div>  
                                                <button className="absolute h-[0.8rem] w-[15rem] font-dmsans lgs:mb-0 lgs:mt-12 rounded-full blur-lg items-center justify-center bg-secondary"/>
                                               
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                            
                        </div>



                            </div>  

                        </div>

                        <div className='absolute flex h-auto w-auto items-center justify-center z-40'>

                        </div>  

                    </div>


                    {/* Content Section */}
                    <div className='flex flex-col w-auto h-auto bg-transparent z-50'>

                    {/* Main Topic 01 */}
                    <div  className={`flex sms:w-[100vw] flex-col ${expandSection ? 'lgs:w-[60vw]' : 'lgs:w-[45vw]'} h-auto lgs:space-y-5 transition-all duration-1000 ease-in-out bg-transparent items-start  p-8 justify-center`}
                        style={{
                          
                        }}>
                            <div className='flex w-auto h-auto'>

                                      
                            <h2 className='flex flex-col font-bricolagegrotesque text-2xl p-2  bg-orange-600 text-primary'style={{
                              boxShadow:'0px 0px 10px 1px rgba(0, 0, 0, 0.2)',
                              fontWeight:'700'
                            }}>
                              <span className='flex font-thin'>{data?.maindetailset1.topic}</span>
                              
                            </h2>


                            </div>  

                            <div className='flex w-auto h-auto'>


                              <p className='flex flex-col font-bricolagegrotesque text-lg lgs:p-2 sms:mt-5  text-secondary'style={{
                                fontWeight:'100'
                              }}>
                                {data?.maindetailset1.Description}
                                
                              </p>


                            </div> 
                    </div> 


                    {/* Main Description 01 */}
                    <div className={`flex flex-col sms:[100vw] ${expandSection ? 'lgs:w-[100vw]' : 'lgs:w-[50vw]'} h-auto bg-orange-800 space-y-5 transition-all duration-1000 ease-in-out items-start lgs:pr-5  p-8 justify-center`}>

                      {data?.detailset1.map((tool, index) => (

                        <div key={index}  className={`flex flex-col ${expandSection ? 'lgs:w-[60vw]' : 'lgs:w-[45vw]'} transition-all duration-1000 ease-in-out h-auto`}
                        style={{
                          marginTop:`${index}rem`
                        }}>
                            <div className='flex w-auto h-auto sms:mt-4'>

                                      
                            <h2 className='flex flex-col font-bricolagegrotesque text-xl lgs:p-2 sms:text-2xl   text-primary'style={{
                            
                              fontWeight:'900'
                            }}>
                              <span className='flex'>{tool?.topic}</span>
                              
                            </h2>


                            </div>  

                            <div className='flex w-auto h-auto'>


                              <p className='flex flex-col font-bricolagegrotesque text-md sms:text-lg lgs:p-2 sms:mt-4  text-primary'style={{
                                fontWeight:'100'
                              }}>
                                {tool?.Description}
                                
                              </p>


                            </div> 
                        </div>    

                      ))}





                    </div>

                    {/* Main Topic 02 */}                 
                    <div  className={`flex flex-col sms:w-[100vw] ${expandSection ? 'lgs:w-[100vw] items-start' : 'lgs:w-[50vw] items-start'} h-auto space-y-5 transition-all duration-1000 ease-in-out bg-transparent p-8 justify-center`}
                        style={{
                          
                        }}>
                          <div className={`flex flex-col ${expandSection ? 'lgs:w-[60vw]' : 'lgs:w-[45vw]'} transition-all duration-1000 ease-in-out h-auto`}
                        style={{
                        
                        }}>
                            <div className='flex w-auto h-auto'>

                                      
                            <h2 className='flex flex-col font-bricolagegrotesque text-2xl p-2  bg-orange-600 text-primary'style={{
                              boxShadow:'0px 0px 10px 1px rgba(0, 0, 0, 0.2)',
                              fontWeight:'700'
                            }}>
                              <span className='flex'>{data?.maindetailset2.topic}</span>
                              
                            </h2>


                            </div>  

                            <div className='flex w-auto h-auto'>


                              <p className='flex flex-col font-bricolagegrotesque text-lg lgs:p-2 sms:mt-4  text-secondary'style={{
                                fontWeight:'100'
                              }}>
                                {data?.maindetailset2.Description}
                                
                              </p>


                            </div> 
                        </div>    
                    </div> 


                    {/* Main Description 02 */}
                    <div className={`relative flex flex-col ${expandSection ? 'w-[100vw] items-end justify-end' : 'w-[100vw] items-start justify-start'} h-auto bg-orange-850 lgs:space-y-5 transition-all duration-1000 ease-in-out items-start  justify-center overflow-hidden`}>

                          <div className='flex flex-col w-auto h-auto lgs:pr-5  p-8 z-40'>

                          {data?.detailset2.map((tool, index) => (

                            <div key={index}  className={`flex sms:flex-col   ${expandSection ? 'lgs:w-full' : 'lgs:w-[45vw]'} transition-all duration-1000 items-center ease-in-out h-auto`}
                            style={{
                            }}>

                                {/* Image Section */}
                              <div className={`flex flex-col sms:w-[20rem] sms:h-[20rem]  ${expandSection ? 'lgs: w-[40vw] opacity-100' : 'lgs:w-[0vw] opacity-0'} items-center sms:justify-center h-auto`}>
                                <div className='relative flex lgs:h-[25rem] lgs:w-[25rem] sms:w-[15rem] sms:h-[15rem] lgs:bg-primary rounded-full  animate-animation overflow-hidden'
                                style={{
                                  boxShadow:' inset 10px 10px 10px rgba(255, 255, 255, 0.6)'
                                  
                                }}>
                                    <Image src={tool?.image} alt='turbo' layout='fill' objectFit='cover' className='scale-95 sms:scale-100 z-40 ' />
                                    <div className='absolute flex h-[30rem] w-[40rem]  sms:w-[15rem] sms:h-[15rem]  to-transparent z-30 overflow-hidden '>
                                    <Image src={turbossLOgo} alt='turbo' layout='fill' objectFit='cover' className='hidden lgs:flex scale-125 z-30 pr-48 ' />
                                    <div className='flex lgs:h-[30rem] lgs:w-[40rem] sms:w-[15rem] sms:h-[15rem]  bg-gradient-to-l from-white via-primary to-transparent z-40  overflow-hidden'/>
                                    
                                    </div>  
                                
                                </div>
                              </div>  

                              {/* other Section */}
                              <div className={`flex flex-col ${expandSection ? 'lgs:w-[60vw]' : 'lgs:w-[45vw]'} `}>
                                
                                {/* Main Topic and Description */}
                                <div className='flex w-auto h-auto lgs:mt-5'>

                                          
                                <h2 className='flex flex-col font-bricolagegrotesque w-full text-xl p-2 bg-orange-600   text-primary'style={{
                                
                                  fontWeight:'900'
                                }}>
                                  <span className='flex'>{tool?.topic}</span>
                                  
                                </h2>


                                </div>  

                                <div className={`flex flex-col sms:mt-4 ${expandSection ? 'lgs:w-[0vw] opacity-0' : 'lgs:w-[45vw] opacity-100'} items-center lgs:mt-4 h-auto`}>
                                <div className='relative lgs:h-[20rem] lgs:w-[20vw]'>

                                  {tool?.image ? (
                                    <Image src={tool?.image} alt='turbo' layout='fill' objectFit='cover' className='scale-100' />
                                  ) : (
                                    <div className='flex py-2'/>
                                  )}

                                </div>
                              </div>  

                                {/*  Description */}
                                <div className='flex w-auto h-auto mt-5'>


                                  <p className='flex flex-col font-bricolagegrotesque text-md lgs:p-2 sms:text-lg  text-secondary'style={{
                                    fontWeight:'100'
                                  }}>
                                    {tool?.Description}
                                    
                                  </p>


                                </div> 

                                {/* Advantages */}
                                <div className='flex flex-col w-auto h-auto mt-5'>

                                      <h2 className='flex flex-col font-bricolagegrotesque text-xl sms:text-2xl lgs:p-2  text-orange-600'style={{
                                      
                                      fontWeight:'900'
                                    }}>
                                      <span className='flex'>Advantages</span>
                                      
                                    </h2>


                                    <p className='flex flex-col sms:mt-5 font-bricolagegrotesque text-md lgs:p-2 sms:text-lg  text-secondary'style={{
                                      fontWeight:'100'
                                    }}>
                                      {tool?.Advantages}
                                      
                                    </p>


                                </div> 

                                {/* Issues */}
                                <div className='flex flex-col w-auto h-auto mt-5'>

                                <h2 className='flex flex-col font-bricolagegrotesque text-xl lgs:p-2 sms:text-2xl text-secondary'style={{
                                
                                fontWeight:'900'
                              }}>
                                <span className='flex'>Issues</span>
                                
                              </h2>


                                <p className='flex flex-col sms:mt-5 font-bricolagegrotesque text-md lgs:p-2 sms:text-lg  text-secondary'style={{
                                  fontWeight:'100'
                                }}>
                                  {tool?.Issues}
                                  
                                </p>


                                </div> 

                                <div className='lgs:h-[5rem] bg-transparent'/>

                                
                              </div>  
                            </div>    

                          ))}

                          </div>







                    </div>


                  </div>

          </div>

           {/* Sub Section for more details */}
          <div className='hidden sms:flex flex-col bg-secondary w-full  h-auto'>


              <div className="relative flex h-[25rem] w-[100vw] z-30 items-center justify-start overflow-hidden">
                      <Image src={subsetback01} alt='turbo' className='object-cover w-full h-full' layout='fill' />
                      <div className="flex absolute bg-gradient-to-r h-[30rem] w-[80vw]  from-secondary to-transparent z-40"/>
                      <div className="flex absolute bg-gradient-to-l h-[30rem] w-[20vw] right-0  from-secondary to-transparent z-40"/>
                      <div className="flex absolute bg-gradient-to-t h-[10rem] w-[100vw] bottom-0  from-secondary to-transparent z-40"/>
              </div>


              <div className="flex absolute h-[25rem] z-40 w-[100vw] items-end justify-center">

                  <div className="flex flex-col h-[25rem] w-[100vw]  items-end justify-center overflow-hidden p-5">

                  <h2 className='flex flex-col font-poppins text-end lgs:w-[60vw] text-xl text-primary space-y-4' style={{
                    fontWeight:'100'
                  }}>
                  Analyze and optimize key <span>{data?.subTopic1} parameters,</span><span className='flex flex-col text-orange-600 text-2xl' style={{ fontWeight:'400'}}>including<span className='flex flex-col mt-4 text-primary lgs:text-nowrap'>{data?.subTopic2}
                    <span className='text-end text-sm mt-4 italic'
                    style={{
                      fontWeight:'100'
                    }}>
                      for enhanced performance.
                    </span></span></span>
                  </h2>

                  </div>


              </div>


              <div className=" flex w-full h-[25rem] items-end justify-center z-50">


                      <div className="flex flex-col h-[20rem]  w-[40vw] items-center justify-center">

                        {data?.subSection.map((tool, index)=> (
                                
                              <div key={index}  className='group relative flex w-auto z-50 h-auto cursor-pointer'
                              onMouseEnter={()=> setHover(index)}
                              onMouseLeave={()=> setHover(null)}
                              >
                                    
                                <div className='relative h-[6rem] w-[100vw] bg-orange-400 overflow-hidden'>
                                    <Image src={tool?.subImage1} alt='turbo' className='flex object-cover group-hover:scale-125 w-full h-full transition-all border-2 duration-700 ease-in-out' layout='fill' />
                                    <div className='absolute flex w-full h-1/4 items-center justify-center bg-gradient-to-b top-0 from-secondary to-transparent z-30'/>
                                    <div className='absolute flex w-full h-3/4 items-center justify-center bg-gradient-to-t bottom-0 from-secondary to-transparent z-30'/>
                                    <div className='absolute flex w-3/4 h-full items-center justify-center bg-gradient-to-r left-0 from-secondary to-transparent z-30'/>
                                    <div className='absolute flex w-full h-full items-center justify-center left-0 z-30' style={{
                                      boxShadow: hover == index ?
                                        'inset 0px 0px 100px 1px rgba(255, 69, 0 , 0.9)' : 'inset 0px 0px 10px 1px rgba(255, 69, 0 , 0.9)',
                                        transition:"box-shadow 0.5s ease-in-out",
                                    }}/>
                                    


                                    <div className='absolute flex w-full h-full items-center justify-center bg-transparent z-40'>
                                        <h2 className='font-poppins w-full group-hover:scale-125 transition-all duration-700 ease-in-out  text-md text-center text-primary'
                                        style={{
                                          fontWeight:'100'
                                        }}>
                                          {tool?.subName1}
                                        </h2>

                                    </div>  
                                    <div className='absolute flex w-full h-full items-center justify-center bg-transparent z-30'>
                                        <h2 className='font-poppins  text-3xl text-center group-hover:scale-125 transition-all duration-700 ease-in-out opacity-15 text-primary'
                                        style={{
                                          fontWeight:'100'
                                        }}>
                                          {tool?.subName1}
                                        </h2>

                                    </div>  
                                </div> 
                              </div>   
                        ))}
                          

                      </div>

              </div>

              {/*left hanging for the small Topic Section */}
               <div className='hidden absolute sms:flex  w-auto h-auto bg-transparent z-50  items-end justify-end'>

              <div className='flex w-auto h-auto  transform origin-top-left -rotate-90'>


                <h2 className='flex flex-col font-bricolagegrotesque text-xl items-center justify-center p-1  bg-secondary text-primary'style={{
                  boxShadow:'0px 0px 10px 1px rgba(0, 0, 0, 0.2)',
                  fontWeight:'700'
                }}>
                  <span className='flex font-thin'>Garage</span>
                  <span className='flex  sms:text-3xl'>101</span>
                  
                </h2>

                <h2 className='font-bricolagegrotesque text-3xl p-2 place-content-center bg-orange-600 text-primary'style={{
                  boxShadow:'0px 0px 10px 1px rgba(0, 0, 0, 0.2)',
                  fontWeight:'700'
                }}>
                  Dynamics
                </h2>

                

              </div>    

              </div>


          </div>  



    
              {/* Variation Section */}
         {

            data?.variations && (
              <div className='relative lgs:h-auto sms:h-screen mds:h-[200vh] w-full'>

              <Image src={background2} alt='turbo' className='object-cover w-full h-full' layout='fill' />

                            <div className='flex w-full h-[10rem] bg-transparent'>
    

                              {/* title text area */}
                            <div className="absolute flex items-start justify-center w-full h-[20rem] bg-gradient-to-b from-primary via-primary to-transparent">
                               <div className="flex w-auto h-auto mt-12">
                                  <h2 className="font-bricolagegrotesque text-primary bg-orange-600 p-4 lgs:text-6xl text-4xl text-center"
                                  style={{
                                    fontWeight: 200
                                  }}>
                                    {data?.name}
                                  </h2>
                                  <h2 className="flex items-center justify-center bg-primary p-1 flex-col font-bricolagegrotesque text-4xl text-orange-600 lgs:p-2 lgs:text-5xl text-center" style={{
                                    fontWeight:'900',
                                    boxShadow:'0px 1px 20px 2px rgba(0,0,0,0.4)'
                                  }}>
                                    VARIATIONS<span className="hidden lgs:flex mds:flex text-xs font-dmsans  text-secondary" style={{
                                        fontWeight: 100
                                    }}>
                                        Turboss Garage Lesson 01
                                    </span>
                                  </h2>
                               </div>
                            </div>

                             </div>

                            {/* Swiper Container for large and medium */}
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
                                        
                                        navigation={true}
                                        modules={[EffectCoverflow, Pagination, Navigation]}
                                        className="flex lgs:h-[55rem] mds:h-[50rem]  items-center justify-center p-12"
                                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                                    >
                                        {data?.variations.map((tool, index) => {
                                            let opacity = 0.9;
    
                                            if (index === activeIndex) {
                                                opacity = 1;
                                            } else if (index === activeIndex - 1 || index === activeIndex + 1) {
                                                opacity = 1;
                                            }
    
                                            return (
                                                <SwiperSlide key={index}>
    
                                                    <div className="flex lgs:h-[30rem] mds:h-[30rem] bg-transparent  items-center justify-center">
                                                        <Image
                                                            src={tool?.image}
                                                            alt="tool_id"
                                                            width={'400'}
                                                            height={'400'}
                                                            className="object-cover mds:h-[20rem] animate-floating w-auto h-auto"
                                                            style={{
                                                                opacity
                                                            }}
                                                        />
                                                    </div>
                                                    <div
                                                        className=" flex flex-col h-[30rem] items-center justify-start w-full transition-opacity duration-500"
                                                        style={{ opacity }}
                                                    >
                                                        
                                                        <div className='relative w-[20rem] h-[10rem] rounded-2xl bg-secondary items-center justify-center overflow-hidden'
                                                        style={{
                                                          boxShadow:'inset 0px 0px 10px 5px rgba(255, 255, 255, 0.2)'
                                                        }}>
                                                            {/* Turboss Layer */}
                                                            <div className='absolute flex z-20  w-[20rem] h-[10rem] items-end justify-end mt-4 '>
                                                                <h2 className='font-poppins bottom  text-8xl text-primary opacity-10'
                                                                style={{
                                                                  fontWeight:'100'
                                                                }}>
                                                                    Turboss
                                                                </h2>
                                                            </div>
                                                            {/* Garage Layer */}
                                                            <div className='absolute flex z-20  w-[20rem] h-[10rem] items-end justify-end'>
                                                                <h2 className='font-bricolagegrotesque bottom  text-md text-primary opacity-40 mr-2'
                                                                style={{
                                                                  fontWeight:'100'
                                                                }}>
                                                                    turboss.com
                                                                </h2>
                                                            </div>
                                                             {/* Upper Layer */}
                                                            <div className='absolute flex z-30  w-[20rem] h-[10rem] items-start justify-start p-6'>
                                                                <h2 className='flex flex-col font-poppins bottom  text-2xl items-start justify-center text-orange-600 opacity-90'
                                                                style={{
                                                                  fontWeight:'100'
                                                                }}>
                                                                    {tool?.name}<span className='text-lg text-primary font-poppins'
                                                                    style={{
                                                                      fontWeight:'100'
                                                                    }}>
                                                                      {data?.name}
                                                                    </span>
                                                                </h2>
                                                            </div>
                                                             {/* Sound wave Layer */}
                                                            <div className='absolute flex z-50  w-[20rem] h-[10rem] items-start justify-end p-6'>
                                                                
                                                                {data?.name === 'Engine' || data?.name === 'engine' ? (
                                                                <div className='flex bottom w-[10rem] h-[4rem] text-5xl justify-end bg-secondary opacity-90'
                                                                style={{
                                                                  fontWeight:'100'
                                                                }}>

                                                                      <div                 
                                                                                className=" flex z-50 bottom-0 left-6 items-center justify-center cursor-pointer p-2"
                                                                                onClick={() => { handleAudioToggle(index, tool?.sound); handleClick(); }}
                                                                              >
                                                                                <div className="flex items-center justify-center rounded-full w-[3rem] h-[3rem] bg-primary opacity-90">
                                                                                  <FontAwesomeIcon icon={playingIndex === index ? faVolumeHigh : faVolumeDown} className='h-5'/>
                                                                                </div>
                                                                              </div>
                                                                    
                                                                </div>
                                                                ) : (
                                                                  <div className='flex'/>
                                                                )}

                                                            </div>
                                                            {/* Button Layer */}
                                                            <div
                                                              className="absolute flex z-50 bottom-2 left-6 items-center justify-center space-x-2 cursor-pointer p-2"
                                                              
                                                            > 
                                                              <div className={`flex items-center justify-center rounded-full ${activeIndex === index && click ? 'bg-green-600' : 'bg-primary'} w-[1rem] h-[1rem]  opacity-90`}/>

                                                              <div className={`flex items-center justify-center rounded-full ${activeIndex === index && click ? 'bg-primary' : 'bg-red-700'} w-[1rem] h-[1rem] opacity-90`}/>
                                  
                                                         
                                                            </div>
                                                            

                                                        </div>  

                                                        <div className='absolute lgs:w-[20rem] lgs:mt-48 blur-xl bg-black lgs:h-[2rem]'/>
                                                        

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
                                    modules={[EffectCoverflow, Pagination, Navigation]}
                                    className="flex h-[55rem]  items-center justify-center p-12"
                                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                                >
                                    {data?.variations.map((tool, index) => {
                                        let opacity = 0.8;

                                        if (index === activeIndex) {
                                            opacity = 1;
                                        } else if (index === activeIndex - 1 || index === activeIndex + 1) {
                                            opacity = 1;
                                        }

                                        return (
                                            <SwiperSlide className="group" key={index}>

                                                <div className="flex h-[20rem] bg-transparent  items-center justify-center overflow-hidden">
                                                    <Image
                                                        src={tool.image}
                                                        alt="tool_id"
                                                        width={200}
                                                        height={250}
                                                        className="object-cover  w-auto h-auto"
                                                        style={{
                                                            opacity
                                                        }}
                                                    />
                                                </div>
                                                <div
                                                    className="flex flex-col h-[20rem] items-center justify-center w-full transition-opacity duration-500"
                                                    style={{ opacity }}
                                                >
                                                        <div className='relative w-[20rem] h-[10rem] rounded-2xl bg-secondary items-center justify-center overflow-hidden'
                                                        style={{
                                                          boxShadow:'inset 0px 0px 10px 5px rgba(255, 255, 255, 0.2)'
                                                        }}>
                                                            {/* Turboss Layer */}
                                                            <div className='absolute flex z-20  w-[20rem] h-[10rem] items-end justify-end mt-4 '>
                                                                <h2 className='font-poppins bottom  text-8xl text-primary opacity-10'
                                                                style={{
                                                                  fontWeight:'100'
                                                                }}>
                                                                    Turboss
                                                                </h2>
                                                            </div>
                                                            {/* Garage Layer */}
                                                            <div className='absolute flex z-20  w-[20rem] h-[10rem] items-end justify-end p-4'>
                                                                <h2 className='font-bricolagegrotesque bottom  text-md text-primary opacity-40 mr-2'
                                                                style={{
                                                                  fontWeight:'100'
                                                                }}>
                                                                    turboss.com
                                                                </h2>
                                                            </div>
                                                             {/* Upper Layer */}
                                                            <div className='absolute flex z-30  w-[20rem] h-[10rem] items-start justify-start p-6'>
                                                                <h2 className='flex flex-col font-poppins bottom  text-5xl items-center justify-center text-orange-600 opacity-90'
                                                                style={{
                                                                  fontWeight:'100'
                                                                }}>
                                                                    {tool?.name}<span className='text-xl text-primary font-poppins'
                                                                    style={{
                                                                      fontWeight:'100'
                                                                    }}>
                                                                      {data?.name}
                                                                    </span>
                                                                </h2>
                                                            </div>
                                                             {/* Sound wave Layer */}
                                                            <div className='absolute flex z-50  w-[20rem] h-[10rem] items-start justify-end p-6'>
                                                                <div className='flex bottom w-[10rem] h-[4rem] text-5xl justify-end bg-secondary opacity-90'
                                                                style={{
                                                                  fontWeight:'100'
                                                                }}>
                                                                      {data?.name === 'Engine' || data?.name === 'engine' ? (
                                                                      <div                 
                                                                                className=" flex z-50 bottom-0 left-6 items-center justify-center cursor-pointer p-2"
                                                                                onClick={() => { handleAudioToggle(index, tool?.sound); handleClick(); }}
                                                                              >
                                                                                <div className="flex items-center justify-center rounded-full w-[3rem] h-[3rem] bg-primary opacity-90">
                                                                                  <FontAwesomeIcon icon={playingIndex === index ? faVolumeHigh : faVolumeDown} className='h-5'/>
                                                                                </div>
                                                                              </div> ) : (
                                                                                  <div className='hiddne'/>
                                                                              )}
                                                                    
                                                                </div>
                                                            </div>
                                                            {/* Button Layer */}
                                                            <div
                                                              className="absolute flex z-50 bottom-2 left-6 items-center justify-center space-x-2 cursor-pointer p-2"
                                                              
                                                            > 
                                                              <div className={`flex items-center justify-center rounded-full ${activeIndex === index && click ? 'bg-green-600' : 'bg-primary'} w-[1rem] h-[1rem]  opacity-90`}/>

                                                              <div className={`flex items-center justify-center rounded-full ${activeIndex === index && click ? 'bg-primary' : 'bg-red-700'} w-[1rem] h-[1rem] opacity-90`}/>
                                  
                                                         
                                                            </div>
                                                            

                                                        </div>  
                                                    <button className="absolute h-[0.8rem] w-[15rem] font-dmsans lgs:mb-0 lgs:mt-12 rounded-full blur-lg items-center justify-center bg-secondary"/>
                                                  
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper>
                                
                            </div>

    
    
              </div> 
    
            )

         }     



    </div>


)}


    </div>
   
   

  );
} ;

export default Detailpage;
