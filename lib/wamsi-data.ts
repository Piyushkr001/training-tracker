// lib/wamsi-data.ts
export interface Record {
  state: string;
  properties: number;
  area: number;
}

export async function fetchWamsiDashboard(): Promise<{
  totalProperties: number;
  totalArea: number;
  records: Record[];
}> {
  // Mock data simulating real API response
  const records: Record[] = [
    { state: 'Andhra Pradesh', properties: 1023, area: 20456.7 },
    { state: 'Bihar', properties: 876, area: 15892.3 },
    { state: 'Karnataka', properties: 1450, area: 23912.4 },
    { state: 'Kerala', properties: 920, area: 12300.0 },
    { state: 'Uttar Pradesh', properties: 2001, area: 40000.8 },
  ];

  const totalProperties = records.reduce((sum, r) => sum + r.properties, 0);
  const totalArea = records.reduce((sum, r) => sum + r.area, 0);

  return {
    totalProperties,
    totalArea,
    records,
  };
}
