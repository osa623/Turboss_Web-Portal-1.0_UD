'use client';


import Image from 'next/image';

//import images
import backGround from '../../assests/mainBackground.jpg';
import logo from '../../assests/turbossLogo.png';

export default function RegisterPage() {

  return (
    <div className="relative items-center justify-center h-screen w-full overflow-hidden">

       {/* Background Image */}
         <div className='absolute inset-0 z-0 w-full h-screen'>
                <Image src={backGround} alt="Background" layout="fill" objectFit="cover" />
         </div>

        {/* Text Set Layout */}
        <div className='absolute flex flex-col inset-0 z-10 w-full h-screen'>
            <h2 className='flex -top-96 h-[50%] text-9xl animate-movingText01 font-bricolagegrotesque text-primary'
            style={{
              fontWeight:'100',
              fontSize:'30rem',
            }}>
                Turboss
              </h2>  
              <h2 className='flex bottom-0 h-[50%] text-9xl animate-movingText01Reverse font-bricolagegrotesque text-primary'
            style={{
              fontWeight:'100',
              fontSize:'30rem',
            }}>
                Turboss
              </h2>        
         </div>

        {/* Gradient Set Layout */}
        <div className='relative inset-0 z-20 w-full h-screen'>
            <div className='absolute  w-[100%] h-full bg-gradient-to-r left-0 from-secondary to-transparent opacity-100'/>
            <div className='absolute  w-[100%] h-full bg-gradient-to-l right-0 from-secondary to-transparent opacity-100'/>
            <div className='absolute  h-[50%] w-[100%] bg-gradient-to-t bottom-0 from-secondary to-transparent opacity-100'/>
            <div className='absolute  h-[100%] w-[100%] bg-gradient-to-b top-0 from-secondary to-transparent opacity-100'/>
         </div>

        {/* Register Form */}
        <div className='absolute flex bg-transparent inset-0 items-center justify-center z-30 h-screen w-full'>

               <div className='relative w-[50%] bg-transparent h-screen'>

                 {/* Upper layer for info */} 
                <div className='absolute flex w-full inset-0 bg-gradient-to-r from-secondary via-secondary to-transparent  h-screen z-20'/>

                  

                        {/* Upper layer for info */} 
                        <div className='absolute flex flex-col w-auto h-screen items-center justify-center z-30'> 

                            {/* adding middle layer for this one  */}
                            <div className='flex flex-col justify-center  items-center w-[100%] h-screen bg-transparent'>

                                {/* Top Layer Details */}
                                <div className='flex flex-col w-auto items-center justify-center py-4 h-auto'>
                                    <h2 className='font-dmsans text-primary text-2xl'
                                    style={{
                                        fontWeight:'100',
                                    }}>
                                        Welcome to <span className='text-orange-600 font-semibold'>Turboss</span>
                                    </h2>
                                    <h2 className='font-dmsans text-primary py-2 text-3xl'
                                    style={{
                                        fontWeight:'100',
                                    }}>
                                    The Digital Garage Platform
                                    </h2>
                                </div>


                                {/* Image Layer */}
                                <Image src={logo} alt='' className='w-[40%] h-auto'/>


                                {/* Bottom Layer Details */}
                                <div className='flex flex-col w-auto h-auto items-center justify-center py-4'>

                                    <p className='font-dmsans text-center text-primary w-[60%] text-md'
                                    style={{
                                        fontWeight:'200',

                                    }}>
                                    To explore our full range of automotive specifications, technical details, and model information, you’ll need to register as a member. Registration is quick and gives you uninterrupted access to all available vehicle data on the platform.
                                    </p>

                                    <h2 className='font-dmsans py-4 text-primary text-md'>
                                    Already registered? <span className='font-russoone text-orange-600'>Login here</span>
                                    </h2>

                                </div>   
                            
                            </div>

                        </div>    
                        
                        
                </div> 

                {/* Upper layer for Registration Page */} 
                <div className='flex flex-col w-[50%] p-12  bg-opacity-90 h-auto rounded-lg shadow-lg items-center justify-center'>

                    <h2 className='font-dmsans text-primary text-3xl mb-6 font-semibold'>
                        Create Your Account
                    </h2>

                    <form className='flex flex-col bg-transparent border-2 p-12 rounded-3xl w-full space-y-4'>

                        <div className='flex flex-row space-x-4'>
                            {/* First Name */}
                            <div className='flex flex-col w-1/2'>
                                <label htmlFor='firstname' className='font-dmsans text-primary text-sm mb-1'>
                                    First Name
                                </label>
                                <input
                                    type='text'
                                    id='firstname'
                                    name='firstname'
                                    placeholder='Enter your first name'
                                    className='p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary'
                                />
                            </div>

                            {/* Last Name */}
                            <div className='flex flex-col w-1/2'>
                                <label htmlFor='lastname' className='font-dmsans text-primary text-sm mb-1'>
                                    Last Name
                                </label>
                                <input
                                    type='text'
                                    id='lastname'
                                    name='lastname'
                                    placeholder='Enter your last name'
                                    className='p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary'
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className='flex flex-col'>
                            <label htmlFor='email' className='font-dmsans text-primary text-sm mb-1'>
                                Email
                            </label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                placeholder='Enter your email'
                                className='p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary'
                            />
                        </div>

                        {/* Password */}
                        <div className='flex flex-col'>
                            <label htmlFor='password' className='font-dmsans text-primary text-sm mb-1'>
                                Password
                            </label>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                placeholder='Enter your password'
                                className='p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary'
                            />
                        </div>

                        {/* Re-Password */}
                        <div className='flex flex-col'>
                            <label htmlFor='repassword' className='font-dmsans text-primary text-sm mb-1'>
                                Confirm Password
                            </label>
                            <input
                                type='password'
                                id='repassword'
                                name='repassword'
                                placeholder='Re-enter your password'
                                className='p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary'
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type='submit'
                            className='w-full bg-orange-600 text-white font-dmsans py-3 rounded-lg hover:bg-secondary-dark transition duration-300'
                        >
                            Register
                        </button>
                    </form>

                </div>

         </div>



       </div>

    
  );
}