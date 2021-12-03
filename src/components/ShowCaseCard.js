import React from 'react';
import '../scss/ShowCaseCard.scss';
import DetailedBtn from '../components/DetailedBtn'

const ShowCaseCard = (props) => {
    const { image, logo, task, title, description, status} = props.data
    return (
        <div className="showcase__card">
            <img src={image}/>
                <div className="showcase-card__content">
                    <div className="card-right__top">
                        <img src={logo}/>
                        <div className="showcase-card__task">{task}</div>
                        <div className="showcase-card__title">{title}</div>
                        <div className="showcase-card__description">{description}</div>
                        <div className="showcase-card__status">Статус проекта: <br/>{status}</div>
                    </div>
                    <div className="showcase-card__detail">
                        <DetailedBtn/>
                        
                </div>
                
            </div>
        </div>
    );
}

export default ShowCaseCard;
