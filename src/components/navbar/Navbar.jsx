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
        href: `/categories/${category.name}`,
        active: window.location.href === `${import.meta.env.VITE_PUBLIC_SITE_URL}categories/${category.name}`
    }))

    return (
        <nav className={cn(`flex z-50 fixed top-0 left-0 w-full transition ease-in-out items-center justify-between px-4 py-3 '`, scrolled ? " backdrop-blur-sm bg-white/50" : "shadow-none backdrop-blur-0 bg-white border-b")}>
         
            <ul className='flex  items-center gap-x-8'>
                <a href='/'><img src='/logo.svg' className='w-8 object-cover' /></a>
            <ul className=' space-x-2'>
              {routes?.map(route => (
                <Button  key={route.label} variant={route.active ? "default" : "outline"} >
             
                    <Link to={route.href}>

                    {route.label}
                    </Link>
                
                </Button>
              ))}
            </ul>
            </ul>
            <ul>
                <Button  className="gap-x-2" variant={"default"}>
                    <Link className='flex items-center gap-x-2' to={'/cart'}>

                    <ShoppingCart className='w-4 h-4' />
                    <span>{cart?.length ? cart?.length : 0}</span>
                    </Link>
                </Button>
            </ul>
           
        </nav>
    );
};

export default Navbar;