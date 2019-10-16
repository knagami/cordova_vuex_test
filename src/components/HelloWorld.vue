<template>
  <div class="hello">
    <h1>{{ message }}</h1>
    <el-upload
      class="upload-demo"
      action
      :on-change="handleAdd"
      :on-remove="handleRemove"
      :file-list="fileList"
      list-type="picture"
      :auto-upload="false"
    >
      <el-button size="mini" type="primary">Click to upload</el-button>
      <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
    </el-upload>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="User" name="first">User</el-tab-pane>
      <el-tab-pane label="Config" name="second">Config</el-tab-pane>
      <el-tab-pane label="Role" name="third">Role</el-tab-pane>
      <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import store from "@/store.js";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      activeName: "first"
    };
  },

  computed: {
    message() {
      return this.$store.getters.message;
    },
  },

  created() {
    console.log(store.state.count);
    store.commit("increment");
    console.log(store.state.count);
    this.$store.dispatch("doUpdate", "aaaa");
    this.$store.dispatch("getEntries", "aaaa");
    console.log(store.state.entries);
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
