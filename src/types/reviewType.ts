export type TReview = {
  _id: string;
  userId: {
    profileImg: string;
    name: {
      firstName: string;
      middleName?: string;
      lastName: string;
    };
    _id: string;
  };
  productId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
};
