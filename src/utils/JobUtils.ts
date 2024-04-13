// JobUtils.ts

import moment from "moment";
import {prisma} from "@lib/utils/prisma";


export const getAllJobs = async () => {
	return prisma.job.findMany();
}

export function sanitizeString(input: string): string {
	const REGEX_HTML_TAG: RegExp = /(<([^>]+)>)/gi;
	return input.replace(REGEX_HTML_TAG, "");
}

export const daysSincePublished = (date: Date) => {
	return moment().diff(moment(date), 'days');
};

export const daysLeftUntilLastApplication = (date: Date) => {
	return moment(date).diff(moment(), 'days');
};