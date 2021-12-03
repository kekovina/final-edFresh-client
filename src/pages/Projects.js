import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react'
import { Input, Row, Col } from 'antd';
import Button from '../components/Button';
import { Link, useHistory } from 'react-router-dom'
import { Radio, Empty } from 'antd';
import ShowCaseCard from '../components/ShowCaseCard'
import Loader from '../components/Loader'
import filter from '../img/filter-icon.svg'

const { Search } = Input;

const Projects =  inject('store')(observer(({ store, match }) => {
    const hasParams = Object.keys(match.params).length
    const [isLoading, setLoading] = useState(true)
    const [radioValue, setRadioValue] = useState(match.params.category)

    const history = useHistory()

    const filterHandler = () => console.log('e')

    const onChangeRadio = (e) => {
        history.push('/projects/'+e.target.value)
        setRadioValue(e.target.value)
    }
    
    useEffect(() => {
        if(!store.projects.length){
            store.getProjectsByCategory(match.params.category).then((projects) => {
                setLoading(false)
            })
        }
        return () => store.dropProjects()
    }, [match.params.category])
    const onSearch = value => console.log(value);
    return (
        <>
            <div className="green-line"></div>
            <Row justify="center">
                <Col sm={18} md={16} xxl={12}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div className="showcase__title">{ hasParams ? store.projectsCategory.filter( item => item.id == match.params.category)[0].title : 'Поиск проекта'}</div>
                        { hasParams && store.isAuth ? <Button transparent bottomAngle={false} style={{width: 'fit-content', height: 'fit-content', border: 'none'}}>Следить за обновлением</Button> : null}
                    </div>
                    <Search  
                    placeholder="Начните набирать категорию"
                    // enterButton={false}
                    size="large"
                    suffix={<img src={filter} className={"search__filter-btn"} onClick={filterHandler}/>}
                    onSearch={onSearch}/>
                </Col>
            </Row>
            <Row justify="center">
                <Col sm={18} md={16} xxl={12}> 
                    <Radio.Group onChange={onChangeRadio} value={radioValue} size="large" style={{marginTop: 48}}>
                        {store.projectsCategory.map(({title, id}) => (
                            <Radio.Button value={`${id}`} >{title}</Radio.Button>
                        ))}
                        </Radio.Group>
                </Col>
            </Row>
            <Row justify="center" style={{marginTop: 50}}>
                <Col sm={18} md={16} xxl={12}> 
                    <Row style={isLoading || !store.projects.length ? {height: !store.projects.length ? 100 : 20, justifyContent: 'center'} : null}>
                        { isLoading ? <Loader/> 
                        : store.projects.length ? store.projects.map( item => (
                            <Col md={12} xxl={8} key={item}>
                                <ShowCaseCard data={item}/>
                            </Col>
                        )) : <Empty description={"Ничего не найдено"}/>}
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
        </>
    );
}))

export default Projects;
