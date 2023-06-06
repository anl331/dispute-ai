"use client"

import { account, getUserData } from "@/appwrite"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { animationData } from "@/components/json/loading.json"
import { Lottie } from "@novemberfiveco/lottie-react-light"

export default function DashboardPage() {
	const router = useRouter()
	const [currentUser, setCurrentUser] = useState("")
	const [isLoading, setIsLoading] = useState(true)

	const getUser = async () => {
		getUserData().catch((error) => {
			router.push("/login")
		})

		const user = await account.get()
		setIsLoading(false)
		setCurrentUser(user)
	}

	useEffect(() => {
		getUser()
	}, [getUser])

	return (
		<div className="h-full w-full p-5 text-lg font-bold text-white">
			{isLoading && (
				<div className="flex h-full w-full items-center justify-center">
					<Lottie animationData={animationData} loop={true} />
					Loading...
				</div>
			)}
			{currentUser && <div className="flex h-full w-full ">{currentUser.name}</div>}
		</div>
	)
}
