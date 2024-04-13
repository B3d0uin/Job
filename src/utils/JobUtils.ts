// JobUtils.ts

import moment from "moment";
import {prisma} from "@lib/utils/prisma";


export const getAllJobs = async () => {
	return prisma.job.findMany();
}

export const getJobsByTitle = async (query: string, page: number, pageSize: number = 10) => {
	const pageNumber = Math.max(page, 1);
	const skip = (pageNumber - 1) * pageSize;
	const jobs = await prisma.job.findMany({
		skip,
		take: pageSize,
		where: {
			title: {
				contains: query,
				mode: 'insensitive',
			},
		},
	});
	const totalCount = await prisma.job.count({
		where: {
			title: {
				contains: query,
				mode: 'insensitive',
			},
		},
	});
	return {jobs, totalCount};
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