/* ------------------------------------------------------------------ */
/* i18n: English lives in the HTML; Spanish lives here.                */
/* ------------------------------------------------------------------ */
const ES = {
    'nav.flagship': 'Proyecto insignia',
    'nav.website': 'Sitio web',
    'nav.skills': 'Habilidades',
    'nav.contact': 'Contacto',

    'hero.chip': 'Disponible para roles 100% remotos',
    'hero.role': 'Desarrollador y AI Builder',
    'hero.tagline': 'Construyo productos de IA que llegan a producción.',
    'hero.bio1': 'Convierto problemas de negocio en software que funciona. Después de más de 6 años en gestión de negocios y cuentas clave, hoy construyo agentes de IA y productos full-stack de principio a fin, usando programación asistida por IA con pruebas reales y disciplina de producción.',
    'hero.bio2': 'Mi proyecto insignia, AI Workers, es una plataforma para llevar a producción agentes de IA reutilizables para empresas, empezando por un Worker de Servicio al Cliente que funciona en WhatsApp.',
    'hero.cta1': 'Ver el proyecto insignia',
    'hero.cta2': 'Contáctame',
    'stats.1': 'años en negocios y cuentas clave',
    'stats.2n': 'Verificada por Meta',
    'stats.2': 'app de Tech Provider de WhatsApp',
    'stats.3': 'bilingüe, listo para remoto',

    'flag.h2': 'Proyecto insignia',
    'flag.eyebrow': 'Insignia · ZUVEL',
    'flag.sub': 'AI Worker de Servicio al Cliente',
    'flag.desc': 'Una plataforma para llevar a producción agentes de IA reutilizables para empresas. El Worker de Servicio al Cliente es un producto terminado y listo para usar en WhatsApp: atiende clientes, reserva habitaciones y citas, resuelve devoluciones y reclamos, y escala a una persona solo cuando realmente hace falta. Es genérico por diseño, así que se puede implementar en cualquier negocio, y ya fue implementado para un hotel.',
    'flag.link1': 'Visitar zuvel.ai',
    'flag.link2': 'Solicitar una demo guiada',

    'demo.h': 'Mira al worker en acción',
    'demo.note': 'Conversaciones simuladas que reflejan cómo se comporta el worker. Mira el registro del agente a la derecha.',
    'demo.t1': 'Reserva de habitación',
    'demo.t2': 'Cita',
    'demo.t3': 'Devolución y reclamo',
    'demo.online': 'AI Worker · en línea',
    'demo.trace': 'Registro del agente',
    'demo.replay': 'Repetir',
    'demo.traceEmpty': 'Las llamadas a herramientas, validaciones de políticas y acciones aparecen aquí mientras corre la conversación.',

    'dec.h': 'Decisiones de ingeniería detrás del producto',
    'dec.1t': 'Escala solo cuando realmente hace falta',
    'dec.1': 'El agente resuelve las solicitudes de principio a fin dentro de las políticas del negocio. Solo lo que queda por fuera pasa a una persona, con el contexto completo.',
    'dec.2t': 'Aislamiento por tenant',
    'dec.2': 'Los datos, la configuración y las conversaciones de cada negocio están aislados, así un mismo worker atiende a muchos clientes con seguridad.',
    'dec.3t': 'Control Plane privado',
    'dec.3': 'Un plano de control privado para configurar cada despliegue y revisar conversaciones, separado del runtime que ve el cliente.',
    'dec.4t': 'WhatsApp primero, directo con Meta',
    'dec.4': 'Construido sobre la WhatsApp Cloud API de Meta con Embedded Signup, detrás de un WhatsAppProvider interno y un registro de plantillas.',
    'dec.5t': 'Alcance seguro por diseño',
    'dec.5': 'Devoluciones y Reclamos valida la evidencia contra la política de devoluciones antes de aprobar. Las citas revalidan la disponibilidad justo antes de confirmar.',
    'dec.6t': 'Núcleo genérico, a medida encima',
    'dec.6': 'Productos estandarizados para ir rápido, más desarrollo a medida para necesidades especializadas, todo desde una plataforma reutilizable.',

    'arch.h': 'Cómo fluye un mensaje',
    'arch.1': 'Cliente',
    'arch.4': 'datos aislados por tenant',
    'arch.5': 'Escalamiento inteligente',


    'web.h2': 'Más proyectos',
    'web.eyebrow': 'Sitio corporativo · zuvel.ai',
    'web.sub': 'Diseñado, construido y desplegado por mí',
    'web.desc': 'El sitio corporativo de ZUVEL: una app en Next.js que corre en un VPS que configuré desde cero, detrás de Cloudflare, con HTTPS automatizado e indexación en buscadores.',
    'web.hl.1': 'VPS Ubuntu montado y asegurado desde cero',
    'web.hl.2': "SSL automatizado con Let's Encrypt y Certbot",
    'web.hl.3': 'DNS, CDN y proxy de Cloudflare delante de Nginx',
    'web.hl.4': 'SEO e indexación en Google y Bing',
    'web.role': 'Mi rol',
    'web.link': 'Visitar zuvel.ai',

    'skills.h2': 'Habilidades técnicas',
    'skills.g1': 'IA y Agentes',
    'skills.g2': 'Full-stack',
    'skills.g3': 'Flujo de trabajo',

    'contact.h2': 'Construyamos algo juntos',
    'contact.p': 'Disponible para roles remotos de desarrollo e ingeniería de IA. Si quieres ver AI Workers en acción o conversar sobre tu equipo, escríbeme.',
    'contact.wa': 'Escríbeme por WhatsApp',
    'footer': 'Todos los derechos reservados.'
};

const TITLES = {
    en: 'Daniel Zuluaga | Developer & AI Builder',
    es: 'Daniel Zuluaga | Desarrollador y AI Builder'
};

/* ------------------------------------------------------------------ */
/* Demo scenarios (bilingual). trace = [kind, text] shown in the panel */
/* ------------------------------------------------------------------ */
const SCENARIOS = {
    booking: {
        name: { en: 'Hotel Concierge', es: 'Concierge del Hotel' },
        steps: [
            {
                who: 'user',
                en: 'Hi! Do you have a room for 2 adults from Oct 12 to 14?',
                es: '¡Hola! ¿Tienen habitación para 2 adultos del 12 al 14 de octubre?'
            },
            {
                who: 'agent',
                trace: ['TOOL', 'booking.check_availability(check_in="Oct 12", check_out="Oct 14", guests=2) → 2 room types'],
                en: 'Hi! Yes. For Oct 12–14 I have a Deluxe King at $95/night and a Suite with balcony at $130/night. Which would you like?',
                es: '¡Hola! Sí. Del 12 al 14 de octubre tengo una Deluxe King a $95 por noche y una Suite con balcón a $130 por noche. ¿Cuál prefieres?'
            },
            {
                who: 'user',
                en: 'The Deluxe King. Is breakfast included?',
                es: 'La Deluxe King. ¿Incluye desayuno?'
            },
            {
                who: 'agent',
                trace: ['KB', 'knowledge.lookup(topic="breakfast") → included, 6:30–10:00'],
                en: 'Yes, breakfast is included, served 6:30 to 10:00. Total for 2 nights: $190. To hold it I just need your full name and email.',
                es: 'Sí, el desayuno está incluido, de 6:30 a 10:00. Total por 2 noches: $190. Para reservarla solo necesito tu nombre completo y correo.'
            },
            {
                who: 'user',
                en: 'Sofia Martínez, sofia@example.com',
                es: 'Sofía Martínez, sofia@example.com'
            },
            {
                who: 'agent',
                trace: ['TOOL', 'booking.create_reservation(room="Deluxe King", nights=2, guest="Sofia Martínez") → #A-4821 confirmed'],
                en: 'All set, Sofia! Reservation #A-4821 is confirmed: Deluxe King, Oct 12–14. I sent the details to your email. Anything else?',
                es: '¡Listo, Sofía! La reserva #A-4821 está confirmada: Deluxe King, del 12 al 14 de octubre. Te envié los detalles por correo. ¿Algo más?'
            },
            {
                who: 'user',
                en: 'Could I get a late check-out?',
                es: '¿Podría hacer el check-out tarde?'
            },
            {
                who: 'agent',
                trace: ['KB', 'policy.late_checkout → free until 1:00 PM if the room is not booked next day'],
                en: 'Let me check that for you.',
                es: 'Déjame revisarlo.'
            },
            {
                who: 'agent',
                trace: ['TOOL', 'booking.check_next_day(room="Deluxe King", date="Oct 14") → free · booking.update(#A-4821, check_out="1:00 PM")'],
                en: 'Good news: your room is free the next day, so I added a late check-out until 1:00 PM at no extra cost. It\'s already on reservation #A-4821.',
                es: 'Buenas noticias: tu habitación está libre el día siguiente, así que te agregué check-out tarde hasta la 1:00 PM sin costo adicional. Ya quedó en la reserva #A-4821.'
            },
            {
                who: 'sys',
                en: 'Resolved by the agent · reservation #A-4821 updated',
                es: 'Resuelto por el agente · reserva #A-4821 actualizada'
            }
        ]
    },

    appointment: {
        name: { en: 'Appointments Assistant', es: 'Asistente de Citas' },
        steps: [
            {
                who: 'user',
                en: 'I\'d like to book a haircut this Friday afternoon.',
                es: 'Quiero agendar un corte de cabello este viernes en la tarde.'
            },
            {
                who: 'agent',
                trace: ['TOOL', 'catalog.find_service("haircut") → 45 min · primary professional'],
                en: 'Sure! A haircut takes 45 minutes. Let me check Friday afternoon.',
                es: '¡Claro! Un corte dura 45 minutos. Déjame revisar el viernes en la tarde.'
            },
            {
                who: 'agent',
                trace: ['TOOL', 'appointments.check_availability(service="haircut", date="Fri", window="pm") → 3:00 PM, 4:30 PM'],
                en: 'I have 3:00 PM or 4:30 PM available. Which works better?',
                es: 'Tengo disponible a las 3:00 PM o a las 4:30 PM. ¿Cuál te sirve más?'
            },
            {
                who: 'user',
                en: '4:30 please.',
                es: 'A las 4:30, por favor.'
            },
            {
                who: 'agent',
                trace: ['TOOL', 'appointments.revalidate_slot("4:30 PM") → still free · appointments.create() → #C-1093 confirmed'],
                en: 'Done! Your haircut is confirmed for Friday at 4:30 PM (#C-1093). I double-checked the slot right before booking.',
                es: '¡Listo! Tu corte quedó confirmado para el viernes a las 4:30 PM (#C-1093). Verifiqué el horario justo antes de reservar.'
            },
            {
                who: 'agent',
                trace: ['TOOL', 'reminders.schedule(offset="-24h", ask_attendance=true)'],
                en: 'I\'ll remind you the day before and ask you to confirm you\'re coming. You can reschedule or cancel anytime by writing here.',
                es: 'Te escribiré el día anterior para recordártelo y pedirte que confirmes tu asistencia. Puedes reprogramar o cancelar cuando quieras escribiéndome aquí.'
            }
        ]
    },

    claim: {
        name: { en: 'Customer Care', es: 'Atención al Cliente' },
        steps: [
            {
                who: 'user',
                en: 'I want to return a jacket, it\'s the wrong size. Order #10453.',
                es: 'Quiero devolver una chaqueta, es la talla equivocada. Pedido #10453.'
            },
            {
                who: 'agent',
                trace: ['TOOL', 'orders.lookup(order="#10453") → delivered 6 days ago · within return window'],
                en: 'Sorry about that! Your order is within the return window. Could you send a photo of the jacket with its tag?',
                es: '¡Lamento eso! Tu pedido está dentro del plazo de devolución. ¿Puedes enviarme una foto de la chaqueta con su etiqueta?'
            },
            {
                who: 'user',
                en: '[photo attached]',
                es: '[foto adjunta]'
            },
            {
                who: 'agent',
                trace: ['CASE', 'claims.create_case(order="#10453", reason="wrong size", evidence=1 photo) · policy.check → tag intact, eligible → C-2207 approved'],
                en: 'Thanks! The tag is intact and the reason qualifies, so your return is approved (case C-2207). Would you like a refund or an exchange for another size?',
                es: '¡Gracias! La etiqueta está intacta y el motivo aplica, así que tu devolución quedó aprobada (caso C-2207). ¿Prefieres el reembolso o cambiarla por otra talla?'
            },
            {
                who: 'user',
                en: 'Exchange for a size M, please.',
                es: 'Cambio por talla M, por favor.'
            },
            {
                who: 'agent',
                trace: ['TOOL', 'inventory.reserve(sku="jacket", size="M") → reserved · shipping.create_return_label(#10453) → sent'],
                en: 'Done! I reserved a size M for you and emailed a prepaid return label. Your new jacket ships as soon as the courier picks up the old one.',
                es: '¡Listo! Te separé una talla M y te envié por correo una guía de devolución prepagada. Tu chaqueta nueva sale apenas el mensajero recoja la anterior.'
            },
            {
                who: 'sys',
                en: 'Resolved by the agent · exchange C-2207 in progress',
                es: 'Resuelto por el agente · cambio C-2207 en curso'
            }
        ]
    }
};

/* ------------------------------------------------------------------ */
/* Language handling                                                   */
/* ------------------------------------------------------------------ */
const EN = {};
let lang = 'en';

function safeGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
}
function safeSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* storage unavailable */ }
}

function captureEnglish() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        EN[el.dataset.i18n] = el.textContent;
    });
}

function applyLang(next) {
    lang = next;
    document.documentElement.lang = next;
    document.title = TITLES[next];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const text = next === 'es' ? ES[key] : EN[key];
        if (text !== undefined) el.textContent = text;
    });
    document.querySelectorAll('.lang-toggle button').forEach(b => {
        b.setAttribute('aria-pressed', String(b.dataset.lang === next));
    });
    safeSet('dz-lang', next);
    demo.relocalize();
}

/* ------------------------------------------------------------------ */
/* Demo engine                                                         */
/* ------------------------------------------------------------------ */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const sleep = ms => new Promise(r => setTimeout(r, reduceMotion ? 0 : ms));

const demo = (() => {
    const chat = document.getElementById('chat');
    const traceList = document.getElementById('traceList');
    const traceEmpty = document.getElementById('traceEmpty');
    const phoneName = document.getElementById('phoneName');
    let current = 'booking';
    let runId = 0;
    let shown = 0;

    function scrollDown() {
        chat.scrollTop = chat.scrollHeight;
    }

    function addTrace(kind, text) {
        traceEmpty.classList.add('hidden-msg');
        const li = document.createElement('li');
        li.className = 'k-' + kind.toLowerCase();
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = kind;
        li.append(tag, document.createTextNode(text));
        traceList.appendChild(li);
        traceList.parentElement.scrollTop = traceList.parentElement.scrollHeight;
    }

    function bubbleFor(step) {
        const el = document.createElement('div');
        el.className = step.who === 'sys' ? 'sys-note' : 'bubble ' + step.who;
        el.dataset.idx = String(shown);
        el.textContent = step[lang];
        return el;
    }

    function setHeader() {
        phoneName.textContent = SCENARIOS[current].name[lang];
    }

    function clear() {
        chat.textContent = '';
        traceList.textContent = '';
        traceEmpty.classList.remove('hidden-msg');
        shown = 0;
    }

    async function play(id) {
        if (id) current = id;
        const myRun = ++runId;
        clear();
        setHeader();
        const steps = SCENARIOS[current].steps;
        await sleep(500);
        for (const step of steps) {
            if (myRun !== runId) return;
            if (step.who === 'user') {
                await sleep(700);
                if (myRun !== runId) return;
                chat.appendChild(bubbleFor(step));
            } else if (step.who === 'agent') {
                const typing = document.createElement('div');
                typing.className = 'typing';
                typing.innerHTML = '<i></i><i></i><i></i>';
                chat.appendChild(typing);
                scrollDown();
                await sleep(500);
                if (myRun !== runId) { typing.remove(); return; }
                if (step.trace) addTrace(step.trace[0], step.trace[1]);
                await sleep(800);
                typing.remove();
                if (myRun !== runId) return;
                chat.appendChild(bubbleFor(step));
            } else {
                await sleep(500);
                if (myRun !== runId) return;
                chat.appendChild(bubbleFor(step));
            }
            shown++;
            scrollDown();
            await sleep(500);
        }
    }

    // Re-render already-shown messages in the new language without restarting.
    function relocalize() {
        setHeader();
        const steps = SCENARIOS[current].steps;
        chat.querySelectorAll('[data-idx]').forEach(el => {
            const step = steps[Number(el.dataset.idx)];
            if (step) el.textContent = step[lang];
        });
    }

    return { play, relocalize };
})();

/* ------------------------------------------------------------------ */
/* Boot                                                                */
/* ------------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
    captureEnglish();

    // Language: ?lang= param > saved choice > English default
    const param = new URLSearchParams(location.search).get('lang');
    const saved = safeGet('dz-lang');
    const initial = ['en', 'es'].includes(param) ? param : (['en', 'es'].includes(saved) ? saved : 'en');
    applyLang(initial);

    document.querySelectorAll('.lang-toggle button').forEach(btn => {
        btn.addEventListener('click', () => applyLang(btn.dataset.lang));
    });

    // Smooth scrolling for in-page links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = this.getAttribute('href');
            if (target.length < 2) return;
            const el = document.querySelector(target);
            if (!el) return;
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Demo tabs + replay
    const tabs = document.querySelectorAll('.demo-tabs button');
    let scenarioId = 'booking';
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => {
                const on = t === tab;
                t.classList.toggle('active', on);
                t.setAttribute('aria-selected', String(on));
            });
            scenarioId = tab.dataset.scn;
            demo.play(scenarioId);
        });
    });
    document.getElementById('replay').addEventListener('click', () => demo.play(scenarioId));

    // Start the demo the first time it scrolls into view (opens on room booking)
    const demoEl = document.getElementById('demo');
    if ('IntersectionObserver' in window) {
        const startObs = new IntersectionObserver((entries, obs) => {
            if (entries.some(e => e.isIntersecting)) {
                obs.disconnect();
                demo.play('booking');
            }
        }, { threshold: 0.35 });
        startObs.observe(demoEl);
    } else {
        demo.play('booking');
    }

    // Reveal animations on scroll (hero stays visible)
    if ('IntersectionObserver' in window) {
        const revealObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.05 });

        document.querySelectorAll('main section:not(.hero)').forEach(section => {
            section.classList.add('hidden');
            revealObs.observe(section);
        });
    }
});
