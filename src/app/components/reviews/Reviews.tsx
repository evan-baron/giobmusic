// Library imports
import React from 'react';

// Hooks imports

// Styles imports
import styles from './reviews.module.scss';

// Components imports

// Context imports

const Reviews = () => {
	return (
		<div className={styles['reviews-wrapper']}>
			<div className={styles.reviews}>
				<div className={styles.content}>
					<h2>Reviews</h2>
				</div>
			</div>
		</div>
	);
};

export default Reviews;
