<template>
  <form v-if="!loading" class="form" @submit.prevent="onSubmit">
    <div class="input-field">
      <label for="title">Title</label>
      <input type="text" name="title" v-model="title" :class="[errors.title ? 'invalid' : 'validate']" />
      <span class="helper-text" data-error="Title must not by empty"></span>
    </div>
    <div class="input-field">
      <label for="body">Body</label>
      <input type="text" name="body" v-model="body" :class="[errors.title ? 'invalid' : 'validate']" />
      <span class="helper-text" data-error="Body must not by empty"></span>
    </div>
    <button type="submit" class="waves-effect waves-light btn">{{ id ? 'Update' : 'Add' }}</button>
  </form>

  <div class="progress" v-else-if="loading">
    <div class="indeterminate"></div>
  </div>
</template>

<script>
import PostService from '../PostService';
const postService = new PostService();

export default {
  name: 'PostForm',
  data() {
    return {
      loading: false,
      title: '',
      body: '',
      errors: {},
    };
  },
  methods: {
    onSubmit() {
      this.loading = true;
      if (!this.validForm()) {
        this.loading = false;
        return;
      }
      const post = {
        title: this.title,
        body: this.body,
      };

      postService
        .writePost(post)
        .then((res) => {
          this.loading = false;
          const newPost = {
            id: res.data.name.toString(),
            title: this.title,
            body: this.body,
            createdAt: new Date(),
            userId: 0,
          };
          this.body = '';
          this.title = '';
          this.$emit('postCreated', newPost);
        })
        .catch((err) => err);
    },
    validForm() {
      this.errors = {};
      if (this.title.trim() === '') {
        this.errors.title = 'title';
      }
      if (this.body.trim() === '') {
        this.errors.body = 'body';
      }
      if (Object.keys(this.errors).length > 0) {
        return false;
      } else {
        return true;
      }
    },
    watch: {
      editingPost(post) {
        this.title = post.title;
        this.body = post.body;
        this.id = post.id;
      },
    },
  },
};
</script>

<style>
.form {
  margin: 50px;
}
.progress {
  margin: 100px 0;
}
</style>
