// Library imports
import Image from 'next/image';

// Styles imports
import styles from './page.module.scss';

// Components imports
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import Summary from './components/summary/Summary';
import Gallery from './components/gallery/Gallery';
import Reviews from './components/reviews/Reviews';
import Contact from './components/contact/Contact';

export default function Home() {
	return (
		<div className={styles.page}>
			<Header />
			<main className={styles.main}>
				<Hero />
				<Summary />
				<Gallery />
				<Reviews />
				<Contact />
			</main>
			<footer className={styles.footer}></footer>
		</div>
	);
}
