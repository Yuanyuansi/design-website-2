const projectData = [
 { title: 'MONO / 把日常过成喜欢的样子', description: '以生活方式应用为主题的界面概念探索。通过自然的色彩、轻盈的内容层级与简洁的购买路径，表达一种从容的日常。展示重点包括首页信息组织、商品详情与移动端视觉语言。', tags: ['移动端 UI', '视觉探索', '购物体验'] },
 { title: 'FLOW / 让工作井然有序', description: '以团队工作台为主题的界面概念探索。把项目状态、关键数据与近期活动组织在同一个视图中，探索复杂信息的清晰呈现，以及更有秩序的工作体验。', tags: ['Web UI', '数据可视化', '信息架构'] },
 { title: 'FORM / 一致之中，自有秩序', description: '以设计基础与组件规范为主题的系统概念探索。从字体、色彩与间距出发，延伸至按钮、表单和状态组件，呈现统一且可扩展的视觉语言。', tags: ['设计系统', '组件规范', '视觉语言'] }
];
const dialog = document.querySelector('#project-dialog');
let trigger;
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
 const data = projectData[Number(button.dataset.project)];
 trigger = button;
 const art = button.querySelector('.project-art').cloneNode(true);
 art.querySelectorAll('[id]').forEach(node => { const previous = node.id; node.id = 'modal-' + previous; art.querySelectorAll(`[fill="url(#${previous})"]`).forEach(item => item.setAttribute('fill', `url(#modal-${previous})`)); });
 document.querySelector('#dialog-art').replaceChildren(art);
 document.querySelector('#dialog-title').textContent = data.title;
 document.querySelector('#dialog-description').textContent = data.description;
 document.querySelector('#dialog-tags').replaceChildren(...data.tags.map(tag => {const el = document.createElement('span'); el.textContent = tag; return el;}));
 dialog.setAttribute('aria-labelledby','dialog-title');
 dialog.showModal(); dialog.scrollTop = 0;
}));
const closeDialog = () => { dialog.close(); trigger?.focus({preventScroll:true}); };
document.querySelectorAll('.close-dialog,.dialog-done').forEach(button => button.addEventListener('click', closeDialog));
dialog.addEventListener('click', e => {if(e.target === dialog){const rect=dialog.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)closeDialog();}});
const navLinks = document.querySelectorAll('nav a');
const sectionObserver = new IntersectionObserver(entries => {entries.forEach(entry => {if(entry.isIntersecting){navLinks.forEach(link => link.classList.toggle('active',link.hash === '#' + entry.target.id));}});}, {rootMargin:'-15% 0px -50% 0px',threshold:0});
document.querySelectorAll('main>section').forEach(section=>sectionObserver.observe(section));
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.skill,.project,.work .section-heading,.expertise .section-heading').forEach(el=>{el.classList.add('reveal');revealObserver.observe(el);});}
document.querySelector('#year').textContent=new Date().getFullYear();
