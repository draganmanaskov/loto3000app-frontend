import axios from 'axios'

const API_URL = 'http://localhost:7107/api/User'

//Register user
const register = async (userData) => {
    let response = await axios({
        method: 'post', 
        url: API_URL + '/register',
        data: {...userData}
      });
    

    if(response.data) {
        localStorage.setItem('loto3000-user', JSON.stringify(response.data))
    }

    return response.data
}

// Login user
const login = async (userData) => {
    let response = await axios({
        method: 'post',
        url: API_URL + '/login',
        data: {...userData}
      });
  
    if (response.data) {
      localStorage.setItem('loto3000-user', JSON.stringify(response.data))
    }
  
    return response.data
}
  

const authService = {
  register,
  login,
}
  
export default authService