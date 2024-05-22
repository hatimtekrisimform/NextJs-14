'use client'
import React from 'react';
import { login } from '../../lib/action'
import Link from 'next/link';
import styles from './LoginForm.module.css'
import { useFormState } from "react-dom";
import Button from './Button'

function LoginForm() {
    const [state, formAction] = useFormState(login, undefined);
  return (
    <form className={styles.form} action={formAction}>
    <input type="text" placeholder="username" name="username" />
    <input type="password" placeholder="password" name="password" />
    <Button ></Button>
    {state?.error}
    <Link href="/register">
      {"Don't have an account?"} <b>Register</b>
    </Link>
  </form>
  )
}

export default LoginForm