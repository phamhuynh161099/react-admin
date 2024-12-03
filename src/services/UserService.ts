// src/api/userApi.ts
import axios from '../configs/axios';
import { User } from '../types/User';

const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get('/users');
    return response.data; // Trả về dữ liệu từ response
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Ném lỗi để React Query có thể xử lý
  }
};

export const userApi = { fetchUsers };
