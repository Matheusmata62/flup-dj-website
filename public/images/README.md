# 📸 Como Adicionar as Fotos do DJ Flup

## 📁 Localização das Imagens

As imagens devem ser salvas em:
```
c:\Users\mathe\Desktop\flup\flup\public\images\
```

## 📷 Nomes das Imagens

Salve suas 4 fotos com os seguintes nomes:

| # | Foto | Nome do Arquivo |
|---|------|-----------------|
| 1 | DJ em setup (P&B) | `dj-setup-bw.jpg` |
| 2 | DJ em show com laser | `dj-show-laser.jpg` |
| 3 | DJ em palco com multidão | `dj-palco-multidao.jpg` |
| 4 | DJ Lifestyle (neon/carro) | `dj-lifestyle.jpg` |

## ✅ Passo a Passo

### 1️⃣ Abra a Pasta
```
c:\Users\mathe\Desktop\flup\flup\public\images\
```

### 2️⃣ Copie as Imagens
- Foto 1 (P&B setup) → renomeie para `dj-setup-bw.jpg`
- Foto 2 (Show laser) → renomeie para `dj-show-laser.jpg`
- Foto 3 (Multidão) → renomeie para `dj-palco-multidao.jpg`
- Foto 4 (Lifestyle) → renomeie para `dj-lifestyle.jpg`

### 3️⃣ Cole Todas as 4 Imagens na Pasta
A pasta deve ficar assim:
```
public/images/
├── dj-setup-bw.jpg
├── dj-show-laser.jpg
├── dj-palco-multidao.jpg
└── dj-lifestyle.jpg
```

### 4️⃣ Recarregue o Navegador
Abra http://localhost:3000 e veja as fotos aparecerem!

## 🔄 Layout da Galeria

As 4 fotos serão usadas assim:
- **Slot 1**: dj-setup-bw.jpg (destaque, 2 linhas)
- **Slot 2**: dj-show-laser.jpg
- **Slot 3**: dj-palco-multidao.jpg
- **Slot 4**: dj-lifestyle.jpg
- **Slot 5**: dj-palco-multidao.jpg (repetida)
- **Slot 6**: dj-setup-bw.jpg (repetida)

Total: 6 fotos na galeria usando as 4 originais.

## 💾 Formatos Suportados

✅ JPG/JPEG
✅ PNG
✅ WebP
✅ GIF

## 🎨 Qualidade Recomendada

- **Resolução**: Mínimo 500x500px
- **Tamanho**: Até 2MB por imagem
- **Formato**: JPG (melhor compressão)

## 🔗 Uso Dinâmico

Se quiser adicionar mais imagens depois, basta:
1. Adicionar novos arquivos em `public/images/`
2. Editar `app/components/GallerySection.tsx`
3. Adicionar novos objetos ao array `galleryImages`

Exemplo:
```tsx
{
  id: 7,
  title: 'Sua Nova Foto',
  category: 'Performance',
  url: '/images/nova-foto.jpg',
}
```

---

**Pronto! Suas fotos aparecerão automaticamente no site! 🎉**
