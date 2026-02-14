
import { useUsersSorting } from '@/features/users-sorting';
import { useUsersFilter } from '@/features/users-filter';

export const useUsersTableController = () => {
    const sorting = useUsersSorting();
    const filter = useUsersFilter();

    const runSorting = (column) => {
        if (!column.sortable) return;

        sorting.handleSort(column.key);
        filter.resetFilter();
    };

    const handleFilterChange = (value) => {
        filter.setValue(value);
        sorting.resetSorting();
    };

    return {
        sorting,
        filter,
        runSorting,
        handleFilterChange,
    };
};
