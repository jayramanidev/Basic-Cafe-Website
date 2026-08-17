"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createOrder(data: {
  customerName: string;
  tableNumber?: string;
  items: {
    menuItemId: string;
    quantity: number;
    specialInstructions?: string;
  }[];
}) {
  try {
    if (!data.items || data.items.length === 0) {
      return { success: false, error: "Order must have at least one item." };
    }

    // Fetch all menu items from database to get secure prices
    const itemIds = data.items.map(i => i.menuItemId);
    const dbMenuItems = await prisma.menuItem.findMany({
      where: { id: { in: itemIds } }
    });

    const menuItemsMap = new Map(dbMenuItems.map(item => [item.id, item]));

    let totalAmount = 0;
    const validatedItems = [];

    for (const item of data.items) {
      const dbItem = menuItemsMap.get(item.menuItemId);
      if (!dbItem) {
        return { success: false, error: `Menu item not found: ${item.menuItemId}` };
      }
      
      const priceAtTime = dbItem.price;
      totalAmount += priceAtTime * item.quantity;
      
      validatedItems.push({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        priceAtTime: priceAtTime,
        specialInstructions: item.specialInstructions,
      });
    }

    const order = await prisma.order.create({
      data: {
        customerName: data.customerName,
        tableNumber: data.tableNumber,
        totalAmount: totalAmount,
        status: "PENDING",
        items: {
          create: validatedItems,
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
