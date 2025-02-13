export interface FoodItem {
    name: string;
    ingredients: string;
    diet: string; 
    prep_time: number;
    cook_time: number;
    flavor_profile: string;
    course: string;
    state: string;
    region: string;
    img: string;
    _id:string
  }

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  address: string;
  state: string;
  country: string;
  pinCode: number;
  profileImage?: {
    imageUrl: string;
    imgPublicId?: string | null;
  };
  isAdmin: string;
  favorite: any[]; 
  createdAt: string;
  updatedAt: string;
}

  export interface CategoryData {
    region: string[];
    state: string[];
    course: string[];
    flavor_profile: string[];
    diet: string[];
    ingredients: string[];
  }
  
  export interface Dish {
    name: string;
    _id:string;
    ingredients: string[];
    diet: string;
    prep_time: number;
    cook_time: number;
    flavor_profile: string;
    course: string;
    state: string;
    region: string;
    img: string;
    createdBy: string | null;
  }
  
  export interface FormData {
    firstName: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword?: string;
  }
  // export interface UserUpdatePayload {
  //   firstName: string;
  //   lastName: string;
  //   phone: string;
  //   address: string;
  //   state: string;
  //   country: string;
  //   pinCode: string;
  //   file?: File;
  // }
  