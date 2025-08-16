'use client';

// Library imports
import React from 'react';
import Link from 'next/link';

// Hooks imports

// Styles imports
import styles from './cta.module.scss';

// Components imports

const CTA = ({ parent }: { parent: string }) => {
	return (
		<Link
			href='#contact'
			type='button'
			className={`${styles.cta} ${styles[parent]}`}
		>
			Book Now
		</Link>
	);
};

export default CTA;
