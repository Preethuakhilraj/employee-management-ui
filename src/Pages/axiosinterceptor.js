import axios from "axios";
const axiosInstance=axios.create({
baseURL:'https://employee-management-api-09yh.onrender.com'
})
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Adjust token retrieval logic as necessary
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

return config;}
,(error)=>{
    return Promise.reject(error)
}
)
export default axiosInstance