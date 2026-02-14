import { baseApi } from '@/shared/api/baseApi';

export const getUsers = ({ sortBy, order, skip, limit = 30 } = {}) => {
    const params = new URLSearchParams();

    params.append('limit', limit);
    params.append(
        'select',
        'firstName,lastName,maidenName,age,gender,phone,email,image,address,weight,height'
    );
    params.append(
        'skip',
        skip || 0
    )

    if (sortBy && order) {
        params.append('sortBy', sortBy);
        params.append('order', order);
    }

    return baseApi(`/users?${params.toString()}`);
};
