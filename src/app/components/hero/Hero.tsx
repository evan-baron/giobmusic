// Library imports
import React from 'react';

// Hooks imports

// Styles imports
import styles from './hero.module.scss';

// Components imports

// Context imports

const Hero = () => {
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
			</div>
		</div>
	);
};

export default Hero;
