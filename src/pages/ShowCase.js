import React from 'react';
import NavBar from '../components/NavBar'
import { Input, Row, Col } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Radio } from 'antd';
import ShowCaseCard from '../components/ShowCaseCard'
import testimage from '../img/test.png'
import testlogo from '../img/testlogo.png'

const { Search } = Input;

const ShowCase = () => {
    const testdata = {
        image: testimage,
        logo: testlogo,
        task: 'Решения для наземного транспорта',
        title: 'Traffic Data: узнать все о транспортных потоках',
        description: 'Программное обеспечение для анализа транспортных потоков по видео.',
        status: 'Масштабирование'
    }
    const suffix = (
        <AudioOutlined
          style={{
            fontSize: 16,
            color: '#1890ff',
          }}
          onClick={() => console.log('ck')}
        />
      );
      const onSearch = value => console.log(value);
    return (
        <div>
            <div className="green-line"></div>
            <NavBar/>
            <Row justify="center">
                <Col sm={18} md={16} xxl={12}>
                    <div className="showcase__title">Доступный и комфортный городской транспорт</div>
                    <Search  
                    placeholder="Начните набирать категорию"
                    enterButton={false}
                    size="large"
                    suffix={suffix}
                    onSearch={onSearch}/>
                </Col>
            </Row>
            <Row justify="center">
                <Col sm={18} md={16} xxl={12}> 
                    <Radio.Group defaultValue="0" size="large" style={{marginTop: 48}}>
                        <Radio.Button value="0">Решения для метрополитена</Radio.Button> 
                        <Radio.Button value="1">Решения для обратной связи от горожан и учета их предложений</Radio.Button>
                        <Radio.Button value="2">Решения для наземного транспорта</Radio.Button>
                        <Radio.Button value="3">Решения для остановочных пунктов, в том числе автономных</Radio.Button>
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
