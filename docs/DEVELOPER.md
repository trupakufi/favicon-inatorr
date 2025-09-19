# Documentação Técnica - Favicon Generator

## Arquitetura da Aplicação

### Visão Geral Técnica

O Favicon Generator é uma aplicação web construída com **Nuxt.js 3** que oferece um serviço de geração automática de favicons a partir de imagens enviadas pelos usuários. A aplicação utiliza processamento de imagens no lado servidor e fornece uma interface web intuitiva.

### Stack Tecnológica

**Frontend:**
- **Nuxt.js 3** - Framework Vue.js full-stack
- **Vue.js 3** - Framework JavaScript reativo
- **TailwindCSS** - Framework CSS utilitário
- **TypeScript** - Superset tipado do JavaScript

**Backend:**
- **Nuxt.js API Routes** - API integrada do Nuxt
- **H3** - Runtime HTTP para Node.js (usado pelo Nuxt)
- **Sharp** - Biblioteca de processamento de imagens de alta performance
- **Archiver** - Biblioteca para criação de arquivos ZIP

**Ferramentas de Desenvolvimento:**
- **Prettier** - Formatador de código
- **TypeScript** - Verificação de tipos

## Estrutura do Projeto

```
favicon-inatorr/
├── app.vue                 # Componente raiz da aplicação
├── nuxt.config.ts         # Configuração do Nuxt.js
├── package.json           # Dependências e scripts
├── tailwind.config.js     # Configuração do TailwindCSS
├── tsconfig.json          # Configuração do TypeScript
├── Dockerfile             # Container Docker
├── docs/                  # Documentação
│   ├── USER_GUIDE.md     # Guia do usuário
│   ├── DEVELOPER.md      # Documentação técnica
│   └── TESTING.md        # Guia de testes
├── public/               # Arquivos estáticos
│   ├── favicon-*.png     # Favicons da aplicação
│   ├── og-image.png      # Imagem Open Graph
│   └── output.css        # CSS compilado
├── server/               # API server-side
│   ├── api/
│   │   ├── upload.post.ts    # Endpoint de upload
│   │   └── download/
│   │       └── [code].ts     # Endpoint de download
│   └── tsconfig.json         # Config TypeScript do servidor
├── styles/
│   └── input.css         # Estilos CSS de entrada
├── templates/
│   └── manifest.json     # Template do manifest PWA
└── tmp/                  # Diretórios temporários
    ├── uploads/          # Imagens enviadas
    ├── output/           # Favicons gerados
    └── zip/              # Arquivos ZIP temporários
```

## API Endpoints

### POST /api/upload

**Descrição:** Recebe uma imagem e gera favicons em múltiplos tamanhos.

**Parâmetros:**
- `file` (FormData): Arquivo de imagem (PNG, JPEG, GIF, ICO)

**Validações:**
- Tamanho máximo: 5MB
- Tipos aceitos: `image/png`, `image/jpeg`, `image/x-icon`, `image/gif`
- Arquivo não pode estar vazio

**Resposta de Sucesso:**
```json
{
  "code": "a1b2c3d4"
}
```

**Resposta de Erro:**
```json
{
  "error": "Mensagem de erro"
}
```

**Processamento:**
1. Validação do arquivo enviado
2. Geração de código único (8 caracteres)
3. Criação de diretórios temporários
4. Redimensionamento da imagem para múltiplos tamanhos:
   - 16x16px (favicon-16x16.png)
   - 32x32px (favicon-32x32.png)
   - 48x48px (favicon-48x48.png)
   - 64x64px (favicon-64x64.png)
   - 128x128px (favicon-128x128.png)
   - 180x180px (apple-touch-icon-180x180.png)
   - 512x512px (favicon.png)
   - Formato ICO (favicon.ico)
5. Geração do arquivo manifest.json
6. Retorno do código único

### GET /api/download/[code]

**Descrição:** Gera e retorna um arquivo ZIP com todos os favicons gerados.

**Parâmetros:**
- `code` (URL parameter): Código único retornado pelo endpoint de upload

**Resposta:**
- Content-Type: `application/zip`
- Content-Disposition: `attachment; filename="favicon.zip"`
- Arquivo ZIP contendo todos os favicons gerados

**Processamento:**
1. Localização da pasta de output baseada no código
2. Criação de arquivo ZIP
3. Compressão de todos os arquivos da pasta
4. Stream do arquivo ZIP para download
5. Limpeza do arquivo ZIP temporário

## Configuração de Desenvolvimento

### Pré-requisitos

- **Node.js** 18+ 
- **npm**, **yarn**, **pnpm**, ou **bun**
- **Git**

### Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/trupakufi/favicon-inatorr.git
cd favicon-inatorr
```

2. **Instale as dependências:**
```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install

# bun
bun install
```

3. **Inicie o servidor de desenvolvimento:**
```bash
# npm
npm run dev

# yarn
yarn dev

# pnpm
pnpm run dev

# bun
bun run dev
```

4. **Acesse a aplicação:**
   - URL: http://localhost:3000
   - O servidor será reiniciado automaticamente quando arquivos forem modificados

### Scripts Disponíveis

```json
{
  "dev": "nuxt dev",           # Servidor de desenvolvimento
  "build": "nuxt build",       # Build para produção
  "generate": "nuxt generate", # Geração estática
  "preview": "nuxt preview",   # Preview do build
  "postinstall": "nuxt prepare" # Preparação pós-instalação
}
```

## Deployment

### Build para Produção

```bash
# Build da aplicação
npm run build

# Preview local do build
npm run preview
```

### Docker

O projeto inclui um `Dockerfile` para containerização:

```bash
# Build da imagem
docker build -t favicon-generator .

# Executar container
docker run -p 3000:3000 favicon-generator
```

### Variáveis de Ambiente

A aplicação pode ser configurada através das seguintes variáveis:

- `NUXT_PORT`: Porta do servidor (padrão: 3000)
- `NUXT_HOST`: Host do servidor (padrão: localhost)

### Deploy em Diferentes Plataformas

**Vercel:**
```bash
# Instalar CLI do Vercel
npm i -g vercel

# Deploy
vercel
```

**Netlify:**
- Configure o build command: `npm run generate`
- Configure o publish directory: `dist`

**VPS/Servidor Próprio:**
```bash
# Build
npm run build

# Usar PM2 para gerenciamento de processos
pm2 start npm --name "favicon-generator" -- run preview
```

## Configurações do Nuxt.js

### nuxt.config.ts

```typescript
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  
  // Configuração do HTML head
  app: {
    head: {
      title: "Favicon Generator",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        // ... outras meta tags
      ],
      link: [
        // ... links para favicons e estilos
      ]
    }
  },
  
  // CSS framework
  css: ["~/styles/input.css"],
  
  // Configurações do servidor
  nitro: {
    experimental: {
      wasm: true
    }
  }
})
```

## Processamento de Imagens

### Sharp Configuration

A biblioteca Sharp é utilizada para o processamento de imagens com as seguintes configurações:

```typescript
// Redimensionamento para PNG
await sharp(buffer)
  .resize(size, size, {
    fit: 'cover',
    position: 'center'
  })
  .png({ quality: 90 })
  .toFile(outputPath);

// Conversão para ICO
await sharp(buffer)
  .resize(32, 32)
  .png()
  .toFile(icoPath);
```

### Otimizações

- **Qualidade PNG:** 90% para melhor balanço entre qualidade e tamanho
- **Redimensionamento:** Usa 'cover' com posição central para manter proporções
- **Formatos de saída:** PNG para transparência, ICO para compatibilidade legacy

## Segurança

### Medidas Implementadas

1. **Validação de Tipos de Arquivo**
   - Verificação de MIME type
   - Lista branca de extensões permitidas

2. **Limitação de Tamanho**
   - Máximo de 5MB por arquivo
   - Prevenção de ataques DoS por upload

3. **Sanitização de Nomes**
   - Remoção de caracteres especiais
   - Prevenção de path traversal

4. **Limpeza Temporária**
   - Arquivos temporários são removidos após download
   - Prevenção de acúmulo de arquivos no servidor

### Recomendações Adicionais

- Implementar rate limiting para uploads
- Adicionar autenticação para uso em produção intensiva
- Configurar HTTPS em produção
- Implementar monitoramento de uso de disco

## Performance

### Otimizações Implementadas

1. **Processamento Assíncrono**
   - Uso de Promises para operações I/O
   - Não-bloqueio do thread principal

2. **Compressão de Assets**
   - TailwindCSS com purging automático
   - Minificação automática em produção

3. **Lazy Loading**
   - Carregamento sob demanda de componentes
   - Otimização de bundle splitting

### Monitoramento

Para monitorar performance em produção:

```bash
# Análise de bundle
npx nuxi analyze

# Profiling de build
npm run build -- --analyze
```

## Contribuição

### Setup para Desenvolvimento

1. Fork do repositório
2. Clone do fork local
3. Instalação de dependências
4. Criação de branch para feature
5. Desenvolvimento e testes
6. Commit seguindo conventional commits
7. Push e criação de Pull Request

### Padrões de Código

- **ESLint** e **Prettier** configurados
- **TypeScript** obrigatório para novos arquivos
- **Conventional Commits** para mensagens
- **Componentes Vue** em Single File Components

### Estrutura de Commits

```
feat: adiciona nova funcionalidade
fix: corrige bug específico
docs: atualiza documentação
style: mudanças de formatação
refactor: refatoração de código
test: adiciona ou modifica testes
chore: tarefas de manutenção
```