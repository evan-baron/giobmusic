// Library imports
import React from 'react';

// Hooks imports

// Styles imports
import styles from './gallery.module.scss';

// Components imports
import Carousel from '../carousel/Carousel';

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

	// Carousel settings
	const imageWidth = 140; // Width of each image in pixels
	const gapWidth = 16; // Gap between images in pixels
	const transitionTime = 0.4; // Transition time in seconds

	return (
		<div className={styles['gallery-wrapper']}>
			<div className={styles.gallery}>
				<div className={styles.content}>
					<h2>Gallery</h2>
					<Carousel
						photos={photos}
						imageWidth={imageWidth}
						gapWidth={gapWidth}
						transitionTime={transitionTime}
					/>
				</div>
			</div>
		</div>
	);
};

export default Gallery;
