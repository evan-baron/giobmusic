import React from 'react';

// Styles imports
import styles from './header.module.css';

function Header() {
	return (
		<div className={styles['header-wrapper']}>
			<header className={styles.header}>
				<nav>
					<ul>
						<li>
							<a href='#top'>Home</a>
						</li>
						<li>
							<a href='#bio'>About</a>
						</li>
						<li>
							<a href='/services'>Music</a>
						</li>
						<li>
							<a href='/blog'>Gallery</a>
						</li>
						<li>
							<a href='/faq'>Reviews</a>
						</li>
						<li>
							<a href='/contact'>Book Now</a>
						</li>
					</ul>
				</nav>
			</header>
		</div>
	);
}

export default Header;
