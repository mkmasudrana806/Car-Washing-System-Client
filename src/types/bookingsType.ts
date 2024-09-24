import { TSlot } from "./slotTypes";

// current booking type
export type TCurrentBooking = {
  service: string;
  slot: TSlot;
  vehicleInfo: TVehicleInfo;
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
  user: string;
  service: string;
  slot: string;
  vehicleInfo: TVehicleInfo;
  date: Date;
  paymentId: string;
  isDeleted: boolean;
};
