import React from 'react';
import Image from "next/image";


//images
import logo from "../assests/turbossLogo.png";
import logoFooter from "../assests/logoFooter.png";

const Footer = () => {
  return (
    <div className='relative bg-secondary z-50 lgs:h-[80vh] sms:h-screen w-full'>


       <div className='absolute flex sms:flex-col top-0 w-full lgs:h-[80vh]  bg-transparent'>
         
            <div className='flex flex-col items-center justify-start lgs:w-[30vw]'>

                {/* Footer header */}


                {/* Footer logo */}
                <Image src={logo} alt='logo' className='w-[10rem] lgs:mt-12 h-[10rem] lgs:w-[20rem] lgs:h-[20rem]'/>

                <h2 className='flex text-sm lgs:mt-4 lgs:w-[20vw] font-poppins text-primary'
                style={{
                  fontWeight:'200'
                }}>
                Discover a digital hub for car enthusiasts featuring the latest tools, gadgets, and garage setups. Stay informed and inspired—whether you’re a mechanic, DIY tuner, or tech lover—and elevate your garage experience
                </h2>
              
            </div>  

            <div className='flex flex-col items-start justify-start lgs:w-[70vw]'>

              <div className='flex w-auto lgs:mt-12 h-auto'>
                {/* Footer links 1 */}  
               <div className='flex flex-col lgs:w-[20vw] h-auto'>
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
               <div className='flex flex-col lgs:w-[20vw] h-auto'>
                  <h2 className='font-poppins text-primary lgs:text-2xl'>
                    Support
                  </h2>
                  <div className='flex flex-col mt-4 lgs:space-y-3'>
                     <div className='flex w-auto h-auto'>
                        <h2 className='font-poppins text-primary lgs:text-lg lgs:p-1'
                        style={{
                          fontWeight:'200'
                        }}>

                            About Us
                                  
                        </h2>
                     </div>
                     <div className='flex w-auto h-auto'>
                        <h2 className='font-poppins text-primary lgs:text-lg lgs:p-1'
                        style={{
                          fontWeight:'200'
                        }}>
                          Privacy Policy
                        </h2>
                     </div>
                     <div className='flex w-auto h-auto'>
                        <h2 className='font-poppins text-primary lgs:text-lg lgs:p-1'
                        style={{
                          fontWeight:'200'
                        }}>
                          Terms of Service
                        </h2>
                     </div>
                     <div className='flex w-auto h-auto'>
                        <h2 className='font-poppins text-primary lgs:text-lg lgs:p-1'
                        style={{
                          fontWeight:'200'
                        }}>

                            FAQs
                                  
                        </h2>
                     </div>
                  </div>  
               </div>

                  
                    {/* Footer links 3 */}
               <div className='flex flex-col lgs:w-[30vw] h-auto'>
                  <h2 className='font-poppins text-primary lgs:text-2xl'>
                    Meet the Dev
                  </h2>
                  <div className='flex lgs:w-[30vw] h-auto items-start justify-start'>
                        <div className='relativ flex place-content-center lgs:w-[20vw] h-auto items-start justify-start'>
                            <Image src={logoFooter} alt='logo' className='object-cover lgs:mt-12 h-[5rem] lgs:h-[10rem] lgs:w-auto'/>
                        </div>
                        <div className='flex lgs:w-[10vw] h-auto'>

                        </div>
                  </div>
               </div>

               </div>
               <div className='flex w-full h-auto items-center lgs:mt-12 justify-center'>
               <div className='flex lgs:w-[65vw] lgs:h-[0.01rem] bg-primary'/>
               </div>

            
            </div>  
  

       </div>

      <div className='absolute bottom-0 w-full h-[3rem] bg-orange-600'/>
      
    </div>
  )
}

export default Footer;
