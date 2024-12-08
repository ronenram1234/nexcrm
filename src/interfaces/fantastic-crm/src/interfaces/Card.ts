export interface Image {
    url: string;       // URL of the image
    alt: string;       // Alt text for the image
    _id?: string;      // Unique ID for the image (optional)
  }
  
  export interface Address {
    state?: string;     // State (optional)
    country: string;    // Country
    city: string;       // City
    street: string;     // Street
    houseNumber: number; // House number
    zip?: number;       // ZIP code (optional)
    _id?: string;       // Unique ID for the address (optional)
  }
  
  export interface Card {
    _id: string;              // Unique identifier for the card
    title: string;            // Title of the card
    subtitle?: string;        // Subtitle of the card (optional)
    description?: string;     // Description of the card (optional)
    phone: string;            // Phone number
    email: string;            // Email address
    web?: string;             // Website URL (optional)
    image?: Image;            // Image object (optional)
    address?: Address;        // Address object (optional)
    bizNumber?: number;       // Business number (optional)
    likes?: string[];         // Array of user IDs who liked the card (optional)
    user_id: string;          // ID of the user who created the card
    createdAt: string;        // Timestamp of card creation (ISO format)
    __v?: number;             // Version key (optional, for database internal use)
  }
  