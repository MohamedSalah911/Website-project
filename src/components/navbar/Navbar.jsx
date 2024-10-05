import './Navbar.css'

function Navbar() {
    return (
        <nav className='navbar'>
            <a className='navbar-brand' href='/'>Shop</a>
            <ul className='navbar-nav'>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/about">About</a>
                </li>
                <li>
                    <a href="/contact">Contact</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;