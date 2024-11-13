import { VehicleInfo } from "@/types/types";

type Props = {
  vehicle: VehicleInfo
};

export default function VehicleCard({
  vehicle 
} : Props) {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg w-[250px] max-w-sm mx-auto">
      <div className="space-y-4">
        <div className="flex flex-col space-y-2 text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Make ID:</span>
            <span>{vehicle.Make_ID}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Brand Name:</span>
            <span>{vehicle.Make_Name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Model ID:</span>
            <span>{vehicle.Model_ID}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Model Name:</span>
            <span>{vehicle.Model_Name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
