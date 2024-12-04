// src/api/userApi.ts
import axios from '../configs/axios';
import { User } from '../types/User';


export interface UserResponse {
  current_page: number,
  last_page: number,
  links: any,
  users: User[]
}

export interface CreateUserPayload {
  name: string,
  email: string,
  password: string,
}


const fetchUsers = async (queryString : string): Promise<UserResponse> => {
  try {
    console.log('_page', queryString)
    const response = await axios.get(`/users?${queryString}`);
    return response.data; // Trả về dữ liệu từ response
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Ném lỗi để React Query có thể xử lý
  }
};

const createUser = async ({ name, email, password }: CreateUserPayload): Promise<UserResponse> => {
  try {
    const response = await axios.post('/users', {
      name: name,
      email: email,
      password: password
    });
    return response.data; // Trả về dữ liệu từ response
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Ném lỗi để React Query có thể xử lý
  }
};

export const userApi = { fetchUsers, createUser };
