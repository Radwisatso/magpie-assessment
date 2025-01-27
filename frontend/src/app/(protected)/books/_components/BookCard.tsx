"use client";

import { Button } from "@radix-ui/themes";
import Link from "next/link";

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  isbn: string;
  quantity: number;
  categoryName: string;
  onDelete: (id: number) => Promise<void>;
}

export default function BookCard({
  id,
  title,
  author,
  isbn,
  quantity,
  categoryName,
  onDelete,
}: BookCardProps) {
  return (
    <div className="rounded-lg border p-4 h-auto flex flex-col gap-3">
      <h1 className="text-xl">{title}</h1>
      <p className="text-sm">Written by: {author}</p>
      <p className="text-sm">ISBN: {isbn}</p>
      <p className="text-sm">Quantity: {quantity}</p>
      <p className="text-sm">Category: {categoryName}</p>
      <div className="flex gap-2">
        <Button>
          <Link href={`/books/${id}`}>View</Link>
        </Button>
        <form action={() => onDelete(id)}>
          <Button type="submit" color="red">
            Delete
          </Button>
        </form>
      </div>
    </div>
  );
}
