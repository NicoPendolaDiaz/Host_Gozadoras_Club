let answers = JSON.parse(localStorage.getItem('gozadoras_ans')) || {};
let historyArr = JSON.parse(localStorage.getItem('gozadoras_hist')) || [];
let currentQId = null;
let currentView = 0;

function saveState() {
    localStorage.setItem('gozadoras_ans', JSON.stringify(answers));
    localStorage.setItem('gozadoras_hist', JSON.stringify(historyArr));
}

function clearState() {
    localStorage.removeItem('gozadoras_ans');
    localStorage.removeItem('gozadoras_hist');
    answers = {};
    historyArr = [];
}

function hasAny(arr1, arr2) {
    if (!arr2) return false;
    return arr1.some(r => arr2.includes(r));
}
function getAns(id) {
    return answers[id] || [];
}

function el(tag, cls, text) {
    const e = document.createElement(tag);
    if(cls) e.className = cls;
    if(text) e.textContent = text;
    return e;
}

const ZONES = {
  Z01:{x:50,y:10,l:"Rostro y labios"}, Z02:{x:50,y:20,l:"Orejas y cuello"}, Z03:{x:50,y:32,l:"Pecho"},
  Z04:{x:15,y:50,l:"Manos"}, Z05:{x:50,y:48,l:"Abdomen y espalda"}, Z06:{x:50,y:60,l:"Pelvis"}, 
  Z07:{x:50,y:68,l:"Vulva"}, Z08:{x:35,y:72,l:"Glúteos y muslos"}, Z09:{x:35,y:90,l:"Piernas y pies"}
};

function silhouette(){return `<svg viewBox="0 0 200 400" aria-hidden="true" style="max-width:200px; display:block; margin: 0 auto;">
  <defs>
    <clipPath id="bodyclip">
      <path d="M100 20 C115 20 125 35 125 50 C125 70 115 80 115 85 C130 90 145 95 150 110 C155 125 155 160 145 180 C135 200 145 220 150 240 C155 260 160 300 155 350 L145 380 C140 395 120 395 115 380 L105 280 L95 280 L85 380 C80 395 60 395 55 380 L45 350 C40 300 45 260 50 240 C55 220 65 200 55 180 C45 160 45 125 50 110 C55 95 70 90 85 85 C85 80 75 70 75 50 C75 35 85 20 100 20 Z"/>
    </clipPath>
  </defs>
  <path d="M100 20 C115 20 125 35 125 50 C125 70 115 80 115 85 C130 90 145 95 150 110 C155 125 155 160 145 180 C135 200 145 220 150 240 C155 260 160 300 155 350 L145 380 C140 395 120 395 115 380 L105 280 L95 280 L85 380 C80 395 60 395 55 380 L45 350 C40 300 45 260 50 240 C55 220 65 200 55 180 C45 160 45 125 50 110 C55 95 70 90 85 85 C85 80 75 70 75 50 C75 35 85 20 100 20 Z" fill="#501d22" stroke="#6e2a31" stroke-width="1.2"/>
  <g clip-path="url(#bodyclip)" fill="none" stroke="#e04a1e" stroke-width=".8" opacity=".35">
    <!-- Contour lines for breasts, belly, hips -->
    <path d="M65 120 C80 110 90 140 100 140 C110 140 120 110 135 120" />
    <path d="M55 140 C80 160 120 160 145 140" />
    <path d="M65 190 C80 200 120 200 135 190" />
    <path d="M50 230 C80 250 120 250 150 230" />
  </g>
</svg>`;}

function go(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    let scr = document.getElementById(screenId);
    if(scr) scr.classList.add('active');
}

const CHAPTER_LIST = [
    { name: "Mirador", start: 1, end: 5 },
    { name: "Manantial", start: 6, end: 12 },
    { name: "Sendero", start: 13, end: 18 },
    { name: "Clima", start: 19, end: 21 },
    { name: "Horizonte", start: 22, end: 40 }
];

const MUNAY_GUIDES = {
    'CTX01': "Solo para situar tu momento de vida.",
    'CTX02': "Para entender tu contexto territorial.",
    'CTX03': "Una sola opción. Podrás cambiarla.",
    'CTX04': "Tu situación cotidiana actual.",
    'CTX05': "Aproximado, sin cálculo exacto.",
    'P01': "Una sola. Podrás cambiarla.",
    'P02': "Sin cálculo exacto.",
    'P03': "Tómate tu tiempo para revisar cada dimensión.",
    'P03_MED': "Puedes marcar más de uno si aplica.",
    'P03_MED_TXT': "Opcional. Escribe si lo recuerdas.",
    'P04': "Piensa en un día normal.",
    'P05': "No hay respuesta correcta.",
    'P06': "Hoy, no en general.",
    'P07': "Toca una o varias según corresponda.",
    'P08': "Puedes elegir varios.",
    'P09': "Habla con naturalidad.",
    'P10': "Sin pensarlo mucho.",
    'P11': "Toca las zonas que reconozcas.",
    'P12': "Todas las que quieras.",
    'P13': "La última vez que lo notaste.",
    'P14': "Sin pensarlo mucho.",
    'P15': "Este mapa es solo tuyo.",
    'P16': "Puedes cambiar de idea en cualquier momento.",
    'P17': "Una o varias.",
    'P18': "Con tus palabras.",
    'P19': "Elige la textura o densidad que sientas hoy.",
    'P20': "Aproximado, según tu presente.",
    'P21': "En la piel.",
    'P22': "La primera que venga.",
    'P23': "Munay te acompaña. Escribe con total libertad.",
    'P24': "Puedes elegir varios.",
    'P25': "Sin explicarlo.",
    'P26': "Define el tono de lo que sientes.",
    'P27': "Privado y opcional.",
    'P28': "A solas o con alguien.",
    'P29': "Puede cambiar mañana.",
    'P30': "Omite si no aplica.",
    'P31': "Una sola.",
    'P32': "Físico y emocional.",
    'P33': "Todos los que apliquen.",
    'P34': "Con tus palabras.",
    'P35': "Sin juicio.",
    'P36': "Con tus palabras.",
    'P37': "A tu ritmo.",
    'P38': "Lo que resuene en tu presente.",
    'P39': "Opcional. Lo que sientas compartir.",
    'P40': "Cierra el mapa de hoy."
};

const LANDSCAPE_DATA = {
  'L_MIRADOR': {
    num: 1,
    title: 'Mirador',
    text: 'Todo mapa comienza con una mirada. Antes de avanzar, observa desde dónde estás mirando.'
  },
  'L_MANANTIAL': {
    num: 2,
    title: 'Manantial',
    text: 'Bajo la superficie, el agua está en movimiento. El cauce aparece cuando encuentra su rumbo.'
  },
  'L_SENDERO': {
    num: 3,
    title: 'Sendero',
    text: 'Compartir camino cambia el paso. Entre dos, la intimidad tiene su propia geografía.'
  },
  'L_CLIMA': {
    num: 4,
    title: 'Clima',
    text: 'Lo cotidiano se filtra en lo íntimo. Algunos días dejan aire; otros piden espacio.'
  },
  'L_HORIZONTE': {
    num: 5,
    title: 'Horizonte',
    text: 'Una dirección puede hacerse visible antes de tener nombre. El horizonte empieza justo ahí.'
  }
};

const LANDSCAPE_ICONS = {
  'L_MIRADOR': `<svg viewBox="0 0 100 100" class="landscape-icon-svg" fill="none" stroke="#ff6105" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M14 50 C28 32 72 32 86 50 C72 68 28 68 14 50 Z" />
    <circle cx="50" cy="50" r="12" />
    <circle cx="50" cy="50" r="4.5" fill="#ff6105" />
    <path d="M50 20 L50 12" />
    <path d="M30 25 L25 18" />
    <path d="M70 25 L75 18" />
  </svg>`,

  'L_MANANTIAL': `<svg viewBox="0 0 100 100" class="landscape-icon-svg" fill="none" stroke="#ff6105" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M50 18 C43 28 37 37 37 46 C37 54 43 60 50 60 C57 60 63 54 63 46 C63 37 57 28 50 18 Z" />
    <circle cx="50" cy="46" r="3" fill="#ff6105" />
    <path d="M24 68 C34 76 66 76 76 68" />
    <path d="M16 80 C30 90 70 90 84 80" />
    <path d="M28 44 C23 48 23 54 28 58" />
    <path d="M72 44 C77 48 77 54 72 58" />
  </svg>`,

  'L_SENDERO': `<svg viewBox="0 0 100 100" class="landscape-icon-svg" fill="none" stroke="#ff6105" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M43 26 C44 33 49 37 49 43 C49 51 37 56 37 66 C37 73 41 78 44 82" />
    <path d="M57 26 C56 33 51 37 51 43 C51 51 63 56 63 66 C63 73 59 78 56 82" />
  </svg>`,

  'L_CLIMA': `<svg viewBox="0 0 100 100" class="landscape-icon-svg" fill="none" stroke="#ff6105" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M28 56 L72 56 C79 56 80 50 78 44 C77 36 69 32 62 34 C57 26 44 26 39 34 C32 34 24 40 24 48 C24 54 28 56 28 56 Z" />
    <path d="M20 68 L66 68" />
    <path d="M28 76 L66 76" />
    <path d="M38 84 L60 84" />
  </svg>`,

  'L_HORIZONTE': `<svg viewBox="0 0 100 100" class="landscape-icon-svg" fill="none" stroke="#ff6105" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 66 L88 66" />
    <path d="M32 66 A 18 18 0 0 1 68 66" />
    <path d="M22 65 A 28 28 0 0 1 78 65" />
    <path d="M50 30 L50 18" />
    <path d="M32 38 L25 29" />
    <path d="M68 38 L75 29" />
    <path d="M18 50 L10 46" />
    <path d="M82 50 L90 46" />
  </svg>`
};

function renderLandscapeEmbers() {
  const container = document.getElementById('l-embers');
  if (!container) return;
  const colors = ['#ff6105', '#ff9933', '#ffc266', '#ffe5dc', '#fff5c8'];
  let html = '';
  for (let i = 0; i < 16; i++) {
    const left = Math.round(10 + Math.random() * 80);
    const bottom = Math.round(8 + Math.random() * 45);
    const size = (2.2 + Math.random() * 2.8).toFixed(1);
    const drift = Math.round(-14 + Math.random() * 28);
    const rise = Math.round(-38 - Math.random() * 30);
    const dur = (2.4 + Math.random() * 2.2).toFixed(2);
    const delay = (Math.random() * 2.4).toFixed(2);
    const col = colors[Math.floor(Math.random() * colors.length)];
    const glow = `0 0 ${Math.round(size * 2.2)}px ${col}`;
    html += `<span class="landscape-ember" style="left:${left}%; bottom:${bottom}%; width:${size}px; height:${size}px; background:${col}; box-shadow:${glow}; --drift-x:${drift}px; --rise-y:${rise}px; animation-duration:${dur}s; animation-delay:${delay}s;"></span>`;
  }
  container.innerHTML = html;
}

function showLandscape(q) {
  go('s-landscape');
  
  const data = LANDSCAPE_DATA[q.id] || {
    num: 1,
    title: q.title || '',
    text: q.text || ''
  };
  
  const eyebrowEl = document.getElementById('l-eyebrow');
  if (eyebrowEl) eyebrowEl.innerText = `PAISAJE ${data.num} DE 5`;
  
  const titleEl = document.getElementById('l-title');
  if (titleEl) {
    let t = data.title;
    titleEl.innerText = t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
  }
  
  const textEl = document.getElementById('l-text');
  if (textEl) textEl.innerText = data.text;
  
  const iconBox = document.getElementById('l-icon-box');
  if (iconBox && LANDSCAPE_ICONS[q.id]) {
    iconBox.innerHTML = LANDSCAPE_ICONS[q.id];
  }
  
  renderLandscapeEmbers();
  
  const scrollWrap = document.querySelector('.landscape-scroll-wrap');
  if (scrollWrap) scrollWrap.scrollTop = 0;
}

function renderQuestion(id, viewIdx = 0) {
    if (id === 'END_NO_ELIGIBLE') { 
        go('s-info'); 
        document.getElementById('i-title').innerText = 'Fin del Cuestionario'; 
        document.getElementById('i-text').innerText = 'Este instrumento está diseñado específicamente para mujeres que se encuentran en una relación de pareja. Agradecemos tu interés.'; 
        document.getElementById('i-next').innerText = 'Terminar'; 
        document.getElementById('i-next').onclick = restart; 
        return; 
    } 
    if (id === 'END') {
        summary();
        go('s-sum');
        return;
    }
    
    currentQId = id;
    currentView = viewIdx;
    let q = QUESTIONS.find(x => x.id === id);
    if (!q) {
        console.error("Pregunta no encontrada:", id);
        return;
    }
    
    if (q.type === 'landscape') {
        showLandscape(q);
        return;
    }
    
    if (q.type === 'info') {
        go('s-info');
        document.getElementById('i-title').innerText = q.title;
        document.getElementById('i-text').innerText = q.text;
        document.getElementById('i-next').innerText = q.button || "Continuar";
        return;
    }

    go('s-q');
    let qbody = document.getElementById('qbody');
    let bubble = document.getElementById('bubble');
    let plbl = document.getElementById('plbl');
    let pcap = document.getElementById('pcap');
    let chs = document.getElementById('chapters');
    let nextBtn = document.getElementById('nextbtn');
    let skipBtn = document.getElementById('skip');
    let avatarEl = document.getElementById('avatar');
    if (avatarEl) avatarEl.classList.remove('listen');
    
    // --- 1. Visualización de progreso y capítulos ---
    if (id.startsWith('CTX')) {
        if (plbl) plbl.innerText = "Situar tu mapa";
        if (pcap) pcap.innerText = "Contexto";
        if (chs) {
            chs.innerHTML = '';
            CHAPTER_LIST.forEach(() => {
                let i = document.createElement('i');
                let b = document.createElement('b');
                i.appendChild(b);
                chs.appendChild(i);
            });
        }
    } else if (id.startsWith('P')) {
        let pNum = parseInt(id.replace(/\D/g, '')) || 1;
        if (plbl) plbl.innerText = `Pregunta ${pNum} de 40`;
        
        let curChIdx = 0;
        if (pNum <= 5) curChIdx = 0;
        else if (pNum <= 12) curChIdx = 1;
        else if (pNum <= 18) curChIdx = 2;
        else if (pNum <= 21) curChIdx = 3;
        else curChIdx = 4;
        
        let curCh = CHAPTER_LIST[curChIdx];
        if (pcap) pcap.innerText = curCh.name;
        
        if (chs) {
            chs.innerHTML = '';
            CHAPTER_LIST.forEach((ch, ci) => {
                let i = document.createElement('i');
                let b = document.createElement('b');
                i.appendChild(b);
                chs.appendChild(i);
                
                let pct = 0;
                if (ci < curChIdx) pct = 100;
                else if (ci > curChIdx) pct = 0;
                else {
                    let done = (pNum - ch.start + 1);
                    let total = (ch.end - ch.start + 1);
                    pct = Math.min(100, Math.max(15, Math.round((done / total) * 100)));
                }
                requestAnimationFrame(() => { b.style.width = pct + '%'; });
            });
        }
    }
    
    // --- 2. Separación de Guía Munay (burbuja) y Pregunta Central (cuerpo) ---
    let qTitle = q.text || '';
    let bubbleText = '';
    
    if (id === 'CTX00') {
        let parts = qTitle.split('\n\n');
        if (parts.length > 1) {
            bubbleText = parts[0].trim();
            qTitle = parts[1].trim();
        } else {
            bubbleText = "Antes de comenzar, cuéntanos un poco sobre ti.";
        }
    } else if (MUNAY_GUIDES[id]) {
        bubbleText = MUNAY_GUIDES[id];
    } else {
        const fallbacks = {
            'single': "Una sola opción. Podrás cambiarla antes de continuar.",
            'multiple': "Puedes elegir una o varias opciones que te identifiquen.",
            'carousel': "Elige las opciones que más se acerquen a tu presente.",
            'views': "Observa cada perspectiva con calma.",
            'body_map': "Toca en el cuerpo las zonas que reconozcas hoy.",
            'density_scale': "Siente la textura y el ritmo que mejor te describen.",
            'density_field': "Selecciona el nivel de intensidad que sientes hoy.",
            'gradient_spatial': "Ubica tu presente en la escala sin exigencias.",
            'timeline_gradient': "Elige el momento o frecuencia que sientas.",
            'distance_pair': "Observa la distancia o cercanía sin juzgar.",
            'text': "Escribe con total libertad. Este es tu espacio seguro."
        };
        bubbleText = fallbacks[q.type] || "Tómate tu tiempo para explorar y responder.";
    }
    
    if (bubble) bubble.innerText = bubbleText;
    
    // --- 3. Construcción del encabezado central de la pregunta (qtext + qmeta) ---
    let metaLabel = '';
    if (q.type === 'single') metaLabel = "Elige una";
    else if (q.type === 'multiple' || q.type === 'carousel') metaLabel = q.max ? `Elige hasta ${q.max}` : "Elige varias";
    else if (q.type === 'views') {
        let vLen = q.views ? q.views.length : 1;
        metaLabel = `Vista ${viewIdx + 1} de ${vLen}` + (q.max ? ` · Elige hasta ${q.max}` : " · Elige las que correspondan");
    }
    else if (q.type === 'body_map') metaLabel = "Toca el cuerpo para marcar zonas";
    else if (q.type === 'density_scale') metaLabel = "Elige la densidad que mejor la describe";
    else if (q.type === 'density_field') metaLabel = "Selecciona el nivel";
    else if (q.type === 'text') metaLabel = "Texto libre";
    else if (q.type === 'gradient_spatial' || q.type === 'distance_pair') metaLabel = "Elige una posición";
    else if (q.type === 'timeline_gradient') metaLabel = "Elige un momento";
    else metaLabel = "Elige una opción";

    let optHtml = q.optional ? '<span class="opt">Opcional</span>' : '';
    let headerHtml = `<div class="qtext">${qTitle}</div><div class="qmeta">${optHtml}<span>${metaLabel}</span></div>`;
    
    let ans = answers[id] || [];
    let isMulti = q.type === 'multiple' || q.type === 'carousel' || q.type === 'body_map' || q.type === 'views';
    
    // --- 4. Renderizado del cuerpo interactivo con headerHtml integrado ---
    if (q.type === 'views') {
        let viewData = q.views[viewIdx];
        let html = headerHtml;
        html += `<div class="view-title" style="font-size:14px; font-weight:600; color:var(--tawny); margin-bottom:10px;">${viewData.title}</div>`;
        html += '<div class="chips" style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:20px;">';
        viewData.options.forEach(opt => {
            let sel = ans.includes(opt.id) ? 'on' : '';
            html += `<button class="chip ${sel}" onclick="toggleOpt('${opt.id}', true, ${!!opt.ex}, ${q.max || 99})">${opt.text}</button>`;
        });
        html += '</div>';
        qbody.innerHTML = html;
        
    } else if (q.type === 'body_map') {
        let html = headerHtml;
        html += '<div class="bmap" style="position:relative; margin-bottom:20px;">' + silhouette();
        
        q.options.forEach(opt => {
            if(opt.out_of_scale) return;
            let sel = ans.includes(opt.id) ? 'on' : '';
            html += `<div class="hot ${sel}" style="left:${ZONES[opt.id].x}%; top:${ZONES[opt.id].y}%;" onclick="toggleOpt('${opt.id}', true, false, 99)"><span></span></div>`;
        });
        html += '</div><div class="chips">';
        q.options.filter(o => o.out_of_scale).forEach(opt => {
            let sel = ans.includes(opt.id) ? 'on' : '';
            html += `<button class="chip ${sel} out-scale" onclick="toggleOpt('${opt.id}', true, true, 99)">${opt.text}</button>`;
        });
        html += '</div>';
        qbody.innerHTML = html;
        
    } else if (q.type === 'text') {
        const munayImg = (q.id === 'P23') ? `<img class="munay-sentada" src="${(document.getElementById('asset-sentada') || {}).src || ''}" alt="Munay, atenta a tu respuesta">` : '';
        let html = headerHtml + munayImg;
        html += `<textarea id="txt-ans" placeholder="${q.placeholder || 'Escribe aquí tu respuesta con calma...'}" oninput="updateTextAns()" style="width:100%; height:130px; border-radius:12px; padding:14px; font-size:15px; font-family:inherit; border:1px solid var(--line); background:var(--panel); color:var(--cream); line-height:1.5; resize:vertical;">${ans[0] || ''}</textarea>`;
        qbody.innerHTML = html;

    } else if (q.type === 'density_scale') {
        const fallbackEmojis = ['☀️', '🌤️', '⛅', '☁️', '⛈️'];
        const scaleOpts = q.options.filter(o => !o.out_of_scale).slice(0, 5);
        let html = headerHtml;
        html += '<div class="dscale" style="display:flex; flex-direction:column; gap:10px; margin-bottom:16px;">';
        scaleOpts.forEach((opt, i) => {
            const sel = ans.includes(opt.id);
            const emoji = opt.emoji || fallbackEmojis[i] || '';
            const boxBg = sel ? 'rgba(178,52,30,.28)' : 'rgba(80,29,34,.50)';
            const boxBorder = sel ? 'var(--lime)' : 'var(--line)';
            html += `<button class="dscale-item ${sel ? 'on' : ''}" onclick="toggleOpt('${opt.id}', false, false, 1)" aria-pressed="${sel}" style="display:flex; align-items:center; gap:14px; width:100%; text-align:left; padding:8px 12px; border-radius:12px; cursor:pointer; font-family:inherit; color:var(--cream); background:var(--panel); border:1px solid ${sel ? 'var(--lime)' : 'var(--line)'}; box-shadow:${sel ? '0 0 0 2px rgba(224,74,30,.35)' : 'none'}; transition:all 0.2s ease;">` +
                `<span aria-hidden="true" style="flex:0 0 96px; height:52px; border-radius:8px; border:1px solid ${boxBorder}; background:${boxBg}; display:flex; align-items:center; justify-content:center; font-size:26px; line-height:1; user-select:none; transition:all 0.2s ease;">${emoji}</span>` +
                `<span style="flex:1; font-size:15px; line-height:1.3; font-weight:${sel ? '700' : '400'}; color:${sel ? '#ffffff' : 'var(--cream-2)'};">${opt.text}</span>` +
                `<span aria-hidden="true" style="flex:0 0 14px; width:14px; height:14px; border-radius:50%; border:2px solid var(--lime); background:${sel ? 'var(--lime)' : 'transparent'};"></span>` +
                `</button>`;
        });
        html += '</div><div class="chips">';
        q.options.filter(o => o.out_of_scale).forEach(opt => {
            let sel = ans.includes(opt.id) ? 'on' : '';
            const emojiPrefix = opt.emoji ? `<span style="margin-right:8px; font-size:16px; vertical-align:middle;">${opt.emoji}</span>` : '';
            html += `<button class="chip ${sel} out-scale" onclick="toggleOpt('${opt.id}', false, false, 1)">${emojiPrefix}${opt.text}</button>`;
        });
        html += '</div>';
        qbody.innerHTML = html;

    } else if (q.type === 'density_field') {
        let level = 3;
        if(ans[0]) {
            let idx = q.options.findIndex(x => x.id === ans[0]);
            if(idx >= 0 && idx < 5) level = idx + 1;
        }
        let opacities = {1:0.1, 2:0.3, 3:0.5, 4:0.7, 5:0.9};
        
        let html = headerHtml;
        html += `<div style="position:absolute; top:0;left:0;right:0;bottom:0; background:rgba(224, 74, 30, ${opacities[level]}); pointer-events:none; transition: opacity 0.5s; z-index:-1;"></div>`;
        html += '<div class="chips" style="margin-top:10px;">';
        q.options.forEach(opt => {
            let sel = ans.includes(opt.id) ? 'on' : '';
            html += `<button class="chip ${sel}" onclick="toggleOpt('${opt.id}', false, false, 1); updateDensity(this)">${opt.text}</button>`;
        });
        html += '</div>';
        qbody.innerHTML = html;

    } else {
        // generic spatial, single, multiple, carousel, etc.
        let html = headerHtml;
        html += '<div class="chips">';
        if(q.options) {
            q.options.forEach(opt => {
                let sel = ans.includes(opt.id) ? 'on' : '';
                html += `<button class="chip ${sel} ${opt.out_of_scale ? 'out-scale':''}" onclick="toggleOpt('${opt.id}', ${isMulti}, ${!!opt.ex}, ${q.max || 99})">${opt.text}</button>`;
            });
        }
        html += '</div>';
        qbody.innerHTML = html;
    }
    
    // Reset scroll para presentar la pregunta arriba con total comodidad
    qbody.scrollTop = 0;
    
    // --- 5. Actualización de botones del pie (Anterior, Omitir, Siguiente) ---
    let canNext = ans.length > 0;
    if(q.type === 'text') canNext = ans[0] && ans[0].trim().length > 0;
    if(q.optional) canNext = true; 
    
    if (q.optional) skipBtn.style.display = 'inline-flex';
    else skipBtn.style.display = 'none';
    
    if (q.type === 'views' && viewIdx < q.views.length - 1) {
        nextBtn.innerText = "Siguiente vista";
    } else {
        nextBtn.innerText = "Siguiente";
    }
    
    if(canNext) {
        nextBtn.classList.remove('disabled');
        nextBtn.style.opacity = '1';
        nextBtn.disabled = false;
    } else {
        nextBtn.classList.add('disabled');
        nextBtn.style.opacity = '0.5';
        nextBtn.disabled = true;
    }
}

window.updateDensity = function(btn) {
    renderQuestion(currentQId, currentView); 
};

window.updateTextAns = function() {
    let val = document.getElementById('txt-ans').value;
    answers[currentQId] = [val];
    let q = QUESTIONS.find(x => x.id === currentQId);
    let canNext = val.trim().length > 0 || q.optional;
    let nextBtn = document.getElementById('nextbtn');
    if(canNext) {
        nextBtn.classList.remove('disabled');
        nextBtn.style.opacity = '1';
        nextBtn.disabled = false;
    } else {
        nextBtn.classList.add('disabled');
        nextBtn.style.opacity = '0.5';
        nextBtn.disabled = true;
    }
};

window.toggleOpt = function(optId, isMulti, isEx, max) {
    if (!answers[currentQId]) answers[currentQId] = [];
    let arr = answers[currentQId];
    
    if (!isMulti) {
        answers[currentQId] = [optId];
    } else {
        if (isEx) {
            answers[currentQId] = [optId];
        } else {
            let q = QUESTIONS.find(x => x.id === currentQId);
            let optsList = q.options || [];
            if(q.type === 'views') {
                optsList = q.views.flatMap(v => v.options);
            }
            let exOpts = optsList.filter(o => o.ex).map(o => o.id);
            answers[currentQId] = arr.filter(a => !exOpts.includes(a));
            arr = answers[currentQId];
            
            if (arr.includes(optId)) {
                answers[currentQId] = arr.filter(x => x !== optId);
            } else {
                if (arr.length < max) {
                    answers[currentQId].push(optId);
                }
            }
        }
    }
    renderQuestion(currentQId, currentView);
};

window.next = function(isSkip) {
    if(isSkip) {
        answers[currentQId] = ['OMITTED'];
    }
    
    let q = QUESTIONS.find(x => x.id === currentQId);
    let ans = answers[currentQId] || [];
    
    if (q.type === 'views' && currentView < q.views.length - 1) {
        historyArr.push({id: currentQId, view: currentView});
        saveState();
        renderQuestion(currentQId, currentView + 1);
        return;
    }
    
    historyArr.push({id: currentQId, view: currentView});
    saveState();
    
    let nextId = null;
    if (q.next_logic) {
        let func = new Function('ans', 'getAns', 'hasAny', q.next_logic);
        nextId = func(ans, getAns, hasAny);
    } else {
        nextId = q.next;
    }
    
    if (nextId) {
        renderQuestion(nextId, 0);
    }
};

window.prev = function() {
    if (historyArr.length === 0) {
        go('s-splash');
        return;
    }
    let last = historyArr.pop();
    saveState();
    renderQuestion(last.id, last.view);
};

window.nextInfo = function() {
    let q = QUESTIONS.find(x => x.id === currentQId);
    historyArr.push({id: currentQId, view: 0});
    saveState();
    if (q.next) renderQuestion(q.next, 0);
};

window.nextLandscape = function() {
    let q = QUESTIONS.find(x => x.id === currentQId);
    historyArr.push({id: currentQId, view: 0});
    saveState();
    if (q.next) renderQuestion(q.next, 0);
};

function summary() {
  const s = document.getElementById('sum'); 
  s.innerHTML = '';
  
  const h = el('h2','', 'Registro Completado'); 
  s.appendChild(h);
  
  const tn = el('div','terr-note');
  tn.innerHTML = '<strong>Cierre Técnico Neutro (Motor V12):</strong><br>Tus respuestas han sido capturadas y empaquetadas en un <em>Configuration Object</em>. El Motor de Configuración procesará este snapshot en segundo plano. No se emite lectura personalizada preliminar.';
  tn.style.borderColor = '#e04a1e';
  tn.style.background = 'rgba(224, 74, 30, 0.1)';
  s.appendChild(tn);

  // Construcción del Snapshot (Configuration Object) según V12
  const configurationObject = {
      timestamp: new Date().toISOString(),
      version: "12",
      answers: answers
  };

  const pre = el('pre', 'kv');
  pre.style.whiteSpace = 'pre-wrap';
  pre.style.fontSize = '12px';
  pre.style.textAlign = 'left';
  pre.style.padding = '15px';
  pre.style.marginTop = '20px';
  pre.textContent = JSON.stringify(configurationObject, null, 2);
  s.appendChild(pre);
  
  console.log("Configuration Object Snapshot:", configurationObject);
}

function startApp() {
    document.querySelectorAll('.sw-toggle').forEach(el=>el.addEventListener('click',()=>el.classList.toggle('on')));

    document.getElementById('startbtn')?.addEventListener('click', () => {
        renderQuestion('PRE01');
    });
    
    if (historyArr.length > 0) {
        let last = historyArr[historyArr.length - 1];
        renderQuestion(last.id, last.view);
    } else {
        go('s-splash');
    }
}

window.onload = startApp;

let AC=null, ambOn=false, ambNodes=[];
window.toggleAmbient = function(){
  const btn=document.getElementById('ambbtn');
  if(ambOn){ ambNodes.forEach(n=>{try{n.stop&&n.stop();n.disconnect&&n.disconnect();}catch(e){}}); ambNodes=[]; ambOn=false; if(btn) btn.classList.remove('on'); return; }
  try{
    AC=AC||new (window.AudioContext||window.webkitAudioContext)();
    const master=AC.createGain(); master.gain.value=0.0001; master.connect(AC.destination);
    master.gain.exponentialRampToValueAtTime(0.18, AC.currentTime+2.5);
    const buf=AC.createBuffer(1, AC.sampleRate*2, AC.sampleRate); const d=buf.getChannelData(0); let last=0;
    for(let i=0;i<d.length;i++){ const w=Math.random()*2-1; last=(last+0.02*w)/1.02; d[i]=last*3.5; }
    const src=AC.createBufferSource(); src.buffer=buf; src.loop=true;
    const lp=AC.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=900;
    const lfo=AC.createOscillator(); lfo.frequency.value=0.07; const lfoG=AC.createGain(); lfoG.gain.value=300; lfo.connect(lfoG); lfoG.connect(lp.frequency); lfo.start();
    src.connect(lp); lp.connect(master); src.start();
    const chirp=AC.createOscillator(); chirp.type='sine'; chirp.frequency.value=4200;
    const cg=AC.createGain(); cg.gain.value=0; chirp.connect(cg); cg.connect(master); chirp.start();
    const am=AC.createOscillator(); am.frequency.value=38; const amG=AC.createGain(); amG.gain.value=0.012; am.connect(amG); amG.connect(cg.gain); am.start();
    const bp=AC.createBiquadFilter(); bp.type='highpass'; bp.frequency.value=3500;
    ambNodes=[src,lfo,chirp,am,master];
    ambOn=true; if(btn) btn.classList.add('on');
  }catch(e){ console.warn('audio no disponible',e); }
};
window.openSheet = function(){
    let sheet = document.getElementById('sheet');
    let scrim = document.getElementById('scrim');
    if (sheet) sheet.classList.add('on');
    if (scrim) scrim.classList.add('on');
};
window.closeSheet = function(){
    let sheet = document.getElementById('sheet');
    let scrim = document.getElementById('scrim');
    if (sheet) sheet.classList.remove('on');
    if (scrim) scrim.classList.remove('on');
};
window.restart = function() { clearState(); go('s-splash'); };
window.startChapter = function(n) { renderQuestion('PRE01'); };
