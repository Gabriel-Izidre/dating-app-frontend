import { Interest } from './interest.interface';

export interface User {
  _id?: string;
  id?: string;
  firstname: string;
  email?: string;
  gender?: string;
  age?: number;
  interests?: Interest[];
  profilePhoto?: string;
  galleryPhotos?: string[];
}
