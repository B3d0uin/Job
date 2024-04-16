import React from 'react';
import {
	Pagination,
	PaginationList,
	PaginationNext,
	PaginationPage,
	PaginationPrevious,
	PaginationGap, // Assuming you have a component like this for gaps
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
	
	// Function to determine which pages to display
	const paginationItems = () => {
		const pages = [];
		let startPage = Math.max(1, currentPage - 4);
		let endPage = Math.min(totalPages, currentPage + 4);
		
		// If the current page is near the start
		if (currentPage < 5) {
			endPage = Math.min(9, totalPages);
		}
		
		// If the current page is near the end
		if (currentPage > totalPages - 4) {
			startPage = Math.max(totalPages - 8, 1);
		}
		
		// Push the start page, if it's not 1 then we need a gap
		if (startPage > 1) {
			pages.push(<PaginationPage key={1}
									   href={createPageURL(1)}>1</PaginationPage>);
			if (startPage !== 2) {
				pages.push(<PaginationGap key="start-gap"/>);
			}
		}
		
		// Push the visible pages
		for (let page = startPage; page <= endPage; page++) {
			pages.push(
				<PaginationPage
					key={page}
					href={createPageURL(page)}
					current={page === currentPage}
				>
					{page.toString()}
				</PaginationPage>
			);
		}
		
		// Push the end page, if it's not the last one then we need a gap
		if (endPage < totalPages) {
			if (endPage !== totalPages - 1) {
				pages.push(<PaginationGap
					key="end-gap"/>);
			}
			pages.push(<PaginationPage key={totalPages}
									   href={createPageURL(totalPages)}>{totalPages.toString()}</PaginationPage>);
		}
		
		return pages;
	};
	
	return (
		<Pagination aria-label="Page navigation" className="">
			{/* Previous Page Link */}
			<PaginationPrevious
				href={createPageURL(Math.max(1, currentPage - 1))}>Previous</PaginationPrevious>
			
			{/* Page Numbers */}
			<PaginationList>
				{paginationItems()}
			</PaginationList>
			
			{/* Next Page Link */}
			<PaginationNext
				href={createPageURL(Math.min(totalPages, currentPage + 1))}>Next</PaginationNext>
		</Pagination>
	);
}

export default DynamicPagination;
