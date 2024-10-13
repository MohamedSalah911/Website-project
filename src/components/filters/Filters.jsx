import getColors from "@/../lib/get-colors";
import getSizes from "@/../lib/get-sizes";
import { useEffect, useState } from "react";
import { Accordion } from "../ui/accordion";
import { Filter } from "./Filter";
import { Button } from "../ui/button";
import { ChevronRight, MenuIcon } from "lucide-react";
import { Sidebar } from "./_components/Sidebar";


export const Filters = () => {
const [colors, setColors] = useState([])
const [sizes, setSizes] = useState([])
    useEffect(() => {
       const getData = async() => {
        try {
              const data = await getColors()
        setColors(data)
        } catch (error) {
            
        }
      
       }  
    getData()
    }, []);
useEffect(() => {
       const getData = async() => {
        try {
              const data = await getSizes()
        setSizes(data)
        } catch (error) {
            
        }
      
       }  
    getData()
    }, []);
    return (
        <>
        <Sidebar colorId="colorId" sizeId="sizeId" size="size" color="color" colorsData={colors} sizesData={sizes} />
            <div className="w-56  shadow-sm py-20  hidden md:flex flex-col space-y-2 ">
                    <Accordion type="multiple" collapsible className="w-full">

                <Filter paramKey="colorId" name="color" data={colors} />
                <Filter paramKey="sizeId" name="size" data={sizes} />
            
                 </Accordion>

           
        </div>
        
        </>
    )
}