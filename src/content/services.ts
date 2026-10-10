// Copy from expressionconcert.com (About Us and Home pages)

export type Service = {
  id: string;
  title: string;
  titleAccent: string;
  summary: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  cta?: { label: string; href: string };
};

export const services: Service[] = [
  {
    id: "music-therapy",
    title: "Music Therapy",
    titleAccent: "Services.",
    summary: "Professional music therapy for people living with mental health challenges, disabilities or trauma.",
    paragraphs: [
      "We deliver professional music therapy sessions for individuals living with mental health challenges, developmental disabilities, or trauma.",
      "Sessions take place in hospitals, care homes, schools, and community centres, using evidence-based approaches that support emotional regulation, communication, and overall wellbeing.",
    ],
    image: "/images/gallery/music-therapy-sessions-1/01.jpg",
    imageAlt: "A music therapy session in a care home lounge",
  },
  {
    id: "music-education",
    title: "Community Music",
    titleAccent: "Education.",
    summary: "Affordable or free music learning for people who cannot afford private lessons.",
    paragraphs: [
      "Our education programmes make music learning accessible for those who cannot afford private lessons.",
      "We offer workshops in instrument playing, singing, music production, and performance, with affordable or free options for people facing financial hardship.",
    ],
    image: "/images/gallery/drum-festival/12.jpg",
    imageAlt: "A young drummer playing an electronic drum kit",
    cta: { label: "School of Music", href: "/school-of-music" },
  },
  {
    id: "therapeutic-workshops",
    title: "Therapeutic Music",
    titleAccent: "Workshops.",
    summary: "Group music-making with peer support for anxiety, depression and post-traumatic stress.",
    paragraphs: [
      "We run group sessions that combine music-making with peer support for people experiencing anxiety, depression, or post-traumatic stress.",
      "These workshops provide safe and supportive environments for emotional expression and social connection.",
    ],
    image: "/images/gallery/healing-through-harmony/08.jpg",
    imageAlt: "A Healing Through Harmony group raising their hands during a session",
    cta: { label: "See Our Programmes", href: "/programmes" },
  },
  {
    id: "artist-development",
    title: "Artist",
    titleAccent: "Development.",
    summary: "Mentoring, training and performance opportunities for emerging musicians.",
    paragraphs: [
      "We support emerging and established musicians to grow their skills, confidence, and careers. Through mentorship, training, and live performances, we help artists reach new audiences and build sustainable creative futures.",
      "Our aim is to nurture local talent and strengthen the cultural heartbeat of our communities.",
    ],
    image: "/images/site/singers.jpg",
    imageAlt: "Singers performing on stage at Expression Concert",
    cta: { label: "Get In Touch", href: "/contact" },
  },
  {
    id: "cultural-events",
    title: "Cultural Showcases &",
    titleAccent: "Community Events.",
    summary: "Concerts, showcases and multicultural experiences that bring people together.",
    paragraphs: [
      "Our community events are designed to highlight the beauty of cultural diversity.",
      "These gatherings feature performances, music workshops, and interactive sessions that encourage collaboration and understanding through music.",
    ],
    image: "/images/gallery/expression-2-0/10.jpg",
    imageAlt: "Guests and performers together at Expression Concert 2.0",
    cta: { label: "See Events", href: "/events" },
  },
];
