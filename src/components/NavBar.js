import React from 'react';
import { inject, observer } from 'mobx-react'
import { Row, Col, Badge } from 'antd';
import logo from '../img/logo.png' 
import '../scss/NavBar.scss';
import CustomButton from './Button';
import { Link, useLocation } from 'react-router-dom';

const NavBar = inject('store')(observer(({ store }) => {
    const location = useLocation()
    return (
        <div className="navbar">
            <Row justify="center">
                <Col sm={22} md={16} xxl={12}>
                    <div className="navbar__wrap">
                        <Link to="/"><img className="navbar__logo" src={logo}/></Link>
                        <nav>
                            <Link to="/showcase"><div>Витрина проектов</div></Link>
                            <div>Стартапам</div>
                            <Link to = "/companies"><div>Компании</div></Link>
                            <div>Контакты</div>
                        </nav>
                        <div className="navbar__btn-group">
                            {!store.isAuth ? <CustomButton transparent>Войти</CustomButton> : <div></div>}
                            {location.pathname != '/' ? store.compare.length ? <Link to="/compare"><CustomButton transparent bottomAngle={false} style={{width: 'fit-content', height: 'fit-content', border: 'none'}}>К сравнению <Badge count={store.compare.length}></Badge></CustomButton></Link> : null : ''}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}))



export default NavBar;
