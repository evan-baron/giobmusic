'use client';

// Library imports
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Hooks imports

// Styles imports
import styles from './summary.module.scss';

// Components imports
import CTA from '../ctaButton/CTA';

// Context imports

interface Option {
	key: string;
	label: string;
	img: string;
	images: string[];
	description: string;
}

const Summary = () => {
	const options: Option[] = [
		{
			key: 'weddings',
			label: 'Weddings',
			img: '/wedding-icon-bw.jpg',
			images: ['/guitar-tux.jpg', '/guitar-corner.jpg'],
			description:
				"From the first notes of guitar or piano at your ceremony to singing your favorite hits during cocktail hour, Gio sets the tone for your big day. When it's time to party, he transforms into a high-energy DJ, mixing tracks, jumping in with live instruments, and keeping the dancefloor alive all night. And just like at his corporate events and private parties, every detail is tailored to your crowd and your vision.",
		},
		{
			key: 'corporate',
			label: 'Corporate Events',
			img: '/business-icon.jpg',
			images: ['/stage-event.jpg', '/piano-outside.png'],
			description:
				"Whether it's an annual gala, a milestone celebration, a grand opening, or a private company dinner, Gio delivers polished, professional entertainment that leaves a lasting impression. From intimate gatherings to full-scale events of 500+ people, he's worked with everyone from CBS to local businesses, dedicating the same energy and versatility he brings to weddings and private parties. Whatever the occasion calls for, you'll get music that keeps your guests engaged from start to finish.",
		},
		{
			key: 'parties',
			label: 'Private Parties',
			img: '/party-icon.jpg',
			images: ['/guitar-red-backdrop.jpg', '/piano-dancing.jpeg'],
			description:
				"From embassy receptions in Washington, DC to backyard birthdays in Santa Fe, Gio has brought unforgettable music to gatherings of every kind. Guests get the same quality and versatility he delivers at corporate events and weddings, whether that's singalong crowd favorites, refined instrumental ambience, or a full-scale performance that feels like a private concert. No matter the setting, your party will have the soundtrack it deserves.",
		},
	];

	const carouselOptions = [...options, ...options, options[0]];

	const [selectedIndex, setSelectedIndex] = useState(options.length);
	const [currentTransformDist, setCurrentTransformDist] = useState(0);
	const [isAnimating, setIsAnimating] = useState(true);

	return (
		<div className={styles['summary-wrapper']}>
			<div className={styles.summary}>
				<div className={styles.content}>
					<div className={styles['slider-wrapper']}>
						<ul
							className={`${styles.slider} ${isAnimating && styles.animating}`}
							style={
								{
									'--slider-index': currentTransformDist,
								} as React.CSSProperties
							}
						>
							{carouselOptions.map((option, idx) => (
								<li
									key={idx}
									className={`${styles.button} ${
										idx === selectedIndex ? styles.selected : ''
									}`}
									onClick={() => setSelectedIndex(idx)}
								>
									<div className={styles.image}>
										<Image src={option.img} alt={option.label} fill />
									</div>
									<p>{option.label}</p>
								</li>
							))}
						</ul>
					</div>

					<div className={styles.images}>
						{carouselOptions[selectedIndex].images.map((img, idx) => (
							<div key={idx} className={styles.image}>
								<Image
									src={img}
									alt={`Image ${idx + 1}`}
									fill
									style={{ objectFit: 'cover' }}
								/>
							</div>
						))}
					</div>
					<div className={styles.description}>
						<p className={styles.text}>
							{carouselOptions[selectedIndex].description}
						</p>
						<p className={styles.text}>
							Need a larger ensemble? Gio's network of top-tier musicians,
							including violin, harp, sax, full band, and more, can bring it all
							to life.
						</p>
					</div>
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

export default Summary;
