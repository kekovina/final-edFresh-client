import React, { useState } from 'react';
import { inject, observer } from 'mobx-react'
import { Row, Col, Modal, Button,  Form, Input } from 'antd';
import { Link } from 'react-router-dom'
import CustomButton from '../components/Button';
import TLogo from '../img/transport-logo.png'



import ProjectCard from '../components/ProjectCard';

const Home = inject('store')(observer(({ store }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
        form.submit()
    //   setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const layoutForm = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      }; 
      const onFinish = (values) => {
        console.log(values);
      };
      const validateMessages = {
        required: 'Мы не сможем помочь вам без этих данных :(',
      };
      const [form] = Form.useForm()
    return (
        <>
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
                                    <Link to="/projects"><CustomButton>Найти проект</CustomButton></Link>
                                </Col>
                                {!store.isAuth && <Col>
                                    <CustomButton transparent onClick={showModal}>Подать заявку</CustomButton>
                                </Col>}
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
                            {store.projectsCategory.map(({title, image, id, secure}) => {
                                if(!secure){
                                    return  <Col span={8}  key={title}>
                                    <ProjectCard title={title} image={image} id={id}/>
                                </Col>
                                } 
    

                            })}
                        </Row>
                    </Col>
                </Row>
                <Row justify='center'>
                    <Col sm={22} md={12} xxl={12}>
                        <div className="section-title">Стартапам</div>
                    </Col>
                </Row>
            { !store.isAuth && <Modal 
            title="Подача заявки" 
            visible={isModalVisible} 
            onCancel={handleCancel}
            footer={<div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <CustomButton transparent key="back" onClick={handleCancel} style={{ width: 150, margin: '0 10px', textAlign: 'center'}}>
                    Назад
                    </CustomButton>
                    <CustomButton onClick={handleOk} style={{ width: 150, margin: '0 10px', textAlign: 'center'}}>
                    Отправить
                    </CustomButton>
                </div>}
            width={600}
            >
           
           <Form form={form} {...layoutForm} name="form" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name="what_hurts" label="Что болит?" rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="symptoms" label="Как проявляется ваша проблема?"  rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>
                
                <Form.Item name="consequences" label="Что будет, если проблему не решать?"  rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="reason" label="Почему так происходит?"  rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="objects" label="У кого болит?"  rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="deadlines" label="Какой желательный срок решения проблемы"  rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="what_attempted" label="Пробовали решать?"  rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="contacts" label="Как с вами связаться?"  rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>
            </Form>
            
            </Modal>}
            
        </>
    );
}))

export default Home;
