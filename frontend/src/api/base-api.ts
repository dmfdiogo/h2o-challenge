const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5024/api';

interface ApiResponse<T> {
  data: T;
}

export const fetchApi = async <T>(endpoint: string, options: RequestInit): Promise<ApiResponse<T>> => {
  const response = await fetch(`${BASE_API_URL}${endpoint}`, options);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return { data };
};