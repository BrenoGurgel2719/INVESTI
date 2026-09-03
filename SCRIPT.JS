gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
	gsap.utils.toArray('main > section').forEach((section) => {
		gsap.fromTo(section, { autoAlpha: 0, y: 48 }, {
			autoAlpha: 1,
			y: 0,
			duration: 0.9,
			ease: 'power3.out',
			scrollTrigger: { trigger: section, start: 'top 88%', once: true }
		});
	});
}

const scrollWrap = document.querySelector('.timeline-scroll');
const timelinePin = document.querySelector('.timeline-pin');
const timelineTrack = document.querySelector('.timeline-track');

if (scrollWrap && timelinePin && timelineTrack) {
	const timelineItems = [...timelineTrack.querySelectorAll('.timeline-item')];
	const timelineMedia = gsap.matchMedia();

	timelineMedia.add('(min-width: 901px)', () => {
		const setActive = (progress) => {
			const index = Math.round(progress * (timelineItems.length - 1));
			timelineItems.forEach((item, itemIndex) => item.classList.toggle('is-active', itemIndex === index));
		};
		const setScrollDistance = () => {
			const extra = Math.max(timelineTrack.scrollWidth - timelinePin.clientWidth, 0);
			scrollWrap.style.height = `calc(100vh + ${extra}px)`;
		};
		setScrollDistance();
		const tween = gsap.to(timelineTrack, {
			x: () => -Math.max(timelineTrack.scrollWidth - timelinePin.clientWidth, 0),
			ease: 'none',
			scrollTrigger: {
				trigger: scrollWrap,
				start: 'top top',
				end: 'bottom bottom',
				scrub: true,
				invalidateOnRefresh: true,
				onRefresh: setScrollDistance,
				onUpdate: (self) => setActive(self.progress)
			}
		});
		setActive(0);
		window.addEventListener('resize', setScrollDistance);
		return () => {
			window.removeEventListener('resize', setScrollDistance);
			tween.kill();
			gsap.set(timelineTrack, { clearProps: 'x' });
			scrollWrap.style.height = '';
		};
	});
	timelineMedia.add('(max-width: 900px)', () => {
		timelineItems.forEach((item) => item.classList.add('is-active'));
	});
}

const menuToggle = document.querySelector('.menu-toggle');
const navPanel = document.querySelector('.nav-panel');

if (menuToggle && navPanel) {
	const applyMenuState = (isOpen) => {
		navPanel.classList.toggle('open', isOpen);
		menuToggle.classList.toggle('active', isOpen);
		menuToggle.setAttribute('aria-expanded', String(isOpen));
		navPanel.style.display = isOpen ? 'flex' : 'none';
	};
	menuToggle.addEventListener('click', (event) => {
		event.preventDefault();
		applyMenuState(!navPanel.classList.contains('open'));
	});
	const mediaQuery = window.matchMedia('(max-width: 900px)');
	const syncMenuState = () => {
		if (!mediaQuery.matches) {
			navPanel.style.display = '';
			navPanel.classList.remove('open');
			menuToggle.classList.remove('active');
			menuToggle.setAttribute('aria-expanded', 'false');
		}
	};
	mediaQuery.addEventListener('change', syncMenuState);
	syncMenuState();
}

const galleryCards = document.querySelectorAll('.gallery-card');
galleryCards.forEach((card) => card.addEventListener('click', (event) => {
	event.preventDefault();
	galleryCards.forEach((item) => item.classList.remove('is-open'));
	card.classList.add('is-open');
}));

gsap.from('.gallery-card', { y: 30, opacity: 0, duration: 0.85, stagger: 0.12, ease: 'power2.out', scrollTrigger: { trigger: '.about-section', start: 'top 78%' } });
gsap.from('.about-copy > *', { y: 24, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out', scrollTrigger: { trigger: '.about-copy', start: 'top 80%' } });

document.querySelectorAll('.stat-value').forEach((counter) => {
	const target = Number(counter.dataset.target || 0);
	const decimals = Number(counter.dataset.decimals || 0);
	const prefix = counter.dataset.prefix || '';
	const suffix = counter.dataset.suffix || '';
	const value = { current: 0 };
	gsap.to(value, {
		current: target,
		duration: 2.2,
		ease: 'power2.out',
		scrollTrigger: { trigger: counter, start: 'top 90%', once: true },
		onUpdate: () => {
			const formatted = decimals ? value.current.toFixed(decimals) : Math.round(value.current);
			counter.textContent = `${prefix}${formatted}${suffix}`;
		}
	});
});

const npsValue = document.querySelector('.nps-value');
const npsProgress = document.querySelector('.nps-progress');
const npsCircleLength = 2 * Math.PI * 90;

if (npsProgress) {
	gsap.set(npsProgress, { strokeDasharray: npsCircleLength, strokeDashoffset: npsCircleLength });
	gsap.to(npsProgress, { strokeDashoffset: npsCircleLength * 0.08, duration: 2.2, ease: 'power2.out', scrollTrigger: { trigger: '.satisfaction-section', start: 'top 80%', once: true } });
}
if (npsValue) {
	const value = { current: 0 };
	gsap.to(value, { current: 92, duration: 2.1, ease: 'power2.out', scrollTrigger: { trigger: '.satisfaction-section', start: 'top 80%', once: true }, onUpdate: () => { npsValue.textContent = `${Math.round(value.current)}%`; } });
}

['.solution-card', '.tier-card', '.journey-step'].forEach((selector) => {
	const trigger = document.querySelector(selector);
	if (trigger) gsap.from(selector, { y: 24, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger, start: 'top 82%', once: true } });
});

const journeySteps = document.querySelector('.journey-steps');
if (journeySteps) gsap.to(journeySteps, { '--journey-progress': 1, ease: 'none', scrollTrigger: { trigger: journeySteps, start: 'top 72%', end: 'bottom 42%', scrub: 0.8, invalidateOnRefresh: true } });

const journeyCta = document.querySelector('.journey-cta');
if (journeyCta) gsap.from(journeyCta, { y: 20, opacity: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: journeyCta, start: 'top 88%', once: true } });

const testimonials = [
	['Rodrigo Guedes', 'Assessor', 'imagens/img-testimonial-1.webp', 'Meu assessor percebe minhas necessidades de investimento e sugere as aplicações de acordo com o cenário econômico.'],
	['Mariana Teixeira', 'Assessora', 'imagens/img-testemonial-2.webp', 'A orientação foi clara, objetiva e sempre alinhada aos meus objetivos financeiros de longo prazo.'],
	['Claudione Melo', 'Assessora', 'imagens/img-testemonial-3.webp', 'Senti confiança desde o início. O planejamento foi pensado para meu perfil e para minha realidade.'],
	['Jackson Antunes', 'Assessor', 'imagens/img-testemonial-4.webp', 'O acompanhamento fez toda a diferença na forma como organizei meus investimentos e meus próximos passos.'],
	['Andre Serejo', 'Assessor', 'imagens/img-testemonial-5.webp', 'A assessoria me ajudou a tomar decisões com mais segurança, previsibilidade e visão de futuro.']
];
const testimonialAvatar = document.getElementById('testimonial-avatar');
const testimonialName = document.getElementById('testimonial-name');
const testimonialRole = document.getElementById('testimonial-role');
const testimonialCopy = document.getElementById('testimonial-copy');
const testimonialDots = [...document.querySelectorAll('.testimonial-dots button')];
let currentSlide = 0;
const renderTestimonial = (index) => {
	const [name, role, avatar, text] = testimonials[index];
	if (testimonialAvatar) { testimonialAvatar.src = avatar; testimonialAvatar.alt = name; }
	if (testimonialName) testimonialName.textContent = name;
	if (testimonialRole) testimonialRole.textContent = role;
	if (testimonialCopy) testimonialCopy.textContent = text;
	testimonialDots.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === index));
};
document.querySelectorAll('.nav-arrow').forEach((button) => button.addEventListener('click', () => {
	currentSlide = (currentSlide + (button.dataset.direction === 'next' ? 1 : -1) + testimonials.length) % testimonials.length;
	renderTestimonial(currentSlide);
}));
testimonialDots.forEach((dot, index) => dot.addEventListener('click', () => { currentSlide = index; renderTestimonial(index); }));

class MzaCarousel {
	constructor(root, opts = {}) {
		this.root = root;
		this.viewport = root.querySelector('.mzaCarousel-viewport');
		this.track = root.querySelector('.mzaCarousel-track');
		this.slides = Array.from(root.querySelectorAll('.mzaCarousel-slide'));
		this.prevBtn = root.querySelector('.mzaCarousel-prev');
		this.nextBtn = root.querySelector('.mzaCarousel-next');
		this.pagination = root.querySelector('.mzaCarousel-pagination');
		this.progressBar = root.querySelector('.mzaCarousel-progressBar');
		this.isFF = typeof InstallTrigger !== 'undefined';
		this.n = this.slides.length;
		this.state = { index: 0, pos: 0, width: 0, height: 0, gap: 28, dragging: false, pointerId: null, x0: 0, v: 0, t0: 0, animating: false, hovering: false, startTime: 0, pausedAt: 0, rafId: 0 };
		this.opts = Object.assign({
			gap: 28, peek: 0.15, rotateY: 30, zDepth: 140, scaleDrop: 0.09, blurMax: 2.0,
			activeLeftBias: 0, interval: 5200, transitionMs: 900, keyboard: true,
			breakpoints: [
				{ mq: '(max-width: 1200px)', gap: 24, peek: 0.12, rotateY: 24, zDepth: 110, scaleDrop: 0.08, activeLeftBias: 0 },
				{ mq: '(max-width: 1000px)', gap: 18, peek: 0.09, rotateY: 18, zDepth: 90, scaleDrop: 0.07, activeLeftBias: 0 },
				{ mq: '(max-width: 768px)', gap: 14, peek: 0.06, rotateY: 14, zDepth: 70, scaleDrop: 0.06, activeLeftBias: 0 },
				{ mq: '(max-width: 560px)', gap: 12, peek: 0.05, rotateY: 10, zDepth: 60, scaleDrop: 0.05, activeLeftBias: 0 }
			]
		}, opts);
		if (this.isFF) { this.opts.rotateY = 8; this.opts.zDepth = 0; this.opts.blurMax = 0; }
		this._init();
	}
	_init() { this._setupDots(); this._bind(); this._measure(); this.goTo(0, false); this._startCycle(); this._loop(); }
	_setupDots() {
		this.pagination.innerHTML = '';
		this.dots = this.slides.map((_, i) => {
			const button = document.createElement('button');
			button.type = 'button'; button.className = 'mzaCarousel-dot'; button.setAttribute('role', 'tab');
			button.setAttribute('aria-label', `Ir para o slide ${i + 1}`);
			button.addEventListener('click', () => this.goTo(i)); this.pagination.appendChild(button); return button;
		});
	}
	_bind() {
		this.prevBtn.addEventListener('click', () => this.prev()); this.nextBtn.addEventListener('click', () => this.next());
		if (this.opts.keyboard) this.root.addEventListener('keydown', (event) => { if (event.key === 'ArrowLeft') this.prev(); if (event.key === 'ArrowRight') this.next(); });
		const pointerElement = this.viewport;
		pointerElement.addEventListener('pointerdown', (event) => this._onDragStart(event));
		pointerElement.addEventListener('pointermove', (event) => this._onDragMove(event));
		pointerElement.addEventListener('pointerup', (event) => this._onDragEnd(event));
		pointerElement.addEventListener('pointercancel', (event) => this._onDragEnd(event));
		this.root.addEventListener('mouseenter', () => { this.state.hovering = true; this.state.pausedAt = performance.now(); });
		this.root.addEventListener('mouseleave', () => { if (this.state.pausedAt) { this.state.startTime += performance.now() - this.state.pausedAt; this.state.pausedAt = 0; } this.state.hovering = false; });
		this.ro = new ResizeObserver(() => this._measure()); this.ro.observe(this.viewport);
		this.opts.breakpoints.forEach((breakpoint) => {
			const media = window.matchMedia(breakpoint.mq);
			const apply = () => { Object.keys(breakpoint).forEach((key) => { if (key !== 'mq') this.opts[key] = breakpoint[key]; }); this._measure(); this._render(); };
			if (media.addEventListener) media.addEventListener('change', apply); else media.addListener(apply); if (media.matches) apply();
		});
		pointerElement.addEventListener('pointermove', (event) => this._onTilt(event));
		window.addEventListener('orientationchange', () => setTimeout(() => this._measure(), 250));
	}
	_measure() {
		const viewRect = this.viewport.getBoundingClientRect(); const rootRect = this.root.getBoundingClientRect(); const paginationRect = this.pagination.getBoundingClientRect();
		const bottomGap = Math.max(12, Math.round(rootRect.bottom - paginationRect.bottom)); const paginationSpace = paginationRect.height + bottomGap;
		const availableHeight = viewRect.height - paginationSpace; const cardHeight = Math.max(320, Math.min(640, Math.round(availableHeight)));
		this.state.width = viewRect.width; this.state.height = viewRect.height; this.state.gap = this.opts.gap; this.slideW = Math.min(880, this.state.width * (1 - this.opts.peek * 2));
		this.root.style.setProperty('--mzaPagH', `${paginationSpace}px`); this.root.style.setProperty('--mzaCardH', `${cardHeight}px`);
	}
	_onTilt(event) { const rect = this.viewport.getBoundingClientRect(); const mx = (event.clientX - rect.left) / rect.width - 0.5; const my = (event.clientY - rect.top) / rect.height - 0.5; this.root.style.setProperty('--mzaTiltX', (my * -6).toFixed(3)); this.root.style.setProperty('--mzaTiltY', (mx * 6).toFixed(3)); }
	_onDragStart(event) { if (event.pointerType === 'mouse' && event.button !== 0) return; event.preventDefault(); this.state.dragging = true; this.state.pointerId = event.pointerId; this.viewport.setPointerCapture(event.pointerId); this.state.x0 = event.clientX; this.state.t0 = performance.now(); this.state.v = 0; this.state.pausedAt = performance.now(); }
	_onDragMove(event) { if (!this.state.dragging || event.pointerId !== this.state.pointerId) return; const dx = event.clientX - this.state.x0; const dt = Math.max(16, performance.now() - this.state.t0); this.state.v = dx / dt; this.state.pos = this._mod(this.state.index - dx / (this.slideW + this.state.gap), this.n); this._render(); }
	_onDragEnd(event) {
		if (!this.state.dragging || (event && event.pointerId !== this.state.pointerId)) return; this.state.dragging = false;
		try { if (this.state.pointerId != null) this.viewport.releasePointerCapture(this.state.pointerId); } catch { }
		this.state.pointerId = null; if (this.state.pausedAt) { this.state.startTime += performance.now() - this.state.pausedAt; this.state.pausedAt = 0; }
		const velocity = this.state.v; const target = Math.round(this.state.pos - Math.sign(velocity) * (Math.abs(velocity) > 0.18 ? 0.5 : 0)); this.goTo(this._mod(target, this.n));
	}
	_startCycle() { this.state.startTime = performance.now(); this._renderProgress(0); }
	_loop() { const step = (time) => { if (!this.state.dragging && !this.state.hovering && !this.state.animating) { const elapsed = time - this.state.startTime; const progress = Math.min(1, elapsed / this.opts.interval); this._renderProgress(progress); if (elapsed >= this.opts.interval) this.next(); } this.state.rafId = requestAnimationFrame(step); }; this.state.rafId = requestAnimationFrame(step); }
	_renderProgress(progress) { this.progressBar.style.transform = `scaleX(${progress})`; }
	prev() { this.goTo(this._mod(this.state.index - 1, this.n)); }
	next() { this.goTo(this._mod(this.state.index + 1, this.n)); }
	goTo(index, animate = true) {
		const start = this.state.pos || this.state.index; const end = this._nearest(start, index); const duration = animate ? this.opts.transitionMs : 0; const startTime = performance.now();
		this.state.animating = true;
		const step = (time) => { const progress = duration ? 1 - Math.pow(1 - Math.min(1, (time - startTime) / duration), 4) : 1; this.state.pos = start + (end - start) * progress; this._render(); if (progress < 1) requestAnimationFrame(step); else this._afterSnap(index); };
		requestAnimationFrame(step);
	}
	_afterSnap() { this.state.index = this._mod(Math.round(this.state.pos), this.n); this.state.pos = this.state.index; this.state.animating = false; this._render(true); this._startCycle(); }
	_nearest(from, target) { let distance = target - Math.round(from); if (distance > this.n / 2) distance -= this.n; if (distance < -this.n / 2) distance += this.n; return Math.round(from) + distance; }
	_mod(index, length) { return ((index % length) + length) % length; }
	_render(markActive = false) {
		const span = this.slideW + this.state.gap; const tiltX = parseFloat(this.root.style.getPropertyValue('--mzaTiltX') || 0); const tiltY = parseFloat(this.root.style.getPropertyValue('--mzaTiltY') || 0);
		for (let i = 0; i < this.n; i++) {
			let distance = i - this.state.pos; if (distance > this.n / 2) distance -= this.n; if (distance < -this.n / 2) distance += this.n;
			const weight = Math.max(0, 1 - Math.abs(distance) * 2); const translateX = distance * span - this.slideW * this.opts.activeLeftBias * weight; const depth = -Math.abs(distance) * this.opts.zDepth;
			const scale = 1 - Math.min(Math.abs(distance) * this.opts.scaleDrop, 0.42); const slide = this.slides[i];
			slide.style.transform = this.isFF ? `translate(${translateX}px,-50%) scale(${scale})` : `translate3d(${translateX}px,-50%,${depth}px) rotateY(${-distance * this.opts.rotateY}deg) scale(${scale})`;
			slide.style.filter = this.isFF ? 'none' : `blur(${Math.min(Math.abs(distance) * this.opts.blurMax, this.opts.blurMax)}px)`;
			slide.style.zIndex = Math.round(1000 - Math.abs(distance) * 10); if (markActive) slide.dataset.state = Math.round(this.state.index) === i ? 'active' : 'rest';
			const card = slide.querySelector('.mzaCard'); card.style.setProperty('--mzaParX', `${(Math.max(-1, Math.min(1, -distance)) * 32 + tiltY * 1.4).toFixed(2)}px`); card.style.setProperty('--mzaParY', `${(tiltX * -1.1).toFixed(2)}px`);
		}
		const active = this._mod(Math.round(this.state.pos), this.n); this.dots.forEach((dot, index) => dot.setAttribute('aria-selected', index === active ? 'true' : 'false'));
	}
}

const mzaElement = document.getElementById('mzaCarousel');
if (mzaElement) new MzaCarousel(mzaElement, { transitionMs: 900 });

