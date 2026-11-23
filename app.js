(function () {
  function start() {
    const atlas = window.AtlasAutomation;
    if (!atlas) return;
    const { workflows, classify, buildResult } = atlas;
    const state = { runs: [], selected: null, values: {} };
    const $ = (selector) => document.querySelector(selector);
    const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    document.querySelectorAll('.nav').forEach((button) => button.addEventListener('click', () => {
      document.querySelectorAll('.nav').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      document.querySelectorAll('.view').forEach((view) => view.classList.add('hidden'));
      $('#' + button.dataset.view).classList.remove('hidden');
    }));

    function renderClassification(id) {
      const workflow = workflows[id];
      $('#classification').innerHTML = `<div class="classification"><div class="workflow-icon">${workflow.icon}</div><div><span class="match">DESTEKLENEN PLAYBOOK / ${workflow.id.toUpperCase()}</span><h3>${workflow.name}</h3><p>${workflow.description}</p></div></div><div class="confidence"><span>Güven</span><b>Yüksek</b><div class="bar"><i></i></div><span>Kural eşleşmesi</span></div><div class="fields">${workflow.fields.map((field) => `<label>${field.label}${field.type === 'select' ? `<select data-field="${field.id}">${field.options.map((option) => `<option ${option === field.value ? 'selected' : ''}>${option}</option>`).join('')}</select>` : `<input data-field="${field.id}" type="${field.type}" value="${esc(field.value)}">`}</label>`).join('')}</div>`;
      document.querySelectorAll('[data-field]').forEach((field) => field.addEventListener('input', () => { state.values[field.dataset.field] = field.value; }));
    }

    function renderPlan(id) {
      const workflow = workflows[id];
      $('#plan').innerHTML = `<div class="plan-head"><b>${workflow.name}</b><span>ONAY BEKLİYOR</span></div><ol>${workflow.steps.map((step) => `<li>${step}</li>`).join('')}</ol><div class="guardrail">◉ <span><b>İnsan onayı gerekli</b><br>FlowPilot e-posta göndermez, satın alma yapmaz ve dış sistemleri değiştirmez.</span></div><button class="primary full" id="run">Yerel olarak onayla <span>→</span></button>`;
      $('#run').addEventListener('click', run);
    }

    function analyze() {
      const id = classify($('#request').value);
      state.selected = id;
      state.values = Object.fromEntries(workflows[id].fields.map((field) => [field.id, field.value || '']));
      renderClassification(id);
      renderPlan(id);
    }

    function renderResult(result) {
      $('#result-panel').classList.remove('hidden');
      $('#result-panel').innerHTML = `<div class="card-label">04 / İŞ AKIŞI SONUCU <span class="success">● YERELDE TAMAMLANDI</span></div><div class="result-head"><div><h2>${result.title}</h2><p>${result.summary}</p></div><div class="result-check">✓</div></div><div class="result-items">${result.items.map((item) => `<div><span>${esc(item.label || item.name)}</span><b>${esc(item.value || `${item.onHand} adet`)}</b></div>`).join('')}</div><div class="boundary">▣ <b>Sınır:</b> ${result.boundary}</div>`;
      $('#result-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function renderRuns() {
      $('#run-count').textContent = `${state.runs.length} DEVİR`;
      $('#runs-list').innerHTML = state.runs.length ? state.runs.map((run) => `<div class="run-row"><div class="run-status">✓</div><div><b>${run.workflow}</b><span>${run.result.summary}</span></div><time>${run.time}</time><span class="local-tag">YEREL</span></div>`).join('') : '<div class="empty large"><div class="empty-icon">◷</div><b>Henüz devir yok</b><span>Onaylanan iş akışları sonucu ve sınırlarıyla burada görünür.</span></div>';
    }

    function run() {
      const result = buildResult(state.selected, state.values);
      state.runs.unshift({ workflow: workflows[state.selected].name, time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }), result });
      renderResult(result);
      renderRuns();
    }

    $('#analyze').addEventListener('click', analyze);
    document.querySelectorAll('[data-example]').forEach((button) => button.addEventListener('click', () => { $('#request').value = button.dataset.example; analyze(); }));
    const saveProvider = $('#save-provider');
    if (saveProvider) saveProvider.addEventListener('click', () => { saveProvider.textContent = 'Bu oturum için kaydedildi'; saveProvider.classList.add('saved'); });
    const targetView = location.hash.slice(1);
    if (targetView === 'provider' || targetView === 'runs') { const target = document.querySelector(`[data-view="${targetView}"]`); if (target) target.click(); }
    analyze();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
