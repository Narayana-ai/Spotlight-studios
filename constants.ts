import { ProjectItem, ServiceItem, Testimonial } from './types';

export const PROJECTS: ProjectItem[] = [
  {
    id: '1',
    title: 'Bridal Portrait',
    category: 'Portrait',
    image: 'https://i.postimg.cc/d0BZqdkn/Makeup-by-meghamagicblush-Hair-by-makeup55778Inframe-anujk-umar2541Shoot-by-rawe-heic.jpg',
  },
  {
    id: '2',
    title: 'Makeup & Details',
    category: 'Details',
    image: 'https://i.postimg.cc/76JCSRtd/Makeup-by-meghamagicblush-Hair-by-makeup55778Inframe-anujk-umar2541Shoot-by-rawe-heic.jpg',
  },
  {
    id: '3',
    title: 'Candid Moment',
    category: 'Candid',
    image: 'https://i.postimg.cc/qB8q0yPw/Moment-capture-(3).webp',
  },
  {
    id: '4',
    title: 'Couple Moment',
    category: 'Wedding',
    image: 'https://i.postimg.cc/RZqv3HDP/Moment-capture.webp',
  },
  {
    id: '5',
    title: 'Wedding Day Highlight',
    category: 'Highlights',
    image: 'https://i.postimg.cc/NMthx9pd/Makeup-by-meghamagicblush-Hair-by-makeup55778Inframe-anujk-umar2541Shoot-by-rawe-heic.jpg',
  },
  {
    id: '6',
    title: 'Bridal Mirror Reflection Portrait',
    category: 'Wedding',
    image: 'https://i.postimg.cc/sXgmy3X4/get-(2).webp',
  },
];

export const SERVICES: ServiceItem[] = [
  // Photography
  { id: 'p1', title: 'Cinematic Wedding Films', category: 'photography', iconName: 'film' },
  { id: 'p2', title: 'Candid Photography', category: 'photography', iconName: 'camera' },
  { id: 'p3', title: 'Pre-wedding Shoots', category: 'photography', iconName: 'heart' },
  { id: 'p4', title: 'Product Editorials', category: 'photography', iconName: 'box' },
  
  // Gifts
  { id: 'g1', title: 'Magic Mirror', category: 'gift', iconName: 'sparkles' },
  { id: 'g2', title: 'Rotating Lamp', category: 'gift', iconName: 'rotate-cw' },
  { id: 'g3', title: 'Magic Photo Cup', category: 'gift', iconName: 'coffee' },
  { id: 'g4', title: 'Holographic Frames', category: 'gift', iconName: 'image' },
  { id: 'g5', title: '3D Mobile Covers', category: 'gift', iconName: 'smartphone' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Priya & Arjun',
    role: 'Wedding Clients',
    text: "Spotlight Studios didn't just take photos; they engineered a visual legacy. The cinematic edit was pure art.",
  },
  {
    id: 't2',
    name: 'TechCorp Inc.',
    role: 'Commercial Partner',
    text: "Vicky's eye for detail is surgical. The product shots elevated our brand perception overnight.",
  },
];