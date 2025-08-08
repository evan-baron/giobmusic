'use client';

// Library imports
import React, { useState, useEffect, useRef } from 'react';

// Hooks imports

// Styles imports
import styles from './hero.module.scss';

// Components imports

// Context imports
import { useAppContext } from '@/app/context/AppContext';

// Data imports
import { ReviewData } from '@/app/data/reviews'; // Use named import for ReviewData

// MUI icons
import { Star } from '@mui/icons-material';

const Hero = () => {
	const { isTouchDevice } = useAppContext();

	const [index, setIndex] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(true);
	const [isHovered, setIsHovered] = useState(false);

	const displayReviews = [...ReviewData, ReviewData[0]];

	const reviewRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const reviewBox = reviewRef.current;
		if (!reviewBox) return;

		const handleMouseEnter = () => setIsHovered(true);
		const handleMouseLeave = () => setIsHovered(false);

		reviewBox.addEventListener('mouseenter', handleMouseEnter);
		reviewBox.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			reviewBox.removeEventListener('mouseenter', handleMouseEnter);
			reviewBox.removeEventListener('mouseleave', handleMouseLeave);
		};
	}, []);

	useEffect(() => {
		if (!isTouchDevice && isHovered) return;
		if (index === displayReviews.length - 1) {
			const timeout = setTimeout(() => {
				setIsTransitioning(false);
				setIndex(0);
			}, 750);
			return () => clearTimeout(timeout);
		} else {
			const interval = setInterval(
				() => {
					setIsTransitioning(true);
					setIndex((prev) => prev + 1);
				},
				index === 0 ? 4250 : 5000
			);
			return () => clearInterval(interval);
		}
	}, [index, isHovered, isTouchDevice]);

	return (
		<div className={styles['hero-wrapper']}>
			<div className={styles.hero}>
				<div className={styles.background}>
					<video
						src='/bgVidFinal.mp4'
						className={styles.video}
						autoPlay
						loop
						muted
						playsInline
					/>
				</div>
				<div className={styles.content}>
					<div className={styles['carousel-wrapper']} ref={reviewRef}>
						<div className={styles.mask}>
							<div
								className={styles.carousel}
								style={{
									transform: `translateX(-${index * 100}%)`,
									transition: isTransitioning ? 'transform .75s' : 'none',
								}}
							>
								{displayReviews.map((review, index) => (
									<div key={index} className={styles.review}>
										<p className={styles['review-text']}>{review.review}</p>
										<p className={styles.author}>- {review.author}</p>
										<div className={styles.stars}>
											{Array.from({ length: 5 }).map((_, i) => (
												<Star key={i} className={styles.star} />
											))}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
					<button
						type='button'
						className={`${styles.cta} ${
							!isTouchDevice && styles['hover-enabled']
						}`}
					>
						Book Now
					</button>
				</div>
			</div>
		</div>
	);
};

export default Hero;
