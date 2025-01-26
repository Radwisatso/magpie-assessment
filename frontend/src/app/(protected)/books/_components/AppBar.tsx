import { logout } from "@/app/actions/logout";
import { Button } from "@radix-ui/themes";

export default function AppBar() {
  return (
    <div className="h-full flex justify-between items-center px-6">
      <h1 className="text-xl font-semibold">Library Management</h1>
      <form action={logout}>
        <Button color="gray" variant="outline" highContrast>
          Logout
        </Button>
      </form>
    </div>
  );
}
