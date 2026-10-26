(function () {
  const params = new URLSearchParams(location.search);
  const toolId = params.get('tool');
  const tool = window.TOOLS.find(t => t.id === toolId);

  const $ = (s) => document.querySelector(s);
  const stages = {
    tool: $('#stageTool'),
    review: $('#stageReview'),
    thanks: $('#stageThanks')
  };

  if (!tool) {
    document.body.innerHTML = `
      <div style="padding:40px;font-family:sans-serif;text-align:center">
        <h1>Инструмент не найден</h1>
        <p><a href="index.html">← На главную</a></p>
      </div>`;
    return;
  }

  document.title = `${tool.title} — Toolbox`;
  $('#toolTitle').textContent = tool.title;
  $('#toolFrame').src = tool.file;
  $('#reviewToolName').textContent = tool.title;

  function show(name) {
    Object.entries(stages).forEach(([k, el]) => el.classList.toggle('hidden', k !== name));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ---- Кнопка "Я закончил" ----
  $('#finishBtn').addEventListener('click', () => show('review'));

  // ---- Звёзды ----
  const starButtons = [...document.querySelectorAll('#starInput button')];
  const starsValue = $('#starsValue');
  const starsError = $('#starsError');

  function paintStars(value) {
    starButtons.forEach((b, i) => {
      b.classList.toggle('active', i < value);
    });
  }

  starButtons.forEach((btn, idx) => {
    btn.addEventListener('mouseenter', () => paintStars(idx + 1));
    btn.addEventListener('mouseleave', () => paintStars(Number(starsValue.value) || 0));
    btn.addEventListener('click', () => {
      starsValue.value = String(idx + 1);
      starsError.textContent = '';
      paintStars(idx + 1);
    });
  });

  // ---- Счётчик комментария ----
  const comment = $('#comment');
  const commentCount = $('#commentCount');
  comment.addEventListener('input', () => {
    commentCount.textContent = String(comment.value.length);
  });

  // ---- Отправка ----
  $('#reviewForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const stars = Number(starsValue.value);
    if (!stars || stars < 1 || stars > 5) {
      starsError.textContent = 'Поставьте оценку от 1 до 5 звёзд';
      return;
    }
    window.Reviews.add(tool.id, { stars, comment: comment.value });
    show('thanks');
    startCountdown();
  });

  // ---- Обратный отсчёт ----
  function startCountdown() {
    let left = 3;
    const el = $('#countdown');
    el.textContent = String(left);
    const timer = setInterval(() => {
      left -= 1;
      el.textContent = String(left);
      if (left <= 0) {
        clearInterval(timer);
        window.location.href = 'index.html';
      }
    }, 1000);
  }
})();
