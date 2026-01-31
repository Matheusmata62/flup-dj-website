# ⚙️ ATUALIZAR INFORMAÇÕES DO DJ FLUP

## 📞 Números e Contatos Placeholder

O site atualmente usa números de exemplo. Você precisará atualizar:

### Números Atuais
- **WhatsApp**: (62) 9 9999-9999
- **Email**: contato@djflup.com
- **Localização**: Goiânia, Goiás

---

## 🔄 Como Atualizar Cada Informação

### 1️⃣ WhatsApp Number

**Arquivo 1: `app/components/Header.tsx`**
```tsx
// Procure por:
<a href="#contact" className="btn-neon-green ...">

// O link está em ContactSection
```

**Arquivo 2: `app/components/ContactSection.tsx`**
```tsx
// Procure por:
href="https://wa.me/5562999999999"

// Mude para seu número (sem formatação):
href="https://wa.me/55XXXXXXXXXXX"

// Exemplo: 62 9 9999-9999 → 5562999999999
```

**Arquivo 3: `app/components/WhatsAppButton.tsx`**
```tsx
// Procure por:
const whatsappUrl = 'https://wa.me/5562999999999?text=...';

// Mude para seu número
```

### 2️⃣ Email

**Arquivo: `app/components/ContactSection.tsx`**
```tsx
// Procure por:
href="mailto:contato@djflup.com"

// Mude para:
href="mailto:seu@email.com"

// E atualize o texto:
<p className="text-gray-400 text-sm">seu@email.com</p>
```

**Arquivo: `app/components/Footer.tsx`**
```tsx
// Se houver email no footer, atualize também
```

### 3️⃣ Redes Sociais

**Arquivo: `app/components/Footer.tsx`**
```tsx
const socialLinks = [
  {
    name: 'Instagram',
    url: 'https://instagram.com/seuusuario',  // Mude aqui
    icon: Instagram,
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/seuusuario',   // E aqui
    icon: Facebook,
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@seucanal',     // E aqui
    icon: Youtube,
  },
];
```

### 4️⃣ Localização

**Arquivo: `app/components/ContactSection.tsx`**
```tsx
// Procure por:
<p className="text-gray-500 text-sm mt-2">
  Atendemos eventos em toda Goiânia e região metropolitana
</p>

// Mude conforme necessário
```

---

## 🖼️ Como Atualizar Imagens

### Hero Background Image

**Arquivo: `app/components/HeroSection.tsx`**
```tsx
backgroundImage: 'url(https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=1200&fit=crop)',

// Mude para sua URL (use Unsplash, Pexels, ou hospedagem própria)
```

### Gallery Images

**Arquivo: `app/components/GallerySection.tsx`**
```tsx
const galleryImages = [
  {
    id: 1,
    title: 'Performance ao Vivo',
    category: 'Performance',
    url: 'https://images.unsplash.com/...', // Mude aqui
  },
  // ... mais 5 imagens
];
```

**Sugestões de Sites de Imagens:**
- Unsplash.com (gratuito)
- Pexels.com (gratuito)
- Pixabay.com (gratuito)
- Sua hospedagem pessoal

---

## 💰 Como Atualizar Preços

**Arquivo: `app/components/PackagesSection.tsx`**
```tsx
const packages = [
  {
    id: 1,
    name: 'Básico',
    price: 250,        // Mude aqui
    description: 'Perfeito para eventos menores',
    features: [
      '1 hora de set',  // Mude aqui também
      'Vídeo simples',
      'Foco em custo-benefício',
    ],
    highlighted: false,
  },
  {
    id: 2,
    name: 'Intermediário',
    price: 600,        // Mude aqui
    description: 'O mais popular entre nossos clientes',
    features: [
      '2 horas de set', // Mude aqui
      'After Movie (vídeo editado)',
      // ... mais features
    ],
    highlighted: true,
    badge: 'Mais Popular',
  },
  {
    id: 3,
    name: 'Completo',
    price: 1600,       // Mude aqui
    description: 'Experiência premium e inesquecível',
    features: [
      'Up to 4 horas de set', // Mude aqui
      // ... mais features
    ],
    highlighted: false,
  },
];
```

---

## 📝 Como Atualizar Textos

### Título Principal

**Arquivo: `app/components/HeroSection.tsx`**
```tsx
<h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
  <span className="neon-text-green">DJ flup:</span>
  <br />
  <span className="text-white">A Energia que o seu</span>
  <br />
  <span className="neon-text-blue">Evento Merece</span>
</h1>
```

### Subtítulo

```tsx
<p className="text-lg sm:text-xl text-gray-300 mb-10">
  Transformando pistas em Goiânia com shows de alto impacto visual e leitura de pista única.
  Experiências que deixam seus convidados vibrando!
</p>
```

### Logo

**Arquivo: `app/components/Header.tsx` e `app/components/Footer.tsx`**
```tsx
<div className="text-3xl font-black neon-text-green">
  flup  {/* Mude para seu nome */}
</div>
```

---

## 🎨 Como Atualizar Cores

**Arquivo: `app/globals.css`**
```css
:root {
  --neon-green: #00ff41;    /* Mude para sua cor verde */
  --neon-blue: #00d4ff;     /* Mude para sua cor azul */
  --dark-gray: #1a1a1a;
  --dark-charcoal: #0f0f0f;
}
```

---

## ✅ Checklist de Atualização

- [ ] WhatsApp (3 arquivos)
- [ ] Email
- [ ] Redes Sociais
- [ ] Imagens (Hero + Galeria)
- [ ] Preços dos pacotes
- [ ] Descrições dos pacotes
- [ ] Título principal
- [ ] Subtítulo
- [ ] Logo/Nome
- [ ] Cores neon (opcional)

---

## 🚀 Como Testar Mudanças

1. Faça uma mudança em um arquivo
2. O site recarrega automaticamente (Hot Reload)
3. Abra seu navegador em http://localhost:3000
4. Veja a mudança em tempo real

---

## 💾 Quando Estiver Pronto

```bash
npm run build
npm start
```

Seu site estará 100% customizado e pronto para produção!

---

## 📞 Suporte

Se tiver dúvidas:
1. Veja `CUSTOMIZATION.md` para mais detalhes
2. Consulte `DEVELOPMENT.md` para desenvolvimento avançado
3. Procure pelos comentários nos arquivos `.tsx`

---

**Não esqueça: Salve o arquivo depois de fazer mudanças!** 💾

✅ Seu site está pronto para ser personalizado!
