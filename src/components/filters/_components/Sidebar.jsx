

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ChevronRight } from "lucide-react"
import { Filter } from "../Filter";

export function Sidebar({color, size, sizeId, colorId, sizesData, colorsData}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"} className="flex md:hidden my-20 mx-4"><ChevronRight  className="w-4 h-4" /></Button>

      </SheetTrigger>
      <SheetContent side={"left"} >
        <SheetHeader>
          <SheetTitle>Filter your products </SheetTitle>
          <SheetDescription>
          Filter with your favorite color and your size fit
          </SheetDescription>
        </SheetHeader>
                        <Accordion type="multiple" collapsible className="w-full">

                <Filter paramKey={colorId} name={color} data={colorsData} />
                <Filter paramKey={sizeId} name={size} data={sizesData} />
            
                 </Accordion>


      </SheetContent>
    </Sheet>
  )
}
