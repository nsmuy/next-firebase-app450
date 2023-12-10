"use client";

import React, { useState } from "react";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import Link from "next/link";
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { app } from "../firebase"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

const page = () => {

  const router = useRouter()
  const auth = getAuth(app)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await createUserWithEmailAndPassword(auth, email, password)
    router.push("/signup")
  }
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center">
          <InputLabel>メールアドレス</InputLabel>
          <TextField
            name="email"
            type="email"
            size="small"
            onChange={handleChangeEmail}
            className="pl-3"
          />
        </div>
        <div className="flex justify-center items-center mt-4">
          <InputLabel>パスワード</InputLabel>
          <TextField
            name="password"
            type="password"
            size="small"
            onChange={handleChangePassword}
            className="pl-3"/>
        </div>
        <div className="flex justify-center mt4">
          <Button type="submit" variant="outlined">
            登録
          </Button>
        </div>
        <div className="flex justify-end mt-6">
          <Link href={"/login"}>
            すでに登録している人はこちら
          </Link>
        </div>
      </form>
    </>
  );
};

export default page;
