"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createOrder(data: {
  customerName: string;
  tableNumber?: string;
  totalAmount: number;
  items: {
    menuItemId: string;
    quantity: number;
    priceAtTime: number;
    specialInstructions?: string;
  }[];
}) {
  try {
    const order = await prisma.order.create({
      data: {
        customerName: data.customerName,
        tableNumber: data.tableNumber,
        totalAmount: data.totalAmount,
        status: "PENDING",
        items: {
          create: data.items.map((item) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            priceAtTime: item.priceAtTime,
            specialInstructions: item.specialInstructions,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    revalidatePath("/admin/orders");
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Failed to create order:", error);
    return { success: false, error: "Failed to create order" };
  }
}

export async function getOrders() {
  try {
    return await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: {
            menuItem: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return [];
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
    revalidatePath("/admin/orders");
    return { success: true };
  } catch (error) {
    console.error("Failed to update order:", error);
    return { success: false };
  }
}
