// Library imports
import React from 'react';
import Image from 'next/image';

// Hooks imports

// Styles imports
import styles from './bio.module.scss';

// Components imports

// Context imports

const Bio = () => {
	return (
		<div className={styles['bio-wrapper']}>
			<div className={styles.bio}>
				<div className={styles['content-wrapper']}>
					<h2>Meet Gio</h2>
					<div className={styles.content}>
						<div className={styles.image}>
							<div className={styles['inner-image']}>
								<Image
									src='/bio-main.jpg'
									alt='Gio'
									layout='fill'
									objectFit='cover'
								/>
							</div>
						</div>
						<div className={styles.text}>
							<p>
								Gio is a passionate musician and composer, known for his unique
								sound and captivating performances.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Bio;
