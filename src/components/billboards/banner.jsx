
export const Banner = (billboard) => {
    return (
         <div className="px-6 py-4">
            <div className="relative 
             flex justify-center   w-full aspect-[1/0.3] overflow-hidden bg-white rounded-lg ">
                <p className="absolute  py-8 lg:py-20 text-white font-bold font-serif text-3xl lg:text-6xl">{billboard?.billboard?.label}</p>
                <img src={billboard?.billboard?.imageUrl} alt="" className="object-cover w-full h-full" />
            </div>

        </div>
    )
} 