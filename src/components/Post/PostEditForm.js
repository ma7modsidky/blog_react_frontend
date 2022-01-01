import React, {useContext, useState, useEffect} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AuthContext from '../../context/AuthContext'
import axiosInstance from '../../axios';
import { useHistory, useParams } from 'react-router-dom'


function PostEditForm() {
    const history = useHistory()
    const {id} = useParams()
    const {user} = useContext(AuthContext)
    const [data,setData] = useState({dataIsReturned : false})
    const [value, setValue] = useState('');
    const [Image, setImage] = useState(null);
    const [ImageURL, setImageURL] = useState(null);
    const [msg, setMsg] = useState(null);
    useEffect(()=>{
        axiosInstance
        .get(''+ id)
        .then((res) => {
            setValue(res.data.body)
            setData({post: res.data , dataIsReturned : true})
            setImage(res.data.image)
            setImageURL(res.data.image)
        })
        .catch(error => console.log(error.response.status , error.response.statusText)) 
    },[])
    
    
    function handleImageChange(e){
        setImage(e.target.files[0])
        setImageURL(URL.createObjectURL(e.target.files[0]))
        
    }
    function handleChange(e){
        setData({
                ...data,
                post:{
                    ...data.post,
                    [e.target.name]: e.target.value
                }
            });
            console.log(data)
    }
    function handleSubmit(e){
        e.preventDefault()
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
           }
        let fdata = new FormData()
        fdata.append('title', data.post.title)
        fdata.append('brief', data.post.brief)
        fdata.append('body', value)
        fdata.append('status', data.post.status)
        fdata.append('author', user.user_id)
        if(Image){
            fdata.append('image', Image)
        }
        axiosInstance
        .patch(`/${data.post.id}/`, fdata, config)
        .then(res=>{
            setMsg('Post updated succesfully')
            console.log(res)
        })
        .catch(err => {
            setMsg('Something went wrong please try again later')
            console.log(err)
        })
        
    }
    return (
        <div className='PostForm'>
            <h1>Edit Post</h1>
            {data.dataIsReturned?
            <form action="">
                <label htmlFor="title" >Title</label>
                <input type="text" id="title" name='title'  value={data.post.title} onChange={handleChange}/>

                <label htmlFor="brief">Brief</label>
                <input type="text" id="Brief" name='brief'  value={data.post.brief} onChange={handleChange}/>

                <label htmlFor="Body">Body</label>
                <ReactQuill theme="snow" id='Body' value={value} onChange={setValue}/>

                <label htmlFor="Image">Post Image</label>
                <input type="file" name='Image' id='Image' accept='image/*' onChange={handleImageChange}/>
                {Image?
                <img src={ImageURL} alt="post image" />:
                <img src={data.post.image} alt="post image"/>
                }
                <a className='btn' onClick={handleSubmit}>Submit</a>
                <a className='btn' onClick={history.goBack} >Back</a>
            </form>:
            <p>loading</p>}
            {msg?
            <div className='msg'>{msg}</div>:
            null}
        </div>
    )
}

export default PostEditForm
