import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    const [inputPage, setInputPage] = useState<number>(currentPage);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1); // Create an array of total pages

    return (
        <div className="flex justify-between items-center py-4 text-black">
            {/* Previous Button */}
            <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 flex items-center gap-2"
            >
                <ChevronLeft size={16} />
                Previous
            </Button>

            {/* Page selection with dropdown */}
            <div className="flex items-center gap-2">
                <span>Page</span>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="flex items-center gap-2 px-4 py-2"
                        >
                            {currentPage}
                            <ChevronDown size={16} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-28 max-h-40 overflow-auto">
                        {pages.map((page) => (
                            <DropdownMenuItem
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={
                                    page === currentPage
                                        ? "bg-gray-100 font-semibold"
                                        : ""
                                }
                            >
                                {page}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <span>of {totalPages}</span>
            </div>

            {/* Next Button */}
            <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 flex items-center gap-2"
            >
                Next
                <ChevronRight size={16} />
            </Button>
        </div>
    );
}
