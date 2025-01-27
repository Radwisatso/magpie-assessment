import { fetchLendings } from "@/app/lib/fetchLendings";
import { Suspense } from "react";
import LendingCard from "../_components/LendingCard";
import { format } from "date-fns";
import { returnBook } from "@/app/actions/lending";

interface Lending {
  book: {
    author: string;
    id: number;
    isbn: string;
    title: string;
  };
  bookId: number;
  borrowedDate: string;
  createdBy: number;
  dueDate: string;
  id: number;
  memberId: number;
  returnDate: string | null;
  status: string;
}
export default async function LendingsPage() {
  const response = await fetchLendings();
  const lendings: Lending[] = response.data;
  console.log(lendings);

  return (
    <div className="flex-1 p-6 overflow-y-auto h-full">
      <div className="grid grid-cols-4 gap-6">
        <Suspense fallback={<p>Loading...</p>}>
          {lendings &&
            lendings.map((lending) => (
              <LendingCard
                key={lending.id}
                id={lending.id}
                title={lending.book.title}
                borrowedDate={format(
                  lending.borrowedDate,
                  "MM/dd/yyyy hh:mm:ss O"
                )}
                dueDate={format(lending.dueDate, "MM/dd/yyyy hh:mm:ss O")}
                status={lending.status}
                onReturn={returnBook}
              />
            ))}
        </Suspense>
      </div>
    </div>
  );
}
