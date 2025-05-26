'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginUser } from '../../lib/auth';

//import images
import backGround from '../../assests/mainBackground.jpg';
import logo from '../../assests/turbossLogo.png';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Login with Firebase Auth (email and password only)
      await loginUser(email, password);
      
      console.log("User logged in successfully");
      
      // Redirect to dashboard
      router.push('/homepage');
    } catch (err: any) {
      console.error("Login error:", err);
      
      // Provide more user-friendly error messages
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password. Please try again.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed login attempts. Please try again later.');
      } else {
        setError(err.message || 'Failed to login');
      }
    } finally {
      setLoading(false);
    }
  };

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

        {/* Login Form */}
        <div className='absolute flex bg-transparent inset-0 items-center justify-center z-30 h-screen w-full'>

                {/* Upper layer for Login Page */} 
                <div className='flex flex-col w-[50%] sms:w-full lgs:p-12 sms:p-5  bg-opacity-90 h-auto rounded-lg shadow-lg items-center justify-center'>

                    <h2 className='font-dmsans text-primary text-3xl mb-6 font-semibold'>
                        Login to Your Account
                    </h2>

                    {error && (
                      <div className="w-full p-3 mb-4 bg-red-100 text-red-700 rounded-lg">
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className='flex flex-col bg-transparent border-2 lgs:p-12 sms:p-5 lgs:rounded-3xl w-full space-y-4'>

                      {/* Email */}
                      <div className='flex flex-col'>
                        <label htmlFor='email' className='font-dmsans text-primary text-sm mb-1'>
                          Email
                        </label>
                        <input
                          type='email'
                          id='email'
                          name='email'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder='Enter your email'
                          className='p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary'
                          required
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
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder='Enter your password'
                          className='p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary'
                          required
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type='submit'
                        disabled={loading}
                        className='w-full bg-orange-600 text-white font-dmsans py-3 rounded-lg hover:bg-orange-700 transition duration-300 disabled:bg-orange-400'
                      >
                        {loading ? 'Logging in...' : 'Login'}
                      </button>
                    </form>

                    <h2 className='hidden w-full items-center mt-8 sms:flex flex-col font-dmsans py-4 text-primary text-md'>
                        Not a member yet? <Link href="/auth/registerpage" className='font-russoone text-orange-600 hover:underline'>Register here</Link>
                    </h2>

                </div>

                {/* Upper layer for Design */} 
                <div className='relative hidden lgs:flex w-[50%] bg-transparent h-screen'>

                        {/* Upper layer for info */} 
                        <div className='absolute flex w-full inset-0 bg-gradient-to-l from-secondary via-secondary to-transparent  h-screen z-20'/>

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
                                         Already a member? Log in to access our complete library of automotive specifications, technical details, and model information. Enjoy uninterrupted access to all data available on the platform.
                                          </p>

                                          <h2 className='font-dmsans py-4 text-primary text-md'>
                                          Not a member yet? <Link href="/auth/registerpage" className='font-russoone text-orange-600 hover:underline'>Register here</Link>
                                          </h2>

                                      </div>   
                                  </div>
                              </div>    
                </div> 
         </div>
       </div>
  );
}