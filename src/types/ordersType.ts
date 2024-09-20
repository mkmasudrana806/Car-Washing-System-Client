export type TOrderItem = {
  productId: string;
  quantity: number;
  price: number;
};

export type TShippingAddress = {
  name: string;
  email: string;
  contact: string;
  address: string;
};

// order type
export type TOrder = {
  _id: string;
  userId: string;
  email: string;
  status: "received" | "delivered" | "canceled";
  orderDate: Date;
  estimatedDeliveryDate: Date;
  shippingAddress: TShippingAddress;
  items: TOrderItem[];
  shippingCost?: number;
  discount?: number;
  tax?: number;
  totalAmount?: number;
  paymentMethod: "stripe" | "cod";
  paymentId: string;
};

// current order type
export type TCurrentOrder = {
  shippingAddress: TShippingAddress;
  paymentMethod: string;
};
