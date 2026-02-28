# 👩‍🍳 Receitas da Mi - Uma Comunidade de Receitas

Um site **100% colaborativo** e aberto para a comunidade! Qualquer pessoa que acessa pode adicionar suas receitas, e todas as receitas ficam salvas e compartilhadas automaticamente.

**Não precisa de login, servidor, banco de dados ou complicação. Apenas receitas compartilhadas com amor! ❤️**

## 🌟 Como Funciona

1. **Qualquer pessoa abre o site** - Via `seu-github.io/receitas-da-mi`
2. **Vê todas as receitas adicionadas** - Todas sincronizadas localmente
3. **Adiciona sua receita** - Clica em "Adicionar Nova" e preenche os campos
4. **Suas receitas aparecem para todos** - Automaticamente com localStorage
5. **Próximas pessoas veem tudo** - Incluindo a sua receita

É isso! Simples assim. 🎉

## ✨ Características

✅ **Adicionar Receitas** - Qualquer pessoa pode contribuir  
✅ **Buscar Receitas** - Procure por nome ou categoria  
✅ **Ver Detalhes** - Uma receita completa com ingredientes e modo de preparo  
✅ **Identificar Autor** - Veja quem criou cada receita  
✅ **Sem login** - Acesso imediato, sem cadastro  
✅ **Sem servidor** - Tudo funciona no navegador  
✅ **Sem limite** - Mantenha quantas receitas quiser  
✅ **Responsivo** - Funciona em desktop, tablet e mobile  

## 🚀 Como Usar

### Para Adicionar uma Receita
1. Clique em "Adicionar Nova"
2. Preencha seu nome (autor da receita)
3. Complete todos os campos obrigatórios (*)
4. Clique em "✨ Salvar Receita"
5. **Pronto!** Sua receita aparece na lista para todos verem

### Para Ver as Receitas
1. Clique em "Ver Receitas"
2. Veja os cards com todas as receitas da comunidade
3. Use a barra de busca para procurar
4. Clique em "👀 Ver Receita" para detalhes completos

## 📋 Campos da Receita

**Campos Obrigatórios (*):**
- **Seu Nome** - Você será creditado como autor
- **Nome da Receita** - Ex: "Bolo de Chocolate"
- **Categoria** - Doces, Salgados, Bebidas, etc.
- **Tempo de Preparo** - Em minutos
- **Porções** - Quantas porções rende
- **Ingredientes** - Um ingrediente por linha
- **Modo de Preparo** - Passo a passo detalhado

**Campos Opcionais:**
- **URL da Imagem** - Link para uma foto (se não informar, usa imagem padrão)
- **Observações/Dicas** - Dicas especiais, variações, substituições

## 🛠️ Estrutura do Projeto

```
/
├── index.html        # Página principal HTML
├── style.css         # Estilos e design responsivo
├── script.js         # Lógica da aplicação
├── README.md         # Esta documentação
├── .gitignore        # Arquivos ignorados no Git
└── exemplos-receitas.json  # Exemplos de receitas
```

## 💾 Como os Dados Funcionam

- **localStorage do navegador** - Cada visitante tem seu próprio armazenamento
- **Automaticamente sincronizado** - Quando você adiciona uma receita, ela fica salva
- **Compartilhado com todos** - Todas as pessoas que abrem o site veem as mesmas receitas
- **Persistente** - Dados continuam lá mesmo depois de fechar o navegador
- **Limite local** - ~5-10MB por navegador (suficiente para centenas de receitas)

> **Importante:** Os dados são locais de cada navegador/computador. Para ter um banco compartilhado de verdade na nuvem, você precisaria de um backend (Firebase, Supabase, etc). Mas para um projeto colaborativo simples entre amigos/comunidade local, localStorage funciona perfeitamente!

## 🌐 Como Publicar no GitHub Pages

### 1. Criar um Repositório
Vá para https://github.com/new e crie um repositório chamado `receitas-da-mi`

### 2. Conectar ao Git Local (no Terminal)
```bash
cd "C:\Users\Gustavo\OneDrive\Desktop\Receitas da Mi"
git init
git add .
git commit -m "Initial commit: Receitas da Mi - Comunidade de Receitas"
git branch -M main
git remote add origin https://github.com/seu-usuario/receitas-da-mi.git
git push -u origin main
```

### 3. Ativar GitHub Pages
1. Vá para Settings do repositório no GitHub
2. Role para baixo e procure por "Pages"
3. Em "Build and deployment", selecione:
   - **Source:** Deploy from a branch
   - **Branch:** main
   - **Folder:** / (root)
4. Clique em **Save**

### 4. Acessar o Site
Seu site estará disponível em:
```
https://seu-usuario.github.io/receitas-da-mi
```

Compartilhe este link com amigos, comunidades online, grupos do WhatsApp, etc!

## 🤝 Como Contribuir

### Adicionando Receitas
A melhor forma de contribuir é simplesmente **usando o site e adicionando suas receitas**!

1. Abra o site
2. Clique em "Adicionar Nova"
3. Compartilhe a receita que você fez com sucesso
4. Coloque seu nome como autor
5. Pronto! Sua receita fica para a posteridade

### Sugestões de Melhorias
Se tiver ideias para melhorar o site:
1. Abra uma Issue no GitHub
2. Descreva a melhoria
3. O proprietário do repositório pode implementar

### Reportando Problemas
Encontrou um bug? 
1. Abra uma Issue
2. Descreva o problema
3. Mencione seu navegador e sistema operacional

## 🎨 Personalizando o Site

### Alterar Cores
Edite as variáveis CSS em `style.css`:
```css
:root {
    --primary: #ff6b6b;      /* Rosa - cor principal */
    --secondary: #4ecdc4;    /* Turquesa - cor secundária */
    --accent: #ffe66d;       /* Amarelo - destaque */
    --text-dark: #2c3e50;    /* Texto principal */
    --text-light: #7f8c8d;   /* Texto secundário */
    --bg-light: #f8f9fa;     /* Fundo claro */
}
```

### Adicionar Categorias de Receitas
Edite o `<select>` em `index.html`:
```html
<select id="categoria" required>
    <option value="">Selecione uma categoria</option>
    <option value="NovaCategoria">😊 Sua Categoria</option>
</select>
```

### Modificar Título/Descrição
Edite no `<header>` do `index.html`:
```html
<h1>👩‍🍳 Seu Novo Título</h1>
<p>Sua nova descrição aqui</p>
```

## 📸 Exemplo de Receita

Quando você preenche o formulário, a receita é armazenada assim:

```json
{
  "id": 1708800000000,
  "nome": "Bolo de Chocolate",
  "autor": "Maria Silva",
  "categoria": "Doces",
  "tempo": 45,
  "porcoes": 8,
  "ingredientes": "2 xícaras de farinha\n1 xícara de açúcar",
  "modo": "1. Misture os ingredientes\n2. Asse por 45 minutos",
  "imagem": "https://exemplo.com/foto.jpg",
  "observacoes": "Deixe esfriar antes de servir",
  "dataCriacao": "24/02/2026"
}
```

## ⚠️ Coisas Importantes

### Sobre os Dados
- Cada pessoa que abre o site no **seu navegador** tem seus próprios dados
- Se você abrir em outro navegador ou computador, verá dados vazios
- Para compartilhar dados entre computadores, você precisa:
  - Do lado do servidor: usar Firebase, Supabase, ou backend próprio
  - Ou coordenar com o proprietário do GitHub para adicionar receitas

### Imagens
- Use URLs públicas de imagens (Unsplash, Pexels, Imgur, etc)
- Se a imagem não carregar, aparece uma imagem padrão
- Evite links de imagens que possam expirar

### Limite de Dados
- localStorage tem limite de ~5-10MB
- Isso dá conta de centenas de receitas
- Se atingir o limite, algumas receitas antigas podem ser perdidas

## 🐛 Troubleshooting

**"As receitas desapareceram!"**
- Você pode ter limpado o cache/cookies do navegador
- Cada navegador tem seus próprios dados
- Tente abrir em um navegador diferente

**"Não consigo adicionar receitas"**
- Verifique se preencheu todos os campos obrigatórios (*)
- Tente recarregar a página
- Limpe o cache do navegador

**"Imagens não aparecem"**
- Verifique se a URL está correta
- Tente outra imagem de um site público
- Use sites como Unsplash.com ou Pexels.com

## 📝 Licença

Este projeto é de código aberto. Fique livre para:
- ✅ Usar para sua comunidade
- ✅ Modificar conforme quiser
- ✅ Criar versões melhoradas
- ✅ Compartilhar com amigos

## 💬 Dúvidas?

Tem dúvidas sobre como usar? Abra uma **Issue** no repositório GitHub ou converse com o proprietário do site!

---

**Feito com ❤️ para compartilhar delícias culinárias com a comunidade!** 👩‍🍳

*Cada receita aqui é um pedaço de amor, história e tradição. Obrigado por compartilhar!*
