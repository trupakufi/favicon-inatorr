# Favicon Generator 🎨

[![Nuxt 3](https://img.shields.io/badge/Nuxt-3-00C58E?logo=nuxt.js&logoColor=white)](https://nuxt.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

Transforme seu logo ou imagem em um conjunto completo de favicons profissionais em questão de segundos! Uma ferramenta web simples e intuitiva que gera automaticamente todos os tamanhos e formatos de favicon necessários para seu site.

## ✨ Características

- 🚀 **Geração Rápida**: Processa imagens em segundos
- 📱 **Múltiplos Tamanhos**: Gera 16x16, 32x32, 48x48, 64x64, 128x128, 180x180px
- 🎯 **Formatos Completos**: PNG, ICO e Apple Touch Icon
- 📦 **Download em ZIP**: Todos os arquivos em um pacote conveniente
- 🔧 **Código HTML**: Gera automaticamente as tags HTML necessárias
- 📱 **PWA Ready**: Inclui manifest.json para Progressive Web Apps
- 🎨 **Interface Intuitiva**: Design limpo e responsivo
- 🔒 **Seguro**: Validação rigorosa de arquivos e limpeza automática

## 🎯 Formatos Suportados

**Entrada:**
- PNG (recomendado)
- JPEG/JPG
- GIF
- ICO

**Saída:**
- favicon-16x16.png
- favicon-32x32.png
- favicon-48x48.png
- favicon-64x64.png
- favicon-128x128.png
- apple-touch-icon-180x180.png
- favicon.png (512x512)
- favicon.ico
- manifest.json

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18+
- npm, yarn, pnpm, ou bun

### Instalação

```bash
# Clone o repositório
git clone https://github.com/trupakufi/favicon-inatorr.git
cd favicon-inatorr

# Instale as dependências
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

### Desenvolvimento

Inicie o servidor de desenvolvimento em `http://localhost:3000`:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm run dev
# ou
bun run dev
```

### Produção

Build da aplicação para produção:

```bash
npm run build
# ou
pnpm run build
# ou
yarn build
# ou
bun run build
```

Preview do build em produção:

```bash
npm run preview
# ou
pnpm run preview
# ou  
yarn preview
# ou
bun run preview
```

## 📖 Como Usar

1. **Upload da Imagem**
   - Acesse a aplicação
   - Clique em "Escolher arquivo"
   - Selecione uma imagem (PNG recomendado, máx. 5MB)
   - Clique em "Gerar Favicons"

2. **Download dos Arquivos**
   - Aguarde o processamento
   - Clique em "Download" para baixar o ZIP
   - Extraia os arquivos na pasta raiz do seu site

3. **Implementação**
   - Copie o código HTML gerado
   - Cole no `<head>` do seu site
   - Seus favicons estão prontos!

## 🏗️ Arquitetura Técnica

### Stack Tecnológica
- **Frontend**: Nuxt.js 3 + Vue.js 3 + TypeScript
- **Styling**: TailwindCSS
- **Backend**: Nuxt API Routes + H3
- **Processamento**: Sharp (otimização de imagens)
- **Compressão**: Archiver (geração de ZIP)

### API Endpoints
- `POST /api/upload` - Upload e processamento de imagens
- `GET /api/download/[code]` - Download do ZIP com favicons

## 🐳 Docker

```bash
# Build da imagem
docker build -t favicon-generator .

# Executar container
docker run -p 3000:3000 favicon-generator
```

## 📚 Documentação

- 📖 **[Guia do Usuário](docs/USER_GUIDE.md)** - Como usar a aplicação
- 👨‍💻 **[Documentação Técnica](docs/DEVELOPER.md)** - Arquitetura e development
- 🧪 **[Guia de Testes](docs/TESTING.md)** - Estratégias e procedimentos de teste

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### Padrões de Desenvolvimento
- Use **Conventional Commits** para mensagens
- Siga os padrões **ESLint** e **Prettier**
- Adicione testes para novas funcionalidades
- Atualize a documentação quando necessário

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🔗 Links Úteis

- [Documentação do Nuxt.js](https://nuxt.com/docs)
- [Sharp - Processamento de Imagens](https://sharp.pixelplumbing.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Favicon Checker](https://realfavicongenerator.net/favicon_checker)

## 📊 Status do Projeto

- ✅ Geração básica de favicons
- ✅ Interface web responsiva
- ✅ API REST completa
- ✅ Documentação abrangente
- ⏳ Testes automatizados (em desenvolvimento)
- ⏳ CI/CD pipeline (planejado)

---
