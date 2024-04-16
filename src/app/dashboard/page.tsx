import {SideBar} from "@lib/app/dashboard/components/sidebar/SideBar";
import {
    SidebarProvider
} from "@lib/app/dashboard/components/sidebar/SidebarContext";
import JobListing from "@lib/components/custom/JobListing";
import {getJobsByTitle} from "@lib/utils/JobUtils";
import {Suspense} from "react";
import Skeleton from "@lib/components/custom/Skeleton";
import Search from "@lib/app/dashboard/components/Search";
import Pagination from "@lib/components/custom/Pagination";
import Stats from "@lib/app/dashboard/components/Statistics";

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
            <Stats/>
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
                className="fixed inset-y-0 mt-[260px] right-0 hidden w-[560px] overflow-y-auto bg-zinc-950/5 rounded-lg    py-6  xl:block">
                {/* Secondary column (hidden on smaller screens) */}
                TODO: AI here
            </aside>
        </div>
    )
}



