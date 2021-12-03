import React from 'react';
import NavBar from '../components/NavBar'
import { Input, Row, Col } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Radio } from 'antd';
import ShowCaseCard from '../components/ShowCaseCard'
import testimage from '../img/test.png'
import testlogo from '../img/testlogo.png'

const { Search } = Input;

const ShowCase = ({ match }) => {
    const testdata = {
        image: testimage,
        logo: testlogo,
        task: 'Решения для наземного транспорта',
        title: 'Traffic Data: узнать все о транспортных потоках',
        description: 'Программное обеспечение для анализа транспортных потоков по видео.',
        status: 'Масштабирование'
    }
    
      const onSearch = value => console.log(value);
    return (
        <div>
            <div className="green-line"></div>
            <NavBar/>
            <Row justify="center">
                <Col sm={18} md={16} xxl={12}>
                    <div className="showcase__title">{match.params.category}</div>
                    <Search  
                    placeholder="Начните набирать категорию"
                    enterButton={false}
                    size="large"
                    onSearch={onSearch}/>
                </Col>
            </Row>
            <Row justify="center">
                <Col sm={18} md={16} xxl={12}> 
                    <Radio.Group defaultValue="0" size="large" style={{marginTop: 48}}>
                        <Radio.Button value="0">Доступный и комфортный городской транспорт</Radio.Button> 
                        <Radio.Button value="1">Безопасность дорожного движения</Radio.Button>
                        <Radio.Button value="2">Цифровые технологии в транспорте</Radio.Button>
                        <Radio.Button value="3">Здоровые улицы и экология</Radio.Button>
                        <Radio.Button value="4">Новые виды мобильности</Radio.Button>
                    </Radio.Group>
                </Col>
            </Row>
            <Row justify="center" style={{marginTop: 50}}>
                <Col sm={18} md={16} xxl={12}> 
                    <ShowCaseCard data={testdata}/>
                </Col>
            </Row>
        </div>
    );
}

export default ShowCase;
