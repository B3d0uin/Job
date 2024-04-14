import {Badge} from "@lib/components/badge";
import {
	CalendarIcon,
	ClockIcon,
	MapPinIcon,
	SparklesIcon,
	StarIcon,
} from "@heroicons/react/24/outline";
import {Button} from "@lib/components/button";

import {
	daysLeftUntilLastApplication,
	daysSincePublished,
	getAllJobs, getJobsByTitle,
	sanitizeDescription
} from "@lib/utils/JobUtils";


export default async function JobListing({query, currentPage}: {
	query: string;
	currentPage: number;
}) {
	const jobListings = await getJobsByTitle(query, currentPage);
	return (
		// background slate 400
		<section className="flex flex-col gap-4">
			
			{jobListings.jobs.map((post) => (
				
				<div key={post.id}
					 
					 className="rounded-lg border  border-zinc-300 bg-powder/90 text-card-foreground shadow-sm">
					
					<div className="p-6 space-y-4">
						<div className="flex items-center space-x-4">
							<div className="flex items-center space-x-2">
								<Badge color="cyan"
									   className="!text-charcoal border-charcoal/40 border">{post.duration}</Badge>
								<Badge color="yellow"
									   className="!text-charcoal border-charcoal/40 border">{post.occupation}</Badge>
							</div>
							<div className="flex-1 text-right">
								<Badge color="pink"
									   className="!text-charcoal border-charcoal/40 border">Experience: {post.requiresExperience ? "true" : "false"}</Badge>
							</div>
						</div>
						<div className="flex items-center space-x-4">
							<div className="flex-1">
								<h3 className="text-lg font-bold text-charcoal">{post.title}</h3>
								<p className="text-sm font-medium leading-none text-gray-500 dark:text-charcoal/40">{post.companyName}</p>
							</div>
							<button
								className="flex items-center space-x-2 group">
								{/*text-gray-500 */}
								<StarIcon
									className="w-5 h-5 group-hover:text-charcoal fill-charcoal"/>
								<span className="sr-only">Bookmark</span>
							</button>
						</div>
						<div className="grid gap-2">
							<p className="text-sm leading-none   line-clamp-4  ">
								{sanitizeDescription(post.description)}
							</p>
						</div>
						<div className="flex items-center gap-4">
							<div
								className="flex items-center space-x-2">
								<MapPinIcon width="24"
											height="24"
											className="w-4 h-4 text-charcoal/70"/>
								
								<span
									className="text-sm text-gray-500 dark:text-charcoal/70">{post.municipality}</span>
							</div>
							<div
								className="flex items-center space-x-2">
								<CalendarIcon width="24"
											  height="24"
											  className="w-4 h-4 text-charcoal/70"/>
								
								<span
									className="text-sm text-gray-500 dark:text-charcoal/70">Posted {daysSincePublished(post.publishedDate)} days ago</span>
							</div>
							<div
								className="flex items-center space-x-2">
								<ClockIcon width="24"
										   height="24"
										   className="w-4 h-4 text-charcoal/70"/>
								
								<span
									className="text-sm text-gray-500 dark:text-charcoal/70">{daysLeftUntilLastApplication(post.lastApplicationDate)} days left</span>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<Button
								type={"button"}
								color={"zinc"}
								className="cursor-pointer border-t !border-zinc-200 !border-x-0 !border-b-0 transform transition duration-150 ease-in-out active:scale-95 active:border-2 shadow-md shadow-zinc-500  active:py-1"
							>
								Read More
							</Button>
							<Button
								type={"button"}
								color={"dark"}
								className="cursor-pointer border-t !border-zinc-200 !border-x-0 !border-b-0 transform transition duration-150 ease-in-out active:scale-95 active:border-2 shadow-md shadow-zinc-500  active:py-1"
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