<script setup lang="ts">
import { ref } from "vue";

useSeoMeta({
  title: "Favicon Ganerator",
  ogTitle: "Favicon Ganerator",
  description:
    "Transforme o seu logo ou imagem em um favicon incrível em questão de segundos! Nosso gerador de favicons é uma ferramenta simples e intuitiva que permite que você crie ícones personalizados para o seu site, garantindo que sua marca se destaque na barra de endereços dos navegadores. Com suporte para diversos formatos e tamanhos, você pode facilmente adaptar seu favicon para qualquer plataforma. Não importa se você é um desenvolvedor, designer ou empreendedor, nossa ferramenta torna a criação de favicons acessível e rápida. Experimente agora e dê um toque profissional ao seu site!",
  ogDescription: "Experimente agora e dê um toque profissional ao seu site!",
  ogImage: "/og-image.png",
});

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
const code = ref(null);

const downloadFiles = async () => {
  if (code.value) {
    try {
      const response = await fetch("/api/download/".concat(code.value));

      if (!response.ok) {
        alert("Error sending the file");
      }

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
      alert("Error downloading files.!");
    }
  }
};

const handleFileUpload = (e) => {
  file.value = e.target.files[0];
};

const uploadFile = async () => {
  if (!file.value) {
    alert("Please, select a file");
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
      alert("Error sending the file");
    }

    const result = await response.json();

    if (result.code) {
      alert("Favicon Gerados com sucesso.!");
      code.value = result.code;
    } else {
      alert("Error: " + result.error);
    }
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};

const copyText = () => {
  navigator.clipboard.writeText(`
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="manifest" href="/manifest.json" />
  `);

  alert("Texto copiado para a àrea de transferência");
};
</script>

<template>
  <Meta
    name="keywords"
    content="Favicon Ganerator, Favicon Generator, Gerador de favicons, Criar favicon online, Favicon personalizado, Ícones para sites, Favicon grátis, Criar ícone para site, Ferramenta de geração de favicons, Favicon para WordPress, Favicon em PNG, Favicon em ICO, Design de favicons, Como criar favicon, Favicon para aplicativos web, Geração de ícones, Melhor gerador de favicons, Gerador de favicons grátis, Criar favicon online fácil, Favicon personalizado para sites, Ícones para sites responsivos, Ferramenta de geração de favicons rápida, Favicon para WordPress simples, Design de favicons criativos, Como criar favicon em minutos, Favicon em PNG e ICO, Geração de ícones para aplicativos web, Melhor gerador de favicons online, Favicon para branding de sites, Favicon de alta resolução, Criar ícone para site WordPress, Otimização de favicons para SEO"
  />

  <main
    class="h flex w-full flex-col items-center justify-center bg-primary p-8"
  >
    <h1 class="mb-2 text-3xl font-bold text-white">Favicon Ganerator</h1>
    <p class="mb-12 text-white/80">An easy favicon generator!</p>
    <div>
      <form @submit.prevent="uploadFile">
        <div class="flex gap-8">
          <label
            for="file"
            class="flex h-36 w-96 cursor-pointer items-center justify-center border-2 border-white text-white"
          >
            <span>
              {{ file?.name ? file?.name : "Please, select a file:" }}
            </span>
          </label>
          <input
            type="file"
            id="file"
            class="hidden"
            @change="handleFileUpload"
          />
        </div>
        <button
          type="submit"
          class="hover:bg-transparent my-8 h-16 w-96 bg-white text-xl text-primary hover:text-white"
        >
          Generate Favicon
        </button>
      </form>
      <button
        type="button"
        v-if="code"
        @click="downloadFiles"
        class="h-16 w-96 cursor-pointer border-2 border-white bg-primary text-xl text-white hover:bg-white hover:text-primary"
      >
        Download Zip
      </button>
    </div>

    <div
      class="mt-8 flex flex-col items-start justify-start gap-8 p-8 lg:flex-row"
    >
      <div class="flex w-full flex-col gap-4 bg-primary text-white lg:w-96">
        <h3 class="text-xl font-bold text-white">
          This process will produce the following icon files:
        </h3>

        <ul class="">
          <li>favicon.ico</li>
          <li>favicon.png</li>
          <li>favicon-32x32.png</li>
          <li>favicon-16x16.png</li>
          <li>mstile-150x150.png</li>
          <li>safari-pinned-tab.png</li>
          <li>android-chrome-512x512.png</li>
          <li>android-chrome-192x192.png</li>
          <li>apple-touch-icon-180x180.png</li>
          <li>manifest.json</li>
        </ul>

        <p class="text-sm">
          These images are crucial for ensuring that your website maintains a
          consistent visual presence across various platforms and devices.
        </p>
      </div>

      <div class="flex w-full flex-col gap-4 lg:w-[560px]">
        <h3 class="text-xl font-bold text-white">
          Copy this text into your head tag:
        </h3>
        <p class="bg-zinc-900 rounded-lg p-4 text-sm text-white">
          {{ `
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon-180x180.png"
          />
          `}} <br />
          {{ `
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />`}} <br />
          {{ `
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />`}} <br />
          {{ ` <link rel="manifest" href="/manifest.json" />
          ` }}
        </p>

        <button @click="copyText" class="rounded-md bg-white/35 p-4 text-white">
          Copy
        </button>
      </div>
    </div>

    <p class="text-white">
      built with &#9829; by
      <a href="https://trupakufi.me" class="underline"> Trupakufi </a>
    </p>
  </main>
</template>
