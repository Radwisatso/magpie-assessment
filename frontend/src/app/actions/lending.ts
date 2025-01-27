"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function createLending(bookId: number) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  await fetch(process.env.BASE_URL + "/lendings/" + bookId, {
    method: "POST",
    headers: {
      authorization: "Bearer " + token,
    },
  });
  revalidatePath("/books");
  redirect("/books");
}

export async function returnBook(lendingId: number) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  await fetch(process.env.BASE_URL + "/lendings/" + lendingId + "/return", {
    method: "PUT",
    headers: {
      authorization: "Bearer " + token,
    },
  });
  revalidatePath("/books/lendings");
  redirect("/books/lendings");
}