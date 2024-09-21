<script setup lang="ts">
import { ref } from "vue";

useHead({
  script: [
    {
      src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4117999514952023",
      crossorigin: "anonymous",
      tagPosition: "head",
    },
  ],
});

const file = ref(null);
const error = ref(null);
const success = ref(null);
const code = ref(null);

const downloadFiles = async () => {
  try {
    const response = await fetch("/api/download/".concat(code.value));
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "favicon.zip";
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (err) {
    console.log(err);
    error.value = "Erro ao baixar arquivos";
  }
};

const handleFileUpload = (e) => {
  file.value = e.target.files[0];
};

const uploadFile = async () => {
  if (!file.value) {
    error.value = "Por favor, selecione um ficheiro.";
    return;
  }

  const formData = new FormData();
  formData.append("file", file.value);

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Falha no envio do ficheiro.");
    }

    const result = await response.json();
    code.value = result.code;
    success.value = "Favicon Gerados com sucesso.!";

    error.value = null;
  } catch (err) {
    error.value = err.message;
    success.value = null;
  }
};
</script>

<template>
  <div>
    <h1>Favicon Ganerator</h1>

    <div>
      <form @submit.prevent="uploadFile">
        <div>
          <label for="file">Escolha o ficheiro:</label>
          <input type="file" id="file" @change="handleFileUpload" />
        </div>
        <button type="submit">Enviar Ficheiro</button>
      </form>
      <button type="button" @click="() => downloadFiles()">
        Baixar Ficheiros
      </button>
      <div v-if="error">{{ error }}</div>
      <div v-if="success">{{ success }}</div>
    </div>
  </div>
</template>
