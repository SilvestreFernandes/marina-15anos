# Marina · 15 Anos 💛

Site de convite para a festa de 15 anos de Marina Fernandes da Silva.

**Festa:** 31 de outubro de 2026 · Edifício Suíça, Rua C 259, Goiânia — GO

## Estrutura

```
marina-15anos/
├── index.html        # página única do convite
├── css/style.css     # estilos (paleta vinho + dourado + champanhe)
├── js/script.js      # contagem regressiva, animações, som do vídeo e link do RSVP
├── video/
│   ├── convite-hero.mp4     # vídeo de abertura (hero)
│   └── convite-poster.jpg   # capa exibida antes do vídeo carregar
└── img/
    ├── monograma-mf.png
    └── marina.jpg
```

## O que você precisa configurar

Abra o arquivo `js/script.js` — as duas configurações ficam no topo:

1. **Link do RSVP (Google Forms):** troque `COLE_AQUI_O_LINK_DO_GOOGLE_FORMS`
   pelo link real do formulário. Enquanto não trocar, o botão mostra um aviso
   de "em breve".
2. **Horário da festa:** se o horário mudar de 21h, edite a linha
   `const DATA_FESTA = new Date('2026-10-31T21:00:00-03:00');`
   (só o `21:00:00`).

Para mudar a mensagem do convite, edite a seção `<!-- MENSAGEM -->` do
`index.html`.

## Sobre o vídeo do hero

O vídeo toca automaticamente sem som (é uma exigência dos navegadores —
autoplay com som é bloqueado). Tem um botão "Ativar som" no canto para
quem quiser ouvir com áudio. Ele fica em loop suave.

Se quiser trocar o vídeo depois, é só substituir o arquivo
`video/convite-hero.mp4` por outro (mantendo o mesmo nome), e opcionalmente
gerar uma nova capa/poster a partir do primeiro quadro.

## Como publicar no GitHub Pages

No PowerShell, dentro da pasta do projeto:

```powershell
git init
git add .
git commit -m "Site de convite - 15 anos da Marina"
git branch -M main
git remote add origin https://github.com/SilvestreFernandes/marina-15anos.git
git push -u origin main
```

(Antes disso, crie o repositório vazio `marina-15anos` em github.com/new,
público, sem README.)

Depois, no GitHub:

1. Vá em **Settings → Pages** no repositório
2. Em **Source**, escolha **Deploy from a branch**
3. Branch: **main**, pasta: **/ (root)** → **Save**
4. Em 1–2 minutos o site estará no ar em:
   `https://silvestrefernandes.github.io/marina-15anos/`

## Testar localmente

Basta abrir o `index.html` no navegador. Se quiser um servidor local:

```powershell
python -m http.server 8000
```

E acessar `http://localhost:8000`.
