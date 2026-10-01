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

function go(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    let scr = document.getElementById(screenId);
    if(scr) scr.classList.add('active');
}

function renderQuestion(id, viewIdx = 0) {
    currentQId = id;
    currentView = viewIdx;
    let q = QUESTIONS.find(x => x.id === id);
    
    if (q.type === 'landscape') {
        go('s-landscape');
        document.getElementById('l-title').innerText = q.title;
        document.getElementById('l-text').innerText = q.text;
        document.getElementById('l-next').onclick = () => {
            historyArr.push({id: id, view: viewIdx});
            saveState();
            if (q.next) renderQuestion(q.next);
        };
        return;
    }
    
    if (q.type === 'info') {
        go('s-info');
        document.getElementById('i-title').innerText = q.title;
        document.getElementById('i-text').innerText = q.text;
        document.getElementById('i-next').innerText = q.button || "Continuar";
        document.getElementById('i-next').onclick = () => {
            historyArr.push({id: id, view: viewIdx});
            saveState();
            if (q.next) renderQuestion(q.next);
        };
        return;
    }

    go('s-q');
    let qbody = document.getElementById('qbody');
    let bubble = document.getElementById('bubble');
    let pcap = document.getElementById('pcap');
    
    let ans = answers[id] || [];
    let isMulti = q.type === 'multiple' || q.type === 'carousel' || q.type === 'body_map' || q.type === 'views';
    if(q.type === 'views') {
        bubble.innerText = q.text;
        let viewData = q.views[viewIdx];
        pcap.innerText = viewData.title + ` (Vista ${viewIdx + 1} de ${q.views.length})`;
        
        let html = '<div class="options-grid">';
        viewData.options.forEach(opt => {
            let sel = ans.includes(opt.id) ? 'selected' : '';
            html += `<button class="opt-btn ${sel}" onclick="toggleOpt('${opt.id}', true, ${!!opt.ex}, ${q.max || 99})">${opt.text}</button>`;
        });
        html += '</div>';
        qbody.innerHTML = html;
        
    } else if (q.type === 'carousel') {
        bubble.innerText = q.text;
        pcap.innerText = 'Selecciona hasta ' + q.max;
        let html = '<div class="carousel-container">';
        q.options.forEach(opt => {
            let sel = ans.includes(opt.id) ? 'selected' : '';
            html += `<button class="opt-btn ${sel}" onclick="toggleOpt('${opt.id}', true, ${!!opt.ex}, ${q.max || 99})">${opt.text}</button>`;
        });
        html += '</div>';
        qbody.innerHTML = html;
        
    } else if (q.type === 'text') {
        bubble.innerText = q.text;
        pcap.innerText = '';
        qbody.innerHTML = `<textarea id="txt-ans" placeholder="${q.placeholder || 'Escribe aquí...'}" oninput="updateTextAns()">${ans[0] || ''}</textarea>`;
    } else if (q.type === 'density_field') {
        bubble.innerText = q.text;
        pcap.innerText = 'Selecciona un punto del clima';
        
        // Background density effect
        let level = 3;
        if(ans[0]) {
            let idx = q.options.findIndex(x => x.id === ans[0]);
            if(idx >= 0 && idx < 5) level = idx + 1;
        }
        let opacities = {1:0.2, 2:0.35, 3:0.5, 4:0.65, 5:0.8};
        qbody.innerHTML = `<div class="density-bg" style="opacity: ${opacities[level]}"></div>`;
        
        let html = '<div class="density-controls" style="position:relative; z-index:2;">';
        q.options.forEach(opt => {
            let sel = ans.includes(opt.id) ? 'selected' : '';
            html += `<button class="opt-btn ${sel}" onclick="toggleOpt('${opt.id}', false, false, 1); updateDensity(this)">${opt.text}</button>`;
        });
        html += '</div>';
        qbody.innerHTML += html;
    } else {
        // generic spatial, single, multiple, etc
        bubble.innerText = q.text;
        pcap.innerText = '';
        let html = '<div class="options-list">';
        if(q.options) {
            q.options.forEach(opt => {
                let sel = ans.includes(opt.id) ? 'selected' : '';
                html += `<button class="opt-btn ${sel} ${opt.out_of_scale ? 'out-scale':''}" onclick="toggleOpt('${opt.id}', ${isMulti}, ${!!opt.ex}, ${q.max || 99})">${opt.text}</button>`;
            });
        }
        html += '</div>';
        qbody.innerHTML = html;
    }
    
    // Inject Next/Back/Omitir
    let btnHtml = '<div class="action-btns">';
    btnHtml += `<button class="btn btn-sec" onclick="goBack()">Volver</button>`;
    
    if (q.optional) {
        btnHtml += `<button class="btn btn-sec" onclick="doOmit()">Omitir por ahora</button>`;
    }
    
    let canNext = ans.length > 0;
    if(q.type === 'text') canNext = ans[0] && ans[0].trim().length > 0;
    if(q.optional) canNext = true; 
    
    let nextText = "Siguiente";
    if (q.type === 'views' && viewIdx < q.views.length - 1) {
        nextText = "Siguiente vista";
    }
    
    btnHtml += `<button class="btn btn-primary" id="btn-next" ${canNext ? '' : 'disabled'} onclick="goNext()">${nextText}</button>`;
    btnHtml += '</div>';
    qbody.innerHTML += btnHtml;
}

window.updateDensity = function(btn) {
    renderQuestion(currentQId, currentView); // re-renders to update opacity
};

window.updateTextAns = function() {
    let val = document.getElementById('txt-ans').value;
    answers[currentQId] = [val];
    document.getElementById('btn-next').disabled = val.trim().length === 0;
};

window.toggleOpt = function(optId, isMulti, isEx, max) {
    if (!answers[currentQId]) answers[currentQId] = [];
    let arr = answers[currentQId];
    
    if (!isMulti) {
        answers[currentQId] = [optId];
    } else {
        if (isEx) {
            answers[currentQId] = [optId]; // exclusive replaces everything
        } else {
            // remove any exclusive options
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

window.doOmit = function() {
    answers[currentQId] = ['OMITTED'];
    goNext();
};

window.goNext = function() {
    let q = QUESTIONS.find(x => x.id === currentQId);
    let ans = answers[currentQId] || [];
    
    // Check if it has more views
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

window.goBack = function() {
    if (historyArr.length === 0) {
        go('s-splash');
        return;
    }
    let last = historyArr.pop();
    saveState();
    renderQuestion(last.id, last.view);
};

function startApp() {
    if (historyArr.length > 0) {
        let last = historyArr[historyArr.length - 1];
        renderQuestion(last.id, last.view);
    } else {
        go('s-splash');
    }
}

window.onload = startApp;
