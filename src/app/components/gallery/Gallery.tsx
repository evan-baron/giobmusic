// Library imports
import React from 'react';
import Image from 'next/image';

// Hooks imports

// Styles imports
import styles from './gallery.module.scss';

// Components imports

// Context imports

const Gallery = () => {
	return (
		<div className={styles['gallery-wrapper']}>
			<div className={styles.gallery}>
				<div className={styles.content}>
					<h2>Gallery</h2>
					<div className={styles.carousel}>
						<div className={styles.left}></div>
						<div className={styles.image}></div>
						<div className={styles.right}></div>
					</div>
					<div className={styles['carousel-select']}></div>
				</div>
			</div>
		</div>
	);
};

export default Gallery;
