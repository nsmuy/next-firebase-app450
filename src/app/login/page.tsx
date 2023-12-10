"use client";

import React, { useState } from "react"
import { useRouter } from "next/router"
// import { useRouter } from "next/navigation"
import Link from "next/link"
import { Alert, Button, InputLabel, Snackbar, TextField } from "@mui/material"

import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useAuthContext } from "../context/AuthContext"
import { app } from "../firebase"

const page = () => {

  const { user } = useAuthContext()
  const isLoggedIn = !!user
  const router = useRouter()
  const auth = getAuth(app)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await signInWithEmailAndPassword(auth, email, password)
    router.push("/")
  }
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }
  const handleClose = async () => {
    await router.push("/")
  }

  return (
    <div className="flex justify-between items-center flex-col">
      <Snackbar
        open={isLoggedIn}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        key={"top" + "center"}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning">
          すでにログインしています
        </Alert>
      </Snackbar>
      <Snackbar
        open={!isLoggedIn}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        key={"top" + "center"}
      >
        <Alert severity="warning">ログインしてください</Alert>
      </Snackbar>
      <h2>ログイン</h2>
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
        <div className="flex justify-end items-center mt-4">
          <InputLabel>パスワード</InputLabel>
          <TextField
            name="password"
            type="password"
            size="small"
            onChange={handleChangePassword}
            className="pl-3"
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button type="submit" variant="outlined">
            ログイン
          </Button>
        </div>
        <div className="flex justify-end mt-6">
          ユーザ登録は
          <Link href={"/signup"}>
            こちら
          </Link>
          から
        </div>
      </form>
    </div>
  )
}

export default page