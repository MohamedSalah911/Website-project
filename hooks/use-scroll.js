import { useEffect, useState } from "react";

export const useScroll = () => {
    const [scrolled, setScrolled] = useState()
    useEffect(() => {
        const handleScroll = () => {
 if(window.scrollY > 10){
            setScrolled(true)
        }else{
            setScrolled(false)
        }

        }
        window.addEventListener("scroll", handleScroll)
       
        
        return () => {
            window.removeEventListener("scroll", handleScroll)
        };
    }, []);
    return scrolled
}