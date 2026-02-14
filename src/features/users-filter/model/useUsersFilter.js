import { useState, useEffect, useRef } from 'react';

const DEBOUNCE_MS = 300;

export const useUsersFilter = () => {
    const [field, setField] = useState(null);
    const [value, setValue] = useState('');
    const [filterValue, setFilterValue] = useState('');

    const debounceRef = useRef(null);

    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            setFilterValue(value);
            debounceRef.current = null;
        }, DEBOUNCE_MS);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [value]);

    const handleSetValue = (newValue) => {
        setValue(newValue);
    };

    const handleSetField = (newField) => {
        setField(newField);
        setValue('');
        setFilterValue('');
    };

    const setFilter = (newField, newValue) => {
        setField(newField);
        setValue(newValue);
        setFilterValue(newValue);
    };

    const resetFilter = () => {
        setField(null);
        setValue('');
        setFilterValue('');
    };

    const isActive = Boolean(field && filterValue);
    const isPending = value !== filterValue;

    return {
        field,
        value,
        filterValue,
        setField: handleSetField,
        setValue: handleSetValue,
        setFilter,
        resetFilter,
        isActive,
        isPending,
    };
};
