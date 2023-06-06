import Link from "next/link"
import "./globals.css"

export const metadata = {
	title: "Dispute AI",
	description: "Generated by create next app",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html className="bg-[#14161f]" lang="en">
			<body>{children}</body>
		</html>
	)
}
