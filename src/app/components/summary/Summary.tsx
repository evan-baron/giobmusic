'use client';

// Library imports
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Hooks imports

// Styles imports
import styles from './summary.module.scss';

// Components imports
import CTA from '../ctaButton/CTA';

// Context imports
import { useAppContext } from '@/app/context/AppContext';

interface Option {
	key: string;
	label: string;
	img: string;
	images: string[];
}

const Summary = () => {
	const { isTouchDevice } = useAppContext();

	const [selectedIndex, setSelectedIndex] = useState(1);

	const options: Option[] = [
		{
			key: 'weddings',
			label: 'Weddings',
			img: '/wedding-icon-bw.jpg',
			images: ['/guitar-tux.jpg', '/guitar-corner.jpg'],
		},
		{
			key: 'corporate',
			label: 'Corporate Events',
			img: '/business-icon.jpg',
			images: ['/stage-event.jpg', '/piano-outside.png'],
		},
		{
			key: 'parties',
			label: 'Private Parties',
			img: '/party-icon.jpg',
			images: ['/guitar-red-backdrop.jpg', '/piano-dancing.jpeg'],
		},
	];

	const getRotatedOptions = () => {
		// Always show [left, center, right]
		const left = (selectedIndex + options.length - 1) % options.length;
		const right = (selectedIndex + 1) % options.length;
		return [options[left], options[selectedIndex], options[right]];
	};

	return (
		<div className={styles['summary-wrapper']}>
			<div className={styles.summary}>
				<div className={styles.content}>
					<ul className={styles.buttons}>
						{getRotatedOptions().map((option, idx) => (
							<li
								key={option.key}
								className={`${styles.button} ${
									idx === 1 ? styles.selected : ''
								}`}
								onClick={() =>
									setSelectedIndex(
										options.findIndex((o) => o.key === option.key)
									)
								}
							>
								<div className={styles.image}>
									<Image src={option.img} alt={option.label} fill />
								</div>
								<p>{option.label}</p>
							</li>
						))}
					</ul>
					<div className={styles.images}>
						{getRotatedOptions()[1].images.map((img, idx) => (
							<div key={idx} className={styles.image}>
								<Image
									src={img}
									alt={`Image ${idx + 1}`}
									fill
									style={{ objectFit: 'cover' }}
								/>
							</div>
						))}
					</div>
					<div className={styles.description}>
						<p className={styles.text}>
							{getRotatedOptions()[1].key === 'weddings' ? (
								<>
									From the first notes of guitar or piano at your ceremony to
									singing your favorite hits during cocktail hour, Gio sets the
									tone for your big day. When it's time to party, he transforms
									into a high-energy DJ, mixing tracks, jumping in with live
									instruments, and keeping the dancefloor alive all night. And
									just like at his corporate events and private parties, every
									detail is tailored to your crowd and your vision.
								</>
							) : getRotatedOptions()[1].key === 'corporate' ? (
								<>
									Whether it's an annual gala, a milestone celebration, a grand
									opening, or a private company dinner, Gio delivers polished,
									professional entertainment that leaves a lasting impression.
									From intimate gatherings to full-scale events of 500+ people,
									he's worked with everyone from CBS to local businesses,
									dedicating the same energy and versatility he brings to
									weddings and private parties. Whatever the occasion calls for,
									you'll get music that keeps your guests engaged from start to
									finish.
								</>
							) : (
								<>
									From embassy receptions in Washington, DC to backyard
									birthdays in Santa Fe, Gio has brought unforgettable music to
									gatherings of every kind. Guests get the same quality and
									versatility he delivers at corporate events and weddings,
									whether that's singalong crowd favorites, refined instrumental
									ambience, or a full-scale performance that feels like a
									private concert. No matter the setting, your party will have
									the soundtrack it deserves.
								</>
							)}
						</p>
						<p className={styles.text}>
							Need a larger ensemble? Gio's network of top-tier musicians,
							including violin, harp, sax, full band, and more, can bring it all
							to life.
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
	);
};

export default Summary;
