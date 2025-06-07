import { getOverviewData } from '@/app/actions/overview'
import ClientOverview from './component/overview-client'

export default async function OverviewPage() {
  const data = await getOverviewData()

  // Ensure activities is of type string[]
  const filteredData = {
    ...data,
    activities: data.activities.filter((activity): activity is string => activity !== null),
  }

  return <ClientOverview data={filteredData} />
}