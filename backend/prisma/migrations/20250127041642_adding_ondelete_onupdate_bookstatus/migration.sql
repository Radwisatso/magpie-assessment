-- DropForeignKey
ALTER TABLE "book_status" DROP CONSTRAINT "book_status_book_id_fkey";

-- AddForeignKey
ALTER TABLE "book_status" ADD CONSTRAINT "book_status_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;
