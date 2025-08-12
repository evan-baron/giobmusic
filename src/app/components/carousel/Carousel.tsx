'use client';

// Library imports
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Hooks imports

// Styles imports
import styles from './carousel.module.scss';

// Components imports

// Context imports

const Carousel = ({ photos }: { photos: string[] }) => {
	// Extra photos[0] added at end to make length odd for centering purposes
	const carouselPhotos = [...photos, ...photos, photos[0]];

	const carouselRef = useRef<HTMLDivElement>(null);
	const desiredImageWidth = 140; // Width of each image in pixels
	const GAP = 16; // Gap between images in pixels
	const transitionTime = 0.4; // Transition time in seconds

	const [currentIndex, setCurrentIndex] = useState(photos.length);
	const [imageDimension, setImageDimension] = useState(140);
	const [transformDist, setTransformDist] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [clickDisabled, setClickDisabled] = useState(false);
	const [shift, setShift] = useState((imageDimension + GAP) / 16);

	useEffect(() => {
		const resizeCarousel = () => {
			if (carouselRef.current) {
				setTransformDist((currentIndex - photos.length) * shift * -1);

				const length = Math.floor(
					carouselRef.current.offsetWidth / (desiredImageWidth + GAP)
				);

				if (length % 2 === 0) {
					setImageDimension(
						(carouselRef.current.offsetWidth - GAP * (length + 1)) /
							(length + 1)
					);
					setShift(
						((carouselRef.current.offsetWidth - GAP * (length + 1)) /
							(length + 1) +
							GAP) /
							16
					);
				} else {
					setImageDimension(
						(carouselRef.current.offsetWidth - GAP * (length - 1)) / length
					);
					setShift(
						((carouselRef.current.offsetWidth - GAP * (length - 1)) / length +
							GAP) /
							16
					);
				}
			}
		};

		window.addEventListener('resize', resizeCarousel);
		resizeCarousel();

		return () => {
			window.removeEventListener('resize', resizeCarousel);
		};
	}, [imageDimension]);

	useEffect(() => {}, [imageDimension]);

	const handleScroll = (direction: string) => {
		if (clickDisabled) return;

		if (carouselRef.current) {
			if (direction === 'left') {
				setIsTransitioning(true);
				setTransformDist((prev) => prev + shift);

				if (currentIndex - 1 < photos.length / 2) {
					setCurrentIndex((prev: number) => prev - 1 + photos.length);
					setClickDisabled(true);
					setTimeout(() => {
						setIsTransitioning(false);
						setTransformDist((prev) => prev * -1 + shift * 2);
						setClickDisabled(false);
					}, transitionTime * 1000);
				} else {
					setCurrentIndex((prev: number) => prev - 1);
				}
			} else if (direction === 'right') {
				setIsTransitioning(true);
				setTransformDist((prev) => prev - shift);

				if (currentIndex + 1 > photos.length * 1.5) {
					setCurrentIndex((prev: number) => prev + 1 - photos.length);
					setClickDisabled(true);

					setTimeout(() => {
						setIsTransitioning(false);
						setTransformDist((prev) => prev * -1 - shift * 2);
						setClickDisabled(false);
					}, transitionTime * 1000);
				} else {
					setCurrentIndex((prev: number) => prev + 1);
				}
			}
		}
	};

	const handleClick = (index: number) => {
		if (clickDisabled) return;

		setIsTransitioning(true);

		const isOuterLimitLeft = index < photos.length / 2;
		const isOuterLimitRight = index > photos.length * 1.5;

		// Determining new index if outer limits are crossed or not
		const newIndex = () => {
			if (isOuterLimitLeft) {
				return index + photos.length;
			} else if (isOuterLimitRight) {
				return index - photos.length;
			}
			return index;
		};

		// Calculate the change in transform distance in rem
		const transformChange = (newIndex() - currentIndex) * shift;

		// Default change
		const defaultChange = (index - currentIndex) * shift;

		// Update the current index and transform distance
		if (isOuterLimitLeft || isOuterLimitRight) {
			setTransformDist((prev) => prev - defaultChange);
			setClickDisabled(true);

			setTimeout(() => {
				setIsTransitioning(false);
				setTransformDist((prev) => {
					return prev - transformChange + defaultChange;
				});
				setCurrentIndex(newIndex());
				setClickDisabled(false);
			}, transitionTime * 1000);
		} else {
			setCurrentIndex(newIndex());
			setTransformDist((prev) => prev - transformChange);
		}
	};

	return (
		<>
			<div className={styles['gallery-image']}>
				<div className={styles.left} onClick={() => handleScroll('left')}></div>
				<div className={styles.image}>
					<Image
						src={carouselPhotos[currentIndex]}
						alt='Gallery image'
						fill
						style={{ objectFit: 'cover', borderRadius: '1rem' }}
					/>
				</div>
				<div
					className={styles.right}
					onClick={() => handleScroll('right')}
				></div>
			</div>
			<div className={styles['carouseltrack-wrapper']} ref={carouselRef}>
				<div
					className={styles['carousel-track']}
					style={{
						gap: `${GAP / 16}rem`,
						transform: `translateX(${transformDist}rem)`,
						transition: isTransitioning
							? `transform ${transitionTime}s`
							: 'none',
					}}
				>
					{carouselPhotos.map((img, idx) => (
						<div
							className={styles['carousel-image']}
							key={idx}
							onClick={() => handleClick(idx)}
						>
							<Image
								src={img}
								alt={`Gallery image ${idx + 1}`}
								width={imageDimension}
								height={imageDimension}
								style={{ objectFit: 'cover', borderRadius: '1rem' }}
							/>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Carousel;
