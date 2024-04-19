'use client';
import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import {Input} from "@lib/components/input";
import {useSearchParams, usePathname, useRouter} from 'next/navigation';
import {useDebouncedCallback} from 'use-debounce';

import {Fragment} from 'react'
import {Menu, Transition} from '@headlessui/react'
import {AdjustmentsVerticalIcon} from "@heroicons/react/24/solid";

function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(' ')
}
export default function Search() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const {replace} = useRouter();
	
	const handleSearch = useDebouncedCallback((term) => {
		console.log(`Searching... ${term}`);
		
		const params = new URLSearchParams(searchParams);
		if (term) {
			params.set('query', term);
			params.delete('page')
		} else {
			params.delete('query');
		}
		replace(`${pathname}?${params.toString()}`);
	}, 200);
	
	return (
		<div className="flex  gap-2">
		<div className="relative flex flex-1 flex-shrink-0">
			<label htmlFor="search" className="sr-only">
				Search
			</label>
			<Input type={"search"} className=""
				   aria-label="Job Listing" name="Job-Listing"
				   placeholder="Search..."
				   onChange={(e) => {
					   handleSearch(e.target.value);
				   }}
				   defaultValue={searchParams.get('query')?.toString()}
			/>
			<MagnifyingGlassIcon
				className="absolute hidden md:block left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
		</div>
			<Example/>
		</div>
	);
}

function Example() {
	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button
					className="inline-flex  w-fit justify-center gap-x-1.5 rounded-md  px-3 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
					<AdjustmentsVerticalIcon width="24"
								   height="24"
								   className="w-5 h-5 text-charcoal/70"/>
				
				</Menu.Button>
			</div>
			
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items
					className="absolute right-0 z-10  mt-2 w-56 origin-top-right rounded-md bg-zinc-300  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="py-1">
						<Menu.Item>
							{({active}) => (
								<a
									href="#"
									className={classNames(
										active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 ',
										'block px-4 py-2 text-sm'
									)}
								>
									Account settings
								</a>
							)}
						</Menu.Item>
						<Menu.Item>
							{({active}) => (
								<a
									href="#"
									className={classNames(
										active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
										'block px-4 py-2 text-sm'
									)}
								>
									Support
								</a>
							)}
						</Menu.Item>
						<Menu.Item>
							{({active}) => (
								<a
									href="#"
									className={classNames(
										active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
										'block px-4 py-2 text-sm'
									)}
								>
									License
								</a>
							)}
						</Menu.Item>
						<form method="POST" action="#">
							<Menu.Item>
								{({act100ive}) => (
									<button
										type="submit"
										className={classNames(
											active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
											'block w-full px-4 py-2 text-left text-sm'
										)}
									>
										Sign out
									</button>
								)}
							</Menu.Item>
						</form>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}