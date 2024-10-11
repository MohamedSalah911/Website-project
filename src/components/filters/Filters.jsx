import getColors from "@/../lib/get-colors";
import getSizes from "@/../lib/get-sizes";
import { useEffect, useState } from "react";
import { Accordion } from "../ui/accordion";
import { Filter } from "./Filter";


export const Filters = () => {
const [colors, setColors] = useState([])
const [sizes, setSizes] = useState([])
    useEffect(() => {
       const getData = async() => {
        const data = await getColors()
        setColors(data)
       }  
    getData()
    }, []);
useEffect(() => {
       const getData = async() => {
        const data = await getSizes()
        setSizes(data)
       }  
    getData()
    }, []);
    return (
            <div className="w-56 shadow-sm py-20  flex flex-col space-y-2 ">
                    <Accordion type="multiple" collapsible className="w-full">

                <Filter paramKey="colorId" name="color" data={colors} />
                <Filter paramKey="sizeId" name="size" data={sizes} />
            
                 </Accordion>

           
        </div>
    )
}