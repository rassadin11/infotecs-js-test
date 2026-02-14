import { useState } from "react";
import { SORT_ORDER } from "./constants";

export const useUsersSorting = () => {
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState(SORT_ORDER.NONE);

    const handleSort = (field) => {
        if (field !== sortField) {
            setSortField(field);
            setSortOrder(SORT_ORDER.ASC);
            return;
        }

        if (sortOrder === SORT_ORDER.ASC) {
            setSortOrder(SORT_ORDER.DESC);
            return;
        }

        if (sortOrder === SORT_ORDER.DESC) {
            setSortField(null);
            setSortOrder(SORT_ORDER.NONE);
            return;
        }
    };

    const resetSorting = () => {
        setSortField(null);
        setSortOrder(SORT_ORDER.NONE);
    };

    return {
        sortField,
        sortOrder,
        handleSort,
        resetSorting,
    };
};
