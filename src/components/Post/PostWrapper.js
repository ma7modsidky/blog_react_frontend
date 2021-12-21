import React from 'react'

import {Link} from "react-router-dom"
import './posts.scss'

export default function PostWrapper({title , posts}) {
    return (
        <div className='PostWrapper'>
            <h2 className='PostWrapper_title'>{title}</h2>
            <div className="PostWrapper_body">
                {posts.map((post,index) => (
                    <Link to={"/post/" + post.id} >
                        <div className="post" key={index}>
                            <div className="post_img"><img src={post.image} alt="post image" /></div>
                            <div className="post_info">
                                <h3 className='post_title'>{post.title}</h3>
                                <p  className='post_body'>{post.body}</p>
                                <p><a className='post_author'>{post.author}</a> - <a className='post_date'>{post.updated}</a></p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="btn_more">
                <a href="#" rel="noopener noreferrer">More</a>
            </div>
        </div>
    )
}
