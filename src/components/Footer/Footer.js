import React from 'react'
import './footer.scss'
import logo from '../../assets/imgs/logo.png'
import {Link} from 'react-router-dom'

export default function Footer() {
	return (
		<footer className='footer'>
			<div className="footer__logo">
				<img src={logo} alt="" />
			</div>
			<ul className="footer__links">
				<li><Link to="/about">About</Link></li>
				<li><a href='#'>Get in touch</a></li>
				<li><a href='#'>Career</a></li>
				<li><a href='#'>Advertising</a></li>
			</ul>
			<div className="footer__info">
				Call us at +201111504980. © VIRAL 2018. Built by Mahmoud Sidky
			</div>
		</footer>
	)
}


