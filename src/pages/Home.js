import React from 'react';
import { inject, observer } from 'mobx-react'
import { Row, Col } from 'antd';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import TLogo from '../img/transport-logo.png'



import ProjectCard from '../components/ProjectCard';

const Home = inject('store')(observer(({ store }) => {
    return (
        <div>
            <header>
                <Row justify='center'>
                    <Col sm={22} md={10} xxl={6}>
                        <div className="header__text">
                            <div className="header__title">
                                Транспортные инновации Москвы
                            </div>
                            <div className="header__subtitle">
                                Витрина проектов инновационных технологий, интеллектуальных транспортных
                                систем для транспортной отрасли города Москвы
                            </div>
                        </div>
                        <div className="header__btn-group">
                            <Row gutter = {[40]}>
                                <Col>
                                    <Button>Найти проект</Button>
                                </Col>
                                <Col>
                                    <Button transparent>Подать заявку</Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col sm={22} md={6} xxl={6} style={{display: 'flex', justifyContent: 'center'}}>
                        <img src={TLogo} style={{maxHeight: 220}}/>
                    </Col>
                </Row>
            </header>
            <Row justify='center'>
                    <Col sm={22} md={12} xxl={12}>
                        <div className="section-title">Проекты</div>
                        <Row gutter={[16, 20]}>
                            {store.projectsCategory.map(({title, image, id}) => (

                                <Col span={8}  key={title}>
                                    <ProjectCard title={title} image={image} id={id}/>
                                </Col>

                            ))}
                        </Row>
                    </Col>
                </Row>
                <Row justify='center'>
                    <Col sm={22} md={12} xxl={12}>
                        <div className="section-title">Стартапам</div>
                    </Col>
                </Row>
        </div>
    );
}))

export default Home;
