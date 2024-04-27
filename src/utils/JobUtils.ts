// JobUtils.ts
import moment from "moment";
import {prisma} from "@lib/utils/prisma"
import { performance } from 'perf_hooks';
import {cache} from 'react';

export const revalidate = 3600
export const getJobsByTitle = cache(async (query: string, page: number, pageSize: number = 10) => {
	// starting time
	const start = performance.now();
	
	const pageNumber = Math.max(page, 1);
	const skip = (pageNumber - 1) * pageSize;
	
	const [jobs, totalCount] = await Promise.all([
		prisma.job.findMany({
			skip: skip,
			take: pageSize,
		   orderBy: {
			  publishedDate: 'desc',
		   },
			where: {
				title: {
					contains: query,
					mode: 'insensitive',
				},
			},
		   select: {
			  id: true,
			  title: true,
			  description: true,
			  publishedDate: true,
			  occupation: true,
			  companyName: true,
			  employmentType: true,
			  duration: true,
			  lastApplicationDate: true,
			  positions: true,
			  requiresExperience: true,
			  municipality: true,
			  
		   },
		}),
		prisma.job.count({
			where: {
				title: {
					contains: query,
					mode: 'insensitive',
				},
			},
		})
	]);
	
	// end time
	const end = performance.now();
	// time difference
	const diff = end - start;
	
	console.log('Execution time: ' + diff + 'ms');
	return { jobs, totalCount };
});

export function sanitizeDescription(input: string): string {
	const REGEX_HTML_TAG: RegExp = /(<([^>]+)>)/gi;
	return input.replace(REGEX_HTML_TAG, "");
}

export const daysSincePublished = (date: Date) => {
	return moment().diff(moment(date), 'days');
};

export const daysLeftUntilLastApplication = (date: Date) => {
	return moment(date).diff(moment(), 'days');
};