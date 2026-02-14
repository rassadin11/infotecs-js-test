import s from './UsersFilter.module.css';
import { usersDefaultValues } from '@/entities/User';

export const UsersFilter = ({
    field,
    value,
    setField,
    setValue,
    setSkip
}) => {
    const filterableColumns = usersDefaultValues.filter(
        (column) => column.filterable
    );

    const handleFieldChange = (e) => {
        const newField = e.target.value || null;
        setField(newField);

        if (value === '') return;
        setValue('');
    };

    const handleValueChange = (e) => {
        setSkip(0)
        setValue(e.target.value);
    };

    const handleReset = () => {
        setField(null);
        setValue('');
    };

    return (
        <div className={s.usersFilter}>
            <select
                value={field || ''}
                onChange={handleFieldChange}
                className={s.usersFilterSelect}
            >
                <option value="">Выберите поле</option>

                {filterableColumns.map((column) => (
                    <option key={column.key} value={column.key}>
                        {column.title}
                    </option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Введите значение"
                value={value}
                onChange={handleValueChange}
                disabled={!field}
                className={s.usersFilterInput}
            />

            <button
                onClick={handleReset}
                disabled={field && value ? false : true}
                className={s.usersFilterReset}
            >
                Сбросить
            </button>
        </div>
    );
};
