import React from 'react';

import compare from '../img/compare.svg'
import favorite from '../img/favorite.svg'
import request from '../img/request.svg'
import search from '../img/search.svg'
import { Row, Col } from 'antd';
import testimage from '../img/test.png'
import testlogo from '../img/testlogo.png'
import DetailedBtn from '../components/DetailedBtn';

const Project = () => {
    const testdata = {
        image: testimage,
        logo: testlogo,
        task: 'Решения для наземного транспорта',
        title: 'Traffic Data: узнать все о транспортных потоках',
        description: 'Программное обеспечение для анализа транспортных потоков по видео.',
        status: 'Масштабирование',
        url: 'https://vk'
    }
    return (
        <div>
            <div className="green-line"></div>
            <Row justify="center">
                <Col sm={18} md={16} xxl={12}>
                    <div className="project">
                        <div className="project__top">
                        <Row justify="center">
                            <Col span={10}>
                                <div className="project__title">
                                    {testdata.title}
                                </div>
                            </Col>
                            <Col span={14}>
                                <div className="project__options-group">
                                    <div className="project-option">
                                        <img src={request}/>
                                        <span>Запросить отчётность</span>
                                    </div>
                                    <div className="project-option">
                                        <img src={compare}/>
                                        <span>Сравнить</span>
                                    </div>
                                    <div className="project-option">
                                        <img src={favorite}/>
                                    </div>
                                    <div className="project-option">
                                        <img src={search}/>
                                    </div>
                                </div>
                            </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row justify="center">
                <Col sm={18} md={16} xxl={12}>
                    <Row>
                        <Col md={12} sm={24}>
                            <img className="project__logo" src={testdata.logo} style={{ minWidth: 150}}/>
                            <div className="project__job-title">Деятельность:</div>
                            <div className="project__job">{testdata.job}</div>
                            <div className="project__url"><a href={testdata.url}>{testdata.url}</a></div>
                            <div className="project__about-title section-title">О проекте:</div>
                            <div className="project__about">{testdata.description}</div>
                        </Col>
                        <Col md={12} sm={24}>
                            <img src={testdata.image}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div className="project__status-title section-title">Статус проекта:</div>
                        </Col>
                        <Col span={24}>
                            <div className="project__effect-title section-title">Эффект для города:</div>
                            <DetailedBtn style={{ marginTop: 20 }}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default Project;
