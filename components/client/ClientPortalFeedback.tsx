import { useState } from "react"
import { RadioGroup } from "@headlessui/react"

const memoryOptions = [
	{ name: "Yes", inStock: true },
	{ name: "No", inStock: true },
]

function classNames(...classes) {
	return classes.filter(Boolean).join(" ")
}

export default function ClientPortalFeedback() {
	const [mem, setMem] = useState(memoryOptions[2])

	return (
		<div className="flex w-full justify-between">
			<div className="w-full ">
				<div className="min-w-0 flex-1 text-sm leading-6">
					<div className="flex gap-1">
						<h2 className="text-base font-semibold leading-7 text-white">Client Portal</h2>
						<span className="ml-1 font-medium text-red-500">*</span>
					</div>
					<p className="mt-1 text-sm leading-6 text-gray-400">The client portal provides clients with a convenient way to track the progress of their account.</p>
				</div>
			</div>
			<div className="flex justify-end">
				<RadioGroup value={mem} onChange={setMem} className="mt-2">
					<div className="flex">
						{memoryOptions.map((option) => (
							<RadioGroup.Option key={option.name} value={option} className={({ active, checked }) => classNames(active ? "ring-2 ring-indigo-600 ring-offset-2" : "", checked ? "bg-indigo-600 text-white hover:bg-indigo-500 hover:text-white" : "bg-white/5 text-white ring-1 ring-inset ring-white/10 hover:bg-gray-50", "ml-3 flex w-20 items-center justify-center rounded-md px-6 py-[9px] text-sm font-semibold uppercase first:ml-0 hover:text-indigo-500 sm:flex-1")} disabled={!option.inStock}>
								<RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
							</RadioGroup.Option>
						))}
					</div>
				</RadioGroup>
			</div>
		</div>
	)
}

// bg-white/5 px-2 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10
