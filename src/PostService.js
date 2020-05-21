import axios from 'axios';

axios.defaults.baseURL = 'https://vue-posts-ff531.firebaseio.com';

export default class PostService {
  getAllPosts() {
    return axios.get('/posts.json');
  }

  getPostById(id) {
    return axios.get(`/post.json/${id}`);
  }

  writePost(post) {
    if (post.id) {
      return axios.put(`/posts/${post.id}.json`, post);
    } else return axios.post('/posts.json', post);
  }

  deletePost(id) {
    return axios.delete(`/posts/${id}.json`);
  }
}
