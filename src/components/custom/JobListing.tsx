import {Badge} from "@lib/components/badge";
import {
  BookmarkIcon,
  CalendarIcon, ChevronRightIcon,
  ClockIcon,
  MapPinIcon, SparklesIcon, StarIcon,
} from "@heroicons/react/24/outline";
import {Button} from "@lib/components/button";


const detailsData = [
  {name: 'San Francisco, CA', icon: MapPinIcon},
  {name: 'Posted 2 days ago', icon: CalendarIcon},
  {name: '20 days left', icon: ClockIcon,},

]

export function JobListing() {
  return (
     <div className="rounded-lg border  border-zinc-200 bg-powder text-card-foreground shadow-sm">
       <div className="p-6 space-y-4">
         <div className="flex items-center space-x-4">
           <div className="flex items-center space-x-2">
             <Badge color="cyan" className="!text-charcoal border-charcoal/40 border">Full-Time</Badge>
             <Badge color="yellow" className="!text-charcoal border-charcoal/40 border">Remote</Badge>
           </div>
           <div className="flex-1 text-right">
             <Badge color="pink" className="!text-charcoal border-charcoal/40 border">Experience</Badge>
           </div>
         </div>
         <div className="flex items-center space-x-4">
           <div className="flex-1">
             <h3 className="text-lg font-bold text-charcoal">Frontend Engineer</h3>
             <p className="text-sm font-medium leading-none text-gray-500 dark:text-charcoal/40">Acme Corporation AB</p>
           </div>
           <div className="flex items-center space-x-2">
             <StarIcon className="w-5 h-5 text-gray-500"/>
             <span className="sr-only">Bookmark</span>
           </div>
         </div>
         <div className="grid gap-2">
           <p className="text-sm leading-none">
             We're looking for a frontend engineer to join our team. You will work on our customer-facing web
             applications, collaborating with our design and product teams to
             implement delightf
           </p>
         </div>
         <div className="flex items-center gap-4">

           {detailsData.map((item) => (

              <div key={item.name} className="flex items-center space-x-2">
                <item.icon width="24"
                           height="24" className="w-4 h-4 text-charcoal/70"/>

                <span className="text-sm text-gray-500 dark:text-charcoal/70">{item.name}</span>
              </div>
           ))}
         </div>
         <div className="flex items-center gap-3">
           <Button
              type={"button"}
              color={"zinc"}
              className="cursor-pointer border-t !border-zinc-200 !border-x-0 !border-b-0 transform transition duration-150 ease-in-out active:scale-95 active:border-2  active:py-1"
           >
             Read More
           </Button>

           <Button
              type={"button"}
              color={"dark"}
              className="cursor-pointer border-t !border-zinc-200  !border-x-0 !border-b-0 transform transition duration-150 ease-in-out active:scale-95 active:border-2  active:py-1"
           >
             <SparklesIcon/>
             AI-Tailor
           </Button>
         </div>
       </div>
     </div>
  )
}