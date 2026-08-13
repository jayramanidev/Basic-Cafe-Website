"use client";

import { useState, useEffect } from "react";
import { Employee } from "@prisma/client";
import { createEmployee, updateEmployee, deleteEmployee } from "@/actions/employee";

export default function AdminEmployeeClient({ initialEmployees }: { initialEmployees: Employee[] }) {
  const [employees, setEmployees] = useState(initialEmployees);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [editingEmp, setEditingEmp] = useState<Employee | null>(null);

  useEffect(() => {
    setEmployees(initialEmployees);
  }, [initialEmployees]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      role: formData.get("role") as string,
      contactNumber: formData.get("contactNumber") as string,
      email: (formData.get("email") as string) || undefined,
      baseSalary: parseFloat(formData.get("baseSalary") as string),
      joinDate: formData.get("joinDate") as string,
      status: (formData.get("status") as string) || "ACTIVE",
    };

    try {
      setErrorMessage("");
      if (editingEmp) {
        const res = await updateEmployee(editingEmp.id, data);
        if (res?.error) {
          setErrorMessage(res.error);
          setStatus("error");
          return;
        }
        setEditingEmp(null);
      } else {
        const res = await createEmployee(data);
        if (res?.error) {
          setErrorMessage(res.error);
          setStatus("error");
          return;
        }
        e.currentTarget.reset();
      }
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setErrorMessage("An unexpected error occurred.");
      setStatus("error");
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this employee? This will also delete their attendance and leave records.")) {
      await deleteEmployee(id);
      setEmployees(employees.filter(emp => emp.id !== id));
      if (editingEmp?.id === id) setEditingEmp(null);
    }
  }

  return (
    <div className="space-y-10">
      {/* Form */}
      <div className="bg-white p-6 rounded-2xl shadow border border-[#d4a373]/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-display font-bold text-[#4a3f35]">{editingEmp ? "Edit Employee" : "Add New Employee"}</h2>
          {editingEmp && (
            <button onClick={() => setEditingEmp(null)} className="text-sm font-semibold px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
              Cancel Edit
            </button>
          )}
        </div>
        
        <form key={editingEmp?.id || 'new'} onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="firstName" defaultValue={editingEmp?.firstName} required placeholder="First Name" className="w-full p-3 border border-gray-200 rounded-xl text-[#4a3f35] focus:outline-none focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373]" />
            <input name="lastName" defaultValue={editingEmp?.lastName} required placeholder="Last Name" className="w-full p-3 border border-gray-200 rounded-xl text-[#4a3f35] focus:outline-none focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373]" />
            <input name="role" defaultValue={editingEmp?.role} required placeholder="Role (e.g. Waiter, Chef)" className="w-full p-3 border border-gray-200 rounded-xl text-[#4a3f35] focus:outline-none focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373]" />
            <input name="contactNumber" defaultValue={editingEmp?.contactNumber} required placeholder="Contact Number" className="w-full p-3 border border-gray-200 rounded-xl text-[#4a3f35] focus:outline-none focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373]" />
            <input name="email" defaultValue={editingEmp?.email || ""} type="email" placeholder="Email (Optional)" className="w-full p-3 border border-gray-200 rounded-xl text-[#4a3f35] focus:outline-none focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373]" />
            <input name="baseSalary" defaultValue={editingEmp?.baseSalary} required type="number" step="0.01" placeholder="Base Salary (₹)" className="w-full p-3 border border-gray-200 rounded-xl text-[#4a3f35] focus:outline-none focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373]" />
            <input name="joinDate" defaultValue={editingEmp ? new Date(editingEmp.joinDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]} required type="date" className="w-full p-3 border border-gray-200 rounded-xl text-[#4a3f35] focus:outline-none focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373]" />
            {editingEmp && (
              <select name="status" defaultValue={editingEmp.status} className="w-full p-3 border border-gray-200 rounded-xl text-[#4a3f35] bg-white focus:outline-none focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373]">
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="TERMINATED">Terminated</option>
              </select>
            )}
          </div>
          
          <div className="flex items-center gap-4 pt-4">
            <button disabled={status === "loading"} className="px-6 py-3 bg-[#d4a373] text-white rounded-xl font-bold hover:bg-[#4a3f35] transition-colors shadow-sm disabled:opacity-70">
              {status === "loading" ? "Saving..." : (editingEmp ? "Update Employee" : "Add Employee")}
            </button>
            {status === "error" && <p className="text-red-500 font-semibold">{errorMessage || "Failed to save."}</p>}
            {status === "success" && <p className="text-green-500 font-semibold">Saved successfully!</p>}
          </div>
        </form>
      </div>

      {/* List */}
      <div className="bg-white p-6 rounded-2xl shadow border border-[#d4a373]/20">
        <h2 className="text-2xl font-display font-bold text-[#4a3f35] mb-6">Employee Directory</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map(emp => (
            <div key={emp.id} className={`p-5 border rounded-2xl ${editingEmp?.id === emp.id ? 'border-[#d4a373] bg-[#fdfbf7]' : 'border-gray-100'}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-[#4a3f35]">{emp.firstName} {emp.lastName}</h3>
                  <p className="text-sm text-[#d4a373] font-semibold">{emp.role}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${emp.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {emp.status}
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <p>📞 {emp.contactNumber}</p>
                {emp.email && <p>✉️ {emp.email}</p>}
                <p>💰 ₹{emp.baseSalary.toLocaleString()}/mo</p>
                <p>📅 Joined {new Date(emp.joinDate).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditingEmp(emp); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-100">Edit</button>
                <button onClick={() => handleDelete(emp.id)} className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100">Delete</button>
              </div>
            </div>
          ))}
          {employees.length === 0 && <div className="col-span-full text-center py-10 text-gray-400 font-semibold">No employees found.</div>}
        </div>
      </div>
    </div>
  );
}
