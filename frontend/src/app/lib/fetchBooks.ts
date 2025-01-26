"use server";
import { cookies } from "next/headers";

import { NextResponse } from "next/server";

export async function fetchBooks() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  const res = await fetch(process.env.BASE_URL + "/books", {
    method: "GET",
    headers: {
      authorization: "Bearer " + token,
    },
  });
  const data = await res.json();
  return NextResponse.json(data);
}
