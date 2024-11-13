import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { VehicleInfo } from '@/types/types';
import VehicleCard from '@/components/vehicle/card';

export default function VehicleResultPage() {
  const { query } = useRouter();
  const { makeId, year } = query;
  const [models, setModels] = useState<VehicleInfo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (makeId && year) {
      const fetchVehicleModels = async () => {
        try {
          const res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`);
          const data = await res.json();

          if (data.Count > 0) {
            setModels(data.Results);
          } else {
            setError('No models found for this make and year.');
          }
        } catch (err) {
          setError('' + err);
        } finally {
          setLoading(false)
        }
      };

      fetchVehicleModels();
    }
  }, [makeId, year]);

  console.log(models);

  if (error) {
    return <div>{error}</div>;
  }

  const LoadingFallback = () => (
    <div className="text-center py-10">
      <p className="text-xl font-semibold text-gray-600">Loading...</p>
    </div>
  );

  if(loading) {
    return <LoadingFallback />
  }

  return (
    <div className="space-y-6 p-8 bg-white shadow-lg rounded-xl w-full max-w-2xl mx-auto">
      <h1 className="text-2xl text-center font-semibold text-gray-700 mb-6">
        Vehicle Models for {makeId} - {year}
      </h1>
        {models.length > 0 ? (
          <div className="overflow-x-scroll max-h-[80vh]">
            <ul className="flex flex-wrap gap-4 justify-center">
              {models.map((model: VehicleInfo) => (
                <li key={model.Model_ID} className="p-1">
                  <VehicleCard vehicle={model} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <h1 className="text-2xl text-center font-semibold text-gray-700 mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded-md">
            No models found for this make and year.
          </h1>
        )}
    </div>
  );
};