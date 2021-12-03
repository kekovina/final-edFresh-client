import React, { useState } from 'react';
import { inject, observer } from 'mobx-react'
import { Row, Col, Modal, Button,  Form, Input } from 'antd';
import NavBar from '../components/NavBar';
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
        required: '${label} is required!',
        types: {
          email: '${label} is not a valid email!',
          number: '${label} is not a valid number!',
        },
        number: {
          range: '${label} must be between ${min} and ${max}',
        },
      };
      const form = Form.useForm()
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
                                    <CustomButton>Найти проект</CustomButton>
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
            { !store.isAuth && <Modal 
            title="Подача заявки" 
            visible={isModalVisible} 
            footer={<div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <CustomButton transparent key="back" onClick={handleCancel} style={{ width: 100, margin: '0 10px', textAlign: 'center'}}>
                    Назад
                    </CustomButton>
                    <CustomButton onClick={handleOk} style={{ width: 100, margin: '0 10px', textAlign: 'center'}}>
                    Отправить
                    </CustomButton>
                </div>}
            >
           
           <Form form={form} {...layoutForm} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name="kek" label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="kek" label="Email" rules={[{ type: 'email' }]}>
                    <Input />
                </Form.Item>
                
                <Form.Item name="kek" label="Website">
                    <Input />
                </Form.Item>
                <Form.Item name="kek" label="Introduction">
                    <Input.TextArea />
                </Form.Item>
            </Form>
            
            </Modal>}
            
        </>
    );
}))

export default Home;
