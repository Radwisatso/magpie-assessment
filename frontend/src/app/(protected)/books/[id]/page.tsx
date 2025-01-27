"use client";

import { updateBook } from "@/app/actions/book";
import { fetchBookById } from "@/app/lib/fetchBookById";
import { fetchCategories } from "@/app/lib/fetchCategories";
import { use, useActionState, useEffect, useState } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  quantity: number;
  category: {
    id: number;
    name: string;
  };
}

interface Category {
  id: number;
  name: string;
}

const initialState = {
  errors: {
    title: [],
    author: [],
    isbn: [],
    quantity: [],
    categoryId: [],
  },
};

export default function BookEditForm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [book, setBook] = useState<Book>();
  const [categories, setCategories] = useState<Category[]>([]);
//   const [bookId, setBookId] = useState<string>("");
  const [isLoading, setLoading] = useState(false);
  const {id} = use(params)
  const updateBookWithId = updateBook.bind(null, id);
  const [state, formAction, pending] = useActionState(
    updateBookWithId,
    initialState
  );
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const id = (await params).id;
        const foundBook = await fetchBookById(+id);
        const foundCategories = await fetchCategories();
        // setBookId(id);
        setBook(foundBook.data);
        setCategories(foundCategories.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, [params]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="flex flex-col gap-5 rounded-md p-5 min-w-96 overflow-y-auto h-full">
        <h1 className="text-3xl">Update Book ID: {id}</h1>
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
              defaultValue={book?.title}
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
              defaultValue={book?.author}
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
              defaultValue={book?.isbn}
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
              defaultValue={book?.quantity}
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
              defaultValue={book?.category?.id}
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
    </>
  );
}
