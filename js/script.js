// Oberio Construction — script.js
// Handles loading screen, nav, projects, gallery, contact form, counters and animations

document.addEventListener('DOMContentLoaded', ()=>{
  // Single theme site: add smooth transition
  document.documentElement.style.setProperty('transition','background .4s ease, color .3s ease');
  // Basic elements
  const loading = document.getElementById('loading-screen');
  const yearEls = document.querySelectorAll('#year, #year2, #year3, #year4, #year5');
  yearEls.forEach(el=>el && (el.textContent = new Date().getFullYear()));

  // hide loader
  setTimeout(()=>{
    if(loading) loading.style.display='none';
  },800);

  // Nav toggle for small screens
  const nav = document.getElementById('site-nav');
  const navToggle = document.getElementById('nav-toggle');
  if(navToggle){
    navToggle.addEventListener('click', ()=>{
      const el = document.querySelector('.site-nav');
      el.classList.toggle('show');
    });
  }

  // Scroll to top
  const scrollBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', ()=>{
    if(window.scrollY>300) scrollBtn.style.display='block'; else scrollBtn.style.display='none';
  });
  scrollBtn.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));

  // Intersection observer for animate-up elements
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('in-view');
    });
  },{threshold:0.12});
  document.querySelectorAll('.animate-up').forEach(el=>io.observe(el));

  // Parallax mouse move for hero
  const hero = document.querySelector('.hero');
  if(hero){
    hero.addEventListener('mousemove', (ev)=>{
      const x = (ev.clientX / window.innerWidth - 0.5) * 20;
      const y = (ev.clientY / window.innerHeight - 0.5) * 12;
      const media = document.querySelector('.hero-media img');
      const pattern = document.querySelector('.hero-pattern');
      if(media) media.style.transform = `translate(${x*0.6}px, ${y*0.6}px) scale(1.02)`;
      if(pattern) pattern.style.transform = `translate(${x*0.3}px, ${y*0.3}px)`;
    });
    hero.addEventListener('mouseleave', ()=>{ const media = document.querySelector('.hero-media img'); if(media) media.style.transform='none'; const pattern = document.querySelector('.hero-pattern'); if(pattern) pattern.style.transform='none'; });
  }

  // Counters
  document.querySelectorAll('.counter').forEach(counter=>{
    const update = ()=>{
      const target = +counter.dataset.target || 0;
      const current = +counter.textContent || 0;
      const increment = Math.ceil(target / 120);
      if(current < target){
        counter.textContent = current + increment;
        setTimeout(update, 16);
      } else { counter.textContent = target }
    };
    // start when in view
    io.observe(counter);
    counter.addEventListener('inview', update);
  });

  // Projects dynamic content
  const projects = [
    {id:1,title:'City Central Mall',desc:'A flagship mixed-use mall with 8 floors of retail, co-working spaces and basement parking. Delivered with phased opening and sustainability measures including rainwater harvesting and efficient HVAC systems.',status:'ongoing',sector:'commercial',img:'https://images.unsplash.com/photo-1491557345352-5929e343eb89?w=1600&q=80',client:'Urbania Developments',budget:'$48M',timeline:'2024 - 2026'},
    {id:2,title:'Riverside Residences',desc:'Luxury riverfront apartments featuring green roofs, flood-resilient design, and smart home integrations. Includes landscaped communal spaces and a retail podium.',status:'completed',sector:'residential',img:'https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?w=1600&q=80',client:'Riverside Estates',budget:'$22M',timeline:'2021 - 2023'},
    {id:3,title:'North Bridge Rehab',desc:'Structural rehabilitation of the aging North Bridge: strengthening bearings, resurfacing deck and upgrading drainage to extend service life by 30 years.',status:'ongoing',sector:'infrastructure',img:'https://images.unsplash.com/photo-1505842465776-3d8a3b3eaa4f?w=1600&q=80',client:'City Authority',budget:'$12M',timeline:'2025 - 2026'},
    {id:4,title:'Sunset Villas',desc:'Boutique villa development with sustainable materials and bespoke interiors. Each villa features private gardens and energy-efficient systems.',status:'completed',sector:'residential',img:'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&q=80',client:'Private',budget:'$6.5M',timeline:'2020 - 2022'},
    {id:5,title:'Tech Park Phase II',desc:'Expansion of a technology campus with labs, collaboration spaces and an innovation hub. Focus on flexible floorplates and fast-track construction methods.',status:'ongoing',sector:'commercial',img:'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80',client:'TechCore',budget:'$32M',timeline:'2024 - 2025'},
  ];

  const projectsGrid = document.getElementById('projectsGrid');
  const projectTpl = document.getElementById('projectCardTpl');
  function renderProjects(filterStatus='all',sector='all'){
    if(!projectsGrid || !projectTpl) return;
    projectsGrid.innerHTML='';
    const frag = document.createDocumentFragment();
    projects.filter(p=> (filterStatus==='all'||p.status===filterStatus) && (sector==='all'||p.sector===sector)).forEach(p=>{
      const node = projectTpl.content.cloneNode(true);
      const thumb = node.querySelector('.project-thumb');
      thumb.src = p.img; thumb.alt = p.title;
      node.querySelector('.project-title').textContent = p.title;
      node.querySelector('.project-desc').textContent = p.desc.substring(0,120) + '...';
      const statusEl = node.querySelector('.status');
      statusEl.textContent = p.status.charAt(0).toUpperCase()+p.status.slice(1);
      statusEl.classList.add(p.status==='ongoing'?'ongoing':'completed');
      node.querySelector('.sector').textContent = p.sector.charAt(0).toUpperCase()+p.sector.slice(1);
      // add overlay for hover
      const card = node.querySelector('.project-card');
      const overlay = document.createElement('div');
      overlay.className = 'project-overlay';
      overlay.innerHTML = `<div class="overlay-inner"><h4>${p.title}</h4><p>${p.desc.substring(0,220)}</p><div style="display:flex;gap:.6rem;margin-top:.6rem"><button class=\"btn btn-outline details-btn\" data-id=\"${p.id}\">Details</button><a class=\"btn btn-primary\" href=\"contact.html\">Enquire</a></div></div>`;
      card.appendChild(overlay);
      frag.appendChild(node);
    });
    projectsGrid.appendChild(frag);
    // attach detail button handlers
    document.querySelectorAll('.details-btn').forEach(b=>{
      b.addEventListener('click',(e)=>{
        const id = +b.dataset.id; const project = projects.find(x=>x.id===id);
        if(!project) return;
        const modal = document.getElementById('projectModal');
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalImg').src = project.img;
        document.getElementById('modalDesc').textContent = project.desc;
        document.getElementById('modalMeta').textContent = `Client: ${project.client} • Budget: ${project.budget} • ${project.timeline}`;
        modal.classList.add('show'); modal.setAttribute('aria-hidden','false');
      })
    });
    // modal close
    const modalClose = document.getElementById('modalClose');
    const modal = document.getElementById('projectModal');
    if(modalClose) modalClose.addEventListener('click', ()=>{ modal.classList.remove('show'); modal.setAttribute('aria-hidden','true') });
    if(modal) modal.addEventListener('click', (e)=>{ if(e.target===modal){ modal.classList.remove('show'); modal.setAttribute('aria-hidden','true') } });
  }
  // initial render if on projects page
  renderProjects();

  // filter actions
  document.querySelectorAll('.filter-btn').forEach(btn=>btn.addEventListener('click',e=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.dataset.filter, document.getElementById('sectorFilter')?.value || 'all');
  }));
  const sectorFilter = document.getElementById('sectorFilter');
  if(sectorFilter) sectorFilter.addEventListener('change', ()=>{
    const active = document.querySelector('.filter-btn.active');
    renderProjects(active?active.dataset.filter:'all', sectorFilter.value);
  });

  // Gallery images
  // Populate gallery with external images
  const galleryImages = [
    {src:'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&q=80',caption:'Mall facade during sunset'},
    {src:'https://images.unsplash.com/photo-1529429614844-6c6e3a8b0a1b?w=1200&q=80',caption:'Workers installing steel beams'},
    {src:'https://images.unsplash.com/photo-1505765050015-96d828b0f7a0?w=1200&q=80',caption:'Aerial site shot'},
    {src:'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80',caption:'Completed residential block'},
    {src:'https://images.unsplash.com/photo-1533757101332-7b2f6b1e0e82?w=1200&q=80',caption:'Interior fit-out sample'},
  ];
  const galleryGrid = document.getElementById('galleryGrid');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  if(galleryGrid){
    galleryImages.forEach(img=>{
      const picture = document.createElement('picture');
      const webp = document.createElement('source');
      webp.type = 'image/webp';
      // create simple srcset for responsive sizes
      const url = img.src.split('?')[0];
      webp.srcset = `${url}?w=480&q=80 480w, ${url}?w=800&q=80 800w, ${url}?w=1200&q=80 1200w`;
      webp.sizes = '(max-width:600px) 480px, (max-width:900px) 800px, 1200px';
      const source = document.createElement('source');
      source.type = 'image/jpeg';
      source.srcset = `${url}?w=480&q=80 480w, ${url}?w=800&q=80 800w, ${url}?w=1200&q=80 1200w`;
      source.sizes = webp.sizes;
      const imgEl = document.createElement('img');
      imgEl.loading='lazy'; imgEl.alt = img.caption; imgEl.decoding='async';
      imgEl.src = `${url}?w=800&q=80`;
      imgEl.style.width='100%'; imgEl.style.borderRadius='6px';
      picture.appendChild(webp); picture.appendChild(source); picture.appendChild(imgEl);
      picture.addEventListener('click', ()=>{
        lightboxImg.src = imgEl.src; lightboxCaption.textContent = img.caption; lightbox.classList.add('show');
      });
      galleryGrid.appendChild(picture);
    });
  }
  if(lightboxClose) lightboxClose.addEventListener('click', ()=>lightbox.classList.remove('show'));
  if(lightbox) lightbox.addEventListener('click', (e)=>{ if(e.target===lightbox) lightbox.classList.remove('show') });

  // Contact form (simple client-side validation and fake submit)
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', async e=>{
      e.preventDefault();
      const status = document.getElementById('formStatus');
      const data = new FormData(contactForm);
      if(!data.get('name')||!data.get('email')||!data.get('message')){ status.textContent = 'Please fill required fields.'; return; }
      status.textContent = 'Sending...';
      try{
        const resp = await fetch('/api/contact', { method:'POST', body: JSON.stringify(Object.fromEntries(data)), headers:{'Content-Type':'application/json'} });
        if(resp.ok){ status.textContent = 'Message sent — we will contact you shortly.'; contactForm.reset(); }
        else { const txt = await resp.text(); status.textContent = 'Failed to send: '+txt }
      }catch(err){ status.textContent = 'Network error — try again later.' }
    });
  }

  // Smooth anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{ e.preventDefault(); document.querySelector(a.getAttribute('href'))?.scrollIntoView({behavior:'smooth'}) });
  });

  // Keyboard: close lightbox on Esc
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') lightbox?.classList.remove('show') });

  // Small helper to start counters when visible — IntersectionObserver doesn't emit custom event; we'll trigger manually
  const startCounters = ()=>{
    document.querySelectorAll('.counter').forEach(c=>{
      const target = +c.dataset.target || 0;
      let current = 0;
      const step = Math.max(1, Math.floor(target/120));
      const tick = ()=>{
        current += step;
        if(current>=target) c.textContent = target; else { c.textContent = current; requestAnimationFrame(tick) }
      };
      // start if in view
      const r = c.getBoundingClientRect();
      if(r.top < window.innerHeight) tick();
    });
  };
  startCounters();

  // register resize/orientation handlers if needed
});
