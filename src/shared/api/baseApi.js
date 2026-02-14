const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const baseApi = async (url, options = {}) => {
    const response = await fetch(`${BASE_URL}${url}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        throw new Error(
            errorData?.message || `Request failed with status ${response.status}`
        );
    }

    return response.json();
};
