// src/api/userApi.ts
import { ImageUploadResult } from '@/hooks/use-upload-images';
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
  images: FileList,
}

export interface EditUserPayload {
  name: string,
  email: string,
  password: string,
  images: FileList,
}


const fetchUsers = async (queryString: string): Promise<UserResponse> => {
  try {
    console.log('_page', queryString)
    const response = await axios.get(`/users?${queryString}`);
    return response.data; // Trả về dữ liệu từ response
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Ném lỗi để React Query có thể xử lý
  }
};

const createUser = async (payload: CreateUserPayload): Promise<UserResponse> => {
  try {
    const response = await axios.post('/users', payload);
    return response.data; // Trả về dữ liệu từ response
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Ném lỗi để React Query có thể xử lý
  }
};


const createUserForm = async (payload: CreateUserPayload, imagesFile: any) => {

  const formData = new FormData()
  const keys = Object.keys(payload) as Array<keyof CreateUserPayload>
  let hasFile = false

  keys.forEach((key) => {
    const value = payload[key]
    formData.append(key as string, String(value))
  })

  console.log('imagesFile', imagesFile)
  !!imagesFile ? hasFile = true : hasFile = false;
  imagesFile.forEach((item: ImageUploadResult) => {
    console.log('>value', item)
    formData.append(`images[]`, item.file)
  });


  const headers: HeadersInit = {}
  if (hasFile) {
    headers['Content-Type'] = 'multipart/form-data'
  }

  const response = await axios.post('/users', formData, {
    headers: headers
  })
  return response.data

};

const editUserForm = async (id: number, payload: EditUserPayload, imagesFile: any) => {

  const formData = new FormData()
  const keys = Object.keys(payload) as Array<keyof CreateUserPayload>
  let hasFile = false

  keys.forEach((key) => {
    const value = payload[key]
    formData.append(key as string, String(value))
  })

  console.log('imagesFile', imagesFile)
  !!imagesFile ? hasFile = true : hasFile = false;
  imagesFile.forEach((item: ImageUploadResult) => {
    console.log('>value', item)
    formData.append(`images[]`, item.file)
  });


  const headers: HeadersInit = {}
  if (hasFile) {
    headers['Content-Type'] = 'multipart/form-data'
  }

  const response = await axios.post(`/users/${id}`, formData, {
    headers: headers
  })
  return response.data

};

export const userApi = { fetchUsers, createUser, createUserForm,editUserForm };
