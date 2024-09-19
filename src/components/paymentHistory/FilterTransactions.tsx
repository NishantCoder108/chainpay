import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, FilterIcon, SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { format } from "date-fns";
import { IFilters, IUserTransaction } from "@/types/user";

interface IProps {
    transactions?: IUserTransaction[];
    filters: IFilters;
    setFilters: (data: IFilters) => void;
}

const FilterTransactions = ({ setFilters, filters }: IProps) => {
    console.log("trans", { filters });
    return (
        <div>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
                <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                        <SearchIcon
                            size={14}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <Input
                            placeholder="Search by name, email,  wallet address or signature"
                            value={filters.search}
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    search: e.target.value,
                                })
                            }
                            className="pl-8 w-full text-sm"
                        />
                    </div>
                </div>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full sm:w-auto justify-start text-left font-normal"
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            <span className="hidden sm:inline">
                                {filters.startDate && filters.endDate ? (
                                    <>
                                        {format(filters.startDate, "PP")} -{" "}
                                        {format(filters.endDate, "PP")}
                                    </>
                                ) : (
                                    <span>Date range</span>
                                )}
                            </span>
                            <span className="sm:hidden">Date</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="range"
                            selected={{
                                from: filters.startDate as Date,
                                to: filters.endDate as Date,
                            }}
                            onSelect={(range) =>
                                setFilters({
                                    ...filters,
                                    startDate: range?.from || null,
                                    endDate: range?.to || null,
                                })
                            }
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
                <Button
                    variant="outline"
                    onClick={() =>
                        setFilters({
                            search: "",

                            startDate: null,
                            endDate: null,
                        })
                    }
                    className="w-full sm:w-auto"
                >
                    <FilterIcon className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Clear Filters</span>
                    <span className="sm:hidden">Clear</span>
                </Button>
            </div>
        </div>
    );
};

export default FilterTransactions;
