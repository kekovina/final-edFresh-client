import React, { useEffect, useState, useRef } from 'react';
import compare from '../img/compare.svg'
import favorite from '../img/favorite.svg'
import request from '../img/request.svg'
import search from '../img/search.svg'
import { Row, Col, Skeleton, Popover, Input, Button, message } from 'antd';
import { CheckCircleOutlined, UsergroupAddOutlined} from '@ant-design/icons'
import testimage from '../img/test.png'
import testlogo from '../img/testlogo.png'
import DetailedBtn from '../components/DetailedBtn';
import axios from 'axios'
import { serverURL } from '../config'
import { data } from 'autoprefixer';
import { inject, observer } from 'mobx-react'


import zayavka from '../img/status/0.svg'
import screening from '../img/status/1.svg'
import scoring from '../img/status/2.svg'
import expert from '../img/status/3.svg'
import accelerator from '../img/status/4.svg'
import pilot from '../img/status/5.svg'

const medals = [zayavka, screening, scoring, expert, accelerator, pilot]
const { TextArea } = Input;

const Project = inject('store')(observer(({ store, match }) => {
    const [ project, setProject ] = useState(null)
    const [inpValue, setValue] = useState('')

    var content = (
        <div>
            <TextArea  showCount autoSize = {true} onChange={event => setValue(event.target.value)} defaultValue = {project?.short_description}/>
            
            <Button  onClick = {saveHandler} style = {{marginTop:"10px"}}type = "primary">Сохранить</Button>
        </div>
    );

    function saveHandler(){
        if(inpValue) {

        
                axios.put(`${serverURL}/api/projects/${match.params.projectId}`,{
                    short_description: inpValue
                }).then(res=>{
                    if(res.status == 200) {
                        setProject(res.data)
                        message.success("Успешно сохранено")
                    }
                })
        } else {
            message.error('Поле не может быть пустым')
        }
    }

    const sendCollab = () => {
        return axios.get('https://edfresh-tg-bot.herokuapp.com/collaboration', {
            params: { 
                sender: 'dmitryitrus',
                reciever: 'kekovina',
                senderId: 247856634,
                recieverId: 411126672 
            }
        }).then(data => {
            if(data.status == 200){
                if(data.data.success){
                    message.success('Успешно отправлено')
                }
            } else {
                message.error('Что-то пошло не так')
            }
        })
    }
  

    useEffect(() => {
        axios(`${serverURL}/api/projects/${match.params.projectId}`).then(data => {
            if(data.status == 200){
                const project = data.data
                
                setProject(project)
                console.log(project)
            } else {
                setProject({err: 1, text: 'Ошибка загрузки данных'})
            }
        })
        return () => setProject([])
    }, [])
   
    return (
        <>
            <div className="green-line"></div>
            <Row justify="center">
                <Col sm={18} md={16} xxl={12}>
                    <div className="project">
                        <div className="project__top">
                        <Row justify="center"  style={{width: '100%'}}>
                            <Col span={10}>
                                <div className="project__title">
                                    {project?.name ?? <Skeleton active={true}/>}
                                </div>
                            </Col>
                            <Col span={14}>
                                <div className="project__options-group">
                                    {store.isAdmin && <div className="project-option">
                                        <CheckCircleOutlined />
                                        <span>Одобрить</span>
                                    </div>}
                                    {store.isAuth && !store.isAdmin && <div className="project-option" onClick={sendCollab}>
                                        <UsergroupAddOutlined />
                                        <span>Коллаборация</span>
                                    </div>}
                                    {(store.isAdmin || store.isCompany) && <div className="project-option">
                                        <img src={request}/>
                                        <span>Запросить отчётность</span>
                                    </div>}
                                    <div className="project-option" onClick={ store.compare.indexOf(match.params.projectId) ? store.addCompare.bind(this, match.params.projectId) : store.removeCompare.bind(this, match.params.projectId) }>
                                        {store.compare.indexOf(match.params.projectId) == -1 ? <><img src={compare}/>
                                        <span>Сравнить</span></> : <><CheckCircleOutlined />
                                        <span>Добавлено к сравнению</span></>}
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
                            <img className="project__logo" src={project?.logo}/>
                            <div className="project__job-title">Деятельность:</div>
                            <div className="project__job">{project?.category.name ?? <Skeleton active={true}/>}</div>
                            <div className="project__url"> {project?.url ? <a href={project?.url}>{project?.url}</a> : <Skeleton active={true}/> }</div>
                            <div className="project__about-title section-title">О проекте:</div>
                            {store.isAdmin
                            ?
                            <Popover content = {content}><div className="project__about" >{project?.short_description ?? <Skeleton active={true}/>}</div></Popover>
                            :
                            <div className="project__about" >{project?.short_description ?? <Skeleton active={true}/>}</div>
                            }
                        </Col>
                        <Col md={12} sm={24} style={{display: 'flex', justifyContent: 'center'}}>
                        {project?.images ? <img src={project?.images.replace('[', '').replace(']', '').split(',')[0].replace('\"', '').replace('\"', '')} style={{maxHeight: 300}}/> : <Skeleton.Image style={{height: 300, width: 300}} active={true}/>}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div className="project__status-title section-title">Статус проекта:</div>
                            <div className="project__status-value">{project?.status.name ?? <Skeleton active={true}/>}</div>
                            <div className="project__medal-status">
                                {medals.map((item, index) => {
                                    if(index+1 < project?.status.id){
                                        return <img className="project__medal" src={item}/>
                                    } else if( project?.status.id == 1 && index == 0){
                                        return <img className="project__medal" src={medals[0]}/>
                                    }
                                })}
                            </div>
                        </Col>
                        <Col span={24}>
                            <div className="project__effect-title section-title">Эффект для города:</div>
                            <DetailedBtn style={{ marginTop: 20 }}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}))

export default Project;
