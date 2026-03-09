import { BOOKMARK_STATUS } from "@/types/bookmark";
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

export const bookmarkMenuItems = [
  {
    label: "O'qiyapman",
    value: BOOKMARK_STATUS.READING,
  },
  {
    label: "O'qimoqchiman",
    value: BOOKMARK_STATUS.PLAN_TO_READ,
  },
  {
    label: "Tugatdim",
    value: BOOKMARK_STATUS.COMPLETED,
  },
  {
    label: "Tashlab ketdim",
    value: BOOKMARK_STATUS.DROPPED,
  },
  {
    label: "Kutish rejimida",
    value: BOOKMARK_STATUS.ON_HOLD,
  },
];
