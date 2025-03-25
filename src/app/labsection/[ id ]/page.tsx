"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

const Labsection = () => {

  //interface 
  interface ToolData {
    id: number;
    introduction: string;
    subSec: {
      title: string;
      description: string;
      goal: string;
    };
  }

  const [isLoading, setIsLoading] = useState(true);
  const [labData, setLabData] = useState<ToolData | null>(null);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      fetch(`/data/LabData.json`)
        .then((response) => response.json())
        .then((json) => {
          const data = json.find((item: ToolData) => item.id === parseInt(id as string));
          setLabData(data);
          setIsLoading(false);
        });
    }
  }, [id]);

  console.log("ID:", id); // Debugging

  return (
    <div className='relative flex h-screen w-full bg-black items-center justify-center text-white'>
      {isLoading ? (
        <p>Loading...</p>
      ) : labData && labData.subSec ? (
        <div>
          <h2>{labData.introduction}</h2>
          <h3>{labData.subSec.title}</h3>
          <p>{labData.subSec.description}</p>
        </div>
      ) : (
        <p>No data found.</p>
      )}
    </div>
  );
};

export default Labsection;
