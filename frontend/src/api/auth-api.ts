import { useAuth } from "@/context/auth-context";
import { fetchApi } from "@/api/base-api";

interface LoginResponse {
  token: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  password: string;
}

interface RegisterResponse {
  token: string;
}

const useAuthAPI = () => {
  const { setToken } = useAuth();

  const userLogin = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginRequest),
    };
  
    const { data } = await fetchApi<LoginResponse>('/Auth/login', options);
    setToken(data.token);
    return data;
  };

  const userRegister = async (registerRequest: RegisterRequest): Promise<RegisterResponse> => {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerRequest),
    };
  
    const { data } = await fetchApi<RegisterResponse>('/Auth/register', options);
    setToken(data.token);
    return data;
  };

  const userApi = {
    userLogin,
    userRegister
  }

  return userApi
}

export default useAuthAPI
