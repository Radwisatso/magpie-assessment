"use client"

import { register } from "@/app/actions/register";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { useActionState } from "react";

const initialState = {
  errors: {
    name: [],
    email: [],
    password: []
  }
}

export default function SignUpForm() {

  const [state, formAction, pending] = useActionState(register, initialState)
  return (
    <>
      <div className="flex flex-col gap-7 border-black-700 border-2 rounded-md p-5 min-w-96">
        <h1 className="text-3xl">Sign Up</h1>
        <form action={formAction} className="flex flex-col gap-5">
          <div>
            <label htmlFor="">Name</label>
            <span className="text-red-600"> *</span>
            <br />
            <input
              className="p-3 mt-2 border-black-500 border-2 rounded-md w-full"
              type="text"
              placeholder="Input your full name here"
              name="name"
            />
            {state?.errors?.name &&
            state?.errors?.name?.map((error) => (
              <p className="text-red-600" key={error}>
                {error}
              </p>
            ))}
          </div>
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
            {state?.errors?.email &&
            state?.errors?.email?.map((error) => (
              <p className="text-red-600" key={error}>
                {error}
              </p>
            ))}
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
            {state?.errors?.password &&
            state?.errors?.password?.map((error) => (
              <p className="text-red-600" key={error}>
                {error}
              </p>
            ))}
          </div>
          <div>
            <label htmlFor="">Phone</label>
            <br />
            <input
              className="p-3 mt-2 border-black-500 border-2 rounded-md w-full"
              type="tel"
              name="phone"
              placeholder="Input your phone number here"
            />
          </div>
          <Button disabled={pending} color="gray" variant="soft" highContrast>
            Register
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
