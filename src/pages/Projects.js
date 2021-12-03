import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react'
import { Input, Row, Col } from 'antd';
import Button from '../components/Button';
import { Radio } from 'antd';
import ShowCaseCard from '../components/ShowCaseCard'
import testimage from '../img/test.png'
import { Link } from 'react-router-dom'
import testlogo from '../img/testlogo.png'

const { Search } = Input;

const Projects =  inject('store')(observer(({ store, match }) => {
    const testdata = {
        image: testimage,
        logo: testlogo,
        task: 'Решения для наземного транспорта',
        title: 'Traffic Data: узнать все о транспортных потоках',
        description: 'Программное обеспечение для анализа транспортных потоков по видео.',
        status: 'Масштабирование'
    }
    
    useEffect(() => {
        if(!store.projects.length){
            store.getProjectsByCategory(match.params.category)
           
        }
    }, [])

    const onSearch = value => console.log(value);
    return (
        <div>
            <div className="green-line"></div>
            <Row justify="center">
                <Col sm={18} md={16} xxl={12}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div className="showcase__title">{store.projectsCategory.filter( item => item.id == match.params.category)[0].title}</div>
                        <Button transparent bottomAngle={false} style={{width: 'fit-content', height: 'fit-content', border: 'none'}}>Следить за обновлением</Button>
                    </div>
                    <Search  
                    placeholder="Начните набирать категорию"
                    enterButton={false}
                    size="large"
                    onSearch={onSearch}/>
                </Col>
            </Row>
            <Row justify="center">
                <Col sm={18} md={16} xxl={12}> 
                    <Radio.Group  defaultValue={match.params.category} size="large" style={{marginTop: 48}}>
                        {store.projectsCategory.map(({title, id}) => (
                            <Radio.Button value={`${id}`} onClick={() => window.location = `/projects/${id}`}>{title}</Radio.Button>
                        ))}
                        </Radio.Group>
                </Col>
            </Row>
            <Row justify="center" style={{marginTop: 50}}>
                <Col sm={18} md={16} xxl={12}> 
                    <Row>
                        {store.projects.map( item => (
                            <Col>
                                <ShowCaseCard data={item}/>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
            <Row justify="center" style={{marginTop: 50}}>
                <Col sm={18} md={16} xxl={12}> 
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button transparent border={false} style={{width: 'fit-content', border: 'none'}}>Показать ещё</Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
}))

export default Projects;
