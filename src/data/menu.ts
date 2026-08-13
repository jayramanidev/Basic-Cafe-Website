export interface Category {
  id: string;
  name: string;
}

export interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  desc: string;
  image: string;
  popular: boolean;
}

export const categories: Category[] = [
  { id: 'all', name: 'All' },
  { id: 'chaat', name: 'Chaat' },
  { id: 'main', name: 'Pav Bhaji & More' },
  { id: 'pizza', name: 'Pizza' },
  { id: 'momos', name: 'Momos' },
  { id: 'rolls', name: 'Rolls' },
  { id: 'drinks', name: 'Thanda (Drinks)' }
];

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Aloo Tikki Supreme",
    category: "main",
    price: 69,
    desc: "Crispy spicy potato patty, mint chutney, onion rings, tomato.",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=500&q=80",
    popular: true
  },
  {
    id: 2,
    name: "Maharaja Paneer Burger",
    category: "main",
    price: 129,
    desc: "Thick paneer slab marinated in tandoori sauce, jalapenos, cheese.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
    popular: false
  },
  {
    id: 3,
    name: "Mumbai Vada Pav (2pcs)",
    category: "chaat",
    price: 50,
    desc: "The indian burger! Fried potato dumpling in bun with dry garlic chutney.",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=500&q=80",
    popular: true
  },
  {
    id: 4,
    name: "Paneer Makhani Pizza",
    category: "pizza",
    price: 289,
    desc: "Rich makhani sauce, paneer cubes, onion, capsicum, mozzarella.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80",
    popular: true
  },
  {
    id: 5,
    name: "Farmhouse Veg Pizza",
    category: "pizza",
    price: 249,
    desc: "Loaded with corn, olive, red paprika, onion, tomato.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80",
    popular: false
  },
  {
    id: 6,
    name: "Steamed Veg Momos (8pcs)",
    category: "momos",
    price: 90,
    desc: "Served with spicy schezwan chutney and mayo.",
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=500&q=80",
    popular: true
  },
  {
    id: 7,
    name: "Corn & Cheese Momos",
    category: "momos",
    price: 110,
    desc: "Stuffed with sweet corn and melting cheese. Kids favorite!",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80",
    popular: false
  },
  {
    id: 8,
    name: "Paneer Tikka Roll",
    category: "rolls",
    price: 120,
    desc: "Smoky paneer cubes wrapped in laccha paratha with onions and mint sauce.",
    image: "https://images.pexels.com/photos/33430554/pexels-photo-33430554.jpeg",
    popular: true
  },
  {
    id: 9,
    name: "Masala Chai",
    category: "drinks",
    price: 25,
    desc: "Kadak adrak elaichi chai served in kulhad.",
    image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=500&q=80",
    popular: true
  },
  {
    id: 10,
    name: "Mango Lassi",
    category: "drinks",
    price: 60,
    desc: "Thick yogurt shake blended with alphonso mango pulp.",
    image: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=500&q=80",
    popular: false
  },
  {
    id: 11,
    name: "Pani Puri (6pcs)",
    category: "chaat",
    price: 40,
    desc: "Suji puri with teekha and meetha pani. Self service kit.",
    image: "https://images.pexels.com/photos/13063315/pexels-photo-13063315.jpeg",
    popular: true
  },
  {
    id: 12,
    name: "Special Pav Bhaji",
    category: "main",
    price: 110,
    desc: "Butter loaded spicy bhaji served with 2 butter pavs and salad.",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=500&q=80",
    popular: true
  }
];
