'use client';

// Library imports
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Styles imports
import styles from './header.module.scss';

// Hooks imports
import { useScrollValue } from '../../../lib/hooks/useScrollValue';

// Context
import { useAppContext } from '@/app/context/AppContext';

function Header() {
	const { isTouchDevice } = useAppContext();

	const headerHeight = isTouchDevice ? '6rem' : useScrollValue('10rem', '6rem');
	const logoHeight = isTouchDevice ? '6rem' : useScrollValue('7.5rem', '6rem');
	const logoWidth = isTouchDevice
		? '14rem'
		: useScrollValue('17.5rem', '14rem');
	// const navFontSize = isTouchDevice
	// 	? '1.25rem'
	// 	: useScrollValue('2rem', '1.5rem');
	const navFontSize = isTouchDevice
		? '1.25rem'
		: useScrollValue('2.5rem', '2rem');
	const ulGap = isTouchDevice ? '2rem' : useScrollValue('2rem', '1.5rem');
	// const ulGap = isTouchDevice ? '2rem' : useScrollValue('3rem', '2rem');
	const navOpacity = isTouchDevice ? 0.9 : useScrollValue(0, 0.9);

	return (
		<div
			className={styles['header-wrapper']}
			style={{
				height: headerHeight,
				backgroundImage: `linear-gradient(to bottom, black, hsla(0, 0%, 0%, ${navOpacity}))`,
			}}
		>
			<header className={styles.header}>
				<nav>
					<Link href='/'>
						<div
							className={styles.logo}
							style={{ height: logoHeight, width: logoWidth }}
						>
							<Image
								src='/logo-white-moondance.webp'
								alt='Logo'
								fill
								className={styles.image}
								sizes='(max-width: 768px) 20vw, (max-width: 1200px) 15vw, 10rem'
							/>
						</div>
					</Link>
					<ul style={{ fontSize: navFontSize, gap: ulGap }}>
						<li>
							<Link className={styles.link} href='#bio'>
								About
							</Link>
						</li>
						<li>
							<Link className={styles.link} href='/services'>
								Services
							</Link>
						</li>
						<li>
							<Link className={styles.link} href='#music'>
								Music
							</Link>
						</li>
						{/* <li>
							<Link className={styles.link} href='#events'>
								Events
							</Link>
						</li> */}
						<li>
							<Link className={styles.link} href='/gallery'>
								Gallery
							</Link>
						</li>
						{/* <li>
							<Link className={styles.link} href='#reviews'>
								Reviews
							</Link>
						</li> */}
						<li>
							<Link href='#contact'>Book Now</Link>
						</li>
					</ul>
				</nav>
			</header>
		</div>
	);
}

export default Header;
