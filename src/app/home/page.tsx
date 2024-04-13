
import {
  Bars3Icon, BookmarkIcon, BriefcaseIcon,
  Cog6ToothIcon,
  DocumentTextIcon, EnvelopeIcon,

  XMarkIcon,
} from '@heroicons/react/24/outline'
import {Input} from "@lib/components/input";

import {SideBar} from "@lib/components/custom/sideBar";
import JobListing from "@lib/components/custom/JobListing";

const navigation = [
  {name: 'Dashboard', href: '#', icon: BriefcaseIcon, current: true},
  {name: 'Email', href: '#', icon: EnvelopeIcon, current: false},
  {name: 'Bookmarked', href: '#', icon: BookmarkIcon, current: false},
  {name: 'Resume', href: '#', icon: DocumentTextIcon, current: false},
  {name: 'Settings', href: '#', icon: Cog6ToothIcon, current: false},
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {

  return (
     <>
       <div>
         <SideBar/>
         <main className="lg:pl-20">
           <div className="xl:pl-[41%]">
             <div className="px-4 py-10 sm:px-6 border-powder border lg:px-8 lg:py-6">{

             }</div>
           </div>
         </main>

         <aside
            className="fixed inset-y-0 left-20 hidden   w-[40%] overflow-y-auto  px-4 py-6 sm:px-6 lg:px-8 xl:block">

           <Input type={"search"} className="mb-5" aria-label="Job Listing" name="Job-Listing" placeholder="Search..."/>
           <section className="flex flex-col gap-2">
             <JobListing/> <JobListing/><JobListing/>
           </section>
         </aside>
       </div>
     </>
  )
}
