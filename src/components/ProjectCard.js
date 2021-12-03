import React from 'react';
import '../scss/ProjectCard.scss'
import { Link } from 'react-router-dom'
import topAngle from '../img/angle-white-top.svg';
import bottomAngle from '../img/angle-white-bottom.svg';

const ProjectCard = ({ title, image, id }) => {
    return (
        <Link to={`/projects/${id}`}>
            <div className="project-card" style={{ background: `url(${image})`, backgroundSize: 'cover'}}>
                <img src={topAngle} />
                <div className="project-card__title">{title}</div>
                <img src={bottomAngle} />
            </div>
        </Link>
    );
}

export default ProjectCard;
