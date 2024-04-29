
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
import {Badge} from "@lib/components/badge";
import {Field, Label} from "@lib/components/fieldset";
import {Textarea} from "@lib/components/textarea";
import {DocumentPlusIcon, PaperAirplaneIcon, PlusCircleIcon} from "@heroicons/react/24/outline";
export const revalidate = 3600

export default async function Page({searchParams}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
   const {totalCount, jobs} = await getJobsByTitle(query, currentPage);
    const totalPages = Math.ceil(totalCount / 10);

    return (
        <div>
            <SidebarProvider>
                <SideBar/>
            </SidebarProvider>
            <Stats/>
            <main className="lg:pl-72">
                <div className="xl:pr-[660px]">
                    <div
                        className="px-4 py-10 sm:px-6 lg:px-5 lg:py-6 flex flex-col gap-2">{/* Main area */}

                        <Search/>
                       {/*<Suspense key={query + currentPage + jobs}*/}
                        {/*          fallback={<Skeleton/>}>*/}
                       <JobListing
                         jobs={jobs} query={query}
                         currentPage={currentPage}/>
                        {/*</Suspense>*/}
                       <Pagination query={query} currentPage={currentPage}
                                   totalPages={totalPages}/>

                    </div>
                </div>
            </main>
        
        
        </div>
    )
}


