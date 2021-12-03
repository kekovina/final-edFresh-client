import React from 'react';
import { Image } from 'antd';
import angleTop from '../img/angle-top.svg'
import angleBottom from '../img/angle-bottom.svg'
import '../scss/Button.scss'

const Button = ( { children, onClick, transparent, style }) => {
    return (
        <div className={`custom-btn ${transparent ? 'custom-btn--transparent' : ''}`} onClick={onClick} style={style}>
            {transparent && <img src={angleTop}/>}
            <div>{children}</div>
            {transparent && <img src={angleBottom}/>}
        </div>
    );
}

export default Button;
