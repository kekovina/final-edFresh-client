import React, { useEffect, useState, useRef } from 'react';

import { Row, Col, Modal,  Form, Input, Button, message,InputNumber } from 'antd';
import axios from 'axios'
import { serverURL } from '../config'


const CompanyForm = () =>{
    const layoutForm = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      }; 

      const onFinish = (values) => {
        console.log(values)
      axios.post(`${serverURL}/api/tasks`,values).then(res=>{
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
    return(
    <div style = {{marginTop:"30px"}}>
        <Row justify = "center">
        <Col sm={20} md={20} xxl={6}>
            <Form  form={form} {...layoutForm} name="form" onFinish={onFinish} validateMessages={validateMessages}>
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
                <Row justify = "end">
                    <Col>
                <Form.Item >
                    
                    <Button  htmlType="submit">
                    Сохранить
                    </Button>
                
                </Form.Item>
                </Col>
                    </Row>
            </Form>
        </Col>
        </Row>
        </div>
    )
}

export default CompanyForm;