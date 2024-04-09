"use server";

import fetcher from "./fetcher";
import revalidate from "./revalidate";

const userData = {
  async getAll(query?: string) {
    const users = await fetcher<any[]>(`users?${query ?? ""}`, {
      method: "GET",
      next: { tags: ["USERS"], revalidate: 3600 },
    });
    return users;
  },
  async getOne(id: string) {
    const users = await fetcher<any[]>(`users/${id}`, {
      method: "GET",
      next: { tags: [`USERS:${id}`], revalidate: 3600 },
    });
    return users;
  },
  async post(data: any) {
    const user = fetcher<any>(`users`, {
      method: "POST",
      body: JSON.stringify(data),
      next: { tags: ["USERS"], revalidate: 3600 },
    });
    revalidate({ tags: ["USERS"] });
    return user;
  },
  async put(id: string, data: any) {
    const user = fetcher<any>(`users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      next: { tags: ["USERS"], revalidate: 3600 },
    });
    revalidate({ tags: ["USERS", `USERS:${id}`] });
    return user;
  },
  async patch(id: string, data: any) {
    const user = fetcher<any>(`users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      next: { tags: ["USERS"], revalidate: 3600 },
    });
    revalidate({ tags: ["USERS", `USERS:${id}`] });
    return user;
  },
  async delete(id: string) {
    const user = fetcher<any>(`users/${id}`, {
      method: "DELETE",
      next: { tags: ["USERS"], revalidate: 3600 },
    });
    revalidate({ tags: ["USERS"] });
    return user;
  },
};

export default userData;
