// Library imports
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Styles imports
import styles from './header.module.scss';

function Header() {
	return (
		<div className={styles['header-wrapper']}>
			<header className={styles.header}>
				<nav>
					<ul>
						<li>
							<Link href='#top'>
								<div className={styles.logo}>
									<Image
										src='/logo.png'
										alt='Logo'
										fill
										className={styles.image}
										sizes='(max-width: 768px) 20vw, (max-width: 1200px) 15vw, 10rem'
									/>
								</div>
							</Link>
						</li>
						<li>
							<Link href='#bio'>About</Link>
						</li>
						<li>
							<Link href='/services'>Music</Link>
						</li>
						<li>
							<Link href='/faq'>Events</Link>
						</li>
						<li>
							<Link href='/blog'>Gallery</Link>
						</li>
						<li>
							<Link href='/faq'>Reviews</Link>
						</li>
						<li>
							<Link href='/contact'>Book Now</Link>
						</li>
					</ul>
				</nav>
			</header>
		</div>
	);
}

export default Header;
