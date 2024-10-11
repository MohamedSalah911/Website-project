import getCategories from '@/../lib/get-categories';
import './Navbar.css'
import { Link, useParams } from 'react-router-dom';
import { act, useEffect, useState } from 'react';

import { Button } from '../ui/button';
import { useScroll } from '@/../hooks/use-scroll';
import { cn } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';

import { useSelector, useDispatch } from 'react-redux'
function Navbar() {
    const cart = useSelector((state) => state.cart.value)
    const params = useParams()
    const scrolled = useScroll()
    const [categories, setcategories] = useState();

    
    useEffect(() => {
        const getData = async()=>{
            const data = await getCategories()
            setcategories(data)
        }
        getData()
     

    }, [])
    
    const routes = categories?.map(category => ({
        label: category.name,
        href: `/categories/${category.id}`,
        active: window.location.href === `${import.meta.env.VITE_PUBLIC_SITE_URL}categories/${category.id}`
    }))

    return (
        <nav className={cn(`flex z-50 fixed top-0 left-0 w-full transition ease-in-out items-center justify-between px-4 py-3 '`, scrolled ? " backdrop-blur-sm bg-white/50" : "shadow-none backdrop-blur-0 bg-white border-b")}>
         
            <ul className='flex  items-center gap-x-8'>
                <a href='/'><img loading='lazy' src='https://firebasestorage.googleapis.com/v0/b/slacknew-e82cd.appspot.com/o/logo.svg?alt=media&token=079b655f-1940-4a4b-af41-fade05d15d41' className='w-8 object-cover' /></a>
            <ul className=' space-x-2'>
              {routes?.map(route => (
                    <Link to={route.href}>
                <Button  key={route.label} variant={route.active ? "default" : "outline"} >
             

                    {route.label}
                
                </Button>
                    </Link>
              ))}
            </ul>
            </ul>
            <ul>
                    <Link className='flex items-center gap-x-2' to={'/cart'}>
                <Button  className="gap-x-2" variant={"default"}>

                    <ShoppingCart className='w-4 h-4' />
                    <span>{cart?.length ? cart?.length : 0}</span>
                </Button>
                    </Link>
            </ul>
           
        </nav>
    );
};

export default Navbar;