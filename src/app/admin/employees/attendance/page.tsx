import { getEmployees, getAttendance } from "@/actions/employee";
import AdminAttendanceClient from "./admin-attendance-client";

export default async function AttendancePage() {
  const employees = await getEmployees();
  // Default to today
  const attendance = await getAttendance(new Date());
  
  return <AdminAttendanceClient employees={employees} initialAttendance={attendance} />;
}
