import { TService } from "./serviceTypes";
import { TSlot } from "./slotTypes";
import { TUser } from "./userType";

// current booking type
export type TCurrentBooking = {
  service: string;
  slot: TSlot;
  vehicleInfo: TVehicleInfo;
  amount: number;
};

export type TVehicleInfo = {
  vehicleType: TVehicle;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
};

type TVehicle =
  | "car"
  | "truck"
  | "SUV"
  | "van"
  | "motercycle"
  | "bus"
  | "electricVehicle"
  | "hybridVehicle"
  | "bicycle"
  | "tractor";

export type TBooking = {
  _id: string;
  user: TUser;
  service: TService;
  slot: TSlot;
  vehicleInfo: TVehicleInfo;
  date: Date;
  paymentId: string;
  isDeleted: boolean;
};

export type TAllBookings = {
  _id: string;
  user: TUser;
  service: TService;
  slot: TSlot;
  vehicleInfo: TVehicleInfo;
  date: Date;
  paymentId: string;
  isDeleted: boolean;
};
