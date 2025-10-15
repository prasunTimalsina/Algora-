import axios from 'axios'

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === 'development'
      ? 'http://localhost:8080/api/v1'
      : 'https://leetlab.onrender.com/api/v1',

  withCredentials: true, // Include cookies with requests
})

export default axiosInstance
