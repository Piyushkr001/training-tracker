// app/dashboard/explore/page.tsx
import { fetchWamsiDashboard } from '@/lib/wamsi-data';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import DataTable from './components/DataTable';
import PieChartComponent from './components/PieChartComponent';
import PropertyTypeBarChart from './components/BarChart';



export default async function WamsiDashboard() {
    const data = await fetchWamsiDashboard();
    const { totalProperties, totalArea, records } = data;

    return (
        <section className="p-6 flex flex-col gap-6 bg-gradient-to-r from-sky-50 via-white to-sky-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950  min-h-screen">
            <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
                Property Data
            </h1>

            <section className="flex flex-wrap justify-center gap-4">
                <Card className="w-full sm:w-[300px] bg-gray-100 dark:bg-gray-900">
                    <CardContent className="p-4">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                            Total Properties
                        </h2>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {totalProperties.toLocaleString()}
                        </p>
                    </CardContent>
                </Card>

                <Card className="w-full sm:w-[300px] bg-gray-100 dark:bg-gray-900">
                    <CardContent className="p-4">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                            Total Area (Acres)
                        </h2>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {totalArea.toLocaleString()}
                        </p>
                    </CardContent>
                </Card>
            </section>

            <Separator className="bg-gray-300 dark:bg-gray-700" />

            <section>
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    State-wise Breakdown
                </h2>
                <DataTable records={records} />
            </section>

            <section>
                <div className="min-h-[500px] w-full">
                    <PieChartComponent data={records} />
                </div>
            </section>
            <section>
                <div className="min-h-[500px] w-full">
                    <PropertyTypeBarChart/>
                </div>
            </section>
        </section>
    );
}