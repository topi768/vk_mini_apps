import { create } from "zustand";
import { getUserData } from "./api/user";
type Player = {
  incrementScore(score: number): unknown;
  name: string;
  score: number;
  avatar: string;
  rang: string;
  amountCat: number;
  incrementAmountCat(amount: number): unknown;
};

// getUserData().then((data) => {
//   console.log(data);
// });

export const usePlayerStore = create<Player>((set) => ({
  name: "",
  score: 0,
  avatar: "",
  rang: "Рядовой Мурчалов",
  amountCat: 0,
  incrementScore: (amount: number) =>
    set((state) => ({ score: state.score + amount })),
  incrementAmountCat: (amount: number) =>
    set((state) => ({ score: state.amountCat + amount })),
}));
