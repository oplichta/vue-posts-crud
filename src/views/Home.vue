<template>
  <div>
    <div class="row">
      <div class="col s12 l6 offset-l3">
        <!-- Form -->
        <PostForm @postCreated="addPost" :editingPost="editingPost" />
      </div>
    </div>
    <div class="row">
      <div class="col s12 l4" v-for="(post, index) in posts" :item="post" :index="index" :key="post.id">
        <div class="card">
          <div class="card-content">
            <p class="card-title">{{ post.title }}</p>
            <p class="timestamp">{{ post.createdAt | formatDate }}</p>
            <p>{{ post.body }}</p>
          </div>
          <div class="card-action">
            <a href="#" @click="editPost(post)">Edit</a>
            <a href="#" class="delete-btn" @click="deletePost(post.id)">Delete</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '../PostService';
import PostForm from '../components/PostForm.vue';

const postService = new PostService();

export default {
  name: 'Home',
  components: {
    PostForm,
  },
  data() {
    return { posts: [], editingPost: null };
  },
  methods: {
    addPost(post) {
      console.log('addPost?', post);
      if (this.posts.find((p) => p.id === post.id)) {
        const index = this.posts.findIndex((p) => p.id === post.id);
        this.posts.splice(index, 1, post);
        console.log('editPost', post);
      } else {
        console.log('addPost', post);
        this.posts.unshift(post);
      }
    },
    editPost(post) {
      this.editingPost = post;
    },
    deletePost(id) {
      postService
        .deletePost(id)
        .then(() => {
          this.posts = this.posts.filter((p) => p.id !== id);
        })
        .catch((err) => err);
    },
  },
  created() {
    postService
      .getAllPosts()
      .then((res) => {
        for (const [key, value] of Object.entries(res.data)) {
          const post = {
            id: key,
            title: value.title,
            body: value.body,
            createdAt: new Date(),
            userId: 0,
          };

          this.posts.push(post);
        }
      })
      .catch((err) => err);
  },
  filters: {
    formatDate(date) {
      date = new Date(date);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;
    },
  },
};
</script>

<style scoped>
.card .card-content .card-title {
  margin-bottom: 0;
}

.card .card-content p.timestamp {
  color: #999;
  margin-bottom: 10px;
}

.delete-btn {
  color: red !important;
}
</style>
