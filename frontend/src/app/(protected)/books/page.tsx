import { fetchBooks } from "@/app/lib/fetchBooks";
import BookCard from "./_components/BookCard";
import { deleteBook } from "@/app/actions/book";

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  quantity: number;
  categoryId: number;
  createdBy: number;
  category: {
    id: number;
    name: string;
  };
}
export default async function DashboardPage() {
  const res = await fetchBooks();
  const resJson = await res.json();
  const books: Book[] = resJson.data;

  if (!res.ok) {
    return <p>Error fetching books</p>;
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto h-full">
      <div className="grid grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            isbn={book.isbn}
            quantity={book.quantity}
            categoryName={book.category.name}
            onDelete={deleteBook}
          />
        ))}
      </div>
    </div>
  );
}
