import React from 'react';
import Image from "next/image";

//images
import logo from "../assests/turbossLogo.png";
import logoFooter from "../assests/logoFooter.png";
import qrCode from '../assests/qrBuyMeACoffee.png';

const Footer = () => {
  return (
    <div className='relative overflow-hidden bg-secondary z-40 lgs:h-[80vh]  w-full'>


       <div className='absolute flex sms:flex-col top-0 w-full lgs:h-[80vh] sms:h-auto bg-secondary sms:pb-12'>
         
            <div className='flex flex-col items-center justify-start lgs:w-[30vw] mds:w-[40vw] sms:w-full sms:px-4'>

                {/* Footer header */}


                {/* Footer logo */}
                <div className='flex flex-col items-center mds:py-4'> 
                <Image src={logo} alt='logo' className='w-[10rem] lgs:mt-12 sms:mt-8 mds:h-[15rem] mds:w-[15rem] lgs:w-[20rem] lgs:h-[20rem] sms:w-[8rem] sms:h-[8rem]'/>

                <h2 className='flex text-sm lgs:mt-4 sms:mt-2 lgs:w-[20vw] mds:w-[90%] mds:text-center sms:w-full sms:text-center sms:px-2 font-poppins text-primary sms:text-sm'
                style={{
                  fontWeight:'200'
                }}>
                Discover a digital hub for car enthusiasts featuring the latest tools, gadgets, and garage setups. Stay informed and inspired—whether you are a mechanic, DIY tuner, or tech lover—and elevate your garage experience
                </h2>
                </div>

                              {/* Footer links 3 */}
               <div className='hidden mds:flex flex-col w-full h-auto py-2'>
                  <h2 className='font-poppins text-primary text-md px-4 mb-2'>
                    Meet the Dev
                  </h2>
                  <div className='flex w-full items-center lgs:mt-4 mt-2 h-auto justify-center sms:justify-center'>
                        <div className='relative flex place-content-center  sms:w-auto h-auto items-start justify-start sms:flex-col sms:items-center'>
                            <Image src={logoFooter} alt='logo' className='object-cover h-[5rem] w-auto'/>
                            <div className='flex px-2 w-auto items-center justify-center h-auto'>
                            <Image src={qrCode} alt='logo' className='object-cover h-[5rem] w-auto sms:w-auto'/>
                            <h2 className='font-bubblerOne lgs:text-sm sms:text-xs font-bold bg-yellow-500 lgs:p-2 sms:p-1 rounded-2xl text-primary transition-colors duration-200 hover:bg-yellow-400 hover:text-orange-700 cursor-pointer'>
                              buy me a coffee
                            </h2>
                            </div>
                        </div>
                        <div className='flex lgs:w-[10vw] sms:hidden h-auto'>

                        </div>
                  </div>
               </div>

                
              
            </div>  

            <div className='flex flex-col items-start sms:items-center mds:items-center mds:w-[60vw] justify-start lgs:w-[70vw] sms:w-full sms:px-4'>

              <div className='flex  w-auto lgs:mt-12 mt-12 sms:px-6 h-auto space-x-6'>
                {/* Footer links 1 */}  
                 <div className='flex flex-col w-[20vw] sms:w-full mds:py-4 h-auto'>
                  <h2 className='font-poppins text-primary lgs:text-2xl sms:text-xl sms:mb-2'>
                  Platforms
                  </h2>
                  <div className='flex flex-col mt-4 sms:mt-2 mds:items-start mds:justify-center lgs:space-y-3 sms:space-y-2'>
                   <div className='flex w-auto h-auto group mds:space-x-1 cursor-pointer'>
                    <h2 className='font-bricolagegrotesque text-primary bg-orange-600 font-bold text-shadow-xl lgs:p-3 p-2 lgs:text-xl sms:text-base transition-colors duration-200 group-hover:bg-orange-700 group-hover:text-white'>
                      Turboss
                    </h2>
                    <h2 className='font-poppins text-primary lgs:text-xl sms:text-base p-2 sms:p-1 transition-colors duration-200 group-hover:text-orange-700'
                    style={{
                      fontWeight:'200'
                    }}>
                      DNA
                    </h2>
                   </div>
                   <div className='flex w-auto h-auto group mds:space-x-1  cursor-pointer'>
                    <h2 className='font-bricolagegrotesque text-orange-600 bg-primary font-bold lgs:p-3 p-2 lgs:text-xl sms:text-base transition-colors duration-200 group-hover:bg-orange-600 group-hover:text-white'>
                      Turboss
                    </h2>
                    <h2 className='font-poppins text-primary lgs:text-xl sms:text-base p-2 sms:p-1 transition-colors duration-200 group-hover:text-orange-700'
                    style={{
                      fontWeight:'200'
                    }}>
                      Lab
                    </h2>
                   </div>
                   <div className='flex w-auto h-auto group mds:space-x-1  cursor-pointer'>
                    <h2 className='font-bricolagegrotesque text-primary bg-orange-600 font-bold text-shadow-xl lgs:p-3 p-2 lgs:text-xl sms:text-base transition-colors duration-200 group-hover:bg-orange-700 group-hover:text-white'>
                      Turboss
                    </h2>
                    <h2 className='font-poppins text-primary lgs:text-xl sms:text-base p-2 sms:p-1 transition-colors duration-200 group-hover:text-orange-700'
                    style={{
                      fontWeight:'200'
                    }}>
                      Tools
                    </h2>
                   </div>
                  </div>  
                 </div>
                 
               {/* Footer links 2 */}  
               <div className='flex flex-col lgs:w-[20vw] sms:w-full mds:py-4 h-auto'>
                  <h2 className='font-poppins text-primary lgs:text-2xl sms:text-xl sms:mb-2'>
                    Support
                  </h2>
                    <div className='flex flex-col mt-4 sms:mt-2 lgs:space-y-3 sms:space-y-2'>
                     <div className='flex w-auto h-auto'>
                      <h2
                        className='font-poppins text-primary lgs:text-lg sms:text-base lgs:p-1 sms:p-0 transition-colors duration-200 cursor-pointer hover:text-orange-600'
                        style={{
                        fontWeight: '200'
                        }}
                      >
                        About Us
                      </h2>
                     </div>
                     <div className='flex w-auto h-auto'>
                      <h2
                        className='font-poppins text-primary lgs:text-lg sms:text-base lgs:p-1 sms:p-0 transition-colors duration-200 cursor-pointer hover:text-orange-600'
                        style={{
                        fontWeight: '200'
                        }}
                      >
                        Privacy Policy
                      </h2>
                     </div>
                     <div className='flex w-auto h-auto'>
                      <h2
                        className='font-poppins text-primary lgs:text-lg sms:text-base lgs:p-1 sms:p-0 transition-colors duration-200 cursor-pointer hover:text-orange-600'
                        style={{
                        fontWeight: '200'
                        }}
                      >
                        Terms of Service
                      </h2>
                     </div>
                     <div className='flex w-auto h-auto'>
                      <h2
                        className='font-poppins text-primary lgs:text-lg sms:text-base lgs:p-1 sms:p-0 transition-colors duration-200 cursor-pointer hover:text-orange-600'
                        style={{
                        fontWeight: '200'
                        }}
                      >
                        FAQs
                      </h2>
                     </div>
                    </div>
               </div>

              {/* Footer links 3 */}
               <div className='hidden lgs:flex flex-col lgs:w-[30vw] sms:w-full h-auto'>
                  <h2 className='font-poppins text-primary lgs:text-2xl sms:text-xl sms:mb-2'>
                    Meet the Dev
                  </h2>
                  <div className='flex lgs:w-[30vw] sms:w-full lgs:mt-4 sms:mt-2 h-auto items-start justify-start sms:justify-center'>
                        <div className='relative flex place-content-center lgs:w-[20vw] sms:w-auto h-auto items-start justify-start sms:flex-col sms:items-center'>
                            <Image src={logoFooter} alt='logo' className='object-cover h-[5rem] lgs:h-[8rem] sms:h-[4rem] lgs:w-auto sms:w-auto'/>
                            <div className='flex flex-col w-auto items-center justify-center h-auto'>
                            <Image src={qrCode} alt='logo' className='object-cover h-[5rem] lgs:h-[8rem] sms:h-[4rem] p-2 lgs:w-auto sms:w-auto'/>
                            <h2 className='font-bubblerOne lgs:text-sm sms:text-xs font-bold bg-yellow-500 lgs:p-2 sms:p-1 rounded-2xl text-primary transition-colors duration-200 hover:bg-yellow-400 hover:text-orange-700 cursor-pointer'>
                              buy me a coffee
                            </h2>
                            </div>
                        </div>
                        <div className='flex lgs:w-[10vw] sms:hidden h-auto'>

                        </div>
                  </div>
               </div>

                  


               </div>

               {/* Footer links 3 */}
               <div className='hidden sms:flex mt-8 flex-col items-center justify-center w-full h-auto'>
                  <h2 className='font-poppins text-primary lgs:text-2xl sms:text-xl sms:mb-2'>
                    Meet the Dev
                  </h2>
                  <div className='flex w-full lgs:mt-4 sms:mt-2 h-auto items-start justify-start sms:justify-center'>
                        <div className=' flex place-content-center lgs:w-[20vw] sms:w-auto h-auto items-start justify-start sms:flex-col sms:items-center'>
                            <Image src={logoFooter} alt='logo' className='object-cover h-[15rem]  lgs:w-auto sms:w-auto'/>
                            <div className='flex flex-col w-auto items-center justify-center h-auto'>
                            <Image src={qrCode} alt='logo' className='object-cover h-[8rem] p-2 lgs:w-auto sms:w-auto'/>
                            <h2 className='font-bubblerOne text-sm font-bold bg-yellow-500 p-4 px-12 rounded-2xl text-secondary transition-colors duration-200 hover:bg-yellow-400 hover:text-orange-700 cursor-pointer'>
                              buy me a coffee
                            </h2>
                            </div>
                        </div>
                        <div className='flex lgs:w-[10vw] sms:hidden h-auto'>

                        </div>
                  </div>
               </div>
                <div className='flex w-full h-auto items-center justify-center'>
                  <div className='flex flex-col items-center text-primary font-poppins text-center'>
                    <div className='text-xs sms:text-[10px] w-full lgs:mt-4 sms:mt-6 text-left sms:text-center p-6 sms:p-4'>
                    <p className='mb-2'>
                      At Turboss Garage, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, store, and safeguard your data when you interact with our website and services. We collect only the information necessary to provide you with our automotive solutions, such as your name, contact details, and service preferences. Your data is used solely for communication, service delivery, and improving your experience with us. We do not sell, trade, or share your personal information with third parties except as required by law or with your explicit consent.
                    </p>
                    <p className='mb-2'>
                      All information is stored securely using industry-standard measures, and access is restricted to authorized personnel only. We may use cookies and similar technologies to enhance your browsing experience and analyze website traffic, but you can manage your preferences at any time. By using our website, you consent to the terms of this Privacy Policy. We may update this policy periodically, and any changes will be posted on this page. If you have questions or concerns about your privacy, please contact us at <a href="mailto:info@turbossgarage.com" className='underline hover:text-orange-600'>info@turbossgarage.com</a>.
                    </p>
                    </div>
                  </div>
                </div>

            
            </div>  
  

       </div>

      <div className='absolute bottom-0 z-50 w-full h-[3rem] mds:h-[1rem] sms:h-[2rem] bg-orange-600'/>
      
    </div>
  )
}

export default Footer;

