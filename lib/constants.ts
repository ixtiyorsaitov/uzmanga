import { IUser } from "@/types/user";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const cacheStaleTimesInMilliseconds = {
  minute: 1000 * 60,
  hour: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
};

export const mockUsers: IUser[] = [
  {
    _id: "1",
    name: "Danat",
    avatar: "https://i.pravatar.cc/150?u=1",
  },
  {
    _id: "2",
    name: "Makota_1",
    avatar: "https://i.pravatar.cc/150?u=2",
  },
];
