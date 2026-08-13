import { getMenuItems } from "@/actions/menu";
import MenuClient from "./menu-client";

export default async function MenuPage() {
  const menuItems = await getMenuItems();
  
  return <MenuClient menuItems={menuItems} />;
}
