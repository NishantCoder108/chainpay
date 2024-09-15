import React from "react";
import { Skeleton } from "../ui/skeleton";
import { TableCell } from "../ui/table";

const TableLoader = () => {
    return (
        <TableCell colSpan={5} className=" ">
            <Skeleton className="h-5 w-full my-2 rounded" />
            <Skeleton className="h-5 w-full my-2 rounded" />
            <Skeleton className="h-5 w-full my-2 rounded" />
            <Skeleton className="h-5 w-full my-2rounded" />
            <Skeleton className="h-5 w-full my-2 rounded" />
        </TableCell>
    );
};

export default TableLoader;
