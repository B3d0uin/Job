
import {prisma} from "@lib/utils/prisma";
import {cache} from 'react';


const fetchStatistics = cache(async () => {
   const today = new Date();
   today.setHours(0, 0, 0, 0);
   
   const operations = await prisma.$transaction([
	  prisma.job.count(),
	  prisma.job.findMany({select: {positions: true}}),
	  prisma.job.count({where: {requiresExperience: false}}),
	  prisma.job.count({where: {publishedDate: {gte: today}}}),
   ]);
   
   const totalJobs = operations[0];
   const availablePositions = operations[1].reduce((acc, job) => acc + job.positions, 0);
   const jobsWithoutExperience = operations[2];
   const newJobsPostedToday = operations[3];
   
   const formatNumberWithCommas = (number: number) => {
	  return number.toLocaleString();
   };
   
   return [
	  {
		 id: 1,
		 name: 'Total Jobs',
		 value: `${formatNumberWithCommas(totalJobs)}+`,
	  },
	  {
		 id: 2,
		 name: 'Available Positions',
		 value: `${formatNumberWithCommas(availablePositions)}+`,
	  },
	  {
		 id: 3,
		 name: 'Jobs Without Experience',
		 value: `${formatNumberWithCommas(jobsWithoutExperience)}+`,
	  },
	  {
		 id: 4,
		 name: 'New Jobs Posted Today',
		 value: `${formatNumberWithCommas(newJobsPostedToday)}+`,
	  },
   ];
});

export default fetchStatistics;
