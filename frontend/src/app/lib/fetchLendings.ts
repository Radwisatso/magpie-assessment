"use server";
import { cookies } from "next/headers";

export async function fetchLendings() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  const res = await fetch(process.env.BASE_URL + "/lendings", {
    method: "GET",
    headers: {
      authorization: "Bearer " + token,
    },
  });
  const data = await res.json();
  return data
}
