// product categories enum
export type ProductCategoryEnum =
  | "Treadmills"
  | "Dumbbells & Weights"
  | "Yoga Mats"
  | "Resistance Bands"
  | "Exercise Bikes"
  | "Fitness Trackers"
  | "Kettlebells"
  | "Benches";

export type TProduct = {
  _id: string;
  name: string;
  price: number;
  category: ProductCategoryEnum;
  quantity: number;
  featured: boolean;
  description: string;
  productImgUrl: string;
  isDeleted: boolean;
};
