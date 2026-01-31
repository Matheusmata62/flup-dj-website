# 🚀 GUIA PASSO-A-PASSO: DEPLOY NA VERCEL

## PASSO 1: Preparar Git (2 min)

### 1.1 - Abra PowerShell na pasta do projeto:
```powershell
cd "C:\Users\mathe\Desktop\flup\flup"
```

### 1.2 - Inicializar Git (se não tiver):
```powershell
git init
git add .
git commit -m "Initial commit: DJ Flup website ready for deployment"
```

### 1.3 - Criar repositório no GitHub:
- Acesse: https://github.com/new
- Nome: `flup-dj-website`
- Descrição: "DJ Flup - Landing page + Admin Panel"
- Público (para Vercel funcionar)
- Clique "Create repository"

### 1.4 - Conectar com GitHub local:
```powershell
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/flup-dj-website.git
git push -u origin main
```

---

## PASSO 2: Deploy na Vercel (5 min)

### 2.1 - Acessar Vercel:
- Acesse: https://vercel.com
- Clique "Sign Up"
- Escolha "Continue with GitHub"
- Autorize Vercel no GitHub

### 2.2 - Importar Projeto:
- Na dashboard Vercel, clique "Add New..." → "Project"
- Selecione `flup-dj-website`
- Clique "Import"

### 2.3 - Configurar Variáveis de Ambiente:
Antes de fazer deploy, adicione as variáveis:

**Environment Variables:**
```
DATABASE_URL = file:./prisma/dev.db
JWT_SECRET = gere-uma-chave-segura-aqui
NEXT_PUBLIC_API_URL = https://seu-deploy.vercel.app
```

Como gerar JWT_SECRET seguro:
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2.4 - Deploy:
- Clique "Deploy"
- Aguarde ~3-5 minutos
- Seu site estará em: `https://flup-dj-website.vercel.app`

---

## PASSO 3: Configurar Domínio (Opcional - 15 min)

### 3.1 - Comprar domínio (recomendado):
- Namecheap: https://www.namecheap.com
- GoDaddy: https://www.godaddy.com
- Registro: https://www.registro.br (brasileiros)

**Sugestões:**
- `djflup.com.br`
- `flupmusic.com.br`
- `djflupgoiania.com.br`

### 3.2 - Conectar com Vercel:
1. Na Vercel, vá para "Settings" → "Domains"
2. Cole seu domínio novo
3. Siga as instruções para apontar DNS

---

## PASSO 4: Configurar Banco de Dados em Produção (Opcional)

### Opção 1: Usar SQLite (atual - funciona mas não ideal)
- ✅ Funciona agora
- ❌ Não ideal para múltiplos usuários
- ❌ Sem backup automático

### Opção 2: Railway (Recomendado - R$ 20-50/mês)
1. Acesse: https://railway.app
2. Clique "Deploy"
3. Conecte GitHub
4. Selecione projeto
5. Crie banco PostgreSQL
6. Copie `DATABASE_URL` para Vercel

### Opção 3: Supabase (Alternativa - R$ 0-50/mês)
1. Acesse: https://supabase.com
2. Crie novo projeto
3. Copie `DATABASE_URL` para Vercel

---

## PASSO 5: Testar em Produção (5 min)

Após deploy ficar pronto (✅ Ready):

### 5.1 - Testar Landing Page:
- Abra `https://seu-deploy.vercel.app/`
- Verifique se todos os botões funcionam
- Teste responsividade (mobile, tablet, desktop)

### 5.2 - Testar Admin Panel:
- Vá para `/admin/login`
- Crie conta: `seu@email.com` / `senha123`
- Teste criar evento
- Teste editar evento
- Teste exportar PDF

---

## PASSO 6: Configurar Email Automático (Bônus - 30 min)

### Usar Brevo (recomendado):
1. Acesse: https://www.brevo.com
2. Crie conta gratuita
3. Configure chave API
4. Adicione em `.env`:
```
BREVO_API_KEY=sua_chave_aqui
BREVO_FROM_EMAIL=seu@email.com
```

---

## ✅ Checklist Final

- [ ] Git iniciado e código no GitHub
- [ ] Vercel conectado e fazendo deploy
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy pronto (status ✅)
- [ ] Landing page testada
- [ ] Admin panel testado
- [ ] Domínio apontando (se comprou)
- [ ] Banco de dados em produção (opcional)
- [ ] Pronto para vender!

---

## 🎯 Depois de Tudo Pronto

1. **Compartilhe o link com clientes:**
   - `https://seu-deploy.vercel.app`
   - Ou seu domínio: `https://seu-dominio.com.br`

2. **Comece a vender:**
   - Contate clientes potenciais
   - Mostre o portfólio do DJ
   - Divulgue agenda de shows
   - Receba pedidos via email/WhatsApp

3. **Adicione depois:**
   - Formulário de contato
   - Sistema de pagamento
   - Notificações por email/WhatsApp
   - Analytics

---

## 🆘 Problemas Comuns

### "Deploy failing"
- Verifique se `npm run build` funciona localmente
- Confira variáveis de ambiente
- Veja logs na dashboard Vercel

### "Database connection error"
- Confira `DATABASE_URL` em produção
- Se usar SQLite: funciona mas lenta com múltiplos usuários
- Considere migrar para PostgreSQL

### "Login não funciona"
- Verifique `JWT_SECRET` está configurado
- Limpe cookies do navegador
- Teste em modo anônimo

---

**Tempo Total Estimado: 30-45 minutos**
**Custo: Grátis (Vercel free tier)**
**Resultado: Site profissional online! 🚀**

---

Dúvidas? Volte aqui! Vou ajudar em cada passo!
