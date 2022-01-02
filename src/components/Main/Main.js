
import Login from '../../pages/Login/Login'
import Home from '../../pages/Home/Home'
import Profile from '../../pages/Profile/Profile'
import './main.scss'

import {
  Switch,
  Route,
  
} from "react-router-dom";
import PostDetail from '../Post/PostDetail';
import PostForm from '../Post/PostForm'
import PostEditForm from '../Post/PostEditForm'
import PostList from '../../pages/PostList/PostList'



export default function Main() {
    return (
            <main className='main'>
                <Switch>
                    <Route path="/about">
                        <div className="about">about</div>
                    </Route>
                    <Route path="/post/:id" exact component={PostDetail}/>
                        
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    <Route path="/new_post">
                        <PostForm />
                    </Route>
                    <Route path="/edit_post/:id" component={PostEditForm}/>
                    <Route path="/category/:name" component={PostList}/>
                    <Route path="/" exact>
                        <Home/>
                    </Route>
                    <Route path="*">
                        <Home/>
                    </Route>
                </Switch>
                
            </main>
        
    )
}
