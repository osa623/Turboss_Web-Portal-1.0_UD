import React from 'react';
import Image from "next/image";


//images
import logo from "../assests/turbossLogo.png";

const Footer = () => {
  return (
    <div className='relative bg-secondary z-50 h-[80vh] w-full'>


       <div className='absolute flex top-0 w-full h-[80vh]  bg-transparent'>
         
            <div className='flex flex-col items-center justify-start lgs:w-[30vw]'>

                {/* Footer header */}


                {/* Footer logo */}
                <Image src={logo} alt='logo' className='w-[10rem] lgs:mt-12 h-[10rem] lgs:w-[20rem] lgs:h-[20rem]'/>

                <h2 className='flex text-sm lgs:mt-4 lgs:w-[25vw] font-bricolagegrotesque text-primary'
                style={{
                  fontWeight:'100'
                }}>
                Discover a digital hub for car enthusiasts featuring the latest tools, gadgets, and garage setups. Stay informed and inspired—whether you’re a mechanic, DIY tuner, or tech lover—and elevate your garage experience
                </h2>
              
            </div>  

            <div className='flex items-start justify-center lgs:w-[70vw] lgs:p-12'>

  
                {/* Footer links 1 */}  
               <div className='flex flex-col lgs:w-[25vw] h-auto'>
                  <h2 className='font-poppins text-primary lgs:text-2xl'>
                    Platforms
                  </h2>
                  <div className='flex flex-col mt-4 lgs:space-y-3'>
                     <div className='flex w-auto h-auto'>
                        <h2 className='font-bricolagegrotesque text-primary bg-orange-600 font-bold text-shadow-xl lgs:p-3 lgs:text-xl'>
                          Turboss
                        </h2>
                        <h2 className='font-poppins text-primary lgs:text-xl lgs:p-2'
                        style={{
                          fontWeight:'200'
                        }}>
                          DNA
                        </h2>
                     </div>
                     <div className='flex w-auto h-auto'>
                        <h2 className='font-bricolagegrotesque text-orange-600 bg-primary  font-bold lgs:p-3 lgs:text-xl'>
                          Turboss
                        </h2>
                        <h2 className='font-poppins text-primary lgs:text-xl lgs:p-2'
                        style={{
                          fontWeight:'200'
                        }}>
                          Lab
                        </h2>
                     </div>
                     <div className='flex w-auto h-auto'>
                        <h2 className='font-bricolagegrotesque text-primary bg-orange-600 font-bold text-shadow-xl lgs:p-3 lgs:text-xl'>
                          Turboss
                        </h2>
                        <h2 className='font-poppins text-primary lgs:text-xl lgs:p-2'
                        style={{
                          fontWeight:'200'
                        }}>
                          Tools
                        </h2>
                     </div>
                  </div>  
               </div>

                  {/* Footer links 2 */}  
                  <div className='flex flex-col lgs:w-[25vw] h-auto'>
                  <h2 className='font-poppins text-primary lgs:text-2xl'>
                    Support
                  </h2>
                  <div className='flex flex-col mt-4 lgs:space-y-3'>
                     <div className='flex w-auto h-auto'>
                        <h2 className='font-poppins text-primary lgs:text-xl lgs:p-1'
                        style={{
                          fontWeight:'200'
                        }}>

                            About Us
                                  
                        </h2>
                     </div>
                     <div className='flex w-auto h-auto'>
                        <h2 className='font-poppins text-primary lgs:text-xl lgs:p-1'
                        style={{
                          fontWeight:'200'
                        }}>
                          Privacy Policy
                        </h2>
                     </div>
                     <div className='flex w-auto h-auto'>
                        <h2 className='font-poppins text-primary lgs:text-xl lgs:p-1'
                        style={{
                          fontWeight:'200'
                        }}>
                          Terms of Service
                        </h2>
                     </div>
                     <div className='flex w-auto h-auto'>
                        <h2 className='font-poppins text-primary lgs:text-xl lgs:p-1'
                        style={{
                          fontWeight:'200'
                        }}>

                            FAQs
                                  
                        </h2>
                     </div>
                  </div>  
               </div>

                  
                    {/* Footer links 3 */}
               <div className='flex flex-col lgs:w-[25vw] h-auto'>
                  <h2 className='font-poppins text-primary lgs:text-2xl'>
                    Meet the Dev
                  </h2>
               </div>
            
            </div>  
  

       </div>

      <div className='absolute bottom-0 w-full h-[3rem] bg-orange-600'/>
      
    </div>
  )
}

export default Footer;
