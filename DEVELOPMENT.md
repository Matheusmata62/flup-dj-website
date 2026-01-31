# Instruções de Desenvolvimento - DJ Flup Landing Page

## 🏃 Quick Start

```bash
# Instalar dependências
npm install

# Executar servidor de desenvolvimento
npm run dev

# Abrir no navegador
# http://localhost:3000
```

## 📂 Estrutura de Arquivos Importantes

### Componentes Principais
- `Header.tsx` - Menu de navegação
- `HeroSection.tsx` - Seção destaque
- `GallerySection.tsx` - Galeria de imagens
- `PackagesSection.tsx` - Tabela de preços
- `ResponsibilitiesSection.tsx` - Condições e requisitos
- `ContactSection.tsx` - Formulário de contato
- `Footer.tsx` - Rodapé
- `WhatsAppButton.tsx` - Botão flutuante

### Estilos
- `globals.css` - Estilos globais e variáveis CSS

## 🎨 Editando Estilos

### Tailwind CSS
Use classes Tailwind diretamente nos componentes:

```tsx
<div className="bg-black text-white p-4 rounded-lg hover:bg-dark-gray">
  Conteúdo
</div>
```

### Cores Personalizadas
Edite as variáveis em `globals.css`:

```css
:root {
  --neon-green: #00ff41;
  --neon-blue: #00d4ff;
}
```

## 🎬 Editando Animações

Todos os componentes usam Framer Motion:

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Conteúdo animado
</motion.div>
```

### Propriedades Comuns
- `initial` - Estado inicial
- `animate` - Estado final
- `whileHover` - Ao passar o mouse
- `transition` - Duração e easing

## 📝 Editando Textos e Conteúdos

### Textos do Hero
Edite em `app/components/HeroSection.tsx`:

```tsx
<h1 className="text-5xl sm:text-6xl lg:text-7xl font-black">
  Seu título aqui
</h1>
```

### Packages
Edite o array `packages` em `PackagesSection.tsx`:

```tsx
const packages = [
  {
    id: 1,
    name: 'Seu Pacote',
    price: 1000,
    description: 'Descrição...',
    features: ['Feature 1', 'Feature 2'],
    // ...
  }
];
```

### Contatos
Atualize em múltiplos arquivos:
- `Header.tsx` - Link CTA
- `ContactSection.tsx` - Formulário
- `WhatsAppButton.tsx` - Link WhatsApp
- `Footer.tsx` - Links sociais

## 🖼️ Adicionando Imagens

### Hero Background
Em `HeroSection.tsx`:

```tsx
backgroundImage: 'url(https://sua-imagem.com/foto.jpg)'
```

### Galeria
Em `GallerySection.tsx`:

```tsx
const galleryImages = [
  {
    id: 1,
    title: 'Título',
    url: 'https://sua-imagem.com/foto1.jpg',
  }
];
```

## 🔗 Adicionando Links

### Navegação Interna
```tsx
<a href="#about">Link</a>
```

### Links Externos
```tsx
<a href="https://site.com" target="_blank" rel="noopener noreferrer">
  Link Externo
</a>
```

## ✅ Validação de Formulário

O formulário em `ContactSection.tsx` usa validação HTML nativa:

```tsx
<input
  type="email"
  required
  className="..."
/>
```

Para validação avançada, considere usar bibliotecas como `react-hook-form`.

## 📱 Testando Responsividade

### Via DevTools (F12)
1. Abra DevTools (F12 ou Cmd+Option+I)
2. Clique no ícone de dispositivo
3. Selecione diferentes tamanhos

### Tamanhos Comuns
- iPhone 12: 390x844
- iPad: 768x1024
- Desktop: 1920x1080

## 🔍 Debug

### Console
Abra o console (F12 > Console) para ver mensagens e erros.

### React DevTools
Instale a extensão "React Developer Tools" para debugar componentes.

### Network
Monitore requisições em F12 > Network.

## 📦 Buildando para Produção

```bash
# Build otimizado
npm run build

# Testar build localmente
npm start
```

## 🚀 Deployment

### Vercel
1. Push para GitHub
2. Conectar em vercel.com
3. Deploy automático

### Manual
```bash
npm run build
npm start
```

## 🐛 Troubleshooting

### Problema: Página não atualiza
- Limpe cache: Ctrl+Shift+Delete
- Reinicie servidor: Ctrl+C e `npm run dev`

### Problema: Estilos não aparecem
- Certifique-se de estar usando classes Tailwind
- Limpe cache do tailwind: `npm run build` depois `npm run dev`

### Problema: Imagens não carregam
- Verifique URLs das imagens
- Teste a URL no navegador
- Considere usar URLs HTTPS

### Problema: Animações lentas
- Reduza a duração em `transition`
- Verifique performance (F12 > Performance)

## 💡 Boas Práticas

1. **Commits Frequentes**: Faça commits pequenos e descritivos
2. **Nomes Significativos**: Use nomes claros para componentes e variáveis
3. **Comentários**: Adicione comentários para código complexo
4. **Mobile First**: Sempre teste em mobile primeiro
5. **Performance**: Use Next.js Image para imagens

## 📚 Recursos Úteis

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Lucide Icons](https://lucide.dev)

## 📞 Suporte

Para dúvidas sobre customização, consulte `CUSTOMIZATION.md`.

---

Happy coding! 🚀
