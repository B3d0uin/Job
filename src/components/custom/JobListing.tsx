"use client"
import {Badge} from "@lib/components/badge";
import {
   CalendarIcon,
   ClockIcon,
   MapPinIcon,
   SparklesIcon,
   StarIcon,
   BriefcaseIcon,
   BookOpenIcon,
   UserIcon,
   AcademicCapIcon,
   HandThumbUpIcon,
   ComputerDesktopIcon,
   DocumentPlusIcon,
   PaperAirplaneIcon
} from "@heroicons/react/24/outline";
import {Button} from "@lib/components/button";

import {
	daysLeftUntilLastApplication,
	daysSincePublished, getJobsByTitle,
	sanitizeDescription
} from "@lib/utils/JobUtils";
import {FireIcon} from "@heroicons/react/20/solid";
import {useState} from "react";


export default function JobListing({query, currentPage, jobs, onJobSelect}: {
   query: string;
   currentPage: number;
   jobs: any[];
}) {
   const [selectedJob, setSelectedJob] = useState(null);
   
   const handleJobSelect = (job) => {
	  setSelectedJob(job);
   };
   return (
	 <section className="flex flex-col gap-4">
		
		{jobs.map((post) => (
		  
		  <div key={post.id}
			   
			   className="rounded-lg border   border-zinc-300 bg-powder/90 text-card-foreground shadow-sm relative">
			 
			 <div className="p-6 space-y-4">
				<div className="flex items-center ">
				   <div className="flex-1 ">
					  <h3
						className="text-lg font-bold text-charcoal">{post.title}</h3>
					  <p
						className="text-sm font-medium leading-none text-gray-500 dark:text-charcoal/40">{post.companyName}</p>
					  <ul
						className="2xl:flex items-center md:space-x-2 mt-4  "
						id="list">
						 {
							[
							   {
								  icon: BriefcaseIcon,
								  text: post.duration
							   },
							   {
								  icon: ComputerDesktopIcon,
								  text: post.occupation
							   },
							   {
								  icon: UserIcon,
								  text: `${post.positions} Available position(s) `
							   },
							   {
								  icon: AcademicCapIcon,
								  text: post.requiresExperience ? "Experience required" : "No experience required"
								  
							   },
							].map((item, index) => (
							  <li key={index}
								  className="flex items-center space-x-2 text-sm !text-black-">
								 <item.icon width="24"
											height="24"
											className="w-4 h-4 text-charcoal/70"/>
								 <span>{item.text}</span>
							  </li>
							))
						 }
					  
					  </ul>
				   </div>
				   <div
					 className="lg:flex grid grid-rows-2 items-center space-x-2 group absolute top-10 md:top-4 right-2 md:right-4">
					  {daysSincePublished(post.publishedDate) <= 15 && (
						<Badge color="red" className="">
						   <FireIcon width="24" height="24"
									 className="w-4 h-4  text-charcoal/70"/>
						   New
						</Badge>
					  )}
					  <Button plain={true}
							  className="cursor-pointer row-start-1">
						 <HandThumbUpIcon
						   className="w-6 h-6 group-hover:text-charcoal fill-charcoal"/>
						 <span className="sr-only">Bookmark</span>
					  </Button>
				   
				   </div>
				
				</div>
				<div
				  className="grid gap-2 prose leading-snug min-w-full">
				   <p className="text-sm leading-snug   line-clamp-4  ">
					  {sanitizeDescription(post.description)}
				   </p>
				</div>
				<ul className="flex items-center gap-4">
				   <li
					 className="flex items-center space-x-2">
					  <MapPinIcon width="24"
								  height="24"
								  className="w-4 h-4 text-charcoal/70"/>
					  
					  <span
						className="text-sm text-gray-500 dark:text-charcoal/70">{post.municipality}</span>
				   </li>
				   <li
					 className="hidden md:flex items-center space-x-2">
					  <CalendarIcon width="24"
									height="24"
									className="w-4 h-4 text-charcoal/70"/>
					  
					  <span
						className="text-sm text-gray-500 dark:text-charcoal/70">Posted {daysSincePublished(post.publishedDate)} days ago</span>
				   </li>
				   <li
					 className="flex items-center space-x-2">
					  <ClockIcon width="24"
								 height="24"
								 className="w-4 h-4 text-charcoal/70"/>
					  
					  <span
						className="text-sm text-gray-500 dark:text-charcoal/70">{daysLeftUntilLastApplication(post.lastApplicationDate)} days left</span>
				   </li>
				</ul>
				<div className="flex items-center gap-3">
				   <Button
					 type={"button"}
					 color={"dark/white"}
					 className="cursor-pointer border-b-2 !border-zinc-400 !border-x-0 !border-t-0 transform transition duration-150 ease-in-out active:scale-95 active:border-2 shadow-sm shadow-zinc-500  active:py-1"
				   >
					  Read More
				   </Button>
				   <Button
					 type={"button"}
					 color={"dark/zinc"}
					 className="cursor-pointer border-b-2 !border-black !border-x-0 !border-t-0 transform transition duration-150 ease-in-out active:scale-95 active:border-2 shadow-sm shadow-white active:py-1"
					 onClick={() => handleJobSelect(post)}
				   >
					  <SparklesIcon/>
					  ResuMe-IT
				   </Button>
				</div>
			 </div>
		  
		  </div>
		
		))}
		<aside
		  className="fixed inset-y-0 mt-[255px] h-[75vh] right-0 hidden w-[660px] overflow-y-auto bg-zinc-950/5 rounded-lg      xl:block">
		   {/* Secondary column (hidden on smaller screens) */}
		   <ResumeAI selectedJob={selectedJob}/>
		</aside>
	 </section>
	);
};

function ResumeAI({selectedJob}: { selectedJob: any }) {
   console.log(selectedJob)
   return (
	 <div
	   className="divide-y divide-zinc-950/10 h-full overflow-hidden rounded-lg  shadow">
		<div className="px-4 py-5 sm:px-6">
		   {/* TOP PART*/}
		   <ul
			 className="flex  flex-col gap-4 text-sm justify-center items-center">
			  <h2
				className="text-center font-mono font-bold text-2xl flex items-center gap-2 justify-center">ResuMeAI <Badge
				color="violet">BETA</Badge></h2>
			  <div
				className="flex justify-between w-full shadow-md border border-zinc-400 rounded-md p-2">
				 <li className=""><span
				   className="font-semibold ">Metadata:  </span>{selectedJob.municipality}
				 </li>
				 <li className=" "><span
				   className="font-semibold">Position: </span> {selectedJob.occupation}
				 </li>
				 
				 <li className=" "><span
				   className="font-semibold">Mode: </span> Cover Letter
				 </li>
			  </div>
		   </ul>
		</div>
		<div className="px-4 py-5 sm:p-6 h-[70%]">
		   {/* Middle part goes here */}
		   <article>
			  <div
				className="p-4 rounded-md bg-platinumColor/30 border border-zinc-950/10 shadow-md">
				 <h3
				   className="text-center text-lg font-medium text-zinc-600"> Welcome
					to ResuMeAI
					AI Chatbot! </h3>
				 <p className="text-sm text-zinc-600"> ResuMeAI is an
					intelligent tool designed to
					aid you in your career development.<br/>
					<br/>
					With
					our AI-powered assistance, you can easily generate
					tailored cover letters,
					professional resumes, and effective emails based on
					specific job listings.
					Unleash
					your career potential with ResuMeAI! </p></div>
		   </article>
		</div>
		<div className="px-4 py-4 sm:px-6 relative">
		   {/* Bottom goes here */}
		   <section
			 className="grid right-1 px-10 grid-cols-2 gap-3  w-full  absolute -top-40">
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
		   <label htmlFor="comment"
				  className="block text-sm font-medium leading-6 text-gray-900 mb-2">
			  Adjust Output
		   </label>
		   <div className="relative"><textarea rows={3} name="comment"
											   id="comment"
											   className="block w-full pl-12 rounded-md border-0 py-1.5 text-gray-900 bg-zinc-950/10 shadow-sm ring-1 ring-inset ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:text-sm sm:leading-6 outline-none focus:outline-none "
		   />
			  <DocumentPlusIcon width="24 " height="24"
								className="absolute stroke-zinc-950/50 left-2 top-0 bottom-0  my-auto border-r border-zinc-400 h-full"/>
			  <PaperAirplaneIcon width="24 " height="24"
								 className="absolute stroke-zinc-950/50 right-2 top-0 bottom-0  my-auto  border-zinc-400 h-full"/>
		   </div>
		
		</div>
	 </div>
   )
}
