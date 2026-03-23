import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchPosts = async (pageNum) => {
  try {

    const limit = 3;

    const start = (pageNum - 1) * limit;
    
    const res = await api.get(`/posts?_start=${start}&_limit=${limit}`);

    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const fetchInvPost = async (id) => {
  try {
    const res = await api.get(`/posts/${id}`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async(id) => {
   return api.delete(`/posts/${id}`);
}