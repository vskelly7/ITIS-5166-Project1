// I think we need to install luxon to activate the date/time below
const { DateTime } = require("luxon");
const { v4: uuidv4 } = require("uuid");

const events = [
	{
		id: "1",
		category: "Educational",
		title: "LCES 2050 - Introduction to Linguistic Anthropology",
		host: "Vanessa Kelly",
		start: DateTime.local(2024, 11, 15, 14, 0).toLocaleString(
			DateTime.DATETIME_SHORT
		),
		end: DateTime.local(2024, 11, 15, 17, 0).toLocaleString(
			DateTime.DATETIME_SHORT
		),
		details:
			"Students enrolled in LCES 2050 can attended a guest lecture by a renowned sociolinguist who explored the impact of regional dialects on social identity. After the presentation, there will be a Q&A session and a group discussion on how these insights could be applied to the course.  Participating students will recieve an extra 3% added to their grade.",
	},
	{
		id: "2",
		category: "Educational",
		title: "ITIS 5166 - Network Based Application Development",
		host: "Jonathan Smith",
		start: DateTime.local(2024, 10, 30, 13, 0).toLocaleString(
			DateTime.DATETIME_SHORT
		),
		end: DateTime.local(2024, 10, 30, 15, 0).toLocaleString(
			DateTime.DATETIME_SHORT
		),
		details:
			"Students enrolled in ITIS 5166 can attended a research study on AI by PhD students.  Several exercises will be conducted and follow-up surveys will be administered afterward.  Participating students will recieve an extra 2% added to their grade.",
		// image: to be added,
	},
	{
		id: "3",
		category: "Educational",
		title: "MBAD 6122 - Decision Modeling and Analysis",
		host: "Vanessa Kelly",
		start: DateTime.local(2024, 11, 3, 9, 0).toLocaleString(
			DateTime.DATETIME_SHORT
		),
		end: DateTime.local(2024, 11, 3, 15, 0).toLocaleString(
			DateTime.DATETIME_SHORT
		),
		details:
			"Students enrolled in MBAD 6122 can attended 1-day decision modelling competition in person on campus.  Participants will be grouped and will have to apply their knowledge to several scenarios.  The team with the best solution will recieve an extra 5% added to their grade.",
		// image: to be added,
	},
	{
		id: "4",
		category: "Recreational",
		title: "Fun at Carowinds",
		host: "Jonathan Smith",
		start: DateTime.local(2024, 10, 31, 19, 0).toLocaleString(
			DateTime.DATETIME_SHORT
		),
		end: DateTime.local(2024, 10, 31, 21, 0).toLocaleString(
			DateTime.DATETIME_SHORT
		),
		details:
			"Carowinds is known for their spooky Halloween displays in the park.  Join us to experience one of the best Halloween events in Charlotte -- if you dare!",
		// image: to be added,
	},
	{
		id: "5",
		category: "Recreational",
		title: "Local Brewery Crawl",
		host: "Vanessa Kelly",
		start: DateTime.local(2024, 11, 12, 14, 0).toLocaleString(
			DateTime.DATETIME_SHORT
		),
		end: DateTime.local(2024, 11, 12, 17, 0).toLocaleString(
			DateTime.DATETIME_SHORT
		),
		details: `We will meet at the Wooden Ropbot and continue to Sycamore Brewery and Monday Night Brewing from there. All brewery stops are within walking distance.  Join us to experience what's brewing in Charlotte!`,
		image: "/img/brewery.jpg",
	},
	{
		id: "6",
		category: "Recreational",
		title: "Farmers Market Meet Up",
		host: "Jonathan Smith",
		start: DateTime.local(2024, 11, 20, 9, 0).toLocaleString(
			DateTime.DATETIME_SHORT
		),
		end: DateTime.local(2024, 11, 20, 11, 0).toLocaleString(
			DateTime.DATETIME_SHORT
		),
		details:
			"We will enjoy the crisp Fall air at the nearby Farmers Market.  They have many arisian vendors for unique Christmas gifts.  Support local!",
		// image: to be added,
	},
];

exports.find = function () {
	return events;
};

exports.findById = function (id) {
	return events.find((event) => event.id === id);
};

exports.save = (event) => {
	event.id = uuidv4();
	event.start = DateTime.fromISO(event.start).toLocaleString(DateTime.DATETIME_SHORT);
	event.end = DateTime.fromISO(event.end).toLocaleString(DateTime.DATETIME_SHORT);
	events.push(event);
	console.log(events);
};