"use client"
import {Dispatch, Fragment, SetStateAction, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/solid";
import {useSidebar} from "@lib/app/dashboard/components/sidebar/SidebarContext";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

type NavigationItem = {
	name: string;
	href: string;
	icon: any;
	current: boolean;
};

type MobileSidebarProps = {
	navigation: NavigationItem[];
	sidebarOpen: boolean;
	setSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

export function MobileSideBar({navigation}: MobileSidebarProps) {
	const {sidebarOpen, setSidebarOpen} = useSidebar();
	return (
		<Transition.Root show={sidebarOpen} as={Fragment}>
			<Dialog as="div" className="relative z-50 lg:hidden"
					onClose={setSidebarOpen}>
				<Transition.Child
					as={Fragment}
					enter="transition-opacity ease-linear duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity ease-linear duration-300"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-900/80"/>
				</Transition.Child>
				
				<div className="fixed inset-0 flex">
					<Transition.Child
						as={Fragment}
						enter="transition ease-in-out duration-300 transform"
						enterFrom="-translate-x-full"
						enterTo="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leaveFrom="translate-x-0"
						leaveTo="-translate-x-full"
					>
						<Dialog.Panel
							className="relative mr-16 flex w-full max-w-xs flex-1">
							<Transition.Child
								as={Fragment}
								enter="ease-in-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in-out duration-300"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<div
									className="absolute left-full top-0 flex w-16 justify-center pt-5">
									<button type="button"
											className="-m-2.5 p-2.5"
											onClick={() => setSidebarOpen(false)}>
										<span
											className="sr-only">Close sidebar</span>
										<XMarkIcon
											className="h-6 w-6 text-white"
											aria-hidden="true"/>
									</button>
								</div>
							</Transition.Child>
							{/* Sidebar component, swap this element with another sidebar if you like */}
							<div
								className="flex grow flex-col gap-y-5 overflow-y-auto bg-platinumColor  pb-2">
								<div
									className="flex h-16 shrink-0 gap-2 items-center pl-3">
									<img className="h-8 w-auto" src="/logo.png"
										 alt="Your Company"/>
									<h2 className="font-mono font-medium text-lg">ResuMeAI</h2>
								</div>
								<nav className="flex flex-1 flex-col">
									<ul role="list"
										className="flex flex-1 flex-col gap-y-7">
										<li>
											<ul role="list"
												className="-mx-2 space-y-1">
												{navigation.map((item) => (
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
												))}
											</ul>
										</li>
									</ul>
								</nav>
							</div>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	
	
	)
}