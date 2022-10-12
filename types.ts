export interface Event {
  id: string;
  title: string;
  description?: string;
  location: string;
  date: string;
  image: string;
  imageAlt?: string;
  isFeatured?: boolean;
}
