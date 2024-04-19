"use client"
import {Fragment, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {
	Bars3Icon,
	BookmarkIcon,
	BriefcaseIcon, CalendarIcon, ChartPieIcon,
	Cog6ToothIcon, DocumentDuplicateIcon,
	DocumentTextIcon,
	EnvelopeIcon, FolderIcon, HomeIcon, MagnifyingGlassIcon, UsersIcon,
	XMarkIcon
} from "@heroicons/react/24/solid";
import {
  MobileSideBar
} from "@lib/app/dashboard/components/sidebar/MobileSideBar";
import {useSidebar} from "@lib/app/dashboard/components/sidebar/SidebarContext";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

const navigation = [
	{name: 'Search', href: '#', icon: MagnifyingGlassIcon, current: true},
	{name: 'Email', href: '#', icon: EnvelopeIcon, current: false},
	{name: 'Bookmarked', href: '#', icon: BookmarkIcon, current: false},
	{name: 'Resume', href: '#', icon: DocumentTextIcon, current: false},
	{name: 'Settings', href: '#', icon: Cog6ToothIcon, current: false},
]


export function SideBar() {
	const {sidebarOpen, setSidebarOpen} = useSidebar();
	return (
		<div>
			<MobileSideBar navigation={navigation} sidebarOpen={sidebarOpen}
						   setSidebarOpen={setSidebarOpen}/>
			
			{/* *Static sidebar for desktop ##START## */}
			<div
				className="hidden  lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
				<div
					className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-platinumColor/20 drop-shadow-lg">
					<div className="flex h-16 shrink-0 gap-2 items-center pl-3">
						<img className="h-10 w-auto" src="/logo.png"
							 alt="Your Company"/>
						<h2 className="font-mono font-medium text-lg">ResuMeAI</h2>
					</div>
					<nav className="flex flex-1 flex-col">
						<ul role="list"
							className="flex flex-1 flex-col gap-y-7 relative overflow-x-hidden">
							{/* Corrected structure: Separate <li> for each group */}
							<li>
								<ul role="list" className="-mx-2 space-y-1">
									{navigation.map((item, index) => (
										(index === 0 || index === 2) && (
											<li key={item.name}
												className="pl-3 rounded-l-3xl">
												<a
													href={item.href}
													className={classNames(
														item.current
															? 'border-l-4 rounded-l-[4px] text-black border-black'
															: 'text-gray-700 hover:text-black',
														'group flex gap-x-3 pl-4 p-2 text-sm leading-6 font-sans font-medium'
													)}
												>
													<item.icon
														className={classNames(
															item.current ? 'text-black' : 'text-gray-400 group-hover:text-black',
															'h-5 w-5 shrink-0'
														)}
														aria-hidden="true"
													/>
													{item.name}
												</a>
											</li>
										)
									))}
								</ul>
							</li>
							<li>
								<ul role="list" className="-mx-2 space-y-1">
									{navigation.map((item, index) => (
										index !== 0 && index !== 2 && (
											<li key={item.name}
												className="pl-3 rounded-l-3xl">
												<a
													href={item.href}
													className={classNames(
														item.current
															? 'border-l-4 rounded-l-[4px] text-black border-black'
															: 'text-gray-700 hover:text-black',
														'group flex gap-x-3 pl-4 p-2 text-sm leading-6 font-sans font-medium'
													)}
												>
													<item.icon
														className={classNames(
															item.current ? 'text-black' : 'text-gray-400 group-hover:text-black',
															'h-5 w-5 shrink-0'
														)}
														aria-hidden="true"
													/>
													{item.name}
												</a>
											</li>
										)
									))}
								</ul>
							</li>
							{/* Profile link */}
							<li className="-mx-6 mt-auto">
								<a
									href="#"
									className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
								>
									<img
										className="h-8 w-8 rounded-full bg-gray-50"
										src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
										alt=""
									/>
									<span
										className="sr-only">Your profile</span>
									<span aria-hidden="true">Tom Cook</span>
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
			{/* Mobile header */}
			<div
				className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
				<button type="button"
						className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
						onClick={() => setSidebarOpen(true)}>
					<span className="sr-only">Open sidebar</span>
					<Bars3Icon className="h-6 w-6" aria-hidden="true"/>
				</button>
				<div
					className="flex-1 text-sm font-semibold leading-6 text-gray-900">Dashboard
				</div>
				<a href="#">
					<span className="sr-only">Your profile</span>
					<img
						className="h-8 w-8 rounded-full bg-gray-50"
						src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
						alt=""
					/>
				</a>
			</div>
		</div>
	);
}