'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

const page = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth/loginpage');
    }
  }, [user, loading, router]);

  // If still loading or not authenticated, show nothing
  if (loading || !user) {
    return null;
  }
  
  return (
    <div className='flex h-screen bg-secondary justify-center items-center w-full'> 
       {/* Push start button */}
       <div className='relative flex flex-col lgs:w-[30rem] lgs:h-[30rem] bg-transparent items-center justify-center'>
            <div className='relative flex bg-gray-500 rounded-full w-[20rem] z-40 h-[20rem] items-center justify-center overflow-hidden '>
                  <div className='relative flex bg-gray-700 rounded-full w-[18rem] z-40 h-[18rem] overflow-hidden '></div>
            </div>
       </div>
    </div>
  )
}

export default page;
