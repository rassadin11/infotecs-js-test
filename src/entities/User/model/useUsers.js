import { useEffect, useRef, useState } from "react";
import { getUsers } from '../api/getUsers';
import { getUsersByFilter } from '../api/getUsersByFilter';

export const useUsers = ({ sortField, sortOrder, filterField, filterValue, skip }) => {
    const [users, setUsers] = useState(null);
    const [totalUsers, setTotalUsers] = useState(208)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const lastSortState = useRef({
        sortBy: '',
        order: ''
    })

    const lastFilterState = useRef({
        filterField: '',
        filterValue: ''
    })

    useEffect(() => {
        const fetchUsers = async () => {
            const isFilterActive = filterField && filterValue;

            try {
                let data;

                if (isFilterActive) {
                    setLoading(true);
                    setError(null);
                    data = await getUsersByFilter(filterField, filterValue);
                    lastFilterState.current = {
                        filterField, filterValue
                    }
                } else {
                    const sortConfig = {
                        sortBy: sortField,
                        order: sortOrder
                    }

                    if (lastSortState.current.sortBy === sortField &&
                        lastSortState.current.order === sortOrder
                    ) {
                        if (lastFilterState.current.filterValue && !filterValue) {
                            setLoading(true);
                            setError(null);
                            data = await getUsers(sortConfig);
                            lastFilterState.current = {
                                filterField, filterValue
                            }
                        } else if (lastFilterState.current.filterField && lastFilterState.current.filterValue && !filterField && !filterValue) {
                            setLoading(true);
                            setError(null);
                            data = await getUsers(sortConfig);
                            lastFilterState.current = {
                                filterField, filterValue
                            }
                        }
                    } else {
                        setLoading(true);
                        setError(null);
                        data = await getUsers(sortConfig);
                    }

                    lastSortState.current = sortConfig
                }

                if (data) {
                    setUsers(data.users || data || []);
                    setTotalUsers(data.total)
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [sortField, sortOrder, filterField, filterValue]);

    // не запускает хук при первом рендере т.к. иначе будет выполняться 2 useEffect

    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const fetchUsersBySkip = async () => {
            setLoading(true);
            setError(null);

            try {
                const sortConfig = {
                    sortBy: sortField,
                    order: sortOrder,
                    skip
                }

                let data;
                data = await getUsers(sortConfig);

                if (data) {
                    setUsers(data.users || data || []);
                    setTotalUsers(data.total)
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchUsersBySkip()
    }, [skip])

    return { users, totalUsers, loading, error };
};