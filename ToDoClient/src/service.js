import axios from 'axios';



const instance = new axios.create({
    baseURL: process.env.REACT_APP_API_URL
    // baseURL: 'http://localhost:5271'
})

axios.interceptors.request.use(
    function (request) {
        if (request.status === 401) {
            console.log("You are not authorized!");
        }
        else if (request.status === 404) {
            console.log("Not found!");
        }
        return request;
    },
    function (error) {
        return Promise.reject(error);
    });

axios.interceptors.response.use(
    function (response) {
        if (response.status === 401) {
            console.log("You are not authorized!");
        }
        else if (response.status === 404) {
            console.log("Not found!");
        }
        return response;
    },
    function (error) {
        return Promise.reject(error);
    });

export default {

    getTasks: async () => {
        console.log(process.env.REACT_APP_API_URL);
        
        const result = await instance.get()
        console.log(result);

        return result.data;
    },

    addTask: async (name) => {
        const task = { name: name, isComplete: false }
        const result = await instance.post(`/addItem`, task)
        return result.data;
    },

    setCompleted: async (id, isComplete) => {
        const task = { id: id, isComplete: isComplete }
        const result = await instance.put(`/updateCompleted`, task)
        return result.data;
    },

    deleteTask: async (id) => {
        const result = await instance.delete(`/removeItem?id=${id}`)
        return result.data;
    }

    // getLoginUser: () => {
    //     const accessToken = localStorage.getItem("access_token");
    //     if (accessToken) {
    //         return jwt_decode(accessToken);
    //     }
    //     return null;
    // },

    // logout: () => {
    //     localStorage.setItem("access_token", "");
    // },

    // register: async (email, password) => {
    //     const res = await axios.post("/register", { email, password });
    //     saveAccessToken(res.data);
    // },

    // login: async (email, password) => {
    //     const res = await axios.post("/login", { email, password });
    //     saveAccessToken(res.data);
    // },

    // getPublic: async () => {
    //     const res = await axios.get("/public");
    //     return res.data;
    // },

    // getPrivate: async () => {
    //     const res = await axios.get("/private");
    //     return res.data;
    // },

};
