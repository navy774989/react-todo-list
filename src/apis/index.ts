import axios from "axios";
import { Todo } from "../types/Todo";
const httpClient = axios.create({
  baseURL: "https://react-todo-app-json-server.herokuapp.com",
});
const getToDos = () => {
  return httpClient.get("todoList");
};
const saveToDos = (data: Todo[]) => {
  return httpClient.post("todoList", { data: data });
};
const api = { getToDos, saveToDos };
export { api };
