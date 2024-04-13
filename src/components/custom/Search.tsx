'use client';

import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import {Input} from "@lib/components/input";
import {useSearchParams, usePathname, useRouter} from 'next/navigation';
import {useDebouncedCallback} from 'use-debounce';

export default function Search() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const {replace} = useRouter();
	
	const handleSearch = useDebouncedCallback((term) => {
		console.log(`Searching... ${term}`);
		
		const params = new URLSearchParams(searchParams);
		if (term) {
			params.set('query', term);
		} else {
			params.delete('query');
		}
		replace(`${pathname}?${params.toString()}`);
	}, 300);
	
	return (
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
				className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
		</div>
	);
}