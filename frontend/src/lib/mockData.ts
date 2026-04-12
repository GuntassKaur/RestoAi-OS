export const mockMetrics = {
  revenue: 12450.00,
  orders: 142,
  lowStock: 12,
  staffOnDuty: 8,
};

export const mockRevenueData = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 6000 },
  { name: 'Thu', revenue: 8780 },
  { name: 'Fri', revenue: 11890 },
  { name: 'Sat', revenue: 14390 },
  { name: 'Sun', revenue: 12450 },
];

export const mockInventory = [
  { id: "INV-001", name: "Alaskan Salmon", category: "Seafood", stock: 15, unit: "kg", status: "In Stock" },
  { id: "INV-002", name: "White Truffle Oil", category: "Pantry", stock: 2, unit: "liters", status: "Out of Stock" },
  { id: "INV-003", name: "A5 Wagyu Beef", category: "Meat", stock: 4, unit: "kg", status: "In Stock" },
  { id: "INV-004", name: "Organic Eggs", category: "Dairy", stock: 0, unit: "units", status: "Out of Stock" },
  { id: "INV-005", name: "Saffron Threads", category: "Spices", stock: 10, unit: "grams", status: "In Stock" },
  { id: "INV-006", name: "Caviar (Beluga)", category: "Seafood", stock: 1, unit: "tins", status: "Out of Stock" },
  { id: "INV-007", name: "Artisan Sourdough", category: "Bakery", stock: 24, unit: "loaves", status: "In Stock" },
  { id: "INV-008", name: "Hass Avocados", category: "Produce", stock: 8, unit: "kg", status: "Out of Stock" },
  { id: "INV-009", name: "Vintage Champagne", category: "Beverages", stock: 12, unit: "bottles", status: "In Stock" },
  { id: "INV-010", name: "Madagascar Vanilla", category: "Pantry", stock: 50, unit: "pods", status: "In Stock" },
];

export const mockChatHistory = [
  { role: "assistant", content: "System online. How can I assist with RestoAI OS today?" },
  { role: "user", content: "What is running low?" },
  { role: "assistant", content: "Scanning inventory... You are low on Organic Eggs. I have drafted a Purchase Order for 20 units. Shall I send it?" }
];
