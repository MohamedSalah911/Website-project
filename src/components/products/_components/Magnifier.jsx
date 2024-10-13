"use client";
import { useState } from "react";
import { Lens } from "@/components/ui/lens";

export function Magnifier({image}) {
  const [hovering, setHovering] = useState(false);

  return (
    (
      <div
        className="w-full h-full relative rounded-3xl overflow-hidden  mx">
       
        <div className="relative z-10">
          <Lens hovering={hovering} setHovering={setHovering}>
            <img
            src={image}
              alt="image"
          
              className="rounded-2xl w-40 h-40" />
          </Lens>
  
        </div>
      </div>
    )
  );
}

