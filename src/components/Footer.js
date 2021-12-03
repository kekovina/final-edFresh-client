import React from 'react';
import { Row, Col } from 'antd';
import '../scss/Footer.scss'
import logo from '../img/logo_footer.png'
import instagram from '../img/instagram.png'
import facebook from '../img/facebook.png'
import telegram from '../img/telegram.png'


const Footer = () => {
    return (
        <div className="footer">
            <Row justify = "center">
                <Col sm={24} md={16} xxl={12}>
                    <Row justify = "space-between">
                
                            <Col >
                                    <img className = "footer__logo-left" src = {logo}/>
                            </Col>
                            <Col>
                                <Row>
                                    <img className = "footer__logo" src = {instagram}/>
                                    
                                    <img className = "footer__logo"  src = {telegram}/>
                                    
                                    <img className = "footer__logo-facebook" src = {facebook}/>
                                </Row>
                            </Col>
                    </Row>
                    <Row style = {{marginTop: "40px", color: "white"}} justify = "space-between"> 
                        <Col>
                        <p>2021</p>
                        </Col>
                        <Col>
                           <p> Политика обработки персональных данных и пользовательское соглашение</p>
                        </Col>
                    </Row>
                
                </Col>

            </Row>
        </div>
    )
}



export default Footer;
