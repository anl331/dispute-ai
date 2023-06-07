"use client"

import React, { useState } from "react"
import { account } from "../appwrite"
import { useRouter } from "next/navigation"
import { DropdownMenuCheckboxItemProps, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded"
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Avatar from "react-avatar"
import Lottie from "@novemberfiveco/lottie-react-light"
import animationData from "@/components/json/goodbye.json"
import loadingAnimation from "@/components/json/loading.json"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import LogoutIcon from "@mui/icons-material/Logout"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import { useAppStore } from "@/store/useAppStore"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

export function AvatarMenu() {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const currentUser = useAppStore((state) => state.currentUser)
	const setGoogleUsed = useAppStore((state) => state.setGoogleUsed)

	const clearStorage = () => {
		if (typeof window !== "undefined") {
			localStorage.clear()
		}
	}

	const handleLogout = async () => {
		setGoogleUsed(false)
		clearStorage()
		setIsLoading(true)
		const promise = await account.deleteSession("current")
		const finisher = setTimeout(() => {
			router.push("/login")
		}, 777)
	}
	return (
		<div className="">
			{isLoading && (
				<div className="absolute inset-0 z-50 bg-[#14161f]">
					<Lottie className="my-auto h-screen" animationData={animationData} loop={false} />
				</div>
			)}

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className="flex items-center gap-1 rounded-full bg-white/5 p-2 text-white hover:cursor-pointer hover:bg-white/10">
						<Avatar name={currentUser?.name} size="35" textSizeRatio={2.5} round={true} color="#7783B8" />
						<ExpandMoreIcon fontSize="inherit" />
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="mt-1 w-64 border-white/10 bg-[#14161f]/40 text-white shadow-md backdrop-blur-md text-base" align="end">
					<DropdownMenuLabel className=" font-semibold  ">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-[18px] tracking-wider">{currentUser?.name}</p>
								<p className="text-[0.7rem] font-light">{currentUser?.email}</p>
							</div>
							<Badge className=" bg-yellow-500 hover:">Pro</Badge>
						</div>
					</DropdownMenuLabel>

					<DropdownMenuSeparator className="bg-white/10" />

					<DropdownMenuItem className="my-2 flex items-center gap-2 rounded-md p-2  outline-none transition-[padding] duration-200 ease-linear hover:cursor-pointer hover:bg-[#7783b8] hover:pl-4">
						<SettingsOutlinedIcon fontSize="inherit" />
						<p className="">Account Settings</p>
					</DropdownMenuItem>

					<div className="my-2 flex items-center justify-between gap-2 rounded-md p-2  outline-none">
						<p className="">Dark Mode</p>
						<Switch className="border-white/20 data-[state=checked]:bg-white/10 data-[state=unchecked]:bg-transparent data-[state=unchecked]:[&>span]:bg-white/70 data-[state=checked]:bg-[#7783b8] data-[state=checked]:border-white/40 " />
					</div>

					<DropdownMenuSeparator className="bg-white/10" />

					<DropdownMenuItem className="my-2 flex items-center gap-2 rounded-md p-2  outline-none transition-[padding] duration-200 ease-linear hover:cursor-pointer hover:bg-[#7783b8] hover:pl-4" onClick={handleLogout}>
						<LogoutIcon fontSize="inherit" />
						<p className="">Log Out</p>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
