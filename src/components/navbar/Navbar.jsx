import './Navbar.css'

function Navbar() {
    return (
        <nav className='navbar'>
            <div className='navbar-brand'>Shop</div>
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