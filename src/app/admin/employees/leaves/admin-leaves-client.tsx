"use client";

import { useState } from "react";
import { Employee, LeaveRequest } from "@prisma/client";
import { createLeaveRequest, updateLeaveStatus } from "@/actions/employee";

export default function AdminLeavesClient({ 
  employees, 
  initialLeaveRequests 
}: { 
  employees: Employee[], 
  initialLeaveRequests: (LeaveRequest & { employee: Employee })[] 
}) {
  const [leaves, setLeaves] = useState(initialLeaveRequests);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    const data = {
      employeeId: formData.get("employeeId") as string,
      startDate: new Date(formData.get("startDate") as string),
      endDate: new Date(formData.get("endDate") as string),
      reason: formData.get("reason") as string,
    };

    try {
      const newLeave = await createLeaveRequest(data);
      const emp = employees.find(e => e.id === data.employeeId)!;
      setLeaves([{ ...newLeave, employee: emp }, ...leaves]);
      e.currentTarget.reset();
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
    }
  }

  async function handleStatusChange(id: string, newStatus: string) {
    await updateLeaveStatus(id, newStatus);
    setLeaves(leaves.map(l => l.id === id ? { ...l, status: newStatus } : l));
  }

  return (
    <div className="space-y-10">
      {/* Add Leave Request Form */}
      <div className="bg-white p-6 rounded-2xl shadow border border-[#d4a373]/20">
        <h2 className="text-2xl font-display font-bold text-[#4a3f35] mb-6">Add Leave Request</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select name="employeeId" required defaultValue="" className="p-3 border border-gray-200 rounded-xl text-[#4a3f35] bg-white focus:outline-none focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373]">
              <option value="" disabled>Select Employee</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.firstName} {emp.lastName}</option>
              ))}
            </select>
            <input name="startDate" required type="date" className="p-3 border border-gray-200 rounded-xl text-[#4a3f35] focus:outline-none focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373]" />
            <input name="endDate" required type="date" className="p-3 border border-gray-200 rounded-xl text-[#4a3f35] focus:outline-none focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373]" />
            <input name="reason" required placeholder="Reason for leave" className="p-3 border border-gray-200 rounded-xl text-[#4a3f35] focus:outline-none focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373]" />
          </div>
          
          <div className="flex items-center gap-4 pt-4">
            <button disabled={status === "loading"} className="px-6 py-3 bg-[#d4a373] text-white rounded-xl font-bold hover:bg-[#4a3f35] transition-colors shadow-sm disabled:opacity-70">
              {status === "loading" ? "Submitting..." : "Submit Leave Request"}
            </button>
            {status === "error" && <p className="text-red-500 font-semibold">Failed to save.</p>}
            {status === "success" && <p className="text-green-500 font-semibold">Submitted successfully!</p>}
          </div>
        </form>
      </div>

      {/* Leave Requests List */}
      <div className="bg-white p-6 rounded-2xl shadow border border-[#d4a373]/20">
        <h2 className="text-2xl font-display font-bold text-[#4a3f35] mb-6">Leave Requests</h2>
        <div className="space-y-4">
          {leaves.map(leave => (
            <div key={leave.id} className="p-5 border border-gray-100 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg text-[#4a3f35]">{leave.employee.firstName} {leave.employee.lastName}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(leave.startDate).toLocaleDateString()} to {new Date(leave.endDate).toLocaleDateString()}
                </p>
                <p className="mt-2 text-[#4a3f35] italic">"{leave.reason}"</p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                  leave.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                  leave.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {leave.status}
                </span>
                
                {leave.status === 'PENDING' && (
                  <div className="flex gap-2">
                    <button onClick={() => handleStatusChange(leave.id, 'APPROVED')} className="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-sm font-bold hover:bg-green-100 transition-colors">Approve</button>
                    <button onClick={() => handleStatusChange(leave.id, 'REJECTED')} className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors">Reject</button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {leaves.length === 0 && <p className="text-center py-10 text-gray-400 font-semibold">No leave requests found.</p>}
        </div>
      </div>
    </div>
  );
}
