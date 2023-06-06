"use client"

import React, { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { ID, account, getUserData } from "@/appwrite.js"
import { Logo } from "@/components/Logo"
import { useAppStore } from "@/store/useAppStore"

const LoginForm = () => {
	const router = useRouter()
	const form = useRef(null)
	const email = useRef(null)
	const password1 = useRef(null)
	const [isLoading, setIsLoading] = useState(false)
	const [loginErrorMessage, setLoginErrorMessage] = useState("")
	const setCurrentUser = useAppStore((state) => state.setCurrentUser)
	const setGoogleUsed = useAppStore((state) => state.setGoogleUsed)

	const clearStorage = () => {
		if (typeof window !== "undefined") {
			localStorage.clear()
		}
	}

	const handleUserPassLogin = async () => {
		// clearStorage()
		const promise = account.createEmailSession(email.current.value, password1.current.value)

		promise.then(
			async function (response) {
				form.current.reset()
				const user = await account.get()
				setIsLoading(false)
				await setCurrentUser(user)
				router.push("/")
			},
			function (error) {
				console.log(error.message)
				setIsLoading(false)
				setLoginErrorMessage(error.message)
				setTimeout(() => {
					setLoginErrorMessage("")
				}, 3000)
				clearTimeout()
			}
		)
	}

	const handleGoogleLogin =() => {
		clearStorage()
		setGoogleUsed(true)
		account.createOAuth2Session("google" , "http://localhost:3000/" , "http://localhost:3000/login")
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		setIsLoading(true)
		handleUserPassLogin()
	}

	return (
		<>
			<Logo />
			<div className="rounded-md border border-white/10 bg-white/5 p-10">
				<form ref={form} onSubmit={handleSubmit} className="mx-auto flex w-80 max-w-xs flex-col">
					<div>
						{/* {passwordMatch === "not-match" && <p className="pb-4 text-red-500">Passwords do not match.</p>}
						{passwordMatch === "not-meet-standards" && <p className="pb-4 text-red-500">Password does not meet the requirements.</p>} */}
						<div className="mb-4">
							<label htmlFor="email" className="mb-2 block">
								Email:
							</label>
							<input className="w-full rounded border border-gray-300 px-3 py-2 text-black outline-none" name="email" type="email" aria-label="Email" ref={email} required />
						</div>
						<div className="mb-4">
							<label htmlFor="password1" className="mb-2 block">
								Password:
							</label>
							<input className="w-full rounded border border-gray-300 px-3 py-2 text-black outline-none" name="password" type="password" aria-label="Password" ref={password1} required />
						</div>
						<button type="submit" className="mt-4 w-full rounded bg-[#7783B8] px-4 py-2 text-white">
							{isLoading ? "Loging..." : "Login"}
						</button>

						<p className=" flex justify-center gap-2 pt-2 text-xs">
							Don't have an account?{" "}
							<span className="text-[#7783B8] hover:cursor-pointer" onClick={() => router.push("/register")}>
								Register
							</span>
						</p>
					</div>
				</form>
				<div class="relative flex items-center py-5">
					<div class="flex-grow border-t border-white/20"></div>
					<span class="mx-4 flex-shrink text-white/20">OR</span>
					<div class="flex-grow border-t border-white/20"></div>
				</div>
				<div>
					<button onClick={handleGoogleLogin} type="submit" className="flex w-full items-center gap-3 rounded bg-white px-4 py-2 text-[#757575]">
						<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M23.5 12.7603C23.5 11.9478 23.4271 11.1665 23.2917 10.4165H12.5V14.8488H18.6667C18.401 16.2811 17.5938 17.4946 16.3802 18.3071V21.1821H20.0833C22.25 19.1873 23.5 16.2498 23.5 12.7603Z" fill="#4285F4" />
							<path d="M12.5 23.9585C15.5937 23.9585 18.1875 22.9325 20.0833 21.1825L16.3802 18.3075C15.3542 18.995 14.0417 19.4012 12.5 19.4012C9.51561 19.4012 6.98957 17.3856 6.08853 14.6772H2.26041V17.646C4.14582 21.3908 8.02082 23.9585 12.5 23.9585Z" fill="#34A853" />
							<path d="M6.08853 14.6769C5.85937 13.9894 5.72916 13.255 5.72916 12.4998C5.72916 11.7446 5.85937 11.0103 6.08853 10.3228V7.354H2.26041C1.45832 8.95073 1.04095 10.713 1.04166 12.4998C1.04166 14.3488 1.48437 16.0988 2.26041 17.6457L6.08853 14.6769Z" fill="#FBBC05" />
							<path d="M12.5 5.5988C14.1823 5.5988 15.6927 6.17692 16.8802 7.31234L20.1667 4.02588C18.1823 2.17692 15.5885 1.0415 12.5 1.0415C8.02082 1.0415 4.14582 3.60921 2.26041 7.354L6.08853 10.3228C6.98957 7.61442 9.51561 5.5988 12.5 5.5988Z" fill="#EA4335" />
						</svg>
						<p className="relative right-4 mx-auto">Continue with Google</p>
					</button>
				</div>
			</div>
		</>
	)
}

export default LoginForm
