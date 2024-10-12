// src/components/Navbar/Navbar.jsx

import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

import getCategories from '@/../lib/get-categories';
import { useScroll } from '@/../hooks/use-scroll';
import { cn } from '@/lib/utils';

import './Navbar.css';
import {
  navbarVariants,
  linkVariants,
  buttonVariants,
  cartBadgeVariants,
} from './animations';

function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const scrolled = useScroll();

  const cart = useSelector((state) => state.cart.value);

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      setErrorCategories(null);
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        setErrorCategories('Failed to load categories.');
        console.error('Error fetching categories:', error);
        toast.error('Unable to load categories. Please try again later.');
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const routes = categories.map((category) => ({
    label: category.name,
    href: `/categories/${category.id}`,
    active: location.pathname === `/categories/${category.id}`,
  }));

  return (
    <motion.nav
      variants={navbarVariants}
      initial="opacity-0"
      animate="opacity-1"
      className={cn(
        `flex z-50 fixed top-0 left-0 w-full transition ease-in-out items-center justify-between px-4 py-3`,
        scrolled
          ? 'backdrop-blur-sm bg-white/50'
          : 'shadow-none backdrop-blur-0 bg-white border-b'
      )}
    >
      {/* Logo and Links */}
      <ul className="flex items-center gap-x-8">
        <Link to="/">
          <motion.img
            src="https://firebasestorage.googleapis.com/v0/b/slacknew-e82cd.appspot.com/o/logo.svg?alt=media&token=079b655f-1940-4a4b-af41-fade05d15d41"
            alt="Logo"
            className="w-8 object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </Link>

        <AnimatePresence>
          {loadingCategories ? (
            <div
             
              className="flex items-center"
            >
            
            </div>
          ) : errorCategories ? (
            <motion.div
              key="error"
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex items-center"
            >
              <p className="text-red-500">{errorCategories}</p>
            </motion.div>
          ) : (
            <motion.ul
              className="flex space-x-2"
              
              initial="hidden"
              animate="visible"
            >
              {routes.map((route) => (
                <motion.li key={route.href} variants={linkVariants}>
                  <Link to={route.href}>
                    <Button
                      variant={route.active ? 'default' : 'outline'}
                      whileHover="hover"
                      whileTap="tap"
                      variants={buttonVariants}
                    >
                      {route.label}
                    </Button>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </ul>

      {/* Cart Icon */}
      <ul>
        <Link className="flex items-center gap-x-2" to="/cart">
          <motion.div
          
          
          >
            <Button className="gap-x-2" variant="default">
              <ShoppingCart className="w-4 h-4" />
              <span>{cart.length || 0}</span>
            </Button>
          </motion.div>
        </Link>
      </ul>
    </motion.nav>
  );
}

export default Navbar;
