// User profile type for profile cards and API
export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  bio?: string;
  avatar?: string;
  country?: string;
  city?: string;
  postalCode?: string;
  taxId?: string;
  location?: string;
}
