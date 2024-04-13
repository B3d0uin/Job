import React from 'react';
import {
	Pagination,
	PaginationList,
	PaginationNext,
	PaginationPage,
	PaginationPrevious,
} from '@lib/components/pagination';

function DynamicPagination({currentPage, totalPages, query}: {
	query: string;
	currentPage: number;
	totalPages: number
}) {
	const createPageURL = (page: number) => {
		let url = `?page=${page}`;
		if (query) {
			url += `&query=${encodeURIComponent(query)}`;
		}
		return url;
	};
	
	return (
		<Pagination aria-label="Page navigation">
			{/* Previous Page Link */}
			
			<PaginationPrevious
				href={createPageURL(currentPage - 1)}>Previous</PaginationPrevious>
			
			{/* Page Numbers */}
			<PaginationList>
				{Array.from({length: totalPages}, (_, index) => {
					const page = index + 1;
					return (
						<PaginationPage
							key={page}
							children={page.toString()}
							href={createPageURL(page)}
							current={page === currentPage}
						/>
					
					
					);
				})}
			</PaginationList>
			
			{/* Next Page Link */}
			
			<PaginationNext
				
				href={createPageURL(currentPage + 1)}>Next</PaginationNext>
		
		</Pagination>
	);
}

export default DynamicPagination;
