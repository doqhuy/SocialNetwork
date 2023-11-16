import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PictureSideBar from './PictureSideBar';
import iconImage from '../../assets/images/image.png'

const PhotoGallery = (props) => {
    return (
        <Fragment >
            <article className="aside-article-photos">
                <div className="aside-article-header">
                    <div className="aside-article-icon">
                        <img className = "iconIntro" src = {iconImage}></img>
                    </div>
                    <h3 className="aside-article-title" style={{ color: ' #fff' }}>
                        Kho ảnh &bull; {props.picturesArr.length}
                    </h3>
                </div>
                
                <div className="hr-styles" style={{'width': '100%'}}></div>

                <ul className="aside-article-gallery bender-photos">
                    {props.picturesArr.map((picture) => <PictureSideBar key={picture.id}  {...picture} />)}
                </ul>
                <div className="hr-styles" style={{'width': '100%'}}></div>
                <button className="container button update-info">
                    <NavLink className="friends" exact to={`/home/gallery/${props.timeLineUserId}`}>Xem ảnh chi tiết</NavLink>
                </button>
            </article>
        </Fragment >
    )
}

export default PhotoGallery;
