import React ,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import PostWrapper from '../../components/Post/PostWrapper'
import axiosInstance from '../../axios';
function PostList(props) {
    const [data, setData] = useState(null);
    const params = useParams()
    useEffect(()=>{
        axiosInstance
        .get(`?category__name=${params.name}`)
        .then(res=>{
            setData(res.data)
            console.log(data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[params.name])
    return (
        <div>
            <PostWrapper title={`${params.name} Posts`} posts={data}/>
        </div>
    )
}

export default PostList
