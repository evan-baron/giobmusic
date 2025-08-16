'use client';

// Library imports
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Hooks imports

// Styles imports
import styles from './reviews.module.scss';

// Components imports
import CTA from '../ctaButton/CTA';

// Context imports

// Data imports
import { ReviewData } from '@/app/data/reviews';

// MUI icons
import { Star } from '@mui/icons-material';

const Reviews = ({ id }: { id: string }) => {
	const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
	const [futureReviewIndex, setFutureReviewIndex] = useState(0);
	const [isFading, setIsFading] = useState(false);

	useEffect(() => {
		if (currentReviewIndex !== futureReviewIndex) {
			setIsFading(true);
			setTimeout(() => {
				setCurrentReviewIndex(futureReviewIndex);
				setIsFading(false);
			}, 450); // This timeout must be SLIGHTLY less than the animation duration to avoid flashing - 50ms recommended
		}
	}, [futureReviewIndex]);

	const handleClick = (
		direction: 'left' | 'right' | null,
		index: number | null
	) => {
		if (index === null) {
			if (direction === 'left') {
				setFutureReviewIndex((prevIndex) =>
					prevIndex === 0 ? ReviewData.length - 1 : prevIndex - 1
				);
			} else {
				setFutureReviewIndex((prevIndex) =>
					prevIndex === ReviewData.length - 1 ? 0 : prevIndex + 1
				);
			}
		} else {
			if (index !== currentReviewIndex) {
				setFutureReviewIndex(index);
			}
		}
	};

	return (
		<div className={styles['reviews-wrapper']} id={id}>
			<div className={styles.reviews}>
				<div className={styles.content}>
					<h2>Reviews</h2>
					<div className={styles['review-container']}>
						<div
							className={styles['left']}
							onClick={() => handleClick('left', null)}
						></div>
						<div className={styles['review-box']}>
							<div
								className={styles.review}
								style={{
									opacity: isFading ? 0 : 1,
									transition: isFading ? 'opacity 0.5s ease-in-out' : 'none',
								}}
							>
								<p className={styles.author}>
									{ReviewData[currentReviewIndex].author}
								</p>

								<div className={styles.divider}></div>
								<p className={styles.text}>
									{ReviewData[currentReviewIndex].review}
								</p>

								<div className={styles.divider}></div>
								<div className={styles.stars}>
									{Array.from({ length: 5 }).map((_, i) => (
										<Star key={i} className={styles.star} />
									))}
								</div>
							</div>
							{futureReviewIndex !== currentReviewIndex ? (
								<div
									className={styles.review}
									style={{
										position: 'absolute',
										top: '0',
										opacity: isFading ? 1 : 0,
										transition: isFading ? 'opacity 0.5s ease-in-out' : 'none',
									}}
								>
									<p className={styles.author}>
										{ReviewData[futureReviewIndex].author}
									</p>
									<div className={styles.divider}></div>

									<p className={styles.text}>
										{ReviewData[futureReviewIndex].review}
									</p>

									<div className={styles.divider}></div>
									<div className={styles.stars}>
										{Array.from({ length: 5 }).map((_, i) => (
											<Star key={i} className={styles.star} />
										))}
									</div>
								</div>
							) : null}
							<div className={styles['controls']}>
								{ReviewData.map((_, index) => (
									<button
										type='button'
										key={index}
										className={`${styles.button} ${
											futureReviewIndex === index && styles.active
										}`}
										onClick={() => handleClick(null, index)}
									></button>
								))}
							</div>
						</div>
						<div
							className={styles['right']}
							onClick={() => handleClick('right', null)}
						></div>
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

export default Reviews;
