export async function generateStaticParams() {
  const res = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json');
  const data = await res.json();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => 2015 + i);

  const paths = data.Results.map((make: { MakeName: string }) => {
    return years.map((year) => ({
      makeId: make.MakeName,
      year: year.toString(),
    }));
  }).flat();

  return paths.map((param: {makeName: string, year: number }) => ({
    params: { makeId: param.makeName, year: param.year },
  }));
}