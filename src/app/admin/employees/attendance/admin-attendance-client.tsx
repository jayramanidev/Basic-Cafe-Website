"use client";

import { useState } from "react";
import { Employee, Attendance } from "@prisma/client";
import { markAttendance, getAttendance } from "@/actions/employee";

export default function AdminAttendanceClient({ 
  employees, 
  initialAttendance 
}: { 
  employees: Employee[], 
  initialAttendance: (Attendance & { employee: Employee })[] 
}) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [records, setRecords] = useState(initialAttendance);
  const [loading, setLoading] = useState(false);

  async function handleDateChange(newDate: string) {
    setDate(newDate);
    setLoading(true);
    try {
      const newRecords = await getAttendance(new Date(newDate));
      setRecords(newRecords);
    } finally {
      setLoading(false);
    }
  }

  async function handleMark(employeeId: string, status: string) {
    const checkIn = status === "PRESENT" ? new Date() : undefined;
    const result = await markAttendance(employeeId, new Date(date), status, checkIn);
    
    // update local state
    const existingIndex = records.findIndex(r => r.employeeId === employeeId);
    if (existingIndex >= 0) {
      const updated = [...records];
      updated[existingIndex] = { ...updated[existingIndex], ...result };
      setRecords(updated);
    } else {
      const emp = employees.find(e => e.id === employeeId)!;
      setRecords([...records, { ...result, employee: emp }]);
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow border border-[#d4a373]/20 flex justify-between items-center">
        <h2 className="text-2xl font-display font-bold text-[#4a3f35]">Daily Attendance</h2>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => handleDateChange(e.target.value)}
          className="p-3 border border-gray-200 rounded-xl text-[#4a3f35] focus:outline-none focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373]"
        />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow border border-[#d4a373]/20">
        {loading ? (
          <p className="text-center py-10 text-gray-500">Loading attendance...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-[#d4a373]">
                  <th className="p-4 font-bold">Employee</th>
                  <th className="p-4 font-bold">Role</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => {
                  const record = records.find(r => r.employeeId === emp.id);
                  return (
                    <tr key={emp.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="p-4 font-semibold text-[#4a3f35]">{emp.firstName} {emp.lastName}</td>
                      <td className="p-4 text-gray-500 text-sm">{emp.role}</td>
                      <td className="p-4">
                        {record ? (
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                            record.status === 'PRESENT' ? 'bg-green-100 text-green-700' :
                            record.status === 'ABSENT' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {record.status}
                          </span>
                        ) : (
                          <span className="text-xs font-bold px-2 py-1 rounded-full bg-gray-100 text-gray-500">UNMARKED</span>
                        )}
                      </td>
                      <td className="p-4 flex gap-2 justify-end">
                        <button onClick={() => handleMark(emp.id, "PRESENT")} className="px-3 py-1 bg-green-50 text-green-600 rounded text-xs font-bold hover:bg-green-100 transition-colors">Present</button>
                        <button onClick={() => handleMark(emp.id, "ABSENT")} className="px-3 py-1 bg-red-50 text-red-600 rounded text-xs font-bold hover:bg-red-100 transition-colors">Absent</button>
                        <button onClick={() => handleMark(emp.id, "ON_LEAVE")} className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded text-xs font-bold hover:bg-yellow-100 transition-colors">Leave</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
