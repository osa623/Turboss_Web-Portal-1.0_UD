"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";


// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";




// Images
import background from '../../assests/detailbackground1.jpg';
//import background1 from '../../assests/detailbackground2.jpg';
import background2 from '../../assests/detailbackground3.jpg';

//css imports
import '../../detailpage/base.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';



//craete an interface for the data

interface ToolData {

  id: number;
  name: string;
  image: string;
  shadow: string;
  description: string;
  details: string[];
  detailset1: Array<{
    topic: string;
    Description: string;
  }>;
  partset1: Array<{
    name: string;
    image: string;
    description: string;
  }>;
  variations: Array<{
      name: string;
      image: string;
  }>;
}




const Detailpage = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [parallex1 , setParallex1] = useState(0);
    
    //craete an interface of that dataset from the json file

    interface Tools {

        id: number;
        name: string;
        image: string;
        shadow: string;
        description: string;
        details: string[];
    }

    const [dnaData, setDnaData] = useState<Tools[]>([]);

    //navigation







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



    //hook for fetch DNA data Section

    useEffect(()=> {

        fetch('/data/DnaData.json').then((response) => response.json()).then((json) => setDnaData(json));

    } ,[]);








  
  const [data, setData] = useState<ToolData | null>(null);
  const [loading, isLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedname , setSelectedName] = useState<string | null>(null);
  const [selectedDescription , setSelectedDescription] = useState<string | null>(null);
  const [expandSection , setExpandSection] = useState(false);


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
      
      <div className='relative flex w-full h-[100vh]'>
       
        <Image
          src={background}
          alt='background'
          className='object-cover w-full h-full'
          layout='fill'
        />
        
    

        <div className='absolute flex lgs:w-[50vw] right-0 h-full z-30'>
          {/* Portal Video */}
          <div className='absolute flex lgs:w-[50vw] lgs:h-[50vh] lgs:-bottom-5 left-12 bg-transparent items-center justify-center z-50'>
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
          <div className='absolute flex lgs:w-[50vw] lgs:h-[50vh] lgs:bottom-48 left-12 bg-transparent animate-floating1 items-center justify-center z-40'>
          {data && data.image && (
              <Image
                src={data.image}
                width={'300'}
                height={'300'}
                alt={data.name}
                className='flex object-cover lgs:h-auto lgs:w-[30vw]'
              />
            )}
          </div>
        </div>


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
 
                {/* Upper Section */}
                <div className={`flex ${expandSection ? 'lgs:w-[50vw]' : 'lgs:w-[50vw]'} lgs:h-[40rem] bg-orange-600  z-40 items-center`}>

                      <div className='flex lgs:w-[50vw] lgs:h-[40rem] z-40 bg-transparent items-center justify-center'>

                          <h2 className='font-poppins opacity-20 text-nowrap lgs:p-2 place-content-center z-40 text-primary'style={{
                            fontWeight:'100',
                            fontSize:'30rem'
                          }}>
                            {
                            selectedname ? `${selectedname}` : 'Parts'
                          }
                          </h2>

                          <div className='absolute lgs:h-[40rem] lgs:w-full bg-orange-600 z-20'/>
                          
                          {/* Content Area for upper section */}
                          <div className='absolute flex flex-col  lgs:h-[40rem] lgs:w-full bg-transparent z-50'>


                          {/* Navigation Section */}
                            <div className='flex w-full lgs:h-[5rem] bg-primary overflow-hidden z-50 items-center justify-center'>

                             <div onClick={()=> handleExpand() } className= {`absolute flex cursor-pointer lgs:w-[10rem] lgs:h-[5rem] bg-orange-600 right-0 items-center justify-center`}>

                                Sample

                             </div> 

                            </div>
                            
                            
                          {/* Upper Parts Section Section */}
                           <div className='flex w-full lgs:h-[35rem] bg-transparent z-50 items-center justify-center'>
                              {/* Parts Section */}
                              <div className={`flex flex-col lgs:h-[35rem] ${expandSection ? 'lgs:w-[30vw]' : 'lgs:w-[20vw]'} transition-all duration-1000 ease-in-out place-content-center z-50 place-items-center scrollbar-hide overflow-y-scroll bg-transparent`}>

                                <div className='absolute flex items-center justify-center flex-col lgs:space-y-2 lgs:h-[35rem] lgs:w-[20vw] z-40'>
                                  {data?.partset1.map((tool, index) => (

                                      <div key={index} onClick={() => { setSelectedImage(tool?.image); setSelectedName(tool?.name); setSelectedDescription(tool?.description); }} className='flex flex-col border-2 rounded-lg cursor-pointer w-[4rem] h-[4rem]'>
                                        <Image
                                          src={tool?.image}
                                          width={'100'}
                                          height={'100'}
                                          alt={tool?.name}
                                          className='object-cover w-[4rem] hover:scale-150 h-[4rem] transition-all duration-500 ease-in-out'
                                        />
                                      </div>

                                  ))}
                                  </div>

                                  <div className='absolute opacity-40  bg-orange-700 lgs:h-[35rem] lgs:w-[20vw] z-20'/>

                              </div> 

                              {/* View Part Section */}
                                <div className={`flex flex-col lgs:h-[35rem] ${expandSection ? 'lgs:w-[70vw]' : 'lgs:w-[80vw]'} transition-all duration-1000 ease-in-out items-start justify-start bg-transparent`}>
 
                                    <div className='flex w-full items-center justify-center h-auto lgs:mt-12'>


                                      
                                    {
                                      selectedImage ? (
                                        <div className="relative flex items-center justify-center">
                                              <div className='flex  w-auto h-auto z-30'>  
                                                    <Image
                                                      src={selectedImage}
                                                      width={400} 
                                                      height={400}
                                                      alt="Selected Image"
                                                      className="object-cover lgs:w-[20rem] lgs:h-[20rem] lgs:scale-125 z-40"
                                                    />
                                              </div>

                                      </div>
                                      ) : (
                                        <div className="p-10">
                                        <Image
                                          src={data?.partset1[0].image || '/path/to/default/image.jpg'}
                                          width={300} 
                                          height={300}
                                          alt="Selected Image"
                                          className="object-cover lgs:w-[15rem] lgs:h-[15rem]"
                                        />
                                        </div>
                                      )
                                    }
                                    </div>

                                    <div className='absolute w-auto h-auto items-center justify-center'>
                                        <div className='absolute flex  lgs:w-[18rem] opacity-25 h-auto items-center justify-center z-20'>
                                                  <h2 className='flex  font-bricolagegrotesque text-center text-9xl text-nowrap  z-30  text-primary lgs:p-2 '
                                                style={{
                                                  fontWeight:'600'
                                                }}>
                                                  {selectedImage ? `${selectedname}` : 'Select a Part'}
                                              </h2>
                                        </div>
                                    </div>

                                    <div className='flex w-full items-center justify-center h-[25rem]'>
                                        
                                        <p className='flex flex-col font-bricolagegrotesque lgs:w-[30vw] text-center text-shadow-xl lgs:text-lg lgs:p-2 text-primary'style={{
                                          fontWeight:'100'
                                        }}>
                                          {selectedImage ? `${selectedDescription}` : 'Select a Part'}
                                          
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



                  <div className={`flex flex-col ${expandSection ? 'lgs:w-[100vw]' : 'lgs:w-[50vw]'} h-auto lgs:space-y-5 transition-all duration-1000 ease-in-out bg-transparent items-start  lgs:p-8 justify-center`}>

                    {data?.detailset1.map((tool, index) => (

                      <div key={index}  className={`flex flex-col ${expandSection ? 'lgs:w-[60vw]' : 'lgs:w-[45vw]'} transition-all duration-1000 ease-in-out h-auto`}
                      style={{
                        marginTop:`${index}rem`
                      }}>
                          <div className='flex w-auto h-auto'>

                                    
                          <h2 className='flex flex-col font-bricolagegrotesque text-lg lgs:p-2  bg-orange-600 text-primary'style={{
                            boxShadow:'0px 0px 10px 1px rgba(0, 0, 0, 0.2)',
                            fontWeight:'700'
                          }}>
                            <span className='flex font-thin'>{tool?.topic}</span>
                            
                          </h2>


                          </div>  

                          <div className='flex w-auto h-auto'>


                            <p className='flex flex-col font-bricolagegrotesque text-md lgs:p-2  text-secondary'style={{
                              fontWeight:'100'
                            }}>
                              {tool?.Description}
                              
                            </p>


                          </div> 
                      </div>    

                    ))}





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

      




        <div className='flex bg-secondary w-full  lgs:h-[30rem]'>


        </div>  
              {/* Variation Section */}
         {

            data?.variations && (
              <div className='relative lgs:h-auto w-full'>

              <Image src={background2} alt='turbo' className='object-cover w-full h-full' layout='fill' />

                            <div className='flex w-full lgs:h-[10rem] bg-transparent'>
    
                            <div className="absolute flex items-start justify-center w-full h-[20rem] bg-gradient-to-b from-primary via-primary to-transparent">
                               <div className="flex w-auto h-auto mt-12">
                                  <h2 className="font-bricolagegrotesque text-primary bg-orange-600 lgs:p-4 lgs:text-6xl text-center"
                                  style={{
                                    fontWeight:'200'
                                  }}>
                                    Engine
                                  </h2>
                                  <h2 className="flex items-center justify-center bg-primary p-1 flex-col font-bricolagegrotesque text-orange-600 lgs:p-2 text-5xl text-center" style={{
                                    fontWeight:'900',
                                    boxShadow:'0px 1px 20px 2px rgba(0,0,0,0.4)'
                                  }}>
                                    VARIATIONS<span className="text-xs font-dmsans text-secondary" style={{
                                        fontWeight:'100'
                                    }}>
                                        Turboss Garage Lesson 01
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
                                        {data?.variations.map((tool, index) => {
                                            let opacity = 0.9;
    
                                            if (index === activeIndex) {
                                                opacity = 1;
                                            } else if (index === activeIndex - 1 || index === activeIndex + 1) {
                                                opacity = 1;
                                            }
    
                                            return (
                                                <SwiperSlide key={index}>
    
                                                    <div className="flex lgs:h-[30rem] bg-transparent  items-center justify-center">
                                                        <Image
                                                            src={tool?.image}
                                                            alt="tool_id"
                                                            width={400}
                                                            height={400}
                                                            className="object-cover animate-floating w-auto h-auto"
                                                            style={{
                                                                opacity
                                                            }}
                                                        />
                                                    </div>
                                                    <div
                                                        className=" flex flex-col lgs:h-[30rem] items-center justify-start w-full transition-opacity duration-500"
                                                        style={{ opacity }}
                                                    >
                                                        
                                                        <div className='relative lgs:w-[20rem] lgs:h-[10rem] rounded-2xl bg-secondary items-center justify-center overflow-hidden'
                                                        style={{
                                                          boxShadow:'inset 0px 0px 10px 5px rgba(255, 255, 255, 0.2)'
                                                        }}>
                                                            {/* Turboss Layer */}
                                                            <div className='absolute flex z-20  lgs:w-[20rem] lgs:h-[10rem] items-end justify-end lgs:mt-4 '>
                                                                <h2 className='font-poppins bottom  text-8xl text-primary opacity-10'
                                                                style={{
                                                                  fontWeight:'100'
                                                                }}>
                                                                    Turboss
                                                                </h2>
                                                            </div>
                                                            {/* Garage Layer */}
                                                            <div className='absolute flex z-20  lgs:w-[20rem] lgs:h-[10rem] items-end justify-end'>
                                                                <h2 className='font-bricolagegrotesque bottom  text-md text-primary opacity-40 lgs:mr-2'
                                                                style={{
                                                                  fontWeight:'100'
                                                                }}>
                                                                    turboss.com
                                                                </h2>
                                                            </div>
                                                             {/* Upper Layer */}
                                                            <div className='absolute flex z-30  lgs:w-[20rem] lgs:h-[10rem] items-start justify-start lgs:p-6'>
                                                                <h2 className='flex flex-col font-poppins bottom  text-5xl items-center justify-center text-orange-600 opacity-90'
                                                                style={{
                                                                  fontWeight:'100'
                                                                }}>
                                                                    {tool?.name}<span className='lgs:text-xl text-primary font-poppins'
                                                                    style={{
                                                                      fontWeight:'100'
                                                                    }}>
                                                                      Engine
                                                                    </span>
                                                                </h2>
                                                            </div>
                                                             {/* Sound wave Layer Layer */}
                                                            <div className='absolute flex z-50  lgs:w-[20rem] lgs:h-[10rem] items-start justify-end lgs:p-6'>
                                                                <div className='font-poppins bottom lgs:w-[10rem] lgs:h-[4rem] text-5xl bg-primary opacity-90'
                                                                style={{
                                                                  fontWeight:'100'
                                                                }}>
                                                                    
                                                                </div>
                                                            </div>
                                                            {/* Button Layer */}
                                                           <div className='absolute flex z-50 bottom-0 lgs:left-6  items-center justify-center cursor-pointer lgs:p-2'>
                                                                <div className='flex items-center justify-center rounded-full lgs:w-[2.5rem] lgs:h-[2.5rem]  bg-primary opacity-90'>
                                                                    <FontAwesomeIcon icon={faVolumeHigh} />
                                                                </div>
                                                            </div>
                                                            

                                                        </div>  

                                                        <div className='absolute lgs:w-[20rem] lgs:mt-48 blur-xl bg-black lgs:h-[2rem]'/>
                                                        

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
