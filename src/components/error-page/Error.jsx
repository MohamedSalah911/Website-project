import { Link } from "react-router-dom"


 const Error = () => {

    return (
        <div className="w-full h-full space-y-20 items-center justify-center flex flex-col ">
            <div className="w-80 py-36 h-80 aspect-square relative ">
                <img src="/error.png" alt="error" />
            </div>  

            <p className='text-2xl font-semibold'>Opps, Not found your page return <Link to="/" className='underline'>Home!</Link></p>
        </div>
    )
}

export default Error