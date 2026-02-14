import { useState, useCallback } from 'react';

export const useResizableColumns = (columns, defaultWidth = 75, minWidth = 50) => {
    const [widths, setWidths] = useState(() => {
        const initialWidths = {};

        columns.forEach(col => {
            initialWidths[col.key] = col.width || defaultWidth;
        });

        return initialWidths;
    });

    const startResizing = useCallback((key, e) => {
        e.preventDefault();
        e.stopPropagation();

        const startX = e.clientX;
        const startWidth = widths[key] || defaultWidth;

        const onMouseMove = (moveEvent) => {
            const newWidth = startWidth + (moveEvent.clientX - startX);

            if (newWidth >= minWidth) {
                setWidths(prev => ({
                    ...prev,
                    [key]: newWidth
                }));
            }
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }, [widths, minWidth, defaultWidth]);

    return { widths, startResizing };
};