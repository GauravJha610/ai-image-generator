import React, { useRef, useState } from 'react'
import "./AiImageGenerator.css";
import default_image from '/src/assets/default_image.svg';

export const AiImageGenerator = () => {
    let [Image_url,setImage_url]=useState("/");
    let inputRef=useRef(null);
    const [loading,setLoading]=useState(false);

    const imageGenerator=async()=>{
        if(inputRef===""){
            return 0;
        }
        setLoading(true);
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":
                    `Bearer ${import.meta.env.VITE_API_KEY}`,
                    "User-Agent":"Chrome",
                },
                body:JSON.stringify({
                    prompt:`${inputRef.current.value}`,
                    n:1,
                    size:"512x512",
                }),
            }
            
        );
        
        let data= await response.json();
        let data_array=data.data;
        setImage_url(data_array[0].url);
        setLoading(false);
        
    }
    

  return (
    <div className='container'>
        <div className="title">
            Ai image <span>generator</span>
        </div>
        <div className="img-loading">
            <div className="image">
                <img src={Image_url==="/"?default_image:Image_url} alt="" />
            </div>
            <div className="loading">
                <div className={loading?"loading-bar-full":"loading-bar"}></div>
                <div className={loading?"loading-text":"display-none"}>Loading....</div>
            </div>
        </div>
        <div className="search-box">
            <input type="text" ref={inputRef} className='search-input' placeholder='Describe what you want to see' />
            <div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div>
        </div>
    </div>
  )
}
