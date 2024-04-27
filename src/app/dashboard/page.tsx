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
    // !TODO fix that homepage shows old listing first
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
                className="fixed inset-y-0 mt-[255px] right-0 hidden w-[660px] overflow-y-auto bg-zinc-950/5 rounded-lg      xl:block">
                {/* Secondary column (hidden on smaller screens) */}
                <aside className="h-full">
                    <div className="divide-y divide-zinc-950/10 h-full overflow-hidden rounded-lg  shadow">
                        <div className="px-4 py-5 sm:px-6">
                            {/* TOP PART*/}
                            <ul className="grid grid-cols-2 gap-4 text-sm justify-center items-center">
                                <h2 className="col-span-2 text-center font-mono font-bold text-2xl flex items-center gap-2 justify-center">ResuMeAI <Badge
                                    color="violet">BETA</Badge></h2>
                                <li className="flex justify-between px-10"><span
                                    className="font-semibold ">Metadata: </span> TimeTjek AB
                                </li>

                                <li className="flex justify-between px-10"><span
                                    className="font-semibold">Position: </span> Systemutvecklare
                                </li>
                                <li className="flex justify-between px-10"><span
                                    className="font-semibold">Location: </span> Stockholm
                                </li>
                                <li className="flex justify-between px-10"><span
                                    className="font-semibold">Mode: </span> Cover Letter
                                </li>
                            </ul>
                        </div>
                        <div className="px-4 py-5 sm:p-6 h-[70%]">
                            {/* Middle part goes here */}
                            <article>
                                <div className="p-4 rounded-md bg-platinumColor/30 border border-zinc-950/10 shadow-md">
                                    <h3 className="text-center text-lg font-medium text-zinc-600"> Welcome to ResuMeAI
                                        AI Chatbot! </h3>
                                    <p className="text-sm text-zinc-600"> ResuMeAI is an intelligent tool designed to
                                        aid you in your career development.<br/>
                                        <br/>
                                        With
                                        our AI-powered assistance, you can easily generate tailored cover letters,
                                        professional resumes, and effective emails based on specific job listings.
                                        Unleash
                                        your career potential with ResuMeAI! </p></div>
                            </article>
                        </div>
                        <div className="px-4 py-4 sm:px-6 relative">
                            {/* Bottom goes here */}
                            <section className="grid right-1 px-10 grid-cols-2 gap-3  w-full  absolute -top-40">
                                <div
                                    className="text-sm border  p-2 border-slate-500/70 shadow-md bg-platinumColor/30 rounded-md">
                                    <h5 className="font-medium">Generate Email</h5>
                                    <span
                                        className="text-xs text-zinc-600">Generate Email based on the Job listing</span>
                                </div>
                                <div
                                    className="text-sm border p-2  border-slate-500/70 shadow-md bg-platinumColor/30 rounded-md">
                                    <h5 className="font-medium">Generate Resume</h5>
                                    <span
                                        className="text-xs text-zinc-600">Generate Email based on the Job listing</span>
                                </div>
                                <div
                                    className="text-sm border p-2 border-slate-500/70 shadow-md bg-platinumColor/30 rounded-md">
                                    <h5 className="font-medium">Generate Email</h5>
                                    <span
                                        className="text-xs text-zinc-600">Generate Email based on the Job listing</span>
                                </div>
                                <div
                                    className="text-sm border p-2 border-slate-500/70 shadow-md bg-platinumColor/30 rounded-md">
                                    <h5 className="font-medium">Generate Cover Letter</h5>
                                    <span
                                        className="text-xs text-zinc-600">Generate Email based on the Job listing</span>
                                </div>
                            </section>
                            <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                                Adjust Output
                            </label>
                            <div className="relative"><textarea rows={3} name="comment" id="comment"
                                                                className="block w-full pl-12 rounded-md border-0 py-1.5 text-gray-900 bg-zinc-950/10 shadow-sm ring-1 ring-inset ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:text-sm sm:leading-6 outline-none focus:outline-none "
                            />
                                <DocumentPlusIcon width="24 " height="24"
                                                  className="absolute stroke-zinc-950/50 left-2 top-0 bottom-0  my-auto border-r border-zinc-400 h-full"/>
                                <PaperAirplaneIcon width="24 " height="24"
                                                   className="absolute stroke-zinc-950/50 right-2 top-0 bottom-0  my-auto  border-zinc-400 h-full"/>
                            </div>

                        </div>
                    </div>
                </aside>
            </aside>
        </div>
    )
}



