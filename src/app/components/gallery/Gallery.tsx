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

// Data imports
import { GalleryPhotos } from '@/app/data/galleryPhotos'; // To add more to gallery photos, just go to data/galleryPhotos.tsx and follow the instructions there

const Gallery = () => {
	return (
		<div className={styles['gallery-wrapper']}>
			<div className={styles.gallery}>
				<div className={styles.content}>
					<h2>Gallery</h2>
					<Carousel photos={GalleryPhotos} />
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
