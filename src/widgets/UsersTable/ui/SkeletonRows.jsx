import s from './Skeleton.module.css';
import { usersDefaultValues } from '@/entities/User';

export const SkeletonRows = ({ rows }) => {
    return Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex}>
            {usersDefaultValues.map((column) => (
                <td key={column.key}>
                    <div className={s.skeleton} />
                </td>
            ))}
        </tr>
    ));
};
