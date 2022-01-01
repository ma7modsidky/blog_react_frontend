import React from 'react'
import userimg from '../../assets/imgs/no_profile_picture.webp'
import postimg from '../../assets/imgs/unavailable-image.jpg'

import {AiFillFacebook,AiOutlineTwitter,AiOutlineTag} from 'react-icons/ai'
import {FaPinterest,FaGooglePlusG} from 'react-icons/fa'
import { useEffect , useState, useContext } from 'react'
import axiosInstance from '../../axios';
import AuthContext from '../../context/AuthContext'
import {Link} from "react-router-dom"
import 'react-quill/dist/quill.snow.css';


const SocialShare = () => {
    return (
        <div className="social">
            <div className="fa">Share <AiFillFacebook/></div>
            <div className="tw">Tweet <AiOutlineTwitter/></div>
            <div className="pn"><FaPinterest/></div>
            <div className="go"><FaGooglePlusG/></div>
        </div>
    )
}

const Tags = (props) => (
    <div className="tags">
        <AiOutlineTag/>
        {props.tags.map((tag)=> (
            <span>{tag} ,</span>
        ))}
    </div>
)


const Comments = (props) => {
    const {user} = useContext(AuthContext)
    const [comments, setComments] = useState(props.data);
    const [visible, setVisible] = useState(5);
    const newCommentinital = Object.freeze({
		body : '',
	});
    const [newCommentData, setNewCommentData] = useState(newCommentinital);
    const handleChange = (e) => {
		setNewCommentData({
			...newCommentinital,
			body : e.target.value,
		});
	};
    const createComment = (e) =>{
        e.preventDefault();
        axiosInstance
        .post('createComment/', {
            post : props.postId,
            author : user.user_id,
            body : newCommentData.body,
        })
        .then((res) => {
            console.log('now testing adding comment', res)
            res.data.author = {
                'user_name': user.username}
            res.data.author.image = userimg
            // res.data.author.image = user.profile_image?`http://127.0.0.1:8000${user.profile_image}`:userimg
            setComments([...comments, res.data])
            setNewCommentData(newCommentinital)
            setVisible(comments.length+1)
            
        })
        .catch(err => console.log(err))
    }

    return(
    <div className="comments">
        <h1>Comments</h1>
        {comments.slice(0,visible).map((comment , index)=> (
            <div className="comment" key={index}>
                <div className="comment_head">
                    <div className="usrImg">
                        {comment.author.image?
                        <img src={`${comment.author.image}`} alt="profile_image" />:
                        <img src={userimg} alt="no_profile_image" />
                        }
                    </div>
                    <div className="info">
                        <div className="user">{comment.author.user_name}</div>
                        <div className="date">{comment.created}</div>
                    </div>
                </div>
                <p className="comment_body">
                    {comment.body}
                </p>
            </div>

        ))}
        {comments.length > visible ?
        <button onClick={()=> setVisible(visible => visible += 3)} className='btn'>load more ({comments.length - visible})</button>:
        null
        }
        <form>
            <h2>Post a new comment</h2>
            <textarea name="comment" id="" cols="30" rows="10" placeholder='Enter your comment' res onChange={handleChange} value={newCommentData.body}></textarea>
            <input type="submit" value="PUBLISH" className='submit btn' onClick={createComment} />
        </form>    
    </div>
)}

export default function PostDetail(props) {
    const postId = props.match.params.id
    const [data, setData] = useState({dataIsReturned: false });
    const {user} = useContext(AuthContext)

    useEffect(() =>{
        console.log('request started')
        axiosInstance
        .get(''+ postId)
        .then((res) => {
            console.log(res)
            setData({post: res.data , dataIsReturned : true})})
        .catch(error => {
            alert(error.response.statusText)
        })    
        
    },[])

    
    const { dataIsReturned, post} = data;
    return (        
        <div className='PostDetail'>
            {!data.dataIsReturned ?
            <h1>Please wait</h1>:
            <div>
                <h1 className='PostDetail_title'>{data.post.title}</h1>
                <div className="PostDetail_wrapper">
                    <p className='PostDetail_brief'>{data.post.brief}</p>
                    <SocialShare />
                    <div className='PostDetail_author'>{data.post.author}<a href="#"></a></div>
                    <div className='PostDetail_date'>{data.post.updated}</div>
                    {post.image?
                    <div className="PostDetail_image"><img src={data.post.image} alt="post image" /></div>:
                    null
                    }
                    <div className='PostDetail_body' dangerouslySetInnerHTML={{ __html: data.post.body }} />
                    <Tags tags={[data.post.category]}/>
                    <SocialShare />
                    <Comments data={data.post.comments} postId={postId} updateComments={setData}/>
                </div>
            </div>
            }
        </div>
        
    )
}


