export type User = {
    id: number,
    name: string,
    email: string,
    image: string | null,
    phone: string | null,
    address: string | null,
    created_at: string | null,
    user_catalogue_id: string,
    province_id: string | null,
    district_id: string | null,
    ward_id: string | null
}
  

  
export type PayloadInput = {
  name: string,
  email: string,
  phone: string,
  password?: string | undefined,
  confirmPassword?: string | undefined,
  user_catalogue_id: string,
  // image?:  FileList | string | undefined,
  image?:  any,
  province_id: string,
  district_id: string,
  ward_id: string,
  address?: string
};

