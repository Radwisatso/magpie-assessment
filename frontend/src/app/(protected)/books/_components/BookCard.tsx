import { Button } from "@radix-ui/themes";
import Link from "next/link";

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  isbn: string;
  quantity: number;
  categoryName: string;
}

export default function BookCard({
  id,
  title,
  author,
  isbn,
  quantity,
  categoryName,
}: BookCardProps) {
  return (
    <div className="rounded-lg border p-4 h-auto flex flex-col gap-3">
      <h1 className="text-xl">{title}</h1>
      <p className="text-sm">Written by: {author}</p>
      <p className="text-sm">ISBN: {isbn}</p>
      <p className="text-sm">Quantity: {quantity}</p>
      <p className="text-sm">Category: {categoryName}</p>
      <Button>
        <Link href={`/books/${id}`}>View</Link>
      </Button>
    </div>
  );
}
