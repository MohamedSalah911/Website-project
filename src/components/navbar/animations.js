// src/components/Navbar/animations.js

export const navbarVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { type: 'spring', stiffness: 120 } 
  },
};

export const linkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5 } 
  },
};

export const buttonVariants = {
  hover: { scale: 1.05, boxShadow: '0px 4px 15px rgba(0,0,0,0.2)' },
  tap: { scale: 0.95 },
};

export const cartBadgeVariants = {
  initial: { scale: 1 },
  animate: { scale: [1, 1.2, 1], transition: { repeat: Infinity, duration: 1 } },
};
