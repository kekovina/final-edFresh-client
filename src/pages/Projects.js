import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react'
import { Input, Row, Col,Badge } from 'antd';
import CustomButton from '../components/Button';
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
        if(match.params.category == 'admin' && store.isAdmin){
            store.getUnconfirmed()
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
                        <div className="showcase__title">{ hasParams && hasParams != 'admin' ? store.projectsCategory.filter( item => item.id == match.params.category)[0].title : 'Поиск проекта'}</div>
                        {/* { store.compare.length ? <Link to="/compare"><CustomButton transparent bottomAngle={false} style={{width: 'fit-content', height: 'fit-content', border: 'none'}}>К сравнению <Badge count={store.compare.length}></Badge></CustomButton></Link> : null} */}
                        { hasParams && store.isAuth ? <CustomButton transparent bottomAngle={false} style={{width: 'fit-content', height: 'fit-content', border: 'none'}}>Следить за обновлением</CustomButton> : null}
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
                        {store.projectsCategory.map(({title, id, secure}) => {
                            if(!secure){
                                return <Radio.Button value={`${id}`} >{title}</Radio.Button>
                            } else if(secure && store.isAdmin){
                                return <Radio.Button value={`admin`} >{title}</Radio.Button>
                            }
                        })}
                        </Radio.Group>
                </Col>
            </Row>
            <Row justify="center" style={{marginTop: 50}}>
                <Col sm={18} md={16} xxl={12}> 
                    <Row gutter={[16, 24]} style={isLoading || !store.projects.length ? {height: !store.projects.length ? 100 : 20, justifyContent: 'center'} : null}>
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
                        <CustomButton transparent border={false} style={{width: 'fit-content', border: 'none'}}>Показать ещё</CustomButton>
                    </div>
                </Col>
            </Row>
        </>
    );
}))

export default Projects;
