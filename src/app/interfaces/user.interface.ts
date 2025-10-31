import { Interest } from './interest.interface';

export interface User {
  _id?: string;
  name: string;
  email: string;
  gender?: string;
  age?: number;
  interests?: Interest[];
  profilePhotoUrl?: string;
  galleryPhotoUrls?: string[];
}
