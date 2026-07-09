/* ==========================================================
   Marina · 15 Anos — scripts
   ========================================================== */

/* ----------------------------------------------------------
   CONFIGURAÇÃO — edite aqui quando precisar
   ---------------------------------------------------------- */

// Data e hora da festa (horário de Brasília, GMT-3).
// Se o horário mudar, altere apenas esta linha:
const DATA_FESTA = new Date('2026-10-31T20:00:00-03:00');

// Link do Google Forms de confirmação de presença.
// Troque o texto abaixo pelo link real do formulário:
const LINK_RSVP = 'https://forms.gle/E1za71v6cTTYgJPK7';

/* ----------------------------------------------------------
   RSVP — aplica o link do formulário no botão
   ---------------------------------------------------------- */

const btnRsvp = document.getElementById('btn-rsvp');

if (LINK_RSVP.startsWith('http')) {
  btnRsvp.href = LINK_RSVP;
} else {
  // Enquanto o link não for configurado, avisa quem clicar
  btnRsvp.addEventListener('click', (e) => {
    e.preventDefault();
    alert('O formulário de confirmação estará disponível em breve!');
  });
}

/* ----------------------------------------------------------
   CONTAGEM REGRESSIVA
   ---------------------------------------------------------- */

const el = {
  dias:  document.getElementById('cd-dias'),
  horas: document.getElementById('cd-horas'),
  min:   document.getElementById('cd-min'),
  seg:   document.getElementById('cd-seg'),
  fim:   document.getElementById('cd-chegou'),
  box:   document.getElementById('countdown'),
};

const dois = (n) => String(n).padStart(2, '0');

function atualizaContagem() {
  const agora = new Date();
  let resta = DATA_FESTA - agora;

  if (resta <= 0) {
    el.box.hidden = true;
    el.fim.hidden = false;
    clearInterval(timer);
    return;
  }

  const s = Math.floor(resta / 1000);
  el.dias.textContent  = Math.floor(s / 86400);
  el.horas.textContent = dois(Math.floor((s % 86400) / 3600));
  el.min.textContent   = dois(Math.floor((s % 3600) / 60));
  el.seg.textContent   = dois(s % 60);
}

atualizaContagem();
const timer = setInterval(atualizaContagem, 1000);

/* ----------------------------------------------------------
   REVEAL AO ROLAR (IntersectionObserver)
   ---------------------------------------------------------- */

const observer = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visivel');
        observer.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((elemento) => observer.observe(elemento));

/* ----------------------------------------------------------
   ENVELOPE — porta de entrada do convite
   ---------------------------------------------------------- */

const envelopeGate = document.getElementById('envelope-gate');
const envelope = document.getElementById('envelope');
const btnAbrir = document.getElementById('abrir-convite');

document.body.classList.add('gate-ativo');

if (envelopeGate && envelope && btnAbrir) {
  btnAbrir.addEventListener('click', () => {
    envelope.classList.add('aberto');
    btnAbrir.disabled = true;

    setTimeout(() => {
      envelopeGate.classList.add('fechando');
    }, 650);

    setTimeout(() => {
      envelopeGate.style.display = 'none';
      document.body.classList.remove('gate-ativo');

      document.querySelector('header.hero')?.removeAttribute('inert');
      document.querySelector('main')?.removeAttribute('inert');
      document.querySelector('footer.rodape')?.removeAttribute('inert');

      const heroVideoEl = document.querySelector('.hero-video');
      if (heroVideoEl) {
        heroVideoEl.play().catch(() => {});
      }
    }, 1350);
  }, { once: true });
}

/* ----------------------------------------------------------
   VÍDEO DO HERO — som e movimento reduzido
   ---------------------------------------------------------- */

const heroVideo = document.querySelector('.hero-video');
const somToggle = document.getElementById('som-toggle');
const somIcone = document.getElementById('som-icone');
const somTexto = document.getElementById('som-texto');

const prefereMenosMovimento =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefereMenosMovimento && heroVideo) {
  // Respeita a preferência do sistema: não roda sozinho, mostra o poster
  heroVideo.removeAttribute('autoplay');
  heroVideo.removeAttribute('loop');
  heroVideo.pause();
}

if (heroVideo && somToggle) {
  somToggle.addEventListener('click', () => {
    heroVideo.muted = !heroVideo.muted;

    const comSom = !heroVideo.muted;
    somToggle.setAttribute('aria-pressed', String(comSom));
    somIcone.textContent = comSom ? '🔊' : '🔇';
    somTexto.textContent = comSom ? 'Silenciar' : 'Ativar som';

    if (comSom && heroVideo.paused) {
      heroVideo.play().catch(() => {});
    }
  });
}
