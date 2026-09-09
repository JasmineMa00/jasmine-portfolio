const stories = {
  homework: {
    platform: 'TIKTOK CREATOR CONCEPT',
    title: 'Homework SOS',
    flow: [
      ['01 · PAIN', '一道题卡住 30 分钟，答案却看不懂。'],
      ['02 · HOOK', '“POV: this question makes zero sense…”'],
      ['03 · DEMO', '上传题目，展示 AskSia 的分步讲解过程。'],
      ['04 · CTA', '“Don’t just get it done. Actually get it.”'],
    ],
    note: '内容不是从功能列表出发，而是先复现学生熟悉的挫败瞬间，再让产品以“理解助手”而不是“答案机器”的角色出现。',
  },
  explain: {
    platform: 'INSTAGRAM CREATOR CONCEPT',
    title: 'Learn the Why',
    flow: [
      ['01 · PAIN', '知道最终答案，却不知道为什么。'],
      ['02 · HOOK', '“Not just an answer. An explanation.”'],
      ['03 · DEMO', '突出追问和知识讲解，展示从做题到理解。'],
      ['04 · CTA', '“Study smarter with your AI tutor.”'],
    ],
    note: '把 AskSia 的差异化价值从“搜题更快”转向“讲解更清楚”，让产品收益与美国学生真实学习场景直接关联。',
  },
};

const modal = document.querySelector('#storyModal');
const title = document.querySelector('#storyTitle');
const platform = document.querySelector('#storyPlatform');
const flow = document.querySelector('#storyFlow');
const note = document.querySelector('#storyNote');

function openStory(key) {
  const story = stories[key];
  if (!story) return;
  platform.textContent = story.platform;
  title.textContent = story.title;
  flow.innerHTML = story.flow
    .map(([label, text]) => `<div><small>${label}</small><span>${text}</span></div>`)
    .join('');
  note.textContent = story.note;
  modal.hidden = false;
  document.body.classList.add('modal-open');
  requestAnimationFrame(() => modal.querySelector('.modal-card').focus?.());
}

function closeStory() {
  modal.hidden = true;
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('[data-story]').forEach((button) => {
  button.addEventListener('click', () => openStory(button.dataset.story));
});
document.querySelectorAll('[data-close]').forEach((button) => button.addEventListener('click', closeStory));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.hidden) closeStory();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const orb = document.querySelector('.cursor-orb');
window.addEventListener('pointermove', (event) => {
  orb.style.left = `${event.clientX}px`;
  orb.style.top = `${event.clientY}px`;
});

const tiltCard = document.querySelector('.tilt-card');
if (tiltCard && window.matchMedia('(pointer: fine)').matches) {
  tiltCard.addEventListener('pointermove', (event) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tiltCard.style.transform = `rotate(3deg) perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  });
  tiltCard.addEventListener('pointerleave', () => {
    tiltCard.style.transform = 'rotate(3deg)';
  });
}
