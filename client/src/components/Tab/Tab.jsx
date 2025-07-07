import React, { useRef } from 'react'
import "./Tab.scss";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';




gsap.registerPlugin(ScrollTrigger);
const Tab = () => {
    const container = useRef();
    const heading = useRef();
    useGSAP(() => {
        gsap.fromTo(
            container.current,
            { rotationX: 40 }, 
            {
                rotationX: 0, 
                duration: 1,
                
                ease: "slow(0.7,0.7,false)",
                scrollTrigger: {
                    trigger: container.current, 
                    start: "top 50%", 
                    end: "bottom 100%", 
                    scrub: true, 
                    
                    
                   
                   
                }
            }
        );

        gsap.fromTo(
            heading.current,
            { y: 100, opacity: 0 }, 
            {
                y: -10,
                opacity: 1, 
                duration: 2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: container.current, 
                    start: "top 60%",
                    end: "bottom 90%",
                    scrub: false,
                    
                },
            }
        );

    
    }, []);
  return (
    <div className="two">
        
        <h1 ref={heading} >Help Whenever You Need It!</h1>
        
        <div ref={container} className="container">
          
            <div className="inside">
               <img src="Screenshot (352).png" alt="" />
            </div>
        </div>

        
    </div>
  )
}

export default Tab
