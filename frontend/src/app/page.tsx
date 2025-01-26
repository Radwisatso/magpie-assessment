import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-3">
      <div>
        <h1 className="text-3xl font-semibold">
          Welcome to Library Management Dashboard!
        </h1>
      </div>
      <div>
        <h2 className="font-thin">Your books management companion</h2>
      </div>
      <br />

      <div>
        <h5 className="font-light">
          Please login to your account to access the dashboard or sign up first
        </h5>
      </div>
      <div>
        <Button color="gray" variant="surface" highContrast>
          <Link href={"/login"}>Sign In</Link>
        </Button>
      </div>
      <div>
        <p className="text-sm text-gray-500">
          or{" "}
          <Link className="underline" href={"/signup"}>
            sign up
          </Link>{" "}
          here
        </p>
      </div>
    </main>
  );
}
