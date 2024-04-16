import fetchStatistics from "@lib/utils/statsUtils";


export default async function Stats() {
	const stats = await fetchStatistics();
	return (
		<div>
			<div className=" pt-10 lg:pl-72">
				<div className="mx-auto  px-6 lg:px-8">
					<div className="mx-auto max-w-2xl lg:max-w-none">
						<div className="">
							<h2 className="text-2xl  font-semibold tracking-tight text-black sm:text-2xl">Good
								Afternoon, Wasim Said</h2>
							<div
								className="mt-4 text-lg leading-8 font-mono text-zinc-500">
								
								<h2 className="text-lg font-bold tracking-tight  sm:text-lg text-zinc-500">Today's
									ResuMeAI Live Statistics</h2>
							</div>
						</div>
						<dl className="mt-6 lg:flex grid justify-between grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
							{stats.map((stat) => (
								<div key={stat.id}
									 className="flex flex-col py-4">
									<dt className="text-sm font-semibold leading-6 text-gray-600">{stat.name}</dt>
									<dd className="order-first text-3xl font-semibold tracking-tight ">{stat.value}</dd>
								</div>
							))}
						</dl>
					</div>
				</div>
			</div>
		</div>
	)
}