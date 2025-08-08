'use client';

// Library imports
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Styles imports
import styles from './header.module.scss';

// Hooks imports
import { useScrollValue } from './useScrollValue';

function Header() {
	const headerHeight = useScrollValue('10rem', '6rem');
	const logoHeight = useScrollValue('7.5rem', '6rem');
	const logoWidth = useScrollValue('17.5rem', '14rem');
	const navFontSize = useScrollValue('1.75rem', '1.25rem');

	return (
		<div className={styles['header-wrapper']} style={{ height: headerHeight }}>
			<header className={styles.header}>
				<nav>
					<Link href='#top'>
						<div
							className={styles.logo}
							style={{ height: logoHeight, width: logoWidth }}
						>
							<Image
								src='/logo-white.webp'
								alt='Logo'
								fill
								className={styles.image}
								sizes='(max-width: 768px) 20vw, (max-width: 1200px) 15vw, 10rem'
							/>
						</div>
					</Link>
					<ul style={{ fontSize: navFontSize }}>
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
