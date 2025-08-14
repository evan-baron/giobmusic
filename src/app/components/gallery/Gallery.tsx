'use client';

// Library imports
import React from 'react';
import Link from 'next/link';

// Hooks imports

// Styles imports
import styles from './gallery.module.scss';

// Components imports
import Carousel from '../carousel/Carousel';
import CTA from '../ctaButton/CTA';

// Context imports

const Gallery = () => {
	// Photos
	const photos = [
		'/gallery/piano-stage.jpg',
		'/gallery/guitar-building.jpg',
		'/gallery/piano-dancing.jpeg',
		'/gallery/guitar-corner.jpg',
		'/gallery/piano-dark.jpg',
		'/gallery/guitar-duo.jpg',
		'/gallery/piano-duet.jpg',
		'/gallery/guitar-outside.jpg',
		'/gallery/piano-front.jpg',
		'/gallery/guitar-stage.jpg',
		'/gallery/piano-outside.jpg',
		'/gallery/guitar-tux.jpg',
		'/gallery/piano-pov.jpg',
		'/gallery/piano-suspenders.jpg',
	];

	return (
		<div className={styles['gallery-wrapper']}>
			<div className={styles.gallery}>
				<div className={styles.content}>
					<h2>Gallery</h2>
					<Carousel photos={photos} />
					<div className={styles.cta}>
						<CTA parent='summary' />
						<p>
							For a full list of services,{' '}
							<Link href='/services' className={styles.link}>
								click here
							</Link>
							.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Gallery;
