import React from 'react';
import '../scss/ShowCaseCard.scss';
import { inject, observer } from 'mobx-react'
import { Button } from 'antd'
import DetailedBtn from '../components/DetailedBtn'
import { Link } from 'react-router-dom'

import { AppstoreAddOutlined } from '@ant-design/icons'

const ShowCaseCard = inject('store')(observer(({ store, match, data }) => {
    const { id, images, logo, category, name, short_description, status} = data
    return (
       
            <div className="showcase__card">
                    <div className="showcase-card__image" style={{backgroundImage: `url(${images ? images.replace('[', '').replace(']', '').split(',')[0].replace('\"', '').replace('\"', '') : null})`, backgroundSize: 'cover'}}>
                    </div>
                    <div className="showcase-card__content">
                        <div className="card-right__top">
                            <img src={logo}/>
                            <div className="showcase-card__task">{category?.name}</div>
                            <div className="showcase-card__title">{name}</div>
                            <div className="showcase-card__description">{short_description}</div>
                            <div className="showcase-card__status">Статус проекта: <br/>{status?.name}</div>
                        </div>
                        <div className="showcase-card__detail">
                            <Button icon={<AppstoreAddOutlined />} onClick={store.compare.indexOf(id) == -1 ? store.addCompare.bind(this, id) : store.removeCompare.bind(this, id)}>{store.compare.indexOf(id) == -1 ? 'Сравнить' : "Удалить из сравнения"}</Button>
                            <Link to={`/project/${id}`}>
                                <DetailedBtn/>    
                            </Link>
                        </div>
                </div>
            </div>
    );
}))

export default ShowCaseCard;
