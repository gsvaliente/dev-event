export interface Event {
  image: string;
  title: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: Event[] = [
  {
    image: "/images/event1.png",
    title: "Tech Conference",
    slug: "tech-conference",
    location: "Seattle, WA",
    date: "January 15, 2026",
    time: "8:00 AM - 5:00 PM",
  },
  {
    image: "/images/event2.png",
    title: "JavaScript Workshop",
    slug: "javascript-workshop",
    location: "Austin, TX",
    date: "February 28, 2026",
    time: "10:00 AM - 4:00 PM",
  },
  {
    image: "/images/event3.png",
    title: "React Conference",
    slug: "react-conference",
    location: "San Francisco, CA",
    date: "March 15, 2026",
    time: "9:00 AM - 6:00 PM",
  },
  {
    image: "/images/event4.png",
    title: "Next.js Meetup",
    slug: "nextjs-meetup",
    location: "New York, NY",
    date: "April 22, 2026",
    time: "6:30 PM - 9:00 PM",
  },
  {
    image: "/images/event5.png",
    title: "Node.js Summit",
    slug: "nodejs-summit",
    location: "Denver, CO",
    date: "May 10, 2026",
    time: "9:00 AM - 6:00 PM",
  },
  {
    image: "/images/event6.png",
    title: "Python Developer Conference",
    slug: "python-developer-conference",
    location: "Boston, MA",
    date: "June 5, 2026",
    time: "8:30 AM - 5:30 PM",
  },
];
