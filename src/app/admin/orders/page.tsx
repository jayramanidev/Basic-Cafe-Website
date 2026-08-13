import { getOrders } from "@/actions/order";
import OrdersClient from "./orders-client";

export default async function AdminOrdersPage() {
  const orders = await getOrders();
  return <OrdersClient initialOrders={orders} />;
}
