'use client';

// Library imports
import React, { useState, useEffect } from 'react';
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
	const [prevIndex, setPrevIndex] = useState(selectedIndex);
	const [currentTransformDist, setCurrentTransformDist] = useState(0);
	const [isAnimating, setIsAnimating] = useState(true);
	const [clickEnabled, setClickEnabled] = useState(true);

	const [currentPhotos, setCurrentPhotos] = useState(
		carouselOptions[selectedIndex].images
	);
	const [futurePhotos, setFuturePhotos] = useState(
		carouselOptions[selectedIndex].images
	);
	const [currentText, setCurrentText] = useState(
		carouselOptions[selectedIndex].description
	);
	const [futureText, setFutureText] = useState('');
	const [isFading, setIsFading] = useState(false);

	useEffect(() => {
		if (
			selectedIndex !== prevIndex &&
			carouselOptions[selectedIndex].images[0] !==
				carouselOptions[prevIndex].images[0]
		) {
			setIsFading(true);
			setFutureText(carouselOptions[selectedIndex].description);
			setFuturePhotos(carouselOptions[selectedIndex].images);
			setTimeout(() => {
				setCurrentPhotos(carouselOptions[selectedIndex].images);
				setPrevIndex(selectedIndex);
				setCurrentText(carouselOptions[selectedIndex].description);
				setIsFading(false);
			}, 450); // This timeout must be SLIGHTLY less than the animation duration to avoid flashing - 50ms recommended
		}
	}, [selectedIndex]);

	const handleClick = (index: number) => {
		if (!clickEnabled) return;

		// Click spam prevention
		setClickEnabled(false);

		// Turning click back on
		setTimeout(() => {
			setClickEnabled(true);
		}, 300);

		if (index === selectedIndex) return;

		const diff = index - selectedIndex;
		const direction = diff > 0 ? 'right' : 'left';

		// Reached left boundary for infinite scroll purposes
		const reachedLeftBound = index < options.length * 0.5;

		// Reached right boundary for infinite scroll purposes
		const reachedRightBound = index > options.length * 1.5;

		if (direction === 'left') {
			if (reachedLeftBound) {
				setSelectedIndex(index);
				setCurrentTransformDist((prev) => prev + diff);
				setTimeout(() => {
					setIsAnimating(false);
					setSelectedIndex(index + options.length);
					setCurrentTransformDist((prev) => prev + options.length);
					setTimeout(() => setIsAnimating(true), 100);
				}, 500);
			} else {
				setSelectedIndex(index);
				setCurrentTransformDist((prev) => prev + diff);
			}
		} else if (direction === 'right') {
			if (reachedRightBound) {
				setSelectedIndex(index);
				setCurrentTransformDist((prev) => prev + diff);
				setTimeout(() => {
					setIsAnimating(false);
					setSelectedIndex(index - options.length);
					setCurrentTransformDist((prev) => prev - options.length);
					setTimeout(() => setIsAnimating(true), 100);
				}, 500);
			} else {
				setSelectedIndex(index);
				setCurrentTransformDist((prev) => prev + diff);
			}
		}
	};

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
									} ${isAnimating && styles.animating}`}
									onClick={() => handleClick(idx)}
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
						<div className={styles.image}>
							<Image
								src={currentPhotos[0]}
								alt={`Image 1`}
								fill
								style={{
									objectFit: 'cover',
									opacity: isFading ? 0 : 1,
									transition: isFading ? 'opacity 0.5s ease-in-out' : 'none',
								}}
							/>
							{futurePhotos[0] && (
								<Image
									src={futurePhotos[0]}
									alt={`Image 1`}
									fill
									style={{
										objectFit: 'cover',
										opacity: isFading ? 1 : 0,
										transition: isFading ? 'opacity 0.5s ease-in-out' : 'none',
									}}
								/>
							)}
						</div>
						<div className={styles.image}>
							<Image
								src={currentPhotos[1]}
								alt={`Image 1`}
								fill
								style={{
									objectFit: 'cover',
									opacity: isFading ? 0 : 1,
									transition: isFading ? 'opacity 0.5s ease-in-out' : 'none',
								}}
							/>
							{futurePhotos[1] && (
								<Image
									src={futurePhotos[1]}
									alt={`Image 1`}
									fill
									style={{
										objectFit: 'cover',
										opacity: isFading ? 1 : 0,
										transition: isFading ? 'opacity 0.5s ease-in-out' : 'none',
									}}
								/>
							)}
						</div>
					</div>
					<div className={styles.description}>
						<p
							className={styles.text}
							style={{
								opacity: isFading ? 0 : 1,
								transition: isFading ? 'opacity 0.5s ease-in-out' : 'none',
							}}
						>
							{currentText}
						</p>
						<p
							className={styles.text}
							style={{
								position: 'absolute',
								top: '0',
								opacity: isFading ? 1 : 0,
								transition: isFading ? 'opacity 0.5s ease-in-out' : 'none',
							}}
						>
							{futureText}
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
