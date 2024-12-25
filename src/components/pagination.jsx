import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

    // Function to handle page changes
    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    // Generate a range of page numbers to display
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center items-center my-8">
            {/* Previous button */}
            <button
                onClick={() => handlePageClick(currentPage - 1)}
                className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
                disabled={currentPage === 1}
            >
                Previous
            </button>

            {/* Page numbers */}
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => handlePageClick(number)}
                    className={`px-4 py-2 mx-1 rounded-md ${currentPage === number ? 'bg-blue-950 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
                >
                    {number}
                </button>
            ))}

            {/* Next button */}
            <button
                onClick={() => handlePageClick(currentPage + 1)}
                className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
