<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import AlertMessage from "@/components/AlertMessage.vue";
import axios from "axios";
import urlJoin from "url-join";
import Store from "./store";

let fileInput = reactive(null);

//  图片最大宽度
const MAX_WIDTH = 800;

/**
 * base64压缩（图片-canvas互转）
 * @param {file} base64 base64图片数据
 * @param {number} quality 图片质量
 * @param {string} format 输出图片格式
 * @return {base64} data 图片处理完成后的base64
 */
const compress = (base64, quality, mimeType) => {
  let cvs = document.createElement("canvas");
  let img = document.createElement("img");
  img.crossOrigin = "anonymous";
  return new Promise((resolve, reject) => {
    img.src = base64;
    // 图片偏移值
    let offetX = 0;
    img.onload = () => {
      if (img.width > MAX_WIDTH) {
        cvs.width = MAX_WIDTH;
        cvs.height = (img.height * MAX_WIDTH) / img.width;
        offetX = (img.width - MAX_WIDTH) / 2;
      } else {
        cvs.width = img.width;
        cvs.height = img.height;
      }
      let ctx = cvs
        .getContext("2d")
        .drawImage(img, 0, 0, cvs.width, cvs.height);
      let imageData = cvs.toDataURL(mimeType, quality / 100);
      resolve(imageData);
    };
  });
};

const fileToBase64ByQuality = (file, quality) => {
  let fileReader = new FileReader();
  let type = file.type;
  return new Promise((resolve, reject) => {
    if (window.URL || window.webkitURL) {
      resolve(compress(URL.createObjectURL(file), quality, type));
    } else {
      fileReader.onload = () => {
        resolve(compress(fileReader.result, quality, type));
      };
      fileReader.onerror = (e) => {
        reject(e);
      };
      fileReader.readAsDataURL(file);
    }
  });
};

const convertBase64UrlToBlob = (base64, mimeType) => {
  let bytes = window.atob(base64.split(",")[1]);
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  let _blob = new Blob([ab], { type: mimeType });
  console.log(_blob);
  return _blob;
};

function uploadFile() {
  const input = fileInput;
  const file = input.files[0];

  console.log(file.type);

  const formData = new FormData();

  fileToBase64ByQuality(file, 60)
    .then((base64) => {
      let myBlob = convertBase64UrlToBlob(base64, file.type);
      formData.append("file", myBlob);

      axios.post(
        urlJoin(Store.state.domainAddress, "/server/upload/"),
        formData,
        {
          headers: {
            "Content-Type": "application/octet-stream",
          },
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>

<template>
  <form>
    <input type="file" ref="fileInput" @change="uploadFile" />
  </form>
</template>
