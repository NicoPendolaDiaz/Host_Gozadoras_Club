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
  <path d="M100 20 C115 20 125 35 125 50 C125 70 115 80 115 85 C130 90 145 95 150 110 C155 125 155 160 145 180 C135 200 145 220 150 240 C155 260 160 300 155 350 L145 380 C140 395 120 395 115 380 L105 280 L95 280 L85 380 C80 395 60 395 55 380 L45 350 C40 300 45 260 50 240 C55 220 65 200 55 180 C45 160 45 125 50 110 C55 95 70 90 85 85 C85 80 75 70 75 50 C75 35 85 20 100 20 Z" fill="#14291f" stroke="#254333" stroke-width="1.2"/>
  <g clip-path="url(#bodyclip)" fill="none" stroke="#4fae7b" stroke-width=".8" opacity=".35">
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

function renderQuestion(id, viewIdx = 0) {
    if (id === 'END_NO_ELIGIBLE') { go('s-info'); document.getElementById('i-title').innerText = 'Fin del Cuestionario'; document.getElementById('i-text').innerText = 'Este instrumento está diseñado específicamente para mujeres que se encuentran en una relación de pareja. Agradecemos tu interés.'; document.getElementById('i-next').innerText = 'Terminar'; document.getElementById('i-next').onclick = restart; return; } if (id === 'END') {
        summary();
        go('s-sum');
        return;
    }
    
    currentQId = id;
    currentView = viewIdx;
    let q = QUESTIONS.find(x => x.id === id);
    
    if (q.type === 'landscape') {
        go('s-landscape');
        document.getElementById('l-title').innerText = q.title;
        document.getElementById('l-text').innerText = q.text;
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
    let pcap = document.getElementById('pcap');
    let nextBtn = document.getElementById('nextbtn');
    let skipBtn = document.getElementById('skip');
    
    // Update Chapter progress visualization based on id prefix
    let chText = "Contexto";
    if (id.startsWith('P')) {
        let num = parseInt(id.substring(1,3));
        if (num <= 5) chText = "Mirador";
        else if (num <= 12) chText = "Manantial";
        else if (num <= 18) chText = "Sendero";
        else if (num <= 21) chText = "Clima";
        else chText = "Horizonte";
    }
    document.getElementById('plbl').innerText = chText;
    
    let ans = answers[id] || [];
    let isMulti = q.type === 'multiple' || q.type === 'carousel' || q.type === 'body_map' || q.type === 'views';
    
    if (q.type === 'views') {
        bubble.innerText = q.text;
        let viewData = q.views[viewIdx];
        pcap.innerText = viewData.title + ` (Vista ${viewIdx + 1} de ${q.views.length})`;
        
        let html = '<div class="chips" style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:20px;">';
        viewData.options.forEach(opt => {
            let sel = ans.includes(opt.id) ? 'on' : '';
            html += `<button class="chip ${sel}" onclick="toggleOpt('${opt.id}', true, ${!!opt.ex}, ${q.max || 99})">${opt.text}</button>`;
        });
        html += '</div>';
        qbody.innerHTML = html;
        
    } else if (q.type === 'body_map') {
        bubble.innerText = q.text;
        pcap.innerText = 'Toca las zonas';
        let html = '<div class="bmap" style="position:relative; margin-bottom:20px;">' + silhouette();
        
        q.options.forEach(opt => {
            if(opt.out_of_scale) return; // handled as normal buttons below
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
        bubble.innerText = q.text;
        pcap.innerText = '';
        qbody.innerHTML = `<textarea id="txt-ans" placeholder="${q.placeholder || 'Escribe aquí...'}" oninput="updateTextAns()" style="width:100%; height:120px; border-radius:8px; padding:12px; font-size:16px; font-family:inherit; border:1px solid #4fae7b; background:transparent; color:#f0f2f0;">${ans[0] || ''}</textarea>`;
    } else if (q.type === 'density_field') {
        bubble.innerText = q.text;
        pcap.innerText = 'Selecciona el nivel';
        
        // Let's use opacity of a green div to simulate density
        let level = 3;
        if(ans[0]) {
            let idx = q.options.findIndex(x => x.id === ans[0]);
            if(idx >= 0 && idx < 5) level = idx + 1;
        }
        let opacities = {1:0.1, 2:0.3, 3:0.5, 4:0.7, 5:0.9};
        
        let html = `<div style="position:absolute; top:0;left:0;right:0;bottom:0; background:rgba(79, 174, 123, ${opacities[level]}); pointer-events:none; transition: opacity 0.5s; z-index:-1;"></div>`;
        html += '<div class="chips" style="margin-top:20px;">';
        q.options.forEach(opt => {
            let sel = ans.includes(opt.id) ? 'on' : '';
            html += `<button class="chip ${sel}" onclick="toggleOpt('${opt.id}', false, false, 1); updateDensity(this)">${opt.text}</button>`;
        });
        html += '</div>';
        qbody.innerHTML = html;
    } else {
        // generic spatial, single, multiple, etc
        bubble.innerText = q.text;
        pcap.innerText = '';
        let html = '<div class="chips">';
        if(q.options) {
            q.options.forEach(opt => {
                let sel = ans.includes(opt.id) ? 'on' : '';
                html += `<button class="chip ${sel} ${opt.out_of_scale ? 'out-scale':''}" onclick="toggleOpt('${opt.id}', ${isMulti}, ${!!opt.ex}, ${q.max || 99})">${opt.text}</button>`;
            });
        }
        html += '</div>';
        qbody.innerHTML = html;
    }
    
    // Update footer buttons
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
  const h = el('h2','', 'Tu cuerpo-territorio (v1.0)'); 
  s.appendChild(h);
  
  const m = el('div','bmap'); 
  m.innerHTML = silhouette();
  
  const hits = new Set(getAns('P11'));
  
  Object.keys(ZONES).forEach(z => {
      const d = el('div','hot');
      d.style.left = ZONES[z].x + '%';
      d.style.top = ZONES[z].y + '%';
      d.innerHTML = '<span></span>';
      if(hits.has(z)) d.classList.add('on');
      else d.classList.add('dim');
      m.appendChild(d);
  });
  s.appendChild(m);
  
  const tg = el('div','tags'); 
  [...hits].forEach(z => {
      const t = el('span','hi', ZONES[z].l);
      tg.appendChild(t);
  }); 
  if(!tg.children.length) tg.appendChild(el('span','','Sin zonas marcadas aún')); 
  s.appendChild(tg);
  
  const kv = document.createElement('dl');
  kv.className = 'kv';
  
  const getOptText = (qId, ansId) => {
      let q = QUESTIONS.find(x => x.id === qId);
      if(!q) return ansId;
      let opts = q.options;
      if(q.type === 'views') opts = q.views.flatMap(v => v.options);
      if(!opts) return ansId;
      let opt = opts.find(o => o.id === ansId);
      return opt ? opt.text : ansId;
  };
  
  let p02_ans = getAns('P02')[0];
  let p15_ans = getAns('P15')[0];
  let p22_ans = getAns('P22').map(a => getOptText('P22', a)).join(', ');
  
  const rows = [
      ["Cercanía al deseo", p02_ans ? getOptText('P02', p02_ans) : '-'],
      ["Protagonismo de placer", p15_ans ? getOptText('P15', p15_ans) : '-'],
      ["Lo más valioso", p22_ans || '-']
  ];
  
  rows.filter(r => r[1]).forEach(([k,v]) => {
      const dt = document.createElement('dt'); dt.textContent = k;
      const dd = document.createElement('dd'); dd.textContent = v;
      kv.append(dt,dd);
  });
  s.appendChild(kv);
  
  const done = Object.keys(answers).length; 
  s.appendChild(el('p','lead',`${done} dimensiones respondidas.`));
  
  const tn = el('div','terr-note');
  tn.innerHTML = 'Lo que marcaste no es un diagnóstico: es un <em>mapa situado</em> de tu territorio en tu estación actual. Guarda una captura de pantalla de esta hoja.';
  s.appendChild(tn);
}

function startApp() {
document.querySelectorAll('.sw-toggle').forEach(el=>el.addEventListener('click',()=>el.classList.toggle('on')));

    // Check if the original event listeners exist, we are hijacking them via HTML inline onclick mostly
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
  if(ambOn){ ambNodes.forEach(n=>{try{n.stop&&n.stop();n.disconnect&&n.disconnect();}catch(e){}}); ambNodes=[]; ambOn=false; btn.classList.remove('on'); return; }
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
    ambOn=true; btn.classList.add('on');
  }catch(e){ console.warn('audio no disponible',e); }
};
window.openSheet = function(){document.getElementById('sheet').classList.add('on');document.getElementById('scrim').classList.add('on');};
window.closeSheet = function(){document.getElementById('sheet').classList.remove('on');document.getElementById('scrim').classList.remove('on');};
window.restart = function() { clearState(); go('s-splash'); };
window.startChapter = function(n) { renderQuestion('PRE01'); };
