import axios from "axios";
// import { showToast } from "./myHelper";
// import { toast } from "react-toastify";

const handleAxiosError = (error:unknown) => {
    if(axios.isAxiosError(error)){
        console.log(`Error: ${error.response?.data.message}`);
        // showToast(error.response?.data.message, 'error')
    }else{
        console.log(`Đã xảy ra lỗi không được xác định. Hãy thử lại sau`)
        // showToast('Đã xảy ra lỗi không được xác định. Hãy thử lại sau', 'error')
    }

}

export { handleAxiosError }