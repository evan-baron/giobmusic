'use client';

// Library imports
import React, { useState } from 'react';

// Axios instance import
import axiosInstance from '@/lib/utils/axios';

// Styles imports
import styles from './contact.module.scss';

function Contact({ id }: { id: string }) {
	type availableServices = {
		wedding: string;
		private: string;
		other: string;
	};

	const availableServices = {
		wedding: 'Wedding',
		private: 'Private Event',
		other: 'Other',
	};

	type ServiceKey = keyof typeof availableServices;

	type ContactFormData = {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
		message: string;
	};

	const [formComplete, setFormComplete] = useState(false);
	const [selectedService, setSelectedService] = useState<ServiceKey>('wedding');
	const [formData, setFormData] = useState<ContactFormData>({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		message: '',
	});

	const formReady = Boolean(
		formData.firstName &&
			formData.lastName &&
			formData.email &&
			(formData.phone?.length === 10 || formData.phone?.length === 0)
	);

	function formatPhone(value: string): string {
		// Remove all non-digit characters
		const digits = value.replace(/\D/g, '');

		if (digits.length === 0) return '';
		if (digits.length < 4) return `${digits}`;
		if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
		if (digits.length <= 10)
			return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)} - ${digits.slice(
				6
			)}`;
		// If more than 10 digits, ignore extras
		return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)} - ${digits.slice(
			6,
			10
		)}`;
	}

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;

		if (name === 'phone') {
			// Only allow digits, but format for display
			const digits = value.replace(/\D/g, '');
			setFormData((prev) => ({
				...prev,
				phone: digits.slice(0, 10), // Limit to 10 digits
			}));
			return;
		}

		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await axiosInstance.post('/api/contact', {
				name: formData.firstName + ' ' + formData.lastName,
				email: formData.email,
				phone: formData.phone,
				service: availableServices[selectedService],
				message: formData.message,
			});
			if (response.status === 201) {
				setFormComplete(true);
				setFormData({
					firstName: '',
					lastName: '',
					email: '',
					phone: '',
					message: '',
				});
				setSelectedService('wedding');
			}
		} catch (error) {
			console.error('There was an error submitting the message.', error);
		}
	};

	return (
		<div className={styles['contact-wrapper']} id={id}>
			<section
				className={styles.contact}
				aria-label='Schedule a consultation to discuss your needs'
			>
				<h2 className={styles.h2}>Book an Experience</h2>
				{!formComplete ? (
					<form onSubmit={handleSubmit} className={styles['contact-form']}>
						<fieldset className={styles['services-wrapper']}>
							<div id='services' className={styles['services']}>
								<button
									type='button'
									className={`${styles.service} ${
										selectedService === 'wedding' && styles.selected
									}`}
									onClick={() => {
										if (selectedService !== 'wedding') {
											setSelectedService('wedding');
										}
										return;
									}}
								>
									Wedding
								</button>
								<button
									type='button'
									className={`${styles.service} ${
										selectedService === 'private' && styles.selected
									}`}
									onClick={() => {
										if (selectedService !== 'private') {
											setSelectedService('private');
										}
										return;
									}}
								>
									Private Event
								</button>
								<button
									type='button'
									className={`${styles.service} ${
										selectedService === 'other' && styles.selected
									}`}
									onClick={() => {
										if (selectedService !== 'other') {
											setSelectedService('other');
										}
										return;
									}}
								>
									Other
								</button>
							</div>
						</fieldset>

						<fieldset className={styles['names-wrapper']}>
							<legend className={styles.legend}>Name</legend>
							<div className={styles['name-input']}>
								<label htmlFor='firstName'>
									First: <span className={styles.required}>*</span>
								</label>
								<input
									type='text'
									id='firstName'
									name='firstName'
									onChange={handleChange}
									required
								/>
							</div>
							<div className={styles['name-input']}>
								<label htmlFor='lastName'>
									Last: <span className={styles.required}>*</span>
								</label>
								<input
									type='text'
									id='lastName'
									name='lastName'
									onChange={handleChange}
									required
								/>
							</div>
						</fieldset>

						<fieldset className={styles['communication-wrapper']}>
							<legend className={styles.legend}>Contact Information</legend>
							<div className={styles['communication-input']}>
								<label htmlFor='email'>
									Email: <span className={styles.required}>*</span>
								</label>
								<input
									type='email'
									id='email'
									name='email'
									onChange={handleChange}
									required
								/>
							</div>
							<div className={styles['communication-input']}>
								<label htmlFor='phone'>Phone:</label>
								<input
									type='tel'
									id='phone'
									name='phone'
									inputMode='numeric'
									onChange={handleChange}
									maxLength={16}
									value={formatPhone(formData.phone)}
									placeholder='(123) 456 - 7890'
								/>
							</div>
						</fieldset>

						<fieldset className={styles['message-wrapper']}>
							<label htmlFor='message' className={styles.legend}>
								Additional Details
							</label>

							<textarea
								id='message'
								name='message'
								rows={4}
								onChange={handleChange}
							/>
						</fieldset>

						<button
							type='submit'
							className={`${styles.button} ${!formReady && styles.disabled}`}
							disabled={!formReady}
						>
							Send
						</button>
					</form>
				) : (
					<div className={styles['thankyou-form']}>
						<span className={styles.check}>✓</span>
						<h3>Request Received!</h3>
						<p>
							{' '}
							Thank you for booking with me!
							<br />
							I&#39;ve received your request and will reach out to you shortly.
						</p>
						<button
							type='button'
							aria-label='Book Another Experience'
							onClick={() => setFormComplete(false)}
							className={styles.button}
						>
							Book Another Experience
						</button>
					</div>
				)}
			</section>
		</div>
	);
}

export default Contact;
