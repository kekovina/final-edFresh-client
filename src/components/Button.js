import React from 'react';
import { Image } from 'antd';
import angleTop from '../img/angle-top.svg'
import angleBottom from '../img/angle-bottom.svg'
import '../scss/Button.scss'

const Button = ( { children, onClick, transparent, style, topAngle, bottomAngle }) => {
    const config = {
        paddingTop:  topAngle === false ? '10px' : 0,
        paddingBottom: bottomAngle === false ? '10px' : 0,
    }
    return (
        <div className={`custom-btn ${transparent ? 'custom-btn--transparent' : ''}`} onClick={onClick} style={{...config, ...style}}>
            {topAngle !== false && <img src={angleTop}/>}
            <div>{children}</div>
            {bottomAngle !== false && <img src={angleBottom}/>}
        </div>
    );
}

export default Button;
