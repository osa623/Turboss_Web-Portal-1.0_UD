'use client';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect, useRef, use } from "react";

const Page = () => {

    const [serachExpand, setSerachExpand] = useState(false);

    const handleExpandSerch = () => { 

        setSerachExpand(!serachExpand);
    }


  return (
                                   <div className={`hidden lgs:flex bg-orange-600 border-1 ${serachExpand ? 'lgs:w-full lgs:h-[250rem]' : 'lgs:w-[20rem] lgs:h-[3rem]'} z-50 items-center transition-all duration-700 ease-in-out justify-start  rounded-full`}>
                                            <FontAwesomeIcon onClick={handleExpandSerch} icon={faSearch} className="text-primary cursor-pointer text-md ml-4"/>
                                    </div>
  )
}

export default Page;
