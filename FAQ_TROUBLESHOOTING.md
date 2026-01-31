# 🆘 FAQ & TROUBLESHOOTING - DJ FLUP

## ❓ Perguntas Frequentes

### P: Quanto custa hospedar?
**R:** Grátis até 100GB/mês na Vercel (suficiente para começar)
- Depois: ~R$ 50-100/mês se precisar upgrade

### P: Posso mudar as cores/design?
**R:** Sim! Edite em `app/globals.css`
- Cores neon: busque por `#00ff41` (verde) e `#00d4ff` (azul)

### P: Como adicionar mais fotos?
**R:** Coloque em `public/images/` e importe em `app/components/GallerySection.tsx`

### P: Pode adicionar mais eventos iniciais?
**R:** Sim! Edite `prisma/seed.ts` e rode:
```powershell
npx prisma db seed
```

### P: Como mudar o nome "DJ Flup"?
**R:** 
1. `app/components/Header.tsx` - Logo
2. `app/components/HeroSection.tsx` - Título
3. `/admin/configuracoes` - Nome no painel
4. `FUNCIONAMENTO.md` - Documentação

---

## 🐛 Erros Comuns & Soluções

### Erro: "npm: term 'npm' is not recognized"
**Solução:** Reinicie o PowerShell ou instale Node.js
```powershell
node -v  # Deve retornar versão do Node
```

### Erro: "Port 3000 already in use"
**Solução:** Mude a porta ou mate o processo:
```powershell
npm run dev -- -p 3001  # Use porta 3001
```

### Erro: "DATABASE connection refused"
**Solução:** Recrie o banco:
```powershell
npx prisma migrate reset
npx prisma db seed
```

### Erro: "Module not found"
**Solução:** Reinstale dependências:
```powershell
npm install
```

### Erro: "Build failed on Vercel"
**Solução:** 
1. Verifique se `npm run build` funciona localmente
2. Confira as variáveis de ambiente em Vercel
3. Veja os logs na dashboard

---

## 🔧 Troubleshooting by Feature

### Login não funciona
- [ ] Confira se JWT_SECRET está em .env
- [ ] Verifique se o banco existe: `prisma/dev.db`
- [ ] Teste com novo usuário

### Eventos não aparecem
- [ ] Rode seed: `npx prisma db seed`
- [ ] Confira DATABASE_URL
- [ ] Verifique se /api/events retorna dados

### Editar evento dá erro
- [ ] Confira se o evento existe
- [ ] Verifique validação do formulário
- [ ] Veja console do browser (F12)

### PDF não exporta
- [ ] Confirme se tem eventos
- [ ] Verifique se /api/export/pdf está rodando
- [ ] Teste em navegador diferente

### Landing page não carrega fotos
- [ ] Confira se imagens estão em `public/images/`
- [ ] Verifique nomes dos arquivos (case-sensitive)
- [ ] Limpe cache do navegador (Ctrl+Shift+Delete)

---

## 🚀 Deploy: Troubleshooting

### "Repository not found" ao fazer push
**Solução:** Verifique URL do repositório:
```powershell
git remote -v  # Vê a URL
git remote remove origin  # Remove
git remote add origin https://github.com/SEU_USUARIO/flup-dj-website.git  # Adiciona
```

### Vercel não encontra o repositório
**Solução:**
1. Faça push para GitHub ANTES de conectar Vercel
2. Verifique se repositório é público
3. Autorize Vercel no GitHub

### Deploy falha com "out of memory"
**Solução:** Aumente recursos (pode custar)
- Ou considere migrar para Railway/Render

### Site online mas dados não sincronizam
**Solução:**
1. Use PostgreSQL em produção (Railway)
2. Confira DATABASE_URL
3. Rode migrations em produção

---

## 📱 Testes Recomendados

### Antes de vender:

- [ ] Landing page carrega rápido (< 3s)
- [ ] Menu responsivo (teste mobile)
- [ ] Fotos aparecem
- [ ] Música toca
- [ ] Formulário valida
- [ ] WhatsApp button funciona

### Admin Panel:

- [ ] Login funciona
- [ ] Dashboard mostra stats
- [ ] Calendário navega
- [ ] Criar evento funciona
- [ ] Editar evento funciona
- [ ] Deletar evento funciona
- [ ] PDF exporta
- [ ] Configurações salva

### Em Produção:

- [ ] Acesso via domínio
- [ ] HTTPS ativo
- [ ] Loading rápido
- [ ] Sem erros no console (F12)
- [ ] Sem erros no server

---

## 🔑 Senhas & Chaves Importantes

### Não compartilhe:
- `JWT_SECRET` (arquivo `.env`)
- Credenciais do banco de dados
- API keys (email, WhatsApp, etc)
- Senhas de admin

### Armazene seguro:
- 1Password, Bitwarden ou LastPass
- Não coloque em Git!
- Configure em variáveis de ambiente

---

## 🎓 Como Aprender Mais

### Documentação Oficial:
- Next.js: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs
- Vercel: https://vercel.com/docs
- Tailwind: https://tailwindcss.com

### Recursos Úteis:
- TypeScript: https://www.typescriptlang.org/docs
- React: https://react.dev
- JWT: https://jwt.io

---

## 📞 Suporte Externo

Se encontrar problemas além dessa doc:

**Para problemas de deploy:**
- Vercel Docs: https://vercel.com/docs
- GitHub Issues: https://github.com/vercel/next.js/issues

**Para problemas de banco:**
- Prisma Forum: https://github.com/prisma/prisma/discussions
- Railway Docs: https://docs.railway.app

**Para segurança:**
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- Node.js Security: https://nodejs.org/en/docs/guides/security/

---

## ✨ Tips & Tricks

### Performance:
```powershell
npm run build  # Vê tamanho dos bundles
```

### Debugging:
```javascript
// Em qualquer arquivo:
console.log('Debug:', data)  // Ver no terminal/console
```

### Variáveis de Ambiente:
```powershell
# Criar .env.local com:
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="sua-chave-super-secreta"

# Não fazer commit disso!
```

---

**Problema não listado aqui?**
Considere:
1. Ler a documentação oficial do projeto usado
2. Fazer uma pergunta no Stack Overflow
3. Procurar em GitHub Issues
4. Consultar fóruns da comunidade

---

**Boa sorte! 🚀**
