import List from "@/models/List";
import { calculateTotal } from "@/utils/calculateTotal";

export const createList = async (userId: string, data: { title: string; items: { name: string; price: number; quantity: number }[] }) => {
  const total = calculateTotal(data.items);

  return await List.create({
    userId,
    title: data.title,
    items: data.items,
    total,
  });
};

export const getLists = async (userId: string) => {
  return await List.find({ userId }).sort({ createdAt: -1 });
};

export const updateList = async (
  listId: string,
  userId: string,
  data: { title: string; items: { name: string; price: number; quantity: number }[] }
) => {
  const total = calculateTotal(data.items);

  return await List.findOneAndUpdate(
    { _id: listId, userId },
    { ...data, total },
    { new: true }
  );
};

export const deleteList = async (listId: string, userId: string) => {
  return await List.findOneAndDelete({ _id: listId, userId });
};
