import { Table } from '@/shared/ui/Table/Table'
import { UserRow, useUsers, usersDefaultValues } from '@/entities/User';
import { UsersFilter } from '@/features/users-filter';

import { useUsersTableController } from '../model/useUsersTableController'
import { sortIndicator } from '../model/sortIndicator';
import { SkeletonRows } from './SkeletonRows';
import { useState } from 'react';
import { UserModal } from '@/entities/User';
import { useResizableColumns } from '@/shared/lib/hooks/useResizableColumns';

import styles from './UsersTable.module.css'
import { Loading } from '@/shared/ui/Loading/Loading';
import { PaginationButtons } from '@/features/pagination';

export const UsersTable = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [skip, setSkip] = useState(0)

    const {
        sorting,
        filter,
        runSorting,
        handleFilterChange,
    } = useUsersTableController();

    const { users, totalUsers, loading, error } = useUsers({
        sortField: sorting.sortField,
        sortOrder: sorting.sortOrder,
        filterField: filter.field,
        filterValue: filter.filterValue,
        skip
    });

    const { widths, startResizing } = useResizableColumns(usersDefaultValues);

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <UsersFilter
                field={filter.field}
                value={filter.value}
                setField={filter.setField}
                setValue={handleFilterChange}
                setSkip={setSkip}
            />

            {users === null ? <Loading /> : users.length ? <Table className={styles.table}>
                <thead>
                    <tr>
                        {usersDefaultValues.map((column) => (
                            <th
                                key={column.key}
                                onClick={() => {
                                    setSkip(0)
                                    runSorting(column)
                                }}
                                style={{
                                    cursor: column.sortable ? 'pointer' : 'default',
                                    width: widths[column.key],
                                }}
                            >
                                <div className={styles.thContent}>
                                    {column.title}
                                    {sortIndicator(column.key, sorting.sortField, sorting.sortOrder)}
                                </div>

                                <div
                                    className={styles.resizer}
                                    onMouseDown={(e) => startResizing(column.key, e)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {loading
                        ? <SkeletonRows rows={30} />
                        : users.map(user => (
                            <UserRow key={user.id} user={user}
                                onClick={() => setSelectedUser(user)} />
                        ))
                    }
                </tbody>
            </Table> : <p className={styles.loadingInfo}>Продолжайте вводить данные...</p>}

            {selectedUser && (
                <UserModal
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                />
            )}

            {totalUsers > 30 ?
                <PaginationButtons skip={skip} setSkip={setSkip} total={totalUsers} />
                : ''}
        </>
    );
};