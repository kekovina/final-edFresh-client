import React, { useState } from 'react';
import { inject, observer } from 'mobx-react'
import { Row, Col, Modal, Button,  Form, Input, message,InputNumber } from 'antd';
import { Link } from 'react-router-dom'
import CustomButton from '../components/Button';
import TLogo from '../img/transport-logo.png'
import { serverURL } from '../config'
import axios from 'axios'


import ProjectCard from '../components/ProjectCard';
import Axios from 'axios';

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
          console.log(values)
        axios.post(`${serverURL}/api/projects`,values).then(res=>{
            if(res.status == 200) {
                message.success("Заявка заполнена и сохранена")
            } 
        }).catch(err=>{
            message.error("Попробуйте позже...")
        })
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
           
           <Form  form={form} {...layoutForm} name="form" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name="company_name" label="Название команды/организации" rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="stages_of_ready_id" label="Стадия готовности продукта"  rules={[{ required: true }]}>
                    <InputNumber />
                </Form.Item>
                
                <Form.Item name="short_description" label="Краткое описание"  rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>
            
                <Form.Item name="certification_type" label="Требуется ли сертификация продукта"  rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="firstname" label="Имя"  rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="surname" label="Фамилия"  rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="lastname" label="Отчество"  rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="phone_number" label="Номер телефона"  rules={[{ required: true }]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name="email" label="Email"  rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="telegram_id" label="id телеграм"  rules={[{ required: true }]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name="email_company" label="Email компании"  rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="inn" label="ИНН"  rules={[{ required: true }]}>
                    <InputNumber />
                </Form.Item>
            
                <Form.Item name="presentation_link" label="Ссылка на презентацию"  rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="logo" label="Лого"  rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>
            </Form>
            
            </Modal>}
            
        </>
    );
}))

export default Home;
