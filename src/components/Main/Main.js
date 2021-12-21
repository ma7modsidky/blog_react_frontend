import React, { useEffect , useState, useContext } from 'react'

import Login from '../../pages/Login/Login'
import Home from '../../pages/Home/Home'
import Profile from '../../pages/Profile/Profile'
import './main.scss'
import axiosInstance from '../../axios';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import PostDetail from '../Post/PostDetail';
import AuthContext from '../../context/AuthContext'



export default function Main() {
    
    return (
            <main className='main'>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/about">
                        <div className="about">about</div>
                    </Route>
                    <Route path="/post/:id" exact component={PostDetail} />
                        
                    <Route path="/login">
                        <Login />
                    </Route>
                     <Route path="/profile">
                        <Profile />
                    </Route>
                </Switch>
            </main>
        
    )
}
