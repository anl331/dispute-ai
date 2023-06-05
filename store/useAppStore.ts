import getAllClients from "@/lib/getAllClients"
import { Client, User } from "@/typings"
import { create } from "zustand"
import { persist, devtools } from "zustand/middleware"

type ClientStore = {
	currentUserId: number | null
	currentUser: number | null
	isLoading: boolean
	error: null
	clients: any[] | null
}

type Actions = {
	getClients: () => void
	setcurrentUserId: (id: number) => void
	setcurrentUser: (user: User) => void
}

const clientStore = (set) => ({
	currentUserId: null,
	currentUser: null,
	isLoading: true,
	error: null,
	clients: [],
	getClients: async () => {
		try {
			const allClients = await getAllClients()
			set({ isLoading: false, clients: allClients })
		} catch (error) {
			set({ error: error.message, isLoading: false })
		}
	},
	setcurrentUserId: (id) => {
		set({ currentUserId: id })
	},
	setCurrentUser: (user: User) => {
		set({ currentUser: user })
	},
})

export const useAppStore = create<ClientStore & Actions>(
	devtools(
		persist(clientStore, {
			name: "session",
			storage,
		})
	)
)
