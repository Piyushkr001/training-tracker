import { getAllAttendance } from '@/app/actions/attendance'
import ClientAttendance from './component/client-attendance'

export default async function AttendancePage() {
  const initialAttendance = await getAllAttendance()
  return <ClientAttendance initialAttendance={initialAttendance} />
}
