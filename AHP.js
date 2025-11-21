/* =========================================
   AHP.js - Mini Chat Box (Small Chat Widget)
========================================= */

/* ----------------------
   Inject CSS for widget
---------------------- */
(function injectAHPStyles(){
    const css = `
#ahp-chat-btn {
    position: fixed;
    right: 18px;
    bottom: 18px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    box-shadow: 0 6px 18px rgba(0,0,0,0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    cursor: pointer;
    background: white;
    border: 2px solid rgba(0,0,0,0.06);
    transition: transform .18s ease, box-shadow .18s ease;
}
#ahp-chat-btn:hover { transform: translateY(-4px); }

#ahp-chat-btn img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    object-fit: cover;
}

#ahp-chat-panel {
    position: fixed;
    right: 18px;
    bottom: 88px;
    width: 320px;
    max-width: calc(100% - 36px);
    height: 420px;
    background: #ffffff;
    border-radius: 14px;
    box-shadow: 0 18px 50px rgba(0,0,0,0.28);
    overflow: hidden;
    display: none;
    flex-direction: column;
    z-index: 99999;
    font-family: 'Segoe UI', Arial, sans-serif;
}

/* header */
#ahp-chat-panel .ahp-header {
    background: linear-gradient(90deg,#0077cc,#005fa0);
    color: #fff;
    padding: 12px 14px;
    display: flex;
    align-items: center;
    gap: 10px;
}
#ahp-chat-panel .ahp-header .title { font-weight: 700; font-size: 15px; }
#ahp-chat-panel .ahp-header .subtitle { font-size: 12px; opacity: 0.9; }

/* messages */
#ahp-chat-messages {
    padding: 12px;
    flex: 1 1 auto;
    overflow-y: auto;
    background: linear-gradient(180deg,#f7fbff,#ffffff);
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.ahp-msg { font-size: 14px; max-width: 82%; }
.ahp-msg.you {
    align-self: flex-end;
    background:#0077cc;
    color:#fff;
    padding:8px 12px;
    border-radius:12px 12px 8px 12px;
}
.ahp-msg.bot {
    align-self: flex-start;
    background:#f1f5fb;
    color:#0b2b3a;
    padding:8px 12px;
    border-radius:12px 12px 12px 8px;
}

/* input */
#ahp-chat-input-row {
    padding: 10px;
    border-top: 1px solid #eee;
    display:flex;
    gap:8px;
}
#ahp-chat-input {
    flex: 1;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid #e6e9ee;
    outline: none;
}
#ahp-chat-send {
    background: linear-gradient(135deg,#0077cc,#005fa0);
    color: white;
    padding: 9px 12px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
}

.ahp-suggestions {
    display:flex;
    flex-wrap:wrap;
    gap:8px;
    padding:8px 12px;
}
.ahp-suggestion {
    background:#f2f7ff;
    color:#003366;
    padding:7px 10px;
    font-size:13px;
    border-radius:8px;
    cursor:pointer;
    border:1px solid rgba(0,0,0,0.03);
}

/* small screens */
@media (max-width:420px) {
    #ahp-chat-panel { width: 94%; right: 3%; bottom: 82px; height: 70vh; }
}
`;
    const s = document.createElement('style');
    s.innerHTML = css;
    document.head.appendChild(s);
})();

/* ----------------------
   Create Chat Widget UI
---------------------- */
(function createAHPWidget(){

    /* Chat Button */
    const chatBtn = document.createElement('div');
    chatBtn.id = 'ahp-chat-btn';

    const icon = document.createElement('img');
    icon.src = '/mnt/data/e86bd5c8-ace1-4fd3-a6b0-c8845c3dd67a.png';  // your image
    chatBtn.appendChild(icon);

    document.body.appendChild(chatBtn);

    /* Chat Panel */
    const panel = document.createElement('div');
    panel.id = 'ahp-chat-panel';
    panel.innerHTML = `
        <div class="ahp-header">
            <div>
                <div class="title">Ambay Chat</div>
                <div class="subtitle">Ask about timings, brands, plywood…</div>
            </div>
            <div id="ahp-close" style="margin-left:auto;cursor:pointer;">✕</div>
        </div>

        <div id="ahp-chat-messages">
            <div class="ahp-msg bot">Hi! I'm Ambay bot. Ask me anything.</div>
        </div>

        <div class="ahp-suggestions" id="ahp-suggestions">
            <div class="ahp-suggestion">Timings</div>
            <div class="ahp-suggestion">Address</div>
            <div class="ahp-suggestion">Plywood</div>
            <div class="ahp-suggestion">Laminates</div>
            <div class="ahp-suggestion">Hardware</div>
            <div class="ahp-suggestion">Brands</div>
        </div>

        <div id="ahp-chat-input-row">
            <input id="ahp-chat-input" placeholder="Type a question..." />
            <button id="ahp-chat-send">Send</button>
        </div>
    `;
    document.body.appendChild(panel);

    /* Button Toggle */
    chatBtn.addEventListener('click', () => {
        panel.style.display = panel.style.display === 'flex' ? 'none' : 'flex';
    });
    document.getElementById('ahp-close').addEventListener('click', () => panel.style.display = 'none');

    /* --------------------------
       Message Functions
    -------------------------- */
    function sendUserMessage(text){
        const box = document.createElement('div');
        box.className = 'ahp-msg you';
        box.textContent = text;
        document.getElementById('ahp-chat-messages').appendChild(box);
        scrollMessages();
        document.getElementById('ahp-chat-input').value = '';
    }

    function sendBotMessage(text, html=false){
        const messages = document.getElementById('ahp-chat-messages');
        const box = document.createElement('div');
        box.className = 'ahp-msg bot';

        if(html){
            box.innerHTML = text;
        } else {
            box.textContent = text;
        }

        messages.appendChild(box);
        scrollMessages();
    }

    function scrollMessages(){
        const m = document.getElementById('ahp-chat-messages');
        m.scrollTop = m.scrollHeight;
    }

    /* ----------------------
       Knowledge Base (Final)
    ---------------------- */
    const kb = [
        {keys:['hi','hello','hey'], ans:'Hello! How can I help you today?'},
        {keys:['timing','time','open','opening'], ans:'We are open 9:00 AM to 8:00 PM every day.'},
        {keys:['address','location','where'], ans:'Ambay Hardware & Plywood — Marble Market, Alwar Bypass Road, Bhiwadi.'},
        {keys:['contact','phone','number'], ans:'Phone / WhatsApp: 8058984540'},

        {keys:['owner','akhilesh','akhilesh yadav'], ans:'Owner: Akhilesh Yadav.'},
        {keys:['established','2 nov','2009','since'], ans:'The shop was established on 2 November 2009.'},
        {keys:['shop age','how old'], ans:'We have been serving Bhiwadi since 2009.'},

        {keys:['email','mail'], ans:'Email: ambayhardwareandplywood@gmail.com'},

        {keys:['plywood'], ans:'We offer Century, Nexus, Virgo, Action Tesa plywood.'},
        {keys:['laminate','laminates'], ans:'Decorative & commercial laminates available.'},
        {keys:['hardware','fittings'], ans:'Hardware: Hettich, Dorset, Rider Ultima etc.'},
        {keys:['adhesive','fevicol','bondtite'], ans:'Fevicol & Astral Bondtite available.'},

        {keys:['brands','brand list'], ans:'Brands: Hettich, Dorset, Astral, Rider, Nexus, Fevicol, Virgo, Century, Action Tesa.'},

        {keys:['review','reviews','google review','rating','google rating','customer review'],
         ans:'See our Google reviews ⭐ https://www.google.com/search?q=Ambay+Hardware+%26+Plywood+Bhiwadi'},

        {keys:['delivery'], ans:'We offer local delivery in Bhiwadi.'},
        {keys:['price','rate','cost'], ans:'Prices vary by product. Please message us on WhatsApp.'},
        {keys:['help'], ans:'I can help with timings, brands, plywood, hardware & more.'},
        {keys:['thanks','thank you'], ans:'You are welcome!'}
    ];

    /* ----------------------
       Handle User Message
    ---------------------- */
    function handleMessage(q){
        const text = q.toLowerCase();

        // Check knowledge base
        for(let item of kb){
            if(item.keys.some(k => text.includes(k))){
                sendBotMessage(item.ans);
                return;
            }
        }

        // Unknown → WhatsApp fallback
        sendBotMessage("I couldn't understand that. Tap below to chat on WhatsApp.");
        sendBotMessage(`<a href="https://wa.me/918058984540" 
            target="_blank" style="background:#25d366;color:white;
            padding:7px 12px;border-radius:8px;display:inline-block;
            text-decoration:none;">Chat on WhatsApp</a>`, true);
    }

    /* ----------------------
       Input / Suggestions
    ---------------------- */
    document.getElementById('ahp-chat-send').addEventListener('click', ()=>{
        const txt = document.getElementById('ahp-chat-input').value.trim();
        if(!txt) return;
        sendUserMessage(txt);
        handleMessage(txt);
    });

    document.getElementById('ahp-suggestions').addEventListener('click', (e)=>{
        if(e.target.classList.contains('ahp-suggestion')){
            const q = e.target.textContent;
            sendUserMessage(q);
            handleMessage(q);
        }
    });

})();


