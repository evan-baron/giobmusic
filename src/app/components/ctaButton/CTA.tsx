'use client';

// Library imports
import React from 'react';
import Link from 'next/link';

// Hooks imports

// Styles imports
import styles from './cta.module.scss';

// Components imports

// Context imports
import { useAppContext } from '@/app/context/AppContext';

const CTA = ({ parent }: { parent: string }) => {
	const { isTouchDevice } = useAppContext();

	return (
		<Link
			href='/booking'
			type='button'
			className={`${styles.cta} ${!isTouchDevice && styles['hover-enabled']} ${
				styles[parent]
			}`}
		>
			Book Now
		</Link>
	);
};

export default CTA;
