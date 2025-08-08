export interface ReviewData {
	review: string;
	author: string;
	link: string;
	date: string;
}

const baseLink = 'https://www.gigsalad.com/gio_barabadze_denver/review/';

export const tileData: ReviewData[] = [
	{
		review:
			'Gio was AMAZING! Everyone loved him and his music was perfect for our event!',
		author: 'Lori R.',
		link: `${baseLink}421486`,
		date: '2025-08-05',
	},
	{
		review: 'Amazing artist! Perfect for our daughters wedding cocktail hour.',
		author: 'Carole G.',
		link: `${baseLink}419553`,
		date: '2025-07-20',
	},
	{
		review:
			'Gio was wonderful. Several people attending my event complimented his music to me. He also helped with some mic difficulties we were having, which was a bonus. Would highly recommend him!',
		author: 'Emerson K.',
		link: `${baseLink}413084`,
		date: '2025-05-23',
	},
	{
		review:
			"Gio is awesome! Showed up with plenty of time for setup and played beautifullyand professionally throughout the event. Couldn't have asked for more. Thank you, Gio!",
		author: 'Kasi C.',
		link: `${baseLink}397266`,
		date: '2024-12-20',
	},
	{
		review:
			'We were delighted Gio was available for our event, his music added so much to the evening. Besides being a talented musician, Gio is wonderful to work with. He was very professional and pleasant, and made an effort to ensure the setup was perfect.',
		author: 'Julia M.',
		link: `${baseLink}388635`,
		date: '2024-10-29',
	},
	{
		review:
			"Gio's music was so wonderful and added a special element to our event. He was incredibly communicative, easy to work with, and really listened to what we were looking for at the event. Would highly recommend working with him for your next event!",
		author: 'Anna B.',
		link: `${baseLink}384177`,
		date: '2024-09-26',
	},
	{
		review:
			"I hired Gio for two corporate events in July. I was wildly impressed with him from the very beginning. Gio was communicative, professional, kind, and incredibly talented. I would recommend Gio for any event you're looking to make a splash at.",
		author: 'Taylor F.',
		link: `${baseLink}376660`,
		date: '2024-07-20',
	},
	{
		review:
			"Gio was the best party entertainment I've ever experienced. Couldnt have been easier to work with. Definitely ask him to play his own music. We'll be inviting him every time.",
		author: 'Matthew D.',
		link: `${baseLink}370359`,
		date: '2024-05-26',
	},
	{
		review:
			'Gio is a wonderful musician, but what I really appreciated was his communication and flexibility throughout the process. He was able to weave one of our friends into the performance, and it added so much to our wedding day. Highly recommend Gio for personalized, authentic, beautiful live music.',
		author: 'Creighton H.',
		link: `${baseLink}368357`,
		date: '2024-05-07',
	},
	{
		review:
			'Gio could not have been more professional for our wedding. He came well prepared and had clearly put time and effort into learning the 5-6 pieces for our wedding ceremony. He worked great with our vocalist/cantor and was clearly a very experienced and skilled classical pianist.',
		author: 'Joe M.',
		link: `${baseLink}347841`,
		date: '2023-11-28',
	},
];
