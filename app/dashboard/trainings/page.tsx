import { getTrainings } from '@/app/actions/training'
import ClientTrainings from './component/client-training'


export default async function TrainingPage() {
  const trainings = await getTrainings()

  return <ClientTrainings initialTrainings={trainings} />
}
