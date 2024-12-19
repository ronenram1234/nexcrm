export interface CardAdmin {

  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  url: string;
  state: string;
  country: string;
  city: string;
  street: string;
  houseNumber: number;
  zip: number;
  bizNumber: number;
  likes: string[];
  user_id: string;
  createdAt: string;
  
}

interface Image {
  url: string;
  alt: string;
  _id?: string;
}

interface Address {
  state?: string;
  country: string;
  city: string;
  street: string;
  houseNumber: number;
  zip?: number;
  _id?: string;
}

export interface CardRecFull {
  title: string;
  subtitle?: string;
  description?: string;
  phone: string;
  email: string;
  web?: string;
  image: Image;
  address: Address;
  bizNumber?: number;
  likes?: string[];
  user_id: string;
  createdAt: string;
  __v?: number;
  _id: string;
}

// create new card
interface NewImage {
  url?: string;
  alt?: string;
}

interface NewAddress {
  state?: string;
  country: string;
  city: string;
  street: string;
  houseNumber: number;
  zip?: number;
}

export interface NewCard {
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web?: string;
  image: NewImage;
  address: NewAddress;
  bizNumber?: number;
  likes?: string[];
  user_id: string;
}
