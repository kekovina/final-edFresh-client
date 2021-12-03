import React from 'react';
import { Row, Col } from 'antd';
import logo from '../img/logo.png' 
import '../scss/NavBar.scss';
import Button from './Button';

const NavBar = () => {
    return (
        <div className="navbar">
            <Row justify="center">
                <Col sm={22} md={16} xxl={12}>
                    <div className="navbar__wrap">
                        <img className="navbar__logo" src={logo}/>
                        <nav>
                            <div>Витрина проектов</div>
                            <div>Стартапам</div>
                            <div>Компании</div>
                            <div>Контакты</div>
                        </nav>
                        <Button transparent>Войти</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}



export default NavBar;
