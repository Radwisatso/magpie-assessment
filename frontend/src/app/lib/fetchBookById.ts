"use server";
import { cookies } from "next/headers";

export async function fetchBookById(id: number) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  const res = await fetch(process.env.BASE_URL + "/books/" + id, {
    method: "GET",
    headers: {
      authorization: "Bearer " + token,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return data;
}
