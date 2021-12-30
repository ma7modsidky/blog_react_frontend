import React, {useContext, useState} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AuthContext from '../../context/AuthContext'
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom'


function PostForm() {
    const history = useHistory()
    const {user} = useContext(AuthContext)
    const initialFormData = Object.freeze({
		title: '',
		brief: '',
        status: 'published',
        author: user.user_id,
	});
    const [formData, updateFormData] = useState(initialFormData);
    const [value, setValue] = useState('');
    const [Image, setImage] = useState(null);
    const [msg, setMsg] = useState(null);
    function handleImageChange(e){
        setImage(e.target.files[0])
  
    }
    function handleChange(e){
        updateFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
            console.log(formData)
    }
    function handleSubmit(e){
        e.preventDefault()
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
           }
        let fdata = new FormData()
        fdata.append('title', formData.title)
        fdata.append('brief', formData.brief)
        fdata.append('body', value)
        fdata.append('status', formData.status)
        fdata.append('author', formData.author)
        if(Image){
            fdata.append('image', Image)
        }
        console.log(fdata)
        axiosInstance
        .post(``, fdata, config)
        .then(res=>{
            console.log(res)
            history.goBack()
        })
        .catch(err => {
            setMsg('Something went wrong please try again later')
        })
        
    }
    return (
        <div className='PostForm'>
            <h1>Create New Post</h1>
            {msg?
            <div>err{msg}</div>:
            null}
            <form action="">
                <label htmlFor="title" >Title</label>
                <input type="text" id="title" name='title' onChange={handleChange} value={formData.title}/>

                <label htmlFor="brief">Brief</label>
                <input type="text" id="Brief" name='brief' onChange={handleChange}/>

                <label htmlFor="Body">Body</label>
                <ReactQuill theme="snow" id='Body' value={value} onChange={setValue}/>
                <label htmlFor="Image">Post Image</label>
                <input type="file" name='Image' id='Image' accept='image/*' onChange={handleImageChange}/>
                <a className='btn' onClick={handleSubmit}>Submit</a>
                <a className='btn' onClick={history.goBack} >Back</a>
            </form>
        </div>
    )
}

export default PostForm
