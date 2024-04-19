// JobUtils.ts

import moment from "moment";
import {prisma} from "@lib/utils/prisma"
import { performance } from 'perf_hooks';

export const getJobsByTitle = async (query: string, page: number, pageSize: number = 10) => {
	// starting time
	const start = performance.now();
	
	const pageNumber = Math.max(page, 1);
	const skip = (pageNumber - 1) * pageSize;
	
	const [jobs, totalCount] = await Promise.all([
		prisma.job.findMany({
			skip: skip,
			take: pageSize,
			where: {
				title: {
					contains: query,
					mode: 'insensitive',
				},
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
};

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