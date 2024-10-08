
export const Banner = (billboard) => {
    return (
         <div className="px-6 py-4">
            <div className="relative 
             flex justify-center   w-full aspect-[1/0.3] overflow-hidden bg-white rounded-lg ">

                <img src={billboard?.billboard?.imageUrl} alt="" className="object-cover w-full h-full" />
            </div>

        </div>
    )
} 