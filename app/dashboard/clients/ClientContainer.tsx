"use client"

import { ScoreGauges } from "@/components/client/ScoreGauges"
import { TableData } from "./TableData"
import { columns } from "./columns"
import { useAppStore } from "@/store/useAppStore"
import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import AddIcon from "@mui/icons-material/Add"
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid"
import ClientPortalFeedback from "@/components/client/ClientPortalFeedback"
import { ChevronRightIcon } from "@heroicons/react/20/solid"
import { useDropzone } from "react-dropzone"
import ClearIcon from "@mui/icons-material/Clear"
import { cn } from "@/lib/utils"

export default function ClientContainer() {
	const getClients = useAppStore((state) => state.getClients)
	const clients = useAppStore((state) => state.clients)
	const firstName = useRef(null)
	const middleName = useRef(null)
	const lastName = useRef(null)
	const sufix = useRef(null)
	const email = useRef(null)
	const phoneNumber = useRef(null)
	const lastFour = useRef(null)
	const birthDate = useRef(null)
	const streetAddress = useRef(null)
	const city = useRef(null)
	const state = useRef(null)
	const postalCode = useRef(null)
	const clientPortalFeedback = useRef(null)

	// State Consts
	const stateIssuedId = useRef(null)
	const [stateIssuedIdFile, setStateIssuedIdFile] = useState("")
	const [stateIssuedIdFilePrivacy, setStateIssuedIdFilePrivacy] = useState(true)
	const [stateIssuedIdKey, setStateIssuedIdKey] = useState("")

	// SSN Consts
	const socialSecurityCard = useRef(null)
	const [socialSecurityCardFile, setSocialSecurityCardFile] = useState("")
	const [socialSecurityCardFilePrivacy, setSocialSecurityCardFilePrivacy] = useState(true)
	const [socialSecurityCardKey, setSocialSecurityCardKey] = useState("")

	// Proof of Address Consts
	const proofOfAddress = useRef(null)
	const [proofOfAddressFile, setProofOfAddressFile] = useState("")
	const [proofOfAddressFilePrivacy, setProofOfAddressFilePrivacy] = useState(true)
	const [proofOfAddressKey, setProofOfAddressKey] = useState("")

	const {
		getRootProps: stateIssuedIdRootProps,
		getInputProps: stateIssuedIdInputProps,
		isDragActive: stateIssuedIdDragActive,
		inputRef: stateIssuedIdInputRef,
	} = useDropzone({
		maxFiles: 1,
		disabled: stateIssuedIdFile,
		accept: {
			"image/*": [".png", ".jpeg", ".jpg"],
		},
		onDropAccepted: (file, event) => {
			setStateIssuedIdFile(
				file.map((item) =>
					Object.assign(item, {
						preview: URL.createObjectURL(item),
						id: event.target.id,
					})
				)
			)
		},
	})

	const {
		getRootProps: socialSecurityCardRootProps,
		getInputProps: socialSecurityCardInputProps,
		isDragActive: socialSecurityCardDragActive,
		inputRef: socialSecurityCardInputRef,
	} = useDropzone({
		maxFiles: 1,
		disabled: socialSecurityCardFile,
		accept: {
			"image/*": [".png", ".jpeg", ".jpg"],
		},
		onDropAccepted: (file, event) => {
			setSocialSecurityCardFile(
				file.map((item) =>
					Object.assign(item, {
						preview: URL.createObjectURL(item),
						id: event.target.id,
					})
				)
			)
		},
	})

	const {
		getRootProps: proofOfAddressRootProps,
		getInputProps: proofOfAddressInputProps,
		isDragActive: proofOfAddressDragActive,
		inputRef: proofOfAddressInputRef,
	} = useDropzone({
		maxFiles: 1,
		multiple: false,
		disabled: proofOfAddressFile,
		accept: {
			"image/*": [".png", ".jpeg", ".jpg"],
		},
		onDropAccepted: (file, event) => {
			setProofOfAddressFile(
				file.map((item) =>
					Object.assign(item, {
						preview: URL.createObjectURL(item),
						id: event.target.id,
					})
				)
			)
		},
	})

	const people = [
		{
			name: "Leslie Alexander",
			email: "leslie.alexander@example.com",
			role: "Co-Founder / CEO",
			imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			href: "#",
			lastSeen: "3h ago",
			lastSeenDateTime: "2023-01-23T13:23Z",
		},
		{
			name: "Michael Foster",
			email: "michael.foster@example.com",
			role: "Co-Founder / CTO",
			imageUrl: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			href: "#",
			lastSeen: "3h ago",
			lastSeenDateTime: "2023-01-23T13:23Z",
		},
	]

	const tabs = [
		{ name: "Client Details", href: "#", current: true },
		{ name: "Dispute", href: "#", current: false },
	]

	function classNames(...classes) {
		return classes.filter(Boolean).join(" ")
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		const formData = {
			firstName: firstName.current.value,
			middleName: middleName.current.value,
			lastName: lastName.current.value,
			sufix: sufix.current.value,
			email: email.current.value,
			phoneNumber: phoneNumber.current.value,
			lastFour: lastFour.current.value,
			birthDate: birthDate.current.value,
			streetAddress: streetAddress.current.value,
			city: city.current.value,
			state: state.current.value,
			postalCode: postalCode.current.value,
			stateIssuedId: stateIssuedId.current.value,
			socialSecurityCard: socialSecurityCard.current.value,
			proofOfAddress: proofOfAddress.current.value,
		}
		console.log(formData)
	}

	useEffect(() => {
		getClients()
	}, [getClients])

	// solves hydration issues
	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])
	if (!mounted) return null

	return (
		<div className="flex h-full gap-10 divide-x-2 divide-white/20 pt-5 text-white">
			{/* left side */}
			<div className="flex flex-1 flex-col gap-6 overflow-y-auto scrollbar-none">
				{/* Tabs */}
				<div className="">
					<div className="sm:hidden">
						<label htmlFor="tabs" className="sr-only">
							Select a tab
						</label>
						{/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
						<select id="tabs" name="tabs" className="block w-full rounded-md border-gray-300 focus:border-[#7783b8] focus:ring-[#7783b8]" defaultValue={tabs.find((tab) => tab.current).name}>
							{tabs.map((tab) => (
								<option key={tab.name}>{tab.name}</option>
							))}
						</select>
					</div>
					<div className="hidden sm:block">
						<div className="">
							<nav className="-mb-px flex" aria-label="Tabs">
								{tabs.map((tab) => (
									<a key={tab.name} href={tab.href} className={classNames(tab.current ? "border-[#7783b8] text-[#7783b8]" : " border-white/30 text-white/30 hover:border-white hover:text-white", "w-1/4 flex-1 border-b-[3px] px-1 py-4 text-center text-sm font-medium transition-all duration-200 ease-linear")} aria-current={tab.current ? "page" : undefined}>
										<h2 className="text-base font-semibold leading-7">{tab.name}</h2>
									</a>
								))}
							</nav>
						</div>
					</div>
				</div>

				{/* body */}
				<form onSubmit={handleSubmit}>
					<div className="space-y-12">
						<div className="border-b border-white/10 pb-8">
							<h2 className="text-base font-semibold leading-7 text-white">Clients Documents</h2>
							<p className="mt-1 text-sm leading-6 text-gray-400">This info will be used when generating dispute letters, serving as proof of identity in the process.</p>
							<div className="grid gap-6 xl:flex">
								{/* State Issued ID Dropzone */}
								<div className="mt-10 grid flex-1 select-none grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
									<div className="col-span-full">
										<div className="flex justify-between ">
											<label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-white">
												State Issued ID
											</label>
											<span className="inline-flex scale-90 items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-400/20">Required</span>
										</div>
										<div
											{...stateIssuedIdRootProps()}
											id="stateIssuedId"
											className={cn("relative mt-2 flex h-[200px] max-h-[200px] min-h-max cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-white/25", {
												"border-[#7783b8] text-[#7783b8]": stateIssuedIdDragActive,
												"cursor-default border-[#7783b8]": stateIssuedIdFile,
											})}>
											{stateIssuedIdFile && (
												<div className="relative w-auto cursor-pointer" onClick={() => setStateIssuedIdFilePrivacy(!stateIssuedIdFilePrivacy)}>
													<div
														className={cn("absolute inset-0 rounded-lg", {
															"bg-[#7783b8]/20 backdrop-blur-sm": stateIssuedIdFilePrivacy,
														})}></div>
													<img src={stateIssuedIdFile[0]?.preview} alt="" className="aspect-[3/2] max-h-[175px]  rounded-lg object-cover" />
												</div>
											)}
											<div className="text-center">
												{!stateIssuedIdFile && (
													<PhotoIcon
														className={cn("mx-auto h-12 w-12 text-gray-500", {
															"text-[#7783b8]": stateIssuedIdDragActive,
														})}
														aria-hidden="true"
													/>
												)}
												<div
													className={cn("mt-4 flex h-12 flex-col items-center text-xs leading-6 text-gray-400 sm:text-sm", {
														"text-[#7783b8]": stateIssuedIdDragActive,
													})}>
													<input ref={stateIssuedId} id="stateIssuedId" {...stateIssuedIdInputProps()} />
													{stateIssuedIdDragActive && <p>Drop the files here ...</p>}
													{!stateIssuedIdDragActive && !stateIssuedIdFile && <p className={cn("px-6 xl:px-6")}>Drag 'n' drop file here, or click to select file</p>}
												</div>
												<div
													className={cn("absolute inset-x-0 bottom-1 text-[10px]", {
														hidden: stateIssuedIdFile,
													})}>
													.png, .jpg & .jpeg files only, up to 5 MB
												</div>
											</div>
										</div>

										<div
											className="flex h-3 justify-end"
											onClick={() => {
												setStateIssuedIdFile("")
											}}>
											{stateIssuedIdFile && <p className="block cursor-pointer text-xs font-medium leading-6 text-white transition-all hover:text-red-500">Remove File</p>}
										</div>
									</div>
								</div>

								{/* Social Security Card Dropzone */}
								<div className="mt-10 grid flex-1 select-none grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
									<div className="col-span-full">
										<div className="flex justify-between ">
											<label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-white">
												Social Security Card
											</label>
											<span className="inline-flex scale-90 items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-500 ring-1 ring-inset ring-blue-400/20">Optional</span>
										</div>

										<div
											{...socialSecurityCardRootProps()}
											id="socialSecurityCard"
											className={cn("relative mt-2 flex h-[200px] max-h-[200px] min-h-max cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-white/25", {
												"border-[#7783b8] text-[#7783b8]": socialSecurityCardDragActive,
												"cursor-default border-[#7783b8]": socialSecurityCardFile,
											})}>
											{socialSecurityCardFile && (
												<div className="relative w-auto cursor-pointer" onClick={() => setSocialSecurityCardFilePrivacy(!socialSecurityCardFilePrivacy)}>
													<div
														className={cn("absolute inset-0 rounded-lg", {
															"bg-[#7783b8]/20 backdrop-blur-sm": socialSecurityCardFilePrivacy,
														})}></div>
													<img src={socialSecurityCardFile[0]?.preview} alt="" className="aspect-[3/2] max-h-[175px]  rounded-lg object-cover" />
												</div>
											)}
											<div className="text-center">
												{!socialSecurityCardFile && (
													<PhotoIcon
														className={cn("mx-auto h-12 w-12 text-gray-500", {
															"text-[#7783b8]": socialSecurityCardDragActive,
														})}
														aria-hidden="true"
													/>
												)}
												<div
													className={cn("mt-4 flex h-12 flex-col items-center text-xs leading-6 text-gray-400 sm:text-sm", {
														"text-[#7783b8]": socialSecurityCardDragActive,
													})}>
													<input ref={socialSecurityCard} id="socialSecurityCard" {...socialSecurityCardInputProps()} />
													{socialSecurityCardDragActive && <p>Drop the files here ...</p>}
													{!socialSecurityCardDragActive && !socialSecurityCardFile && <p className={cn("px-6 xl:px-6")}>Drag 'n' drop file here, or click to select file</p>}
												</div>

												<div
													className={cn("absolute inset-x-0 bottom-1 text-[10px]", {
														hidden: socialSecurityCardFile,
													})}>
													.png, .jpg & .jpeg files only, up to 5 MB
												</div>
											</div>
										</div>

										<div
											className="flex h-3 justify-end"
											onClick={() => {
												setSocialSecurityCardFile("")
											}}>
											{socialSecurityCardFile && <p className="block cursor-pointer text-xs font-medium leading-6 text-white transition-all hover:text-red-500">Remove File</p>}
										</div>
									</div>
								</div>

								{/* Proof of Address Dropzone */}
								<div className="mt-10 grid flex-1 select-none grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
									<div className="col-span-full">
										<div className="flex justify-between ">
											<label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-white">
												Proof of Address
											</label>
											<span className="inline-flex scale-90 items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-400/20">Required</span>
										</div>

										<div
											{...proofOfAddressRootProps()}
											id="proofOfAddress"
											className={cn("relative mt-2 flex h-[200px] max-h-[200px] min-h-max cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-white/25", {
												"border-[#7783b8] text-[#7783b8]": proofOfAddressDragActive,
												"cursor-default border-[#7783b8]": proofOfAddressFile,
											})}>
											{proofOfAddressFile && (
												<div className="relative w-auto cursor-pointer" onClick={() => setProofOfAddressFilePrivacy(!proofOfAddressFilePrivacy)}>
													<div
														className={cn("absolute inset-0 rounded-lg", {
															"bg-[#7783b8]/20 backdrop-blur-sm": proofOfAddressFilePrivacy,
														})}></div>
													<img src={proofOfAddressFile[0]?.preview} alt="" className="aspect-[3/2] max-h-[175px]  rounded-lg object-cover" />
												</div>
											)}
											<div className="text-center">
												{!proofOfAddressFile && (
													<PhotoIcon
														className={cn("mx-auto h-12 w-12 text-gray-500", {
															"text-[#7783b8]": proofOfAddressDragActive,
														})}
														aria-hidden="true"
													/>
												)}
												<div
													className={cn("mt-4 flex h-12 flex-col items-center text-xs leading-6 text-gray-400 sm:text-sm", {
														"text-[#7783b8]": proofOfAddressDragActive,
													})}>
													<input ref={proofOfAddress} id="proofOfAddress" {...proofOfAddressInputProps()} />
													{proofOfAddressDragActive && <p>Drop the files here ...</p>}
													{!proofOfAddressDragActive && !proofOfAddressFile && <p className={cn("px-6 xl:px-6")}>Drag 'n' drop file here, or click to select file</p>}
												</div>
												<div
													className={cn("absolute inset-x-0 bottom-1 text-[10px]", {
														hidden: proofOfAddressFile,
													})}>
													.png, .jpg & .jpeg files only, up to 5 MB
												</div>
											</div>
										</div>

										<div
											className="flex h-3 justify-end"
											onClick={() => {
												setProofOfAddressFile("")
											}}>
											{proofOfAddressFile && <p className="block cursor-pointer text-xs font-medium leading-6 text-white transition-all hover:text-red-500">Remove File</p>}
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="border-b border-white/10 pb-12">
							<h2 className="text-base font-semibold leading-7 text-white">Clients Contact Information</h2>
							<p className="mt-1 text-sm leading-6 text-gray-400">Address where client can receive mail.</p>

							<div className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-10">
								<div className="col-span-full xl:col-span-3">
									<label htmlFor="firstName" className="block text-sm font-medium leading-6 text-white">
										First name
										<span className="ml-1 font-medium text-red-500">*</span>
									</label>
									<div className="mt-2">
										<input ref={firstName} type="text" name="firstName" id="firstName" autoComplete="firstName" className="block w-full rounded-md border-0 bg-white/5 px-2 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#7783b8] sm:text-sm sm:leading-6" />
									</div>
								</div>

								<div className="col-span-full xl:col-span-3">
									<label htmlFor="middleName" className="block text-sm font-medium leading-6 text-white">
										Middle name
									</label>
									<div className="mt-2">
										<input ref={middleName} type="text" name="middleName" id="middleName" autoComplete="middleName" className="block w-full rounded-md border-0 bg-white/5 px-2 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#7783b8] sm:text-sm sm:leading-6" />
									</div>
								</div>

								<div className="col-span-8 xl:col-span-3">
									<label htmlFor="lastName" className="block text-sm font-medium leading-6 text-white">
										Last name
										<span className="ml-1 font-medium text-red-500">*</span>
									</label>
									<div className="mt-2">
										<input ref={lastName} type="text" name="lastName" id="lastName" autoComplete="lastName" className="block w-full rounded-md border-0 bg-white/5 px-2 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#7783b8] sm:text-sm sm:leading-6" />
									</div>
								</div>

								<div className=" col-span-2 xl:col-span-1 ">
									<label htmlFor="sufix" className="block text-sm font-medium leading-6 text-white">
										Sufix
									</label>
									<div className="mt-2">
										<input ref={sufix} type="text" name="sufix" id="sufix" autoComplete="sufix" className="block w-full rounded-md border-0 bg-white/5 px-2 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#7783b8] sm:text-sm sm:leading-6" />
									</div>
								</div>

								<div className="col-span-full xl:col-span-3">
									<label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
										Email address
										<span className="ml-1 font-medium text-red-500">*</span>
									</label>
									<div className="mt-2">
										<input ref={email} id="email" name="email" type="email" autoComplete="email" className="block w-full rounded-md border-0 bg-white/5 px-2 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#7783b8] sm:text-sm sm:leading-6" />
									</div>
								</div>

								<div className="col-span-full xl:col-span-3">
									<label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-white">
										Phone number
										<span className="ml-1 font-medium text-red-500">*</span>
									</label>
									<div className="mt-2">
										<input ref={phoneNumber} id="phoneNumber" name="phoneNumber" type="phone" autoComplete="phoneNumber" className="block w-full rounded-md border-0 bg-white/5 px-2 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#7783b8] sm:text-sm sm:leading-6" />
									</div>
								</div>

								<div className="col-span-5 xl:col-span-2">
									<label htmlFor="lastFour" className="block text-sm font-medium leading-6 text-white">
										SSN Last 4 <span className="ml-1 font-medium text-red-500">*</span>
									</label>
									<div className="mt-2">
										<input ref={lastFour} id="lastFour" name="lastFour" type="text" autoComplete="lastFour" className="block w-full rounded-md border-0 bg-white/5 px-2 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#7783b8] sm:text-sm sm:leading-6" />
									</div>
								</div>

								<div className="col-span-5 xl:col-span-2">
									<label htmlFor="birthDate" className="block text-sm font-medium leading-6 text-white">
										Birth date
										<span className="ml-1 font-medium text-red-500">*</span>
									</label>
									<div className="mt-2">
										<input ref={birthDate} id="birthDate" name="birthDate" placeholder="MM-DD-YYYY" type="birthDate" autoComplete="phone" className=" block w-full rounded-md border-0 bg-white/5 px-2 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-white/5 focus:ring-2 focus:ring-inset focus:ring-[#7783b8] sm:text-sm sm:leading-6" />
									</div>
								</div>

								<div className="col-span-full">
									<label htmlFor="streetAddress" className="block text-sm font-medium leading-6 text-white">
										Street address
										<span className="ml-1 font-medium text-red-500">*</span>
									</label>
									<div className="mt-2">
										<input ref={streetAddress} type="text" name="streetAddress" id="streetAddress" autoComplete="streetAddress" className="block w-full rounded-md border-0 bg-white/5 px-2 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#7783b8] sm:text-sm sm:leading-6" />
									</div>
								</div>

								<div className="first-letter: col-span-full  grid gap-x-6 gap-y-8 xl:grid-cols-9">
									<div className="col-span-full xl:col-span-3">
										<label htmlFor="city" className="block text-sm font-medium leading-6 text-white">
											City
											<span className="ml-1 font-medium text-red-500">*</span>
										</label>
										<div className="mt-2">
											<input ref={city} type="text" name="city" id="city" autoComplete="address-level2" className="block w-full rounded-md border-0 bg-white/5 px-2 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#7783b8] sm:text-sm sm:leading-6" />
										</div>
									</div>
									<div className="col-span-full xl:col-span-3">
										<label htmlFor="state" className="block text-sm font-medium leading-6 text-white">
											State
											<span className="ml-1 font-medium text-red-500">*</span>
										</label>
										<div className="mt-2">
											<input ref={state} type="text" name="state" id="state" autoComplete="address-level1" className="block w-full rounded-md border-0 bg-white/5 px-2 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#7783b8] sm:text-sm sm:leading-6" />
										</div>
									</div>
									<div className="col-span-full xl:col-span-3">
										<label htmlFor="postalCode" className="block text-sm font-medium leading-6 text-white">
											Postal code
											<span className="ml-1 font-medium text-red-500">*</span>
										</label>
										<div className="mt-2">
											<input ref={postalCode} type="text" name="postalCode" id="postalCode" autoComplete="postalCode" className="block w-full rounded-md border-0 bg-white/5 px-2 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#7783b8] sm:text-sm sm:leading-6" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="relative flex items-start pb-4 pt-3.5">
						<ClientPortalFeedback />
					</div>

					<div className="mt-6 flex items-center justify-end gap-x-6">
						<button type="button" className="text-sm font-semibold leading-6 text-white">
							Cancel
						</button>
						<button type="submit" className="rounded-md bg-[#7783b8] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7783b8]">
							Save
						</button>
					</div>
				</form>
			</div>

			{/* right side */}
			<div className={cn("hidden w-2/5 flex-col gap-5 p-5 pr-0 pt-0 text-white transition-[width] duration-200 md:flex lg:w-1/3 ease-linear")}>
				<ul role="list" className="">
					{people.map((person) => (
						<li key={person.email} className="relative flex flex-col [&>hr]:last:hidden">
							<div className={cn("relative my-2 flex flex-col-reverse justify-between gap-x-6 p-2 py-5 2xl:flex-col", { "hover:rounded-md hover:bg-white/5": true, "2xl:mt 2xl:flex-row": true })}>
								<div className="flex gap-x-4">
									<img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
									<div className="min-w-0 flex-auto">
										<p className="text-sm font-semibold leading-6 ">
											<a href={person.href}>
												<span className="absolute inset-x-0 -top-px bottom-0" />
												{person.name}
											</a>
										</p>
										<p className="mt-1 flex text-xs leading-5 text-gray-500">
											<a href={`mailto:${person.email}`} className="relative truncate hover:underline">
												{person.email}
											</a>
										</p>
									</div>
								</div>
								<div
									className={cn("mb-2 hidden items-center gap-x-4", {
										"xl:flex": true,
										"2xl:mt-0": true,
									})}>
									<div className="hidden w-full items-center justify-between sm:flex 2xl:flex-col 2xl:items-end">
										<p className="text-sm leading-6 ">{person.role}</p>
										{person.lastSeen ? (
											<p className="mt-1 text-xs leading-5 text-gray-500">
												Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
											</p>
										) : (
											<div className="mt-1 flex items-center gap-x-1.5">
												<div className="flex-none rounded-full bg-emerald-500/20 p-1">
													<div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
												</div>
												<p className="text-xs leading-5 text-gray-500">Online</p>
											</div>
										)}
									</div>
								</div>
							</div>

							<hr className="w-full border-white" />
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
