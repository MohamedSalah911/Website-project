 import * as React from "react"

 import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


export const SlideShow = ({images}) => {
      const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

    return (
 <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images?.map((image, index) => (
          <CarouselItem key={image?.url}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div className="w-40 h-40 aspect-square relative overflow-hidden">
                    <img src={image?.url} className="w-full h-full object-cover" alt="Product image" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    )
}