// app/vehicleForm.tsx
import React, { useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { VehicleBrand } from '@/types/types';
import Link from 'next/link';

type Option = {
  value: string;
  label: string;
};

export default function VehicleForm() {
  const [brands, setBrands] = useState<Option[]>([]);
  const [years, setYears] = useState<Option[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<SingleValue<Option>>(null);
  const [selectedYear, setSelectedYear] = useState<SingleValue<Option>>(null);

  useEffect(() => {
    const fetchMakes = async () => {
      const res = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json');
      const data = await res.json();
      console.log(data);
      setBrands(
        data.Results.map((brand: VehicleBrand) => ({
          value: brand?.MakeId,
          label: brand?.MakeName,
        }))
      );
    };

    const currentYear = new Date().getFullYear();
    setYears(
      Array.from({ length: currentYear - 2015 + 1 }, (_, i) => ({
        value: (2015 + i).toString(),
        label: (2015 + i).toString(),
      }))
    );

    fetchMakes();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const isFormValid = selectedBrand && selectedYear;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-8 bg-white shadow-lg rounded-xl w-full max-w-3xl mx-auto"
    >
      <div className="flex space-x-6">
        <div className="flex-1">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Select Car Brand</label>
          <Select
            options={brands}
            value={selectedBrand}
            onChange={(option) => setSelectedBrand(option)}
            placeholder="Select a Car Brand"
            className="w-full text-gray-700"
          />
        </div>

        <div className="flex-1">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Select Model Year</label>
          <Select
            options={years}
            value={selectedYear}
            onChange={(option) => setSelectedYear(option)}
            placeholder="Select a Model Year"
            className="w-full text-gray-700"
          />
        </div>
      </div>

      <div className='pt-2'>
        <Link
          href={isFormValid ? `/result/${selectedBrand?.value}/${selectedYear?.value}` : "#"}
          passHref
        >
          <button
            type="button"
            className={`w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 ${
              !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!isFormValid}
          >
            Next
          </button>
        </Link>
      </div>
    </form>
  );
}
