/* ------------------------------------------------------------------ */
/* Study Hub interactive preview                                       */
/* A static recreation of the real app's views (same palette, fonts,  */
/* copy and curriculum). Tabs switch views; lessons open and can be   */
/* marked complete, which updates every counter on the page.          */
/* ------------------------------------------------------------------ */
(() => {
    const root = document.getElementById('shDemo');
    if (!root) return;

    const TOTAL_LESSONS = 118;

    const WEEK1 = ['Python Execution Model', 'Objects and References', 'Mutable vs Immutable Objects', 'Functions and Scope', 'Type Hints', 'Exceptions', 'Modules and Packages', 'Virtual Environments', 'Git Fundamentals', 'First Coding Lab'];
    const WEEK2 = ['OOP and Dataclasses', 'The Python Data Model', 'Iterators and Generators', 'Decorators', 'Context Managers', 'Data Structures and Their Costs', 'Big-O and Algorithmic Thinking', 'Async and Await', 'Testing with pytest', 'Debugging, Logging and Clean Code', 'Coding Lab: Streaming Chunker'];

    // Current week (September · Week 3) with each lesson's real intro and objectives
    const WEEK3 = [
        { title: 'HTTP and REST', skill: 'backend', status: 'completed',
          intro: 'Every LLM provider, vector database and model server you will use speaks HTTP. And every AI feature you ship will usually be exposed as an HTTP API.',
          goals: ['Describe the structure of an HTTP request and response.', 'Choose the right method and status code for an operation.', 'Design RESTful resource URLs.', 'Explain idempotency and why it matters for retries.'] },
        { title: 'FastAPI Fundamentals', skill: 'backend', status: 'completed',
          intro: 'FastAPI is the most common way to expose Python AI systems as APIs: RAG services, agent backends, model inference endpoints.',
          goals: ['Create a FastAPI app and run it with Uvicorn.', 'Define path operations with path and query parameters.', 'Return proper status codes and errors with HTTPException.', 'Use dependency injection with Depends.'] },
        { title: 'Pydantic Validation', skill: 'backend', status: 'completed',
          intro: 'Type hints alone are not enforced at runtime. Pydantic closes that gap: it validates data against your type hints when it enters your system.',
          goals: ['Define Pydantic models with typed fields, defaults and constraints.', 'Validate and serialize data with model_validate and model_dump.', 'Write custom validators.', 'Validate LLM structured output safely.'] },
        { title: 'SQL and Relational Modeling', skill: 'databases', status: 'in_progress',
          intro: 'Most AI products are still mostly data products: users, documents, chunks, conversations, feedback, evaluation runs. Relational databases store that data reliably.',
          goals: ['Model entities and relationships as tables with primary and foreign keys.', 'Write SQL to create, read, update, delete, join and aggregate data.', 'Use constraints and transactions to keep data consistent.', 'Explain what an index does and when to add one.'] },
        { title: 'PostgreSQL from Python', skill: 'databases', status: 'not_started',
          intro: 'PostgreSQL is the default production database for many AI products, and with pgvector it can also serve as the vector store for RAG.',
          goals: ['Connect to PostgreSQL with psycopg 3 using a connection string from the environment.', 'Execute parameterized queries and explain why string formatting is dangerous.', 'Use transactions and connection pools.', 'Explain migrations and when to use an ORM.'] },
        { title: 'Integration Tests for APIs', skill: 'backend', status: 'not_started',
          intro: 'Unit tests prove your functions work. Integration tests prove your system works: validation, database access, status codes and serialization.',
          goals: ['Test FastAPI endpoints with TestClient.', 'Run integration tests against an isolated test database.', 'Override dependencies to replace external services with fakes.', 'Balance unit, integration and end-to-end tests.'] },
        { title: 'Docker Fundamentals', skill: 'docker', status: 'not_started',
          intro: 'Docker packages your application with its exact Python version and dependencies into an image that runs the same way on your laptop, in CI and in the cloud.',
          goals: ['Explain images, containers, layers and registries.', 'Run, inspect and stop containers with the Docker CLI.', 'Write a production-minded Dockerfile for a FastAPI app.', 'Use volumes, ports and environment variables correctly.'] },
        { title: 'Docker Compose', skill: 'docker', status: 'not_started',
          intro: 'Docker Compose describes the whole stack in one file and starts it with one command: the standard way to run AI backends locally.',
          goals: ['Describe a multi-service stack in compose.yaml.', 'Connect services through Compose networking by service name.', 'Use healthchecks and depends_on to start services in order.', 'Keep secrets out of Git.'] },
        { title: 'Coding Lab: Notes API', skill: 'backend', status: 'not_started',
          intro: 'A production-style backend that closes September: FastAPI, Pydantic, PostgreSQL, integration tests and Docker Compose in one service.',
          goals: ['Design the resources, methods and status codes.', 'Validate every request and response with Pydantic.', 'Persist notes in PostgreSQL with migrations.', 'Run the whole stack with Docker Compose.'] },
    ];

    const SKILLS = [
        { key: 'python', name: 'Python / Software Engineering', total: 21, base: 21, mastery: 82 },
        { key: 'backend', name: 'Backend / APIs', total: 6, base: 0, mastery: 46 },
        { key: 'databases', name: 'SQL / Databases', total: 3, base: 0, mastery: 14 },
        { key: 'docker', name: 'Docker', total: 3, base: 0, mastery: 0 },
        { key: 'linear-algebra', name: 'Linear Algebra', total: 3, base: 0, mastery: 0 },
        { key: 'machine-learning', name: 'Machine Learning', total: 8, base: 0, mastery: 0 },
    ];

    const ROADMAP = [
        { n: '01', month: 'September 2026', theme: 'Engineering Foundations', focus: 'Python engineering · Git · Testing · Backend fundamentals · FastAPI · PostgreSQL · Docker basics', current: true,
          weeks: [['Week 1 — Python Engineering', 10, 10], ['Week 2 — Advanced Python + Testing', 11, 11], ['Week 3 — Backend Foundations', null, 9]] },
        { n: '02', month: 'October 2026', theme: 'Mathematics + Machine Learning', focus: 'Linear algebra · Calculus · Probability · Statistics · Supervised and unsupervised learning · Model evaluation' },
        { n: '03', month: 'November 2026', theme: 'Deep Learning + NLP + Transformers', focus: 'Neural networks · PyTorch · NLP foundations · Attention · Transformer internals' },
        { n: '04', month: 'December 2026', theme: 'LLM Engineering + RAG', focus: 'LLM internals and usage · Embeddings · Retrieval · RAG · Advanced RAG' },
        { n: '05', month: 'January 2027', theme: 'Agentic + Production AI', focus: 'AI agents · MCP · Multi-agent systems · Evals · AI security · Observability' },
    ];

    let view = 'dashboard';
    let openLesson = 3;

    const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const pad = n => String(n).padStart(2, '0');

    function doneIn(skill) {
        return WEEK3.filter(l => l.skill === skill && l.status === 'completed').length;
    }
    function stats() {
        const week3Done = WEEK3.filter(l => l.status === 'completed').length;
        const completed = WEEK1.length + WEEK2.length + week3Done;
        const skills = SKILLS.map(s => {
            const done = s.base + (s.key === 'python' ? 0 : doneIn(s.key));
            // mastery grows as lessons in that skill get completed
            const mastery = s.key === 'python' ? s.mastery : Math.min(95, s.mastery + Math.max(0, done - (s.key === 'backend' ? 3 : 0)) * 12);
            return { ...s, done, mastery };
        });
        const m = Object.fromEntries(skills.map(s => [s.key, s.mastery]));
        return {
            completed,
            pct: Math.round((completed / TOTAL_LESSONS) * 100),
            week3Done,
            skills,
            stanford: Math.round(0.2 * m.python),
            aiEng: Math.round(0.07 * (m.python + m.backend + m.databases + m.docker)),
            avgMastery: Math.round(skills.slice(0, 3).reduce((a, s) => a + s.mastery, 0) / 3 * 0.6),
            quizzes: 23 + week3Done * 2,
            explanations: 14 + week3Done,
        };
    }

    const badge = status => {
        const label = { completed: 'Completed', in_progress: 'In progress', not_started: 'Not started' }[status];
        return `<span class="sh-badge sh-${status}"><i></i>${label}</span>`;
    };
    const meter = v => `<div class="sh-meter"><div style="width:${v}%"></div></div>`;

    function dashboard(s) {
        return `
        <p class="sh-label">Dashboard</p>
        <h5 class="sh-h1">Welcome back, Daniel</h5>
        <p class="sh-lead">Learn, explain, implement, apply, evaluate, revisit.</p>
        <div class="sh-grid4">
            <div class="sh-card"><p class="sh-label">Overall progress</p><p class="sh-fig">${s.pct}%</p><p class="sh-sub">${s.completed} of ${TOTAL_LESSONS} lessons completed</p>${meter(s.pct)}</div>
            <div class="sh-card"><p class="sh-label">Current week</p><p class="sh-big">September · Week 3</p><p class="sh-sub">Backend Foundations</p><button type="button" class="sh-link" data-go="study">Continue studying →</button></div>
            <div class="sh-card"><p class="sh-label">Current module</p><p class="sh-big">Engineering Foundations</p><p class="sh-sub">September 2026</p></div>
            <div class="sh-card"><p class="sh-label">Reviews due</p><p class="sh-fig">7</p><p class="sh-sub">Flashcards from completed lessons.</p></div>
        </div>
        <div class="sh-grid2">
            <div class="sh-card"><p class="sh-label">Stanford readiness</p><p class="sh-fig">${s.stanford}%</p>
                ${[['Python / Software Engineering', 20, s.skills[0].mastery], ['Linear Algebra', 15, 0], ['Probability', 15, 0], ['Machine Learning', 20, 0]].map(([n, w, v]) => `<div class="sh-row"><span>${n} <em>${w}%</em></span><b>${v}%</b></div>${meter(v)}`).join('')}
            </div>
            <div class="sh-card"><p class="sh-label">AI engineer readiness</p><p class="sh-fig">${s.aiEng}%</p>
                ${s.skills.slice(0, 4).map(k => `<div class="sh-row"><span>${k.name} <em>7%</em></span><b>${k.mastery}%</b></div>${meter(k.mastery)}`).join('')}
            </div>
        </div>`;
    }

    function roadmap(s) {
        return `
        <p class="sh-label">Roadmap</p>
        <h5 class="sh-h1">September 2026 → January 2027</h5>
        <p class="sh-lead">Five blocks from engineering foundations to production AI.</p>
        <ol class="sh-timeline">
            ${ROADMAP.map(b => `
            <li class="${b.current ? 'current' : ''}">
                <div class="sh-card">
                    <p class="sh-label">${b.n} / ${b.month}${b.current ? ' <span class="sh-cur">Current</span>' : ''}</p>
                    <p class="sh-big">${b.theme}</p>
                    <p class="sh-sub">${b.focus}</p>
                    ${b.weeks ? `<ul class="sh-weeks">${b.weeks.map(([t, d, n]) => {
                        const done = d === null ? s.week3Done : d;
                        const st = done === n ? 'completed' : done > 0 ? 'in_progress' : 'not_started';
                        return `<li><span>${t}</span><span class="sh-count">${done}/${n}</span>${badge(st)}</li>`;
                    }).join('')}</ul>` : ''}
                </div>
            </li>`).join('')}
        </ol>`;
    }

    function study() {
        return `
        <p class="sh-label">September 2026 · Week 3</p>
        <h5 class="sh-h1">Backend Foundations</h5>
        <p class="sh-lead">Work through the lessons in order: learn, explain, implement, apply.</p>
        <ol class="sh-list">
            ${WEEK3.map((l, i) => `<li><button type="button" data-lesson="${i}"><span class="sh-num">${pad(i + 1)}</span><span class="sh-title">${esc(l.title)}</span>${badge(l.status)}</button></li>`).join('')}
        </ol>`;
    }

    function lesson() {
        const l = WEEK3[openLesson];
        const done = l.status === 'completed';
        return `
        <div class="sh-lessonbar"><button type="button" class="sh-back" data-go="study">← September 2026 · Week 3 · Lesson ${openLesson + 1}</button>${badge(l.status)}</div>
        <h5 class="sh-h1">${esc(l.title)}</h5>
        <p class="sh-body">${esc(l.intro)}</p>
        <p class="sh-h2">Learning objectives</p>
        <ul class="sh-goals">${l.goals.map(g => `<li>${esc(g)}</li>`).join('')}</ul>
        <div class="sh-actions">
            ${done
                ? `<button type="button" class="sh-btn secondary" data-status="in_progress">Mark as not done</button>`
                : `<button type="button" class="sh-btn primary" data-status="completed">Mark as complete</button>${l.status === 'not_started' ? `<button type="button" class="sh-btn secondary" data-status="in_progress">Mark as in progress</button>` : ''}`}
        </div>`;
    }

    function progress(s) {
        return `
        <p class="sh-label">Progress</p>
        <h5 class="sh-h1">What you actually know</h5>
        <p class="sh-lead">Mastery measures demonstrated knowledge: quizzes, labs, applied work, English explanations and review.</p>
        <div class="sh-grid4">
            <div class="sh-card"><p class="sh-label">Lessons completed</p><p class="sh-fig">${s.completed}<span class="sh-dim">/${TOTAL_LESSONS}</span></p></div>
            <div class="sh-card"><p class="sh-label">Average mastery</p><p class="sh-fig">${s.avgMastery}%</p></div>
            <div class="sh-card"><p class="sh-label">Quiz attempts</p><p class="sh-fig">${s.quizzes}</p></div>
            <div class="sh-card"><p class="sh-label">Explanations written</p><p class="sh-fig">${s.explanations}</p></div>
        </div>
        <p class="sh-h2">Mastery by skill</p>
        <div class="sh-grid2">
            ${s.skills.map(k => `<div class="sh-card sh-skill"><div class="sh-row"><span class="sh-skillname">${k.name}</span><b class="sh-pct">${k.mastery}%</b></div>${meter(k.mastery)}<p class="sh-label">${k.done} / ${k.total} lessons completed</p></div>`).join('')}
        </div>`;
    }

    const VIEWS = { dashboard, roadmap, study, lesson, progress };

    function render() {
        const s = stats();
        root.querySelector('.sh-view').innerHTML = VIEWS[view](s);
        root.querySelectorAll('.sh-nav button').forEach(b => {
            const active = b.dataset.go === view || (view === 'lesson' && b.dataset.go === 'study');
            b.classList.toggle('active', active);
            b.setAttribute('aria-current', active ? 'page' : 'false');
        });
    }

    root.addEventListener('click', e => {
        const go = e.target.closest('[data-go]');
        const les = e.target.closest('[data-lesson]');
        const st = e.target.closest('[data-status]');
        if (go) { view = go.dataset.go; }
        else if (les) { openLesson = Number(les.dataset.lesson); view = 'lesson'; }
        else if (st) { WEEK3[openLesson].status = st.dataset.status; }
        else return;
        render();
        root.querySelector('.sh-screen').scrollTop = 0;
    });

    render();
})();
