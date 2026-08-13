import { getEmployees, getLeaveRequests } from "@/actions/employee";
import AdminLeavesClient from "./admin-leaves-client";

export default async function LeavesPage() {
  const employees = await getEmployees();
  const leaveRequests = await getLeaveRequests();
  
  return <AdminLeavesClient employees={employees} initialLeaveRequests={leaveRequests} />;
}
