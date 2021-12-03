import React from 'react';
import { Row, Col } from 'antd';
import logo from '../img/logo.png' 
import '../scss/NavBar.scss';
import Button from './Button';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className="navbar">
            <Row justify="center">
                <Col sm={22} md={16} xxl={12}>
                    <div className="navbar__wrap">
                        <Link to="/"><img className="navbar__logo" src={logo}/></Link>
                        <nav>
                            <Link to="/showcase"><div>Витрина проектов</div></Link>
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
