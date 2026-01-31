# Guia de Customização - DJ Flup Landing Page

## 🎯 Como Personalizar o Site

### 1. **Alterar Informações de Contato**

Edite os arquivos de componentes:

- **Header.tsx** e **ContactSection.tsx**: Botão WhatsApp
- **ContactSection.tsx**: Email, telefone, endereço
- **Footer.tsx**: Redes sociais

### 2. **Alterar Cores Neon**

Edite o arquivo `app/globals.css`:

```css
:root {
  --neon-green: #00ff41;    /* Altere para sua cor neon verde */
  --neon-blue: #00d4ff;     /* Altere para sua cor neon azul */
}
```

### 3. **Alterar Preços dos Pacotes**

Edite `app/components/PackagesSection.tsx`:

```tsx
const packages = [
  {
    id: 1,
    name: 'Básico',
    price: 250,  // Altere aqui
    // ...
  },
  // ...
];
```

### 4. **Alterar Imagens da Galeria**

Edite `app/components/GallerySection.tsx`:

```tsx
const galleryImages = [
  {
    url: 'https://suas-imagens.com/foto1.jpg', // Altere a URL aqui
    // ...
  },
  // ...
];
```

### 5. **Alterar Textos Principais**

- **Hero Section**: `app/components/HeroSection.tsx`
- **Pacotes**: `app/components/PackagesSection.tsx`
- **Sobre**: `app/components/GallerySection.tsx`
- **Responsabilidades**: `app/components/ResponsibilitiesSection.tsx`

### 6. **Alterar Logo**

Edite `app/components/Header.tsx` e `app/components/Footer.tsx`:

```tsx
<div className="text-3xl font-black neon-text-green">
  flup  {/* Altere para seu nome */}
</div>
```

### 7. **Adicionar Redes Sociais**

Edite `app/components/Footer.tsx`:

```tsx
const socialLinks = [
  {
    name: 'Instagram',
    url: 'https://instagram.com/seuusuario',  // Altere aqui
    icon: Instagram,
  },
  // ...
];
```

### 8. **Personalize o Favicon**

Substitua o arquivo `app/favicon.ico` com seu próprio ícone.

## 🚀 Deploy

### Deploy no Vercel (Recomendado)

1. Faça push do seu repositório para GitHub
2. Vá em https://vercel.com
3. Clique em "New Project"
4. Selecione seu repositório
5. Clique em "Deploy"

### Deploy em Outro Host

```bash
npm run build
npm start
```

## 🔧 Troubleshooting

### Problema: "Module not found"

```bash
npm install
npm run dev
```

### Problema: Estilos não aparecem

Certifique-se de que você está usando classes Tailwind CSS corretas.

### Problema: Imagens não carregam

Verifique as URLs das imagens e certifique-se de que têm acesso público.

## 📱 Testes de Responsividade

Use o DevTools do navegador (F12) para testar em diferentes tamanhos:
- Mobile: 375px - 425px
- Tablet: 768px - 1024px
- Desktop: 1280px+

## 🎨 Adicionar Componentes Extras

Para adicionar novas seções, crie um novo arquivo em `app/components/` e importe-o em `app/page.tsx`.

Exemplo:
```tsx
import Testimonials from './components/Testimonials';

export default function Home() {
  return (
    <div className="bg-black text-white overflow-hidden">
      {/* ... outros componentes */}
      <Testimonials />
      {/* ... */}
    </div>
  );
}
```

---

Para mais ajuda, consulte a [documentação do Next.js](https://nextjs.org/docs).
