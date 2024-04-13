const Skeleton = () => (
	<div
		className="rounded-lg border h-72 border-zinc-700 animate-pulse bg-gray-700/20  text-card-foreground shadow-sm">
		<div className="p-6 space-y-4">
			<div className="flex items-center space-x-4">
				<div className="flex-1">
					<h3 className="text-lg font-bold text-charcoal bg-gray-500/50 h-4 w-2/3"></h3>
					<p className="text-sm font-medium leading-none text-gray-500 dark:text-charcoal/40 w-1/3 bg-gray-500/50 h-4 mt-2"></p>
				</div>
			</div>
			<div className="space-y-2">
				<div
					className="h-2 bg-gray-500/50 rounded w-3/4"></div>
				<div
					className="h-2 bg-gray-500/50 rounded w-3/4"></div>
				<div
					className="h-2 bg-gray-500/50 rounded w-3/4"></div>
				<div
					className="h-2 bg-gray-500/50 rounded w-3/4"></div>
			</div>
			<div
				className="flex items-center gap-4 h-3 w-3/4 bg-gray-500/50">
			</div>
			<div className="flex items-center gap-3">
				<div
					
					className=" bg-gray-500/50 h-4 p-4 px-12 rounded-lg border-t !border-zinc-200 !border-x-0 !border-b-0  shadow-md shadow-zinc-500 "
				>
				
				</div>
				<div
					
					className=" bg-gray-500/50 h-4 p-4 px-12 rounded-lg border-t !border-zinc-200 !border-x-0 !border-b-0  shadow-md shadow-zinc-500 "
				>
				
				</div>
			
			</div>
		</div>
	</div>
)
export default Skeleton;