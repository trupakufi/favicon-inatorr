# Guia de Testes - Favicon Generator

## Visão Geral dos Testes

Este documento descreve as estratégias e procedimentos de teste para a aplicação Favicon Generator. Os testes são divididos em diferentes categorias para garantir a qualidade, funcionalidade e confiabilidade da aplicação.

## Tipos de Teste

### 1. Testes Manuais de Interface
### 2. Testes de API
### 3. Testes de Performance
### 4. Testes de Segurança
### 5. Testes de Compatibilidade
### 6. Testes Automatizados (Futuros)

---

## 1. Testes Manuais de Interface

### 1.1. Teste de Upload de Arquivo

**Objetivo:** Verificar se o upload de imagens funciona corretamente.

**Pré-condições:**
- Aplicação rodando em modo de desenvolvimento ou produção
- Acesso ao navegador web

**Casos de Teste:**

#### Caso 1: Upload de arquivo PNG válido
**Passos:**
1. Acesse a página principal
2. Clique no botão "Escolher arquivo"
3. Selecione um arquivo PNG quadrado (ex: 512x512px)
4. Clique em "Gerar Favicons"

**Resultado Esperado:**
- Mensagem de sucesso: "Favicon Gerados com sucesso.!"
- Código único é exibido
- Botão de download fica disponível

#### Caso 2: Upload de arquivo JPEG válido
**Passos:**
1. Repita os passos do Caso 1 com arquivo JPEG

**Resultado Esperado:**
- Mesmo resultado do Caso 1

#### Caso 3: Upload sem selecionar arquivo
**Passos:**
1. Acesse a página principal
2. Clique em "Gerar Favicons" sem selecionar arquivo

**Resultado Esperado:**
- Alerta: "Please, select a file"

#### Caso 4: Upload de arquivo não suportado
**Passos:**
1. Tente fazer upload de arquivo .txt, .pdf, ou .doc

**Resultado Esperado:**
- Alerta: "File type not supported"

#### Caso 5: Upload de arquivo muito grande
**Passos:**
1. Tente fazer upload de imagem > 5MB

**Resultado Esperado:**
- Alerta: "The file is too large"

### 1.2. Teste de Download

**Objetivo:** Verificar se o download dos favicons funciona corretamente.

#### Caso 1: Download após upload bem-sucedido
**Passos:**
1. Complete um upload válido
2. Clique no botão "Download"

**Resultado Esperado:**
- Download de arquivo favicon.zip inicia automaticamente
- Arquivo ZIP contém todos os tamanhos de favicon
- Arquivo manifest.json está incluído

#### Caso 2: Verificar conteúdo do ZIP
**Passos:**
1. Extraia o arquivo favicon.zip baixado
2. Verifique os arquivos presentes

**Resultado Esperado:**
```
favicon-16x16.png
favicon-32x32.png
favicon-48x48.png
favicon-64x64.png
favicon-128x128.png
apple-touch-icon-180x180.png
favicon.png (512x512)
favicon.ico
manifest.json
```

### 1.3. Teste de Copiar Código HTML

**Objetivo:** Verificar a funcionalidade de copiar código HTML.

**Passos:**
1. Clique no botão "Copiar código HTML"
2. Cole o conteúdo em um editor de texto

**Resultado Esperado:**
- Alerta: "Texto copiado para a área de transferência"
- Código HTML correto é copiado:
```html
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="manifest" href="/manifest.json" />
```

### 1.4. Testes de Responsividade

**Objective:** Verificar se a interface funciona em diferentes dispositivos.

**Dispositivos para Testar:**
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

**Passos:**
1. Acesse a aplicação em cada resolução
2. Teste todas as funcionalidades principais
3. Verifique se os botões são clicáveis
4. Verifique se o texto é legível

---

## 2. Testes de API

### 2.1. Teste do Endpoint POST /api/upload

**Ferramentas Recomendadas:**
- Postman
- cURL
- Insomnia
- Thunder Client (VS Code)

#### Caso 1: Upload válido via API
**Request:**
```bash
curl -X POST http://localhost:3000/api/upload \
  -F "file=@test-image.png"
```

**Resultado Esperado:**
```json
{
  "code": "a1b2c3d4"
}
```

#### Caso 2: Upload sem arquivo
**Request:**
```bash
curl -X POST http://localhost:3000/api/upload
```

**Resultado Esperado:**
```json
{
  "error": "No file uploaded"
}
```

#### Caso 3: Upload de arquivo inválido
**Request:**
```bash
curl -X POST http://localhost:3000/api/upload \
  -F "file=@document.pdf"
```

**Resultado Esperado:**
```json
{
  "error": "File type not supported"
}
```

### 2.2. Teste do Endpoint GET /api/download/[code]

#### Caso 1: Download com código válido
**Request:**
```bash
curl -X GET http://localhost:3000/api/download/a1b2c3d4 \
  -o favicon.zip
```

**Resultado Esperado:**
- Status: 200 OK
- Content-Type: application/zip
- Arquivo ZIP válido é baixado

#### Caso 2: Download com código inválido
**Request:**
```bash
curl -X GET http://localhost:3000/api/download/invalid123
```

**Resultado Esperado:**
- Status: 404 ou 500
- Erro apropriado

---

## 3. Testes de Performance

### 3.1. Teste de Tempo de Processamento

**Objetivo:** Medir o tempo necessário para processar imagens.

**Método:**
1. Use imagens de diferentes tamanhos:
   - 100KB
   - 500KB
   - 1MB
   - 3MB
   - 5MB
2. Meça o tempo entre upload e resposta
3. Documente os resultados

**Métricas Esperadas:**
- Imagens < 1MB: < 5 segundos
- Imagens 1-3MB: < 10 segundos
- Imagens 3-5MB: < 15 segundos

### 3.2. Teste de Carga

**Objetivo:** Verificar comportamento sob múltiplos uploads simultâneos.

**Ferramentas:**
- Apache Bench (ab)
- Artillery
- k6

**Teste com Artillery:**
```yaml
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 60
      arrivalRate: 10

scenarios:
  - name: 'Upload test'
    weight: 100
    engine: http
    processor: './test-processor.js'
```

### 3.3. Teste de Uso de Memória

**Objetivo:** Verificar vazamentos de memória durante processamento.

**Método:**
1. Monitor de uso de memória (htop, Task Manager)
2. Execute múltiplos uploads
3. Observe se a memória é liberada após processamento

---

## 4. Testes de Segurança

### 4.1. Teste de Validação de Arquivos

#### Caso 1: Arquivo malicioso com extensão alterada
**Passos:**
1. Crie um arquivo .exe
2. Renomeie para .png
3. Tente fazer upload

**Resultado Esperado:**
- Upload deve ser rejeitado

#### Caso 2: Arquivo com nome malicioso
**Passos:**
1. Crie arquivo com nome: `../../../etc/passwd.png`
2. Faça upload

**Resultado Esperado:**
- Nome deve ser sanitizado
- Sem acesso a arquivos do sistema

### 4.2. Teste de Injection

#### Caso 1: Nome de arquivo com script
**Passos:**
1. Arquivo nomeado: `<script>alert('xss')</script>.png`
2. Faça upload

**Resultado Esperado:**
- Nome sanitizado sem execução de script

### 4.3. Teste de Rate Limiting

**Objetivo:** Verificar se há proteção contra spam de uploads.

**Método:**
1. Faça múltiplos uploads rapidamente
2. Observe se há limitação de taxa

---

## 5. Testes de Compatibilidade

### 5.1. Testes de Navegador

**Navegadores para Testar:**
- Chrome (versão atual e anterior)
- Firefox (versão atual e anterior)
- Safari (se disponível)
- Edge
- Opera

**Funcionalidades para Testar:**
- Upload de arquivos
- Download de ZIP
- Funcionalidade de copiar texto
- Interface responsiva

### 5.2. Testes de Sistema Operacional

**Sistemas para Testar:**
- Windows 10/11
- macOS (se disponível)
- Linux (Ubuntu/Debian)

### 5.3. Teste de Favicons Gerados

**Objetivo:** Verificar se os favicons funcionam corretamente em diferentes contextos.

**Método:**
1. Gere favicons com a aplicação
2. Crie página HTML de teste
3. Teste em diferentes navegadores
4. Verifique se os ícones aparecem corretamente

**Template de Teste:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Teste de Favicon</title>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/manifest.json" />
</head>
<body>
    <h1>Teste de Favicon</h1>
    <p>Verifique se o favicon aparece na aba do navegador.</p>
</body>
</html>
```

---

## 6. Testes Automatizados

### 6.1. Setup para Testes Automatizados

**Dependências para Instalar:**
```bash
npm install --save-dev @nuxt/test-utils vitest @vue/test-utils playwright
```

### 6.2. Testes Unitários (Exemplo)

```typescript
// tests/upload.test.ts
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

describe('Upload API', () => {
  setup({
    // configuração do ambiente de teste
  })

  it('should reject upload without file', async () => {
    const response = await $fetch('/api/upload', {
      method: 'POST',
      body: new FormData()
    })
    
    expect(response.error).toBe('No file uploaded')
  })
})
```

### 6.3. Testes E2E com Playwright

```typescript
// tests/e2e/favicon-generation.spec.ts
import { test, expect } from '@playwright/test'

test('should generate favicons successfully', async ({ page }) => {
  await page.goto('/')
  
  // Upload arquivo
  const fileInput = page.locator('input[type="file"]')
  await fileInput.setInputFiles('test-assets/test-logo.png')
  
  // Clique em gerar
  await page.click('button:has-text("Gerar Favicons")')
  
  // Aguarde sucesso
  await expect(page.locator('text=Favicon Gerados com sucesso')).toBeVisible()
  
  // Verifique se código foi gerado
  const downloadBtn = page.locator('button:has-text("Download")')
  await expect(downloadBtn).toBeVisible()
})
```

---

## 7. Checklist de Testes

### Antes de Cada Release

- [ ] Todos os testes manuais de interface passam
- [ ] Testes de API funcionam corretamente
- [ ] Performance está dentro dos limites aceitáveis
- [ ] Testes de segurança não apresentam vulnerabilidades
- [ ] Compatibilidade testada nos principais navegadores
- [ ] Favicons gerados funcionam corretamente
- [ ] Documentação está atualizada

### Testes de Regressão

Após qualquer mudança no código:

- [ ] Upload continua funcionando
- [ ] Download continua funcionando
- [ ] Validações de arquivo funcionam
- [ ] Processamento de imagem funciona
- [ ] Interface permanece responsiva

---

## 8. Relatório de Bugs

### Template para Reportar Bugs

```markdown
**Título:** [Breve descrição do problema]

**Ambiente:**
- OS: [Windows/Mac/Linux]
- Navegador: [Chrome/Firefox/Safari + versão]
- Versão da aplicação: [commit hash ou tag]

**Passos para Reproduzir:**
1. 
2. 
3. 

**Resultado Esperado:**
[O que deveria acontecer]

**Resultado Atual:**
[O que realmente acontece]

**Screenshots/Logs:**
[Se aplicável]

**Frequência:**
[Sempre/Às vezes/Raro]

**Prioridade:**
[Alta/Média/Baixa]
```

---

## 9. Ferramentas Recomendadas

### Para Testes Manuais
- **Navegadores:** Chrome DevTools, Firefox Developer Tools
- **Dispositivos:** BrowserStack, Responsively App
- **Imagens de Teste:** Unsplash, Lorem Picsum

### Para Testes de API
- **Postman** - Interface gráfica para testes de API
- **cURL** - Linha de comando para testes rápidos
- **Insomnia** - Alternativa ao Postman
- **Thunder Client** - Extensão do VS Code

### Para Testes de Performance
- **Lighthouse** - Análise de performance web
- **Apache Bench** - Teste de carga simples
- **Artillery** - Teste de carga avançado
- **k6** - Testes de performance moderno

### Para Testes Automatizados
- **Vitest** - Framework de testes para Vite/Nuxt
- **Playwright** - Testes E2E cross-browser
- **Cypress** - Alternativa para testes E2E
- **Jest** - Framework de testes JavaScript

---

## 10. Melhores Práticas

### Durante o Desenvolvimento
1. **Teste Frequentemente:** Execute testes após cada mudança significativa
2. **Documente Problemas:** Mantenha log de bugs encontrados e soluções
3. **Use Dados Reais:** Teste com imagens reais que usuários usariam
4. **Teste Edge Cases:** Arquivos muito pequenos, muito grandes, formatos limítrofes

### Para Testes de Produção
1. **Monitore Logs:** Configure logging adequado para produção
2. **Alertas:** Configure alertas para erros críticos
3. **Backup de Testes:** Mantenha conjunto de imagens para testes
4. **Rollback Plan:** Tenha plano para reverter deployments problemáticos

### Automação
1. **CI/CD Integration:** Integre testes no pipeline de deploy
2. **Testes de Smoke:** Execute testes básicos após cada deploy
3. **Scheduled Tests:** Execute testes completos periodicamente
4. **Metrics:** Colete métricas de performance e uso