
import React, { useEffect, useState } from 'react';
import { Input, Row, Col, Empty, Radio, Badge } from 'antd';
import { inject, observer } from 'mobx-react'
import CustomButton from '../components/Button';
import ShowCaseCard from '../components/ShowCaseCard'
import { Link, useHistory } from 'react-router-dom'
import filter from '../img/filter-icon.svg'
import Loader from '../components/Loader'

const { Search } = Input;

const ShowCase = inject('store')(observer(({ store, match }) => {
    const [isLoading, setLoading] = useState(true)
    const [radioValue, setRadioValue] = useState(match.params.category)

    const history = useHistory()

    const filterHandler = () => console.log('e')

    const onChangeRadio = (e) => {
        history.push('/showcase/'+e.target.value)
        setRadioValue(e.target.value)
    }
    
    useEffect(() => {
        if(!store.projects.length){
           store.getCompleted(match.params.category).then(() => {
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
                        <div className="showcase__title">Витрина решений</div>
                        {/* { store.compare.length ? <Link to="/compare"><CustomButton transparent bottomAngle={false} style={{width: 'fit-content', height: 'fit-content', border: 'none'}}>К сравнению <Badge count={store.compare.length}></Badge></CustomButton></Link> : null} */}
                    </div>
                    <Search  
                    placeholder="Начните набирать категорию"
                    enterButton={false}
                    size="large"
                    suffix={<img src={filter} className={"search__filter-btn"} onClick={filterHandler}/>}
                    onSearch={onSearch}
                    style={{marginTop: '20px'}}
                    />
                </Col>
            </Row>
            <Row justify="center">
                <Col sm={18} md={16} xxl={12}> 
                    <Radio.Group onChange={onChangeRadio} value={radioValue} size="large" style={{marginTop: 48}}>
                        <Radio.Button value="1">Доступный и комфортный городской транспорт</Radio.Button> 
                        <Radio.Button value="2">Безопасность дорожного движения</Radio.Button>
                        <Radio.Button value="3">Цифровые технологии в транспорте</Radio.Button>
                        <Radio.Button value="4">Новые виды мобильности</Radio.Button>
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
                        <CustomButton transparent style={{width: 'fit-content', border: 'none'}}>Показать ещё</CustomButton>
                    </div>
                </Col>
            </Row>
        </>
    );
}))

export default ShowCase;
