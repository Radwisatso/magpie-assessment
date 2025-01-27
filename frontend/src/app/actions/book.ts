"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

const schema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  author: z.string().min(1, {
    message: "Author is required",
  }),
  isbn: z.string().min(1, {
    message: "ISBN is required",
  }),
  quantity: z.number().min(1, {
    message: "Quantity is required",
  }),
  categoryId: z.number().min(1, {
    message: "Category is required",
  }),
});

export async function createBook(
  _prevState: { errors?: Record<string, string[]> },
  formData: FormData
) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;

  const title = formData.get("title");
  const author = formData.get("author");
  const isbn = formData.get("isbn");
  const quantity = +formData.get("quantity")!;
  const categoryId = +formData.get("categoryId")!;

  const validatedFields = schema.safeParse({
    title,
    author,
    isbn,
    quantity,
    categoryId,
  });
  console.log(validatedFields);
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const response = await fetch(process.env.BASE_URL + "/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      title,
      author,
      isbn,
      quantity,
      categoryId,
    }),
  });
  console.log(response, "ini bukuuuu <<<<<");
  if (!response.ok) {
    return {
      message: "Error creating book",
    };
  }
  revalidatePath("/books");
  redirect("/books");
}

export async function deleteBook(id: number) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  await fetch(process.env.BASE_URL + "/books/" + id, {
    method: "DELETE",
    headers: {
      authorization: "Bearer " + token,
    },
  });
  revalidatePath("/books");
  redirect("/books");
}
