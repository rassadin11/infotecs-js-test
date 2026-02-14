export const sortIndicator = (field, sortField, sortOrder) => {
    if (sortField !== field) return null;
    if (sortOrder === 'asc') return ' ↑';
    if (sortOrder === 'desc') return ' ↓';
    return null;
};