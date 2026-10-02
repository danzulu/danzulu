/* ------------------------------------------------------------------ */
/* zuvel.ai preview: full-page captures of the real site in a browser */
/* frame. Tabs switch pages; the language follows the portfolio's     */
/* EN/ES toggle (watched through <html lang>).                        */
/* ------------------------------------------------------------------ */
(() => {
    const root = document.getElementById('zwDemo');
    if (!root) return;

    const PAGES = [
        { key: 'home', label: { en: 'Home', es: 'Inicio' }, path: { en: '/en', es: '/' }, h: { en: 1905, es: 1905 }, hm: { en: 6592, es: 6654 },
          alt: { en: 'zuvel.ai home page in English', es: 'Página de inicio de zuvel.ai en español' } },
        { key: 'products', label: { en: 'Products', es: 'Productos' }, path: { en: '/en/products', es: '/productos' }, h: { en: 1287, es: 1315 }, hm: { en: 3860, es: 4012 },
          alt: { en: 'zuvel.ai products page in English', es: 'Página de productos de zuvel.ai en español' } },
        { key: 'aiworkers', label: { en: 'AI Workers', es: 'AI Workers' }, path: { en: '/en/products/ai-workers', es: '/productos/ai-workers' }, h: { en: 2332, es: 2358 }, hm: { en: 5368, es: 5648 },
          alt: { en: 'zuvel.ai AI Workers product page in English', es: 'Página del producto AI Workers de zuvel.ai en español' } },
        { key: 'services', label: { en: 'Services', es: 'Servicios' }, path: { en: '/en/services', es: '/servicios' }, h: { en: 2122, es: 2200 }, hm: { en: 6318, es: 6622 },
          alt: { en: 'zuvel.ai services page in English', es: 'Página de servicios de zuvel.ai en español' } },
        { key: 'about', label: { en: 'About', es: 'Nosotros' }, path: { en: '/en/about', es: '/nosotros' }, h: { en: 955, es: 983 }, hm: { en: 2846, es: 3120 },
          alt: { en: 'zuvel.ai about page in English', es: 'Página Nosotros de zuvel.ai en español' } },
    ];

    const tabs = root.querySelector('.zw-tabs');
    const url = root.querySelector('.zw-url');
    const urlText = root.querySelector('.zw-url span');
    const screen = root.querySelector('.zw-screen');
    const img = root.querySelector('.zw-screen img');
    let current = 0;

    // Phones get the site's own mobile layout instead of a shrunken desktop capture
    const phone = window.matchMedia('(max-width: 600px)');
    const lang = () => (document.documentElement.lang === 'es' ? 'es' : 'en');
    const src = (page, l) => `assets/zuvel-site/${page.key}-${l}${phone.matches ? '-m' : ''}.webp`;

    function render(resetScroll) {
        const l = lang();
        const page = PAGES[current];
        tabs.innerHTML = PAGES.map((p, i) =>
            `<button type="button" data-i="${i}" class="${i === current ? 'active' : ''}" aria-pressed="${i === current}">${p.label[l]}</button>`
        ).join('');
        urlText.textContent = 'zuvel.ai' + (page.path[l] === '/' ? '' : page.path[l]);
        url.href = 'https://www.zuvel.ai' + page.path[l];
        img.width = phone.matches ? 780 : 1280;
        img.height = phone.matches ? page.hm[l] : page.h[l];
        img.alt = page.alt[l];
        img.src = src(page, l);
        if (resetScroll) screen.scrollTop = 0;
        // keep the active tab visible when the tab strip scrolls sideways
        const active = tabs.querySelector('.active');
        tabs.scrollLeft = active.offsetLeft - (tabs.clientWidth - active.offsetWidth) / 2;
    }

    tabs.addEventListener('click', e => {
        const b = e.target.closest('[data-i]');
        if (!b) return;
        current = Number(b.dataset.i);
        render(true);
    });

    // Warm the cache for a page as soon as the pointer hovers its tab
    tabs.addEventListener('pointerover', e => {
        const b = e.target.closest('[data-i]');
        if (b) new Image().src = src(PAGES[Number(b.dataset.i)], lang());
    });

    phone.addEventListener('change', () => render(true));

    new MutationObserver(() => render(false)).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

    render(true);
})();
