import { logout } from "@/app/actions/logout";
import { Button } from "@radix-ui/themes";

export default function DashboardPage() {
    return (
        <div>
            <h1>Dashboard page for book</h1>
            <form action={logout}>
                <Button>
                    Logout
                </Button>
            </form>
        </div>
    );
}