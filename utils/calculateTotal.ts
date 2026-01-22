export const calculateTotal = (items: { price: number; quantity: number }[]) =>
    items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  