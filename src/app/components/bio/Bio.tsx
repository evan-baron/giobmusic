// Library imports
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Hooks imports

// Styles imports
import styles from './bio.module.scss';

// Components imports
import CTA from '../ctaButton/CTA';

// Context imports

const Bio = () => {
	return (
		<div className={styles['bio-wrapper']}>
			<div className={styles.bio}>
				<div className={styles['content-wrapper']}>
					<h2>Meet Gio</h2>
					<div className={styles.content}>
						<div className={styles.blobs}>
							<div className={styles.blob}>
								<div className={styles['outer-image']}>
									<div className={styles['inner-image']}>
										<Image
											className={styles.image}
											src='/piano-front.jpg'
											alt='Gio'
											fill
											style={{ transform: 'scaleX(-1)' }}
										/>
									</div>
								</div>
								<div className={styles.text}>
									<p>
										Imagine stepping into the room, serenaded by passionate
										Spanish Guitar or the ethereal sound of Classical Piano.
									</p>
									{/* <p>
										Imagine stepping into the room, serenaded by passionate
										Spanish Guitar or elegant melodies of classical piano.
									</p> */}
									{/* <p>
										Imagine stepping into a room, serenaded by warm tones of
										Spanish guitar or flowing, elegant melodies of classical
										piano.
									</p> */}
									{/* <p>
										Imagine stepping into the room, being serenaded by the warm
										tones of Spanish guitar or the elegant, flowing melodies of
										classical piano.
									</p> */}
									{/* <p>
										Imagine stepping into the room and being serenaded by the
										beautiful sounds of Spanish guitar or elegant classical
										piano.
									</p> */}
									{/* <p>
										Imagine stepping into the room and being welcomed by the
										warm strum of Spanish guitar or the graceful notes of
										classical piano.
									</p> */}
								</div>
							</div>
							<div className={styles.blob}>
								<div className={styles['outer-image']}>
									<div className={styles['inner-image']}>
										<Image
											className={styles.image}
											src='/guitar-stage.jpg'
											alt='Gio'
											fill
										/>
									</div>
								</div>
								<div className={styles.text}>
									<p>
										Moments later, that same musician is lighting up the crowd,
										singing your favorite upbeat songs and filling the air with
										energy.
									</p>
								</div>
							</div>
						</div>
						<div className={styles.description}>
							<p>
								If your vision is to create an unforgettable experience that
								stays with your guests long after the night ends, hiring Gio as
								your entertainment will set the heartbeat for the evening,
								leaving a lasting impression on everyone there.
							</p>
							{/* <p>
								If creating an unforgettable experience for your guests is at
								the top of your list, choosing Gio as your entertainment will be
								the decision that makes your event truly shine.
							</p> */}
							<p>
								As a classical and jazz pianist, singer-songwriter, and
								accomplished Latin guitarist, Gio has performed at all kinds of
								venues spanning from the Denver Performing Arts Complex to the
								Dazzle Jazz Lounge and the Newman Center for the Performing
								Arts, earning a reputation for captivating audiences nationwide.
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
		</div>
	);
};

export default Bio;
