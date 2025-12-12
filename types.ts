export interface ServiceItem {
  id: string;
  title: string;
  category: 'photography' | 'gift';
  iconName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
}