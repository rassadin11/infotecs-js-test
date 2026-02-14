import { baseApi } from '@/shared/api/baseApi';

export const getUsersByFilter = async (key, value) => {
    if (!key || !value) {
        throw new Error('Filter key and value are required');
    }

    const params = new URLSearchParams({
        key,
        value,
    });

    const response = await baseApi(`/users/filter?${params.toString()}`);

    return response;
};
