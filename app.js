let currentFilter = 'all';
let currentSearch = '';

function toggleQuery(id, headerEl) {
  const body = document.getElementById('body-' + id);
  const toggle = headerEl.querySelector('.query-toggle');
  const isOpen = body.classList.contains('open');

  document.querySelectorAll('.query-body').forEach(b => b.classList.remove('open'));
  document.querySelectorAll('.query-header').forEach(h => {
    h.classList.remove('open');
    h.querySelector('.query-toggle').textContent = '+';
  });

  if (!isOpen) {
    body.classList.add('open');
    headerEl.classList.add('open');
    toggle.textContent = '−';
  }
}

function showResult(id, btn) {
  const box = document.getElementById(id);
  const showing = box.classList.toggle('show');
  btn.innerHTML = showing
    ? '&#9654; Ocultar resultado'
    : '&#9654; Simular resultado';
}

function setFilter(level, btn) {
  currentFilter = level;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  applyFilters();
}

function doSearch(val) {
  currentSearch = val.trim().toLowerCase();
  applyFilters();
}

function applyFilters() {
  const cards = document.querySelectorAll('.query-card');
  let visible = 0;

  cards.forEach(card => {
    const level = card.dataset.level;
    const text = (card.dataset.text + ' ' + card.innerText).toLowerCase();
    const levelOk = currentFilter === 'all' || level === currentFilter;
    const searchOk = currentSearch === '' || text.includes(currentSearch);

    if (levelOk && searchOk) {
      card.classList.remove('hidden');
      visible++;
    } else {
      card.classList.add('hidden');
    }
  });

  const countEl = document.getElementById('search-count');
  const noRes = document.getElementById('no-results');
  const noResTerm = document.getElementById('no-results-term');

  if (currentSearch !== '') {
    countEl.textContent =
      visible + ' consulta' + (visible !== 1 ? 's' : '') +
      ' encontrada' + (visible !== 1 ? 's' : '');
  } else {
    countEl.textContent = '';
  }

  if (visible === 0) {
    noRes.classList.add('show');
    noResTerm.textContent = currentSearch;
  } else {
    noRes.classList.remove('show');
  }
}
