import React from 'react';
import '../styles/Header.css';

const Header = () => {
    return (
        <header className='NavHeader'>
            <h1 className='AppName'>Trivia For All</h1>
            <nav className='HeaderNav'>
                <ul className='NavList'>
                    <li className='NavListItem'>
                        <a href="/">Home</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
