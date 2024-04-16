// Assuming you have Prisma Client installed and set up
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

// Function to fetch total number of jobs
async function getTotalJobs() {
	return prisma.job.count();
}

// Function to fetch total number of available positions
// Assuming 'positions' field represents the number of positions for each job
async function getAvailablePositions() {
	const jobs = await prisma.job.findMany({
		select: {
			positions: true,
		},
	});
	return jobs.reduce((acc, job) => acc + job.positions, 0);
}

// Function to fetch jobs that do not require experience
async function getJobsWithoutExperience() {
	return prisma.job.count({
		where: {
			requiresExperience: false,
		},
	});
}

// Function to fetch the number of new jobs posted today
async function getNewJobsPostedToday() {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	
	return prisma.job.count({
		where: {
			publishedDate: {
				gte: today,
			},
		},
	});
}

async function fetchStatistics() {
	const totalJobs = await getTotalJobs();
	const availablePositions = await getAvailablePositions();
	const jobsWithoutExperience = await getJobsWithoutExperience();
	const newJobsPostedToday = await getNewJobsPostedToday();
	
	const formatNumberWithCommas = (number: number) => {
		return number.toLocaleString();
	};
	
	return [
		{
			id: 1,
			name: 'Total Jobs',
			value: `${formatNumberWithCommas(totalJobs)}+`
		},
		{
			id: 2,
			name: 'Available Positions',
			value: `${formatNumberWithCommas(availablePositions)}+`
		},
		{
			id: 3,
			name: 'Jobs Without Experience',
			value: `${formatNumberWithCommas(jobsWithoutExperience)}+`
		},
		{
			id: 4,
			name: 'New Jobs Posted Today',
			value: `${formatNumberWithCommas(newJobsPostedToday)}+`
		},
	];
}

export default fetchStatistics;
