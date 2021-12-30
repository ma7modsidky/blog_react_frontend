import React, { useEffect , useState} from 'react'
import axiosInstance from '../../axios';
import PostFeatured from '../../components/Post/PostFeatured'
import PostWrapper from '../../components/Post/PostWrapper'

function Home() {
    const [data, setData] = useState({posts:[], dataIsReturned: false ,});
    useEffect(() =>{
        axiosInstance
        .get(``)
        .then((res) => {
            console.log(res)
            setData({'posts' : res.data, 'featured': res.data[0] , dataIsReturned : true})})
        .catch(err => {
            console.log(err)
            setData({posts:[], dataIsReturned: false})
        }
        )


    },[])
    const { dataIsReturned, posts , featured } = data;

    return (
            <div className='Home'>
            {dataIsReturned?
            <div>
                <PostFeatured data= {featured}/>
                <PostWrapper title='latest posts' posts={posts}/>
            </div>:
            <p>
                Loading, Please wait a second ...
            </p>}
            </div>              
                        
                        
                        

                
    )
}

export default Home
