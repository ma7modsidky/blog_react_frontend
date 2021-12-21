import React from 'react'
import postimg from '../../assets/imgs/post1.jpg'
import './posts.scss'
import {Link} from "react-router-dom"

export default function PostFeatured(props) {
    
    return (
        <div className='PostFeatured'>
            <div className="PostFeatured__img">
                <img src={props.data.image} alt="post image" />
            </div>
            <div className="PostFeatured__info">
                <Link to={"/post/" + props.data.id} >
                    <h3>{props.data.title}</h3>
                    <p>{props.data.body}</p>
                    <p><a href="#">{props.data.author}</a> - <a href="">{props.data.updated}</a></p>
                </Link>
            </div>
        </div>
    )
}
