"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Navigation() {
  const pathName = usePathname();
  return (
    <nav className="p-4">
      <h2 className="text-lg font-medium mb-4">Navigation</h2>
      <ul className="space-y-2">
        <li>
          <Link
            href="/books"
            className={clsx("block p-2 hover:bg-gray-100 rounded", {
                "bg-gray-100": pathName === "/books"
            })}
          >
            Registered Books
          </Link>
        </li>
        <li>
          <Link  href="/books/lendings"
            className={clsx("block p-2 hover:bg-gray-100 rounded", {
                "bg-gray-100": pathName === "/books/lendings"
            })}>
            Lendings
          </Link>
        </li>
        <li>
          <Link  href="/books/analytics"
            className={clsx("block p-2 hover:bg-gray-100 rounded", {
                "bg-gray-100": pathName === "/books/analytics"
            })}>
            Analytics
          </Link>
        </li>
      </ul>
    </nav>
  );
}
