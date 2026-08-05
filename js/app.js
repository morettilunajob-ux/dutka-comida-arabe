// ---- Status ao vivo ----

function horaAgoraSP() {
  const partes = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(new Date());

  const mapa = Object.fromEntries(partes.map(p => [p.type, p.value]));
  return { hora: Number(mapa.hour), minuto: Number(mapa.minute) };
}

function statusAgora() {
  const { abre, fecha } = DADOS.horario;
  const { hora, minuto } = horaAgoraSP();
  const agora = hora * 60 + minuto;

  if (agora >= abre * 60 && agora < fecha * 60) {
    const faltam = fecha * 60 - agora;
    return {
      aberto: true,
      texto: faltam <= 60 ? `Aberto · fecha em ${faltam} min` : `Aberto agora · até ${fecha}h`
    };
  }
  return {
    aberto: false,
    texto: hora < abre ? `Fechado · abre hoje às ${abre}h` : `Fechado · abre amanhã às ${abre}h`
  };
}

function renderStatus() {
  const el = document.getElementById('status-selo');
  if (!el) return;
  const { aberto, texto } = statusAgora();
  el.textContent = texto;
  el.classList.toggle('selo--aberto', aberto);
  el.classList.toggle('selo--fechado', !aberto);
}

// ---- Render de conteúdo a partir de dados.js ----

function renderContato() {
  document.querySelectorAll('[data-telefone-link]').forEach(el => {
    el.href = `tel:${DADOS.contato.telefoneLink}`;
  });
  document.querySelectorAll('[data-telefone-texto]').forEach(el => {
    el.textContent = DADOS.contato.telefone;
  });

  if (DADOS.contato.whatsapp) {
    document.querySelectorAll('[data-whatsapp]').forEach(el => {
      el.href = `https://wa.me/${DADOS.contato.whatsapp}`;
      el.hidden = false;
    });
  }

  if (DADOS.contato.instagram) {
    document.querySelectorAll('[data-instagram]').forEach(el => {
      el.href = `https://instagram.com/${DADOS.contato.instagram}`;
      el.hidden = false;
    });
  }
}

function renderEndereco() {
  const { rua, bairro, cidade, estado, cep } = DADOS.endereco;
  const linha = `${rua} — ${bairro}, ${cidade}/${estado} — ${cep}`;
  document.querySelectorAll('[data-endereco]').forEach(el => {
    el.textContent = linha;
  });

  const gmaps = `https://www.google.com/maps/search/?api=1&query=${DADOS.endereco.lat},${DADOS.endereco.lng}`;
  const waze = `https://waze.com/ul?ll=${DADOS.endereco.lat},${DADOS.endereco.lng}&navigate=yes`;
  document.querySelectorAll('[data-google-maps]').forEach(el => { el.href = gmaps; });
  document.querySelectorAll('[data-waze]').forEach(el => { el.href = waze; });
}

function renderAvaliacoes() {
  const { nota, total, fonte } = DADOS.avaliacoes;
  document.querySelectorAll('[data-avaliacao]').forEach(el => {
    el.textContent = `${nota} ★ · ${total} avaliações no ${fonte}`;
  });
}

function formatarPreco(preco) {
  return preco === null || preco === undefined ? '—' : `R$ ${preco.toFixed(2).replace('.', ',')}`;
}

function renderCardapio() {
  const container = document.getElementById('cardapio-lista');
  if (!container) return;

  container.innerHTML = DADOS.cardapio.map(grupo => `
    <div class="cardapio-grupo">
      <h3 class="cardapio-categoria">${grupo.categoria}</h3>
      ${grupo.nota ? `<p class="cardapio-nota">${grupo.nota}</p>` : ''}
      <ul class="cardapio-itens">
        ${grupo.itens.map(item => `
          <li class="cardapio-item">
            <div class="cardapio-item-cabecalho">
              <span class="cardapio-item-nome">${item.nome}</span>
              <span class="cardapio-item-preco">${formatarPreco(item.preco)}</span>
            </div>
            ${item.descricao ? `<p class="cardapio-item-descricao">${item.descricao}</p>` : ''}
          </li>
        `).join('')}
      </ul>
    </div>
  `).join('');
}

function renderDepoimentos() {
  const container = document.getElementById('depoimentos-lista');
  if (!container) return;

  container.innerHTML = DADOS.depoimentos.map(dep => `
    <blockquote class="depoimento">
      <p>"${dep.texto}"</p>
      <cite>— ${dep.autor}</cite>
    </blockquote>
  `).join('');
}

function renderServicos() {
  const container = document.getElementById('servicos-lista');
  if (!container) return;
  container.innerHTML = DADOS.servicos.map(s => `<li>${s}</li>`).join('');
}

// ---- Mapa Leaflet, carregado sob demanda ----

function carregarLeaflet() {
  return new Promise((resolve, reject) => {
    if (window.L) { resolve(); return; }
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'vendor/leaflet.css';
    document.head.appendChild(css);

    const script = document.createElement('script');
    script.src = 'vendor/leaflet.js';
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

function iniciarMapa() {
  const el = document.getElementById('mapa');
  if (!el || el.dataset.iniciado) return;
  el.dataset.iniciado = 'true';

  carregarLeaflet().then(() => {
    const { lat, lng } = DADOS.endereco;
    const mapa = L.map(el).setView([lat, lng], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(mapa);
    L.marker([lat, lng]).addTo(mapa).bindPopup(`${DADOS.nome} — ${DADOS.endereco.rua}`);
  });
}

function observarMapa() {
  const el = document.getElementById('mapa');
  if (!el) return;

  if (!('IntersectionObserver' in window)) {
    iniciarMapa();
    return;
  }

  const observer = new IntersectionObserver(entradas => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        iniciarMapa();
        observer.disconnect();
      }
    });
  }, { rootMargin: '200px' });

  observer.observe(el);
}

// ---- Inicialização ----

document.addEventListener('DOMContentLoaded', () => {
  renderStatus();
  setInterval(renderStatus, 60000);
  renderContato();
  renderEndereco();
  renderAvaliacoes();
  renderCardapio();
  renderDepoimentos();
  renderServicos();
  observarMapa();
});
