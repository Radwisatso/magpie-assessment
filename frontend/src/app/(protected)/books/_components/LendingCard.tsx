"use client"

import { Button } from "@radix-ui/themes";

interface LendingCardProps {
  id: number;
  title: string;
  borrowedDate: string;
  dueDate: string;
  status: string;
  onReturn: (id: number) => void;
}
export default function LendingCard({
  id,
  title,
  borrowedDate,
  dueDate,
  status,
  onReturn,
}: LendingCardProps) {
  console.log(id);
  return (
    <div className="rounded-lg border p-4 h-auto flex flex-col gap-3">
      <h1 className="text-xl">{title}</h1>
      <label htmlFor="">Borrowed Date:</label>
      <p className="text-sm">{borrowedDate}</p>
      <label htmlFor="">Due Date:</label>
      <p className="text-sm">{dueDate}</p>
      <p className="text-sm">Status: {status}</p>

      <div className="flex gap-2">
        <form action={() => onReturn(id)}>
          {status === "BORROWED" ? (
            <Button type="submit" color="green">
              Return
            </Button>
          ) : (
            <Button disabled color="gray">
              Returned
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
