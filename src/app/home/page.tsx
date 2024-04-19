
import {SideBar} from "@lib/app/dashboard/components/sidebar/SideBar";
import JobListing from "@lib/components/custom/JobListing";
import {Suspense} from "react";

import Skeleton from "@lib/components/custom/Skeleton";
import Search from "@lib/app/dashboard/components/Search";
import {getJobsByTitle} from "@lib/utils/JobUtils";
import Pagination from "@lib/components/custom/Pagination";



export default async function Example({searchParams}: {
	searchParams?: {
		query?: string;
		page?: string;
	};
}) {
	const query = searchParams?.query || '';
	const currentPage = Number(searchParams?.page) || 1;
	const {totalCount} = await getJobsByTitle(query, currentPage);
	const totalPages = Math.ceil(totalCount / 10);
	
	return (
		
		<div>
			<SideBar/>
			<main className="lg:pl-20">
				<div className="xl:pl-[41%]">
					<div
						className="px-4 py-10 sm:px-6 border-powder border lg:px-8 lg:py-6">{
						
					}</div>
				</div>
			</main>
			<aside
				className="fixed inset-y-0 left-20 hidden   w-[40%] overflow-y-auto  px-4 py-6 sm:px-6 lg:px-8 xl:block">
				
				<Search/>
				<Suspense key={query + currentPage} fallback={<Skeleton/>}>
					<JobListing query={query} currentPage={currentPage}/>
				</Suspense>
				<Pagination query={query} currentPage={currentPage}
							totalPages={totalPages}/>
			
			
			</aside>
		</div>
	
	)
}
