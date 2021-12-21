import React, { useEffect, useState , useContext} from 'react'
import logo from '../../assets/imgs/logo.png'
import {Link} from 'react-router-dom'

import './header.scss'
import AuthContext from '../../context/AuthContext'

export default function Header() {
	let {user , logout} = useContext(AuthContext)
	
	
	return (
		<header className="header">
			<div className="header__top">
				<div className="header__logo">
					<img src={logo} alt="logo" />
				</div>
				<a href="#" id="btnHamburger" className="header__toggle">
					<span></span>
					<span></span>
					<span></span>
				</a>
			</div>
			<nav className="header__bottom">
				<ul className='categories'>
					<li><a href='#'>Culture</a></li>
					<li><a href='#'>Fashion</a></li>
					<li><a href='#'>Health</a></li>
					<li><a href='#'>Science</a></li>
					<li><a href='#'>Tech</a></li>
				</ul>
				{user?
				<ul>
					<li style={{color:'white'}}><Link to="/profile">Welcome {user.username}</Link></li>
					<li><Link to="/">Home</Link></li>
					<li onClick={logout}><Link>Logout</Link></li> :
				</ul>:
				<ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/login">Login</Link></li>
				</ul>
				}		
			</nav>
		</header>
	);
}
