"use server"
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function fetchCategories() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  const res = await fetch(process.env.BASE_URL + "/categories", {
    method: "GET",
    headers: {
      authorization: "Bearer " + token,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  const data = await res.json();
  return data;
  return NextResponse.json(data);
}
