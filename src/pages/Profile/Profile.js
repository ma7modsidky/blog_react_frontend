import React, {useContext} from 'react'
import userimg from '../../assets/imgs/no_profile_picture.webp'
import './profile.scss'
import AuthContext from '../../context/AuthContext'

function ProfileInfo(props) {
    const {user} = useContext(AuthContext)
    console.log(user)
    return (
        <div className=' profile_info'>
            <div className='profile_info_img'>
                {user.profile_image? 
                <img src={'http://127.0.0.1:8000' + user.profile_image} alt="profile image" srcset="" />:
                <img src={userimg} alt="empty profile image" />
                }
            </div>
            <div className='profile_info_text'>
                <h3>{user.name}</h3>
                <p>{user.about}</p>
                <a href="#" className='btn'>Edit information</a>
            </div>
            <div className='profile_info_stat'>
                <h3>Stats</h3>
                <p>total posts : <span>5</span></p>
                <p>total comments : <span>5</span></p>
            </div>
        </div>
    )
}


function ProfileHistory(props) {
    return (
        <div className='box'>
            this is profile history
        </div>
    )
}



function Profile() {
    return (
        <div className='profile'>
            <h1>Your Profile</h1>
            <ProfileInfo/>
            {/* <ProfileHistory/> */}
        </div>
    )
}

export default Profile
