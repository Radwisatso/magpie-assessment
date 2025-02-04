"use client";
import { login } from "@/app/actions/login";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { useActionState } from "react";

const initialState = {
  message: "",
};
export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);
  console.log(state);
  return (
    <>
      <div className="flex flex-col gap-7 border-black-700 border-2 rounded-md p-5 min-w-96">
        <h1 className="text-3xl">Login</h1>
        {state?.message && <p className="text-red-600">{state?.message}</p>}
        <form action={formAction} className="flex flex-col gap-5">
          <div>
            <label htmlFor="">Email</label>
            <span className="text-red-600"> *</span>
            <br />
            <input
              className="p-3 mt-2 border-black-500 border-2 rounded-md w-full"
              type="text"
              placeholder="Input your email here"
              name="email"
            />
           
          </div>
          <div>
            <label htmlFor="">Password</label>
            <span className="text-red-600"> *</span>
            <br />
            <input
              className="p-3 mt-2 border-black-500 border-2 rounded-md w-full"
              type="password"
              placeholder="Input your password here"
              name="password"
            />
            
          </div>
          <Button disabled={pending} color="gray" variant="soft" highContrast>
            Login
          </Button>
        </form>
      </div>
      <Link href={"/"} className="flex items-center m-2">
        <ChevronLeftIcon />
        <p className="text-sm">Go back</p>
      </Link>
    </>
  );
}
