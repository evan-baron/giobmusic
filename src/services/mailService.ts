import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.NEXT_PUBLIC_EMAIL,
		pass: process.env.EMAIL_PASSWORD,
	},
});

type TemplateReplacements = Record<string, string>;

const getTemplate = (templateName: string, replacements: TemplateReplacements = {}): string => {
	const filePath = path.join(
		process.cwd(),
		'src/services/emailTemplates',
		`${templateName}.html`
	);
	let template = fs.readFileSync(filePath, 'utf8');

	for (const key in replacements) {
		const regex = new RegExp(`{{${key}}}`, 'g');
		template = template.replace(regex, replacements[key]);
	}

	return template;
};

export const sendContactForm = async (name: string, email: string, phone: string, service: string, message: string): Promise<void> => {
	const htmlContent = getTemplate('contactForm', {
		name,
		email,
		phone,
		service,
		message,
	});

	const mailOptions = {
		from: process.env.NEXT_PUBLIC_EMAIL,
		to: process.env.PERSONAL_EMAIL,
		subject: `Giobmusic Lead Request From ${name}`,
		html: htmlContent,
	};

	try {
		await transporter.sendMail(mailOptions);
	} catch (err) {
		console.error('Error sending email: ', err);
	}
};

const mailService = {
	sendContactForm
};

export default mailService;
