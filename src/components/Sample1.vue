<template>
  <div class="hello">
    <h1>{{ message }}</h1>
    <el-upload
      ref="upload"
      class="upload-demo"
      action
      :on-change="handleAdd"
      :on-remove="handleRemove"
      :file-list="fileList"
      list-type="picture"
      :auto-upload="false"
    >
      <div v-if="!upload">
        <el-button size="mini" type="primary">ADD Image</el-button>
      </div>
    </el-upload>
    <div v-if="upload">
      <br />
      <el-button size="mini" @click="handleClickCancel">CLOSE</el-button>&nbsp;
      <el-button size="mini" type="primary" @click="handleClickUpload">UPLOAD</el-button>
    </div>
    <el-table
      v-if="!upload"
      :data="entries"
      :default-sort="{prop: 'created_at', order: 'descending'}"
      style="width: 100%"
    >
      <el-table-column prop="created_at" sortable label="date">
        <div slot-scope="{row}">
          <small>{{ row.created_at.replace( 'T', ' ' ).replace( 'Z', '' ) }}</small>
        </div>
      </el-table-column>
      <el-table-column label="Image">
        <div slot-scope="{row}">
          <img width="200px" :src="'http://localhost:8000/' + row.filepath" />
          <br />

          <img
            width="200px"
            :src="'http://localhost:8000/' + row.filepath.replace( 'media/', 'media/ss_' )"
          />
        </div>
      </el-table-column>
    </el-table>
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
      upload: false,
      activeName: "first",
      fileList: []
    };
  },
  computed: {
    entries() {
      return this.$store.getters.entries;
    },
    message() {
      return this.$store.getters.message;
    }
  },
  created() {
    console.log(store.state.count);
    store.commit("increment");
    console.log(store.state.count);
    this.$store.dispatch("doUpdate", "OpenCV Test");
    this.$store.dispatch("getEntries");
    console.log(store.state.entries);
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // リストのバッテンを押下した時
    handleRemove: function(file, fileList) {
      console.log("ggg2", fileList);
      this.fileList = fileList;
    },
    // ファイルを追加した時
    handleAdd: function(file, fileList) {
      this.upload = true;
      this.fileList = fileList;
    },
    handleClickUpload: async function() {
      for (var i = 0; i < this.fileList.length; i++) {
        await this.$store.dispatch("upload", this.fileList[i]);
      }
      this.upload = false;
      this.$refs.upload.clearFiles();
      this.fileList = null;
      this.$store.dispatch("getEntries");
    },
    handleClickCancel: function() {
      this.upload = false;
      this.$refs.upload.clearFiles();
      this.fileList = null;
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