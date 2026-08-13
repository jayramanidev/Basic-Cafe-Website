import { getEmployees } from "@/actions/employee";
import AdminEmployeeClient from "./admin-employee-client";

export default async function EmployeesPage() {
  const employees = await getEmployees();
  return <AdminEmployeeClient initialEmployees={employees} />;
}
