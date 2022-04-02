import React from 'react';
import image from '../img/marvel-image.png';
import logo from '../img/marvel-text.png';
const Header = () => {
    return (
        <div className='header'>
            <img className='mrvl-img' src = {image}/>
            <img className='mrvl-logo' src = {logo}/>
        </div>
    );
};

export default Header;