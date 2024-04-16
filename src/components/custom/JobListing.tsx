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
	AcademicCapIcon, HandThumbUpIcon, ComputerDesktopIcon
} from "@heroicons/react/24/outline";
import {Button} from "@lib/components/button";

import {
	daysLeftUntilLastApplication,
	daysSincePublished,
	getAllJobs, getJobsByTitle,
	sanitizeDescription
} from "@lib/utils/JobUtils";
import {FireIcon} from "@heroicons/react/20/solid";


export default async function JobListing({query, currentPage}: {
	query: string;
	currentPage: number;
}) {
	const jobListings = await getJobsByTitle(query, currentPage);
	return (
		<section className="flex flex-col gap-4">
			
			{jobListings.jobs.map((post) => (
				
				<div key={post.id}
					 
					 className="rounded-lg border   border-zinc-300 bg-powder/90 text-card-foreground shadow-sm relative">
					
					<div className="p-6 space-y-4">
						<div className="flex items-center ">
							<div className="flex-1 ">
								<h3 className="text-lg font-bold text-charcoal">{post.title}</h3>
								<p className="text-sm font-medium leading-none text-gray-500 dark:text-charcoal/40">{post.companyName}</p>
								<ul className="2xl:flex items-center md:space-x-2 mt-4  "
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
								{daysSincePublished(post.publishedDate) <= 5 && (
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
							>
								<SparklesIcon/>
								AI-Tailor
							</Button>
						</div>
					</div>
				</div>
			))}
		</section>
	);
};