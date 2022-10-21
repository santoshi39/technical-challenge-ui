import axios from "axios";
// const ip = "http://18.215.234.125";
const uurl = "http://127.0.0.1:5020/api/";


export default class API {
    // auth api
    static async login(data) {
        const res = await axios.post(`${uurl}login`, data)
        // axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`
        return res.data;
    }
    static async register(data) {
        const res = await axios.post(`${uurl}register_user`, data)
        return res.data;
    }
    
    static async logout(data) {
        const res = await axios.post(`${uurl}logout`, data)
        return res.data;
    }

  
    // data api
    static async upload(data) {
        const res = await axios.post(`${uurl}upload`, data)
        return res.data;
    }

    static async viewData(data) {
        const res = await axios.post(`${uurl}get_data`, data)
        return res.data;
    }
    
}
