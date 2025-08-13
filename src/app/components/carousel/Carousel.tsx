'use client';

// Library imports
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Hooks imports

// Styles imports
import styles from './newCarousel.module.scss';

// Components imports

// Context imports

const Carousel = ({ photos }: { photos: string[] }) => {
	const carouselPhotos = [...photos, ...photos, photos[0]];

	const [currentIndex, setCurrentIndex] = useState(photos.length);
	const [prevIndex, setPrevIndex] = useState(currentIndex);
	const [currentTransformDist, setCurrentTransformDist] = useState(0);
	const [isAnimating, setIsAnimating] = useState(true);
	const [clickEnabled, setClickEnabled] = useState(true);

	const [currentPhoto, setCurrentPhoto] = useState(
		carouselPhotos[currentIndex]
	);
	const [futurePhoto, setFuturePhoto] = useState(carouselPhotos[currentIndex]);
	const [isFading, setIsFading] = useState(false);

	useEffect(() => {
		if (
			currentIndex !== prevIndex &&
			carouselPhotos[currentIndex] !== carouselPhotos[prevIndex]
		) {
			setIsFading(true);
			setFuturePhoto(carouselPhotos[currentIndex]);
			setTimeout(() => {
				setCurrentPhoto(carouselPhotos[currentIndex]);
				setPrevIndex(currentIndex);
				setIsFading(false);
			}, 450); // This timeout must be SLIGHTLY less than the animation duration to avoid flashing - 50ms recommended
		}
	}, [currentIndex]);

	const handleScroll = (direction: 'left' | 'right') => {
		// Click spam prevention
		if (!clickEnabled) return;

		// Turning click off for spam click prevention
		setClickEnabled(false);

		// Turning click back on
		setTimeout(() => {
			setClickEnabled(true);
		}, 300);

		// Reached left boundary for infinite scroll purposes
		const reachedLeftBound = currentTransformDist - 1 < photos.length * -0.5;

		// Reached right boundary for infinite scroll purposes
		const reachedRightBound = currentTransformDist + 1 > photos.length * 0.5;

		if (direction === 'left') {
			setCurrentIndex((prevIndex) => {
				// Checking if reached left boundary
				if (prevIndex - 1 < photos.length * 0.5) {
					return prevIndex - 1 + photos.length;
				} else {
					return prevIndex - 1;
				}
			});

			if (reachedLeftBound) {
				setCurrentTransformDist((prev) => prev - 1);
				setTimeout(() => {
					setIsAnimating(false);
					setCurrentTransformDist((prev) => prev + photos.length);
					setTimeout(() => setIsAnimating(true), 10);
				}, 300);
			} else {
				setCurrentTransformDist((prev) => prev - 1);
			}
		} else if (direction === 'right') {
			setCurrentIndex((prevIndex) => {
				// Checking if reached right boundary
				if (prevIndex + 1 > photos.length * 1.5) {
					return prevIndex + 1 - photos.length;
				} else {
					return prevIndex + 1;
				}
			});

			if (reachedRightBound) {
				setCurrentTransformDist((prev) => prev + 1);
				setTimeout(() => {
					setIsAnimating(false);
					setCurrentTransformDist((prev) => prev - photos.length);
					setTimeout(() => setIsAnimating(true), 10);
				}, 300);
			} else {
				setCurrentTransformDist((prev) => prev + 1);
			}
		}
	};

	const handleClick = (index: number) => {
		if (!clickEnabled) return;

		// Click spam prevention
		setClickEnabled(false);

		// Turning click back on
		setTimeout(() => {
			setClickEnabled(true);
		}, 300);

		if (index === currentIndex) return;

		const diff = index - currentIndex;
		const direction = diff > 0 ? 'right' : 'left';

		// Reached left boundary for infinite scroll purposes
		const reachedLeftBound = index < photos.length * 0.5;

		// Reached right boundary for infinite scroll purposes
		const reachedRightBound = index > photos.length * 1.5;

		if (direction === 'left') {
			setCurrentIndex(
				index < photos.length * 0.5 ? index + photos.length : index
			);

			if (reachedLeftBound) {
				setCurrentTransformDist((prev) => prev + diff);
				setTimeout(() => {
					setIsAnimating(false);
					setCurrentTransformDist((prev) => prev + photos.length);
					setTimeout(() => setIsAnimating(true), 100);
				}, 300);
			} else {
				setCurrentTransformDist((prev) => prev + diff);
			}
		} else if (direction === 'right') {
			setCurrentIndex(
				index > photos.length * 1.5 ? index - photos.length : index
			);

			if (reachedRightBound) {
				setCurrentTransformDist((prev) => prev + diff);
				setTimeout(() => {
					setIsAnimating(false);
					setCurrentTransformDist((prev) => prev - photos.length);
					setTimeout(() => setIsAnimating(true), 100);
				}, 300);
			} else {
				setCurrentTransformDist((prev) => prev + diff);
			}
		}
	};

	return (
		<div className={styles['newcarousel-wrapper']}>
			<div className={styles['gallery-image']}>
				<div className={styles.left} onClick={() => handleScroll('left')}></div>
				<div className={styles.image}>
					<Image
						src={currentPhoto}
						className={styles['displayed-image']}
						alt='Gallery image'
						fill
						style={{
							opacity: isFading ? 0 : 1,
							transition: isFading ? 'opacity 0.5s ease-in-out' : 'none',
						}}
					/>
					{futurePhoto && (
						<Image
							src={futurePhoto}
							className={styles['displayed-image']}
							alt='Gallery image'
							fill
							style={{
								opacity: isFading ? 1 : 0,
								transition: isFading ? 'opacity 0.5s ease-in-out' : 'none',
							}}
						/>
					)}
				</div>
				<div
					className={styles.right}
					onClick={() => handleScroll('right')}
				></div>
			</div>
			<div className={styles['slider-wrapper']}>
				<div
					className={`${styles.slider} ${isAnimating && styles.animating}`}
					style={
						{ '--slider-index': currentTransformDist } as React.CSSProperties
					}
				>
					{carouselPhotos.map((photo, index) => (
						<div
							key={index}
							className={styles['image-wrapper']}
							onClick={() => handleClick(index)}
						>
							<div className={styles['image-inner']}>
								<Image
									className={styles.image}
									src={photo}
									alt={`Gallery image ${index}`}
									layout='fill'
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Carousel;
