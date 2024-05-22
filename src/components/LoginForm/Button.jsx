"use client";
import React from "react";
import { useFormStatus } from "react-dom";

function Button() {
  const { pending } = useFormStatus();

  return <button disabled={pending}>
    {pending ? "loading..." : "Login"}
  </button>;
}

export default Button;
