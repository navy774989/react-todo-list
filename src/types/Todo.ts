import { Dayjs } from "dayjs";

export interface Todo {
  id: string;
  taskName: string;
  description: string;
  date: string;
  status: "REMAINING" | "COMPLETED";
}
