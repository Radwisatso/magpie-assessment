"use client";

import { createBook } from "@/app/actions/book";
import { useActionState, useEffect, useState } from "react";
import { fetchCategories } from "@/app/lib/fetchCategories";

const initialState = {
  errors: {
    title: [],
    author: [],
    isbn: [],
    quantity: [],
    categoryId: [],
  },
};

interface Category {
  id: number;
  name: string;
}

export default function BookCreateForm() {
  const [state, formAction, pending] = useActionState(createBook, initialState);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchCategories();
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <div className="flex flex-col gap-5 rounded-md p-5 min-w-96 overflow-y-auto h-full">
        <h1 className="text-3xl">Create Book</h1>
        {state?.message && <p className="text-red-600">Error creating book</p>}
        <form action={formAction} className="flex flex-col gap-5">
          <div>
            <label htmlFor="title">Title</label>
            <br />
            <input
              type="text"
              name="title"
              id="title"
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Book Title"
            />
          </div>
          {state?.errors?.title &&
            state?.errors?.title?.map((error) => (
              <p className="text-red-600" key={error}>
                {error}
              </p>
            ))}
          <div>
            <label htmlFor="author">Author</label>
            <br />
            <input
              type="text"
              name="author"
              id="author"
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Author Name"
            />
          </div>
          {state?.errors?.author &&
            state?.errors?.author?.map((error) => (
              <p className="text-red-600" key={error}>
                {error}
              </p>
            ))}
          <div>
            <label htmlFor="isbn">ISBN</label>
            <br />
            <input
              type="text"
              name="isbn"
              id="isbn"
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="ISBN Number"
            />
          </div>
          {state?.errors?.isbn &&
            state?.errors?.isbn?.map((error) => (
              <p className="text-red-600" key={error}>
                {error}
              </p>
            ))}
          <div>
            <label htmlFor="quantity">Quantity</label>
            <br />
            <input
              type="number"
              name="quantity"
              id="quantity"
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Quantity"
            />
          </div>
          {state?.errors?.quantity &&
            state?.errors?.quantity?.map((error) => (
              <p className="text-red-600" key={error}>
                {error}
              </p>
            ))}
          <div>
            <label htmlFor="category">Category</label>
            <br />
            <select
              name="categoryId"
              className="border border-gray-300 rounded-md p-2 w-full"
              defaultValue={""}
            >
              <option value="" disabled>
                Choose the category
              </option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {state?.errors?.categoryId &&
            state?.errors?.categoryId?.map((error) => (
              <p className="text-red-600" key={error}>
                {error}
              </p>
            ))}
          <div>
            <button
              type="submit"
              disabled={pending}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
      <div></div>
    </>
  );
}
