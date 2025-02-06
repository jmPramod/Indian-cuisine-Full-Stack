export interface FoodItem {
    name: string;
    ingredients: string;
    diet: string; // Fixing the key with space
    prep_time: number;
    cook_time: number;
    flavor_profile: string;
    course: string;
    state: string;
    region: string;
    img: string;
  }


  export interface CategoryData {
    region: string[];
    state: string[];
    course: string[];
    flavor_profile: string[];
    diet: string[];
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
  