import React from 'react';
import '../scss/ShowCaseCard.scss';
import DetailedBtn from '../components/DetailedBtn'
import { Link } from 'react-router-dom'

const ShowCaseCard = (props) => {
    const { id, image, logo, category, name, short_description, status} = props.data
    return (
       
            <div className="showcase__card">
                    <div className="showcase-card__image">
                        <img src={image}/>
                    </div>
                    <div className="showcase-card__content">
                        <div className="card-right__top">
                            <img src={logo}/>
                            <div className="showcase-card__task">{category?.name}</div>
                            <div className="showcase-card__title">{name}</div>
                            <div className="showcase-card__description">{short_description}</div>
                            <div className="showcase-card__status">Статус проекта: <br/>{status}</div>
                        </div>
                        <div className="showcase-card__detail">
                            <Link to={`/project/${id}`}>
                                <DetailedBtn/>    
                            </Link>
                        </div>
                </div>
            </div>
    );
}

export default ShowCaseCard;
