'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Employees
export async function getEmployees() {
  try {
    return await prisma.employee.findMany({
      orderBy: { firstName: 'asc' }
    })
  } catch (error) {
    console.error("Failed to get employees:", error)
    return []
  }
}

export async function createEmployee(data: { firstName: string, lastName: string, role: string, contactNumber: string, email?: string, baseSalary: number, joinDate: string, status?: string }) {
  try {
    if (!data.firstName || !data.lastName || data.baseSalary < 0) {
      return { success: false, error: "Invalid employee data." }
    }

    // Check for duplicate name
    const existing = await prisma.employee.findFirst({
      where: {
        firstName: { equals: data.firstName },
        lastName: { equals: data.lastName }
      }
    });
    
    if (existing) {
      return { success: false, error: `An employee with the name ${data.firstName} ${data.lastName} already exists.` };
    }

    await prisma.employee.create({ 
      data: {
        ...data,
        joinDate: new Date(data.joinDate)
      } 
    })
    revalidatePath('/admin/employees')
    return { success: true }
  } catch (error) {
    console.error("Failed to create employee:", error)
    return { success: false, error: "Failed to create employee." }
  }
}

export async function updateEmployee(id: string, data: { firstName: string, lastName: string, role: string, contactNumber: string, email?: string, baseSalary: number, joinDate: string, status: string }) {
  try {
    if (!data.firstName || !data.lastName || data.baseSalary < 0) {
      return { success: false, error: "Invalid employee data." }
    }

    // Check for duplicate name (excluding self)
    const existing = await prisma.employee.findFirst({
      where: {
        id: { not: id },
        firstName: { equals: data.firstName },
        lastName: { equals: data.lastName }
      }
    });
    
    if (existing) {
      return { success: false, error: `Another employee with the name ${data.firstName} ${data.lastName} already exists.` };
    }

    await prisma.employee.update({ 
      where: { id }, 
      data: {
        ...data,
        joinDate: new Date(data.joinDate)
      } 
    })
    revalidatePath('/admin/employees')
    return { success: true }
  } catch (error) {
    console.error("Failed to update employee:", error)
    return { success: false, error: "Failed to update employee." }
  }
}

export async function deleteEmployee(id: string) {
  try {
    await prisma.employee.delete({ where: { id } })
    revalidatePath('/admin/employees')
    return { success: true }
  } catch (error) {
    console.error("Failed to delete employee:", error)
    return { success: false, error: "Failed to delete employee." }
  }
}

// Attendance
export async function getAttendance(date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return await prisma.attendance.findMany({
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      }
    },
    include: { employee: true }
  })
}

export async function markAttendance(employeeId: string, date: Date, status: string, checkIn?: Date, checkOut?: Date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const existing = await prisma.attendance.findFirst({
    where: {
      employeeId,
      date: { gte: startOfDay, lte: endOfDay }
    }
  });

  if (existing) {
    return await prisma.attendance.update({
      where: { id: existing.id },
      data: { status, checkIn, checkOut }
    });
  }

  return await prisma.attendance.create({
    data: {
      employeeId,
      date: startOfDay,
      status,
      checkIn,
      checkOut
    }
  });
}

// Leave Requests
export async function getLeaveRequests() {
  return await prisma.leaveRequest.findMany({
    include: { employee: true },
    orderBy: { createdAt: 'desc' }
  })
}

export async function createLeaveRequest(data: { employeeId: string, startDate: Date, endDate: Date, reason: string }) {
  const result = await prisma.leaveRequest.create({ data })
  revalidatePath('/admin/employees/leaves')
  return result
}

export async function updateLeaveStatus(id: string, status: string) {
  const result = await prisma.leaveRequest.update({
    where: { id },
    data: { status }
  })
  revalidatePath('/admin/employees/leaves')
  return result
}
