"use client"

import { account, getUserData } from "@/appwrite"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { loading } from "@/components/json/loading.json"
import { Lottie } from "@novemberfiveco/lottie-react-light"
import { useAppStore } from "@/store/useAppStore"

export default function DashboardPage() {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(true)
	const currentUser = useAppStore((state) => state.currentUser)
	const googleUsed = useAppStore((state) => state.googleUsed)
	const setCurrentUser = useAppStore((state) => state.setCurrentUser)
	const setGoogleUsed = useAppStore((state) => state.setGoogleUsed)

	const validate = async () => {
		if (googleUsed) {
			const user = await account.get()
			setCurrentUser(user)
			setGoogleUsed(false)
		} else {
			return false
		}
	}

	const verifyCurrentUser = async () => {
		getUserData().catch((error) => {
			router.push("/login")
		})
	}

	useEffect(() => {
		verifyCurrentUser()
		validate()
	}, [verifyCurrentUser])

	// solves hydration issues
	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])
	if (!mounted) return null

	return <></>
}
