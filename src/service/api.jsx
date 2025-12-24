import axios from "axios";

const Api = axios.create({
    baseURL: "https://dummyjson.com/products",
})

const request = async (promise) => {
    try {
        const { data } = await promise
        return data
    }
    catch (err) {
        console.error("Data fetch failed:", err);
        throw err;
    }
}

export const GetProducts = async () => request(Api.get("/"))

export const GetSingleProduct = async (id) => request(Api.get(`/${id}`))