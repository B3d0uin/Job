import {SideBar} from "@lib/components/custom/sidebar/SideBar";
import {SidebarProvider} from "@lib/components/custom/sidebar/SidebarContext";
import JobListing from "@lib/components/custom/JobListing";
import {getJobsByTitle} from "@lib/utils/JobUtils";
import {Suspense} from "react";
import Skeleton from "@lib/components/custom/Skeleton";
import Search from "@lib/components/custom/Search";
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
            <SidebarProvider>
                <SideBar/>
            </SidebarProvider>
            <main className="lg:pl-72">
                <div className="xl:pr-[560px]">
                    <div
                        className="px-4 py-10 sm:px-6 lg:px-5 lg:py-6 flex flex-col gap-2">{/* Main area */}
                        <Search/>
                        <Suspense key={query + currentPage}
                                  fallback={<Skeleton/>}>
                            <JobListing query={query}
                                        currentPage={currentPage}/>
                        </Suspense>
                        <Pagination query={query} currentPage={currentPage}
                                    totalPages={totalPages}/>
                    
                    </div>
                </div>
            </main>
            
            <aside
                className="fixed inset-y-0 right-0 hidden w-[560px] overflow-y-auto border-l border-gray-200  py-6  xl:block">
                {/* Secondary column (hidden on smaller screens) */}
                dd
            </aside>
        </div>
    )
}
