import React from 'react';
import Image from "next/image";


//images
import logo from "../assests/turbossLogo.png";
import logoFooter from "../assests/logoFooter.png";
import qrCode from '../assests/qrBuyMeACoffee.png';

const Footer = () => {
  return (
    <div className='relative bg-secondary z-40 lgs:h-[80vh] sms:h-screen w-full'>


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
                   <div className='flex w-auto h-auto group cursor-pointer'>
                    <h2 className='font-bricolagegrotesque text-primary bg-orange-600 font-bold text-shadow-xl lgs:p-3 lgs:text-xl transition-colors duration-200 group-hover:bg-orange-700 group-hover:text-white'>
                      Turboss
                    </h2>
                    <h2 className='font-poppins text-primary lgs:text-xl lgs:p-2 transition-colors duration-200 group-hover:text-orange-700'
                    style={{
                      fontWeight:'200'
                    }}>
                      DNA
                    </h2>
                   </div>
                   <div className='flex w-auto h-auto group cursor-pointer'>
                    <h2 className='font-bricolagegrotesque text-orange-600 bg-primary font-bold lgs:p-3 lgs:text-xl transition-colors duration-200 group-hover:bg-orange-600 group-hover:text-white'>
                      Turboss
                    </h2>
                    <h2 className='font-poppins text-primary lgs:text-xl lgs:p-2 transition-colors duration-200 group-hover:text-orange-700'
                    style={{
                      fontWeight:'200'
                    }}>
                      Lab
                    </h2>
                   </div>
                   <div className='flex w-auto h-auto group cursor-pointer'>
                    <h2 className='font-bricolagegrotesque text-primary bg-orange-600 font-bold text-shadow-xl lgs:p-3 lgs:text-xl transition-colors duration-200 group-hover:bg-orange-700 group-hover:text-white'>
                      Turboss
                    </h2>
                    <h2 className='font-poppins text-primary lgs:text-xl lgs:p-2 transition-colors duration-200 group-hover:text-orange-700'
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
                      <h2
                        className='font-poppins text-primary lgs:text-lg lgs:p-1 transition-colors duration-200 cursor-pointer hover:text-orange-600'
                        style={{
                        fontWeight: '200'
                        }}
                      >
                        About Us
                      </h2>
                     </div>
                     <div className='flex w-auto h-auto'>
                      <h2
                        className='font-poppins text-primary lgs:text-lg lgs:p-1 transition-colors duration-200 cursor-pointer hover:text-orange-600'
                        style={{
                        fontWeight: '200'
                        }}
                      >
                        Privacy Policy
                      </h2>
                     </div>
                     <div className='flex w-auto h-auto'>
                      <h2
                        className='font-poppins text-primary lgs:text-lg lgs:p-1 transition-colors duration-200 cursor-pointer hover:text-orange-600'
                        style={{
                        fontWeight: '200'
                        }}
                      >
                        Terms of Service
                      </h2>
                     </div>
                     <div className='flex w-auto h-auto'>
                      <h2
                        className='font-poppins text-primary lgs:text-lg lgs:p-1 transition-colors duration-200 cursor-pointer hover:text-orange-600'
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
               <div className='flex flex-col lgs:w-[30vw] h-auto'>
                  <h2 className='font-poppins text-primary lgs:text-2xl'>
                    Meet the Dev
                  </h2>
                  <div className='flex lgs:w-[30vw] lgs:mt-4 h-auto items-start justify-start'>
                        <div className='relative flex place-content-center lgs:w-[20vw] h-auto items-start justify-start'>
                            <Image src={logoFooter} alt='logo' className='object-cover  h-[5rem] lgs:h-[8rem] lgs:w-auto'/>
                            <div className='flex flex-col w-auto items-center justify-center h-auto'>
                            <Image src={qrCode} alt='logo' className='object-cover  h-[5rem] lgs:h-[8rem] p-2 lgs:w-auto'/>
                            <h2 className='font-bubblerOne lgs:text-sm font-bold bg-yellow-500 lgs:p-2 rounded-2xl text-primary transition-colors duration-200 hover:bg-yellow-400 hover:text-orange-700 cursor-pointer'>
                              buy me a coffee
                            </h2>
                            </div>
                        </div>
                        <div className='flex lgs:w-[10vw] h-auto'>

                        </div>
                  </div>
               </div>

               </div>
                <div className='flex w-full h-auto items-center justify-center'>
                  <div className='flex flex-col items-center text-primary font-poppins text-center'>
                    <div className='text-xs w-full lgs:mt-4 text-left p-6'>
                    <p className='mb-2'>
                      At Turboss Garage, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, store, and safeguard your data when you interact with our website and services. We collect only the information necessary to provide you with our automotive solutions, such as your name, contact details, and service preferences. Your data is used solely for communication, service delivery, and improving your experience with us. We do not sell, trade, or share your personal information with third parties except as required by law or with your explicit consent.
                    </p>
                    <p className='mb-2'>
                      All information is stored securely using industry-standard measures, and access is restricted to authorized personnel only. We may use cookies and similar technologies to enhance your browsing experience and analyze website traffic, but you can manage your preferences at any time. By using our website, you consent to the terms of this Privacy Policy. We may update this policy periodically, and any changes will be posted on this page. If you have questions or concerns about your privacy, please contact us at <a href="mailto:info@turbossgarage.com" className='underline hover:text-orange-600'>info@turbossgarage.com</a>.
                    </p>
                    <p>
                      Thank you for trusting Turboss Garage with your automotive needs. Your privacy and satisfaction are our top priorities.
                    </p>
                    </div>
                  </div>
                </div>

            
            </div>  
  

       </div>

      <div className='absolute bottom-0 w-full h-[3rem] bg-orange-600'/>
      
    </div>
  )
}

export default Footer;
