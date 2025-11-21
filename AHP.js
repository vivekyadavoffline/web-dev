/* =========================================
   AHP.js - Final Working Mini Chat Widget
========================================= */

/* Inject CSS */
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
    transition: transform .18s ease;
    user-select:none;
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
}
#ahp-chat-panel .ahp-header .title { font-weight: 700; font-size: 15px; }
#ahp-chat-panel .ahp-header .subtitle { font-size: 12px; opacity: 0.9; }

/* messages */
#ahp-chat-messages {
    padding: 12px;
    flex: 1 1 auto;
    overflow-y: auto;
    background: #f7fbff;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.ahp-msg {
    font-size: 14px;
    max-width: 82%;
    line-height:1.4;
}
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
    align-items:center;
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

/* suggestions */
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
    user-select:none;
}
`;
    const s = document.createElement('style');
    s.innerHTML = css;
    document.head.appendChild(s);
})();

/* Create Chat Widget */
(function createAHPWidget(){

    /* Chat Button */
    const chatBtn = document.createElement('div');
    chatBtn.id = 'ahp-chat-btn';

    const icon = document.createElement('img');
    icon.src = "ahpchatbot.png";   /* Your confirmed logo */
    chatBtn.appendChild(icon);

    document.body.appendChild(chatBtn);

    /* Chat Panel */
    const panel = document.createElement('div');
    panel.id = 'ahp-chat-panel';
    panel.innerHTML = `
        <div class="ahp-header">
            <div>
                <div class="title">AHP Bot</div>
                <div class="subtitle">Ask about timings, brands & more…</div>
            </div>
            <div id="ahp-close" style="margin-left:auto;cursor:pointer;">✕</div>
        </div>

        <div id="ahp-chat-messages">
            <div class="ahp-msg bot">Hi! I'm AHP bot. How can I help?</div>
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

    /* Open/Close */
    chatBtn.addEventListener('click', () => {
        panel.style.display = panel.style.display === "flex" ? "none" : "flex";
    });
    document.getElementById("ahp-close").onclick = () => { panel.style.display="none"; };

    /* Helpers */
    function addUser(text){
        const msg=document.createElement('div');
        msg.className='ahp-msg you';
        msg.textContent=text;
        messages.append(msg);
        scroll();
        input.value="";
    }

    function addBot(text,html=false){
        const msg=document.createElement('div');
        msg.className='ahp-msg bot';
        msg[html ? "innerHTML" : "textContent"] = text;
        messages.append(msg);
        scroll();
    }

    function scroll(){
        messages.scrollTop = messages.scrollHeight;
    }

    const messages = document.getElementById('ahp-chat-messages');
    const input    = document.getElementById('ahp-chat-input');

    /* Knowledge Base */
    const kb = [
        {keys:['hi','hello'], ans:'Hello! How can I help?'},
        {keys:['timing','open'], ans:'We are open 9 AM – 8 PM daily.'},
        {keys:['address','location'], ans:'Marble Market, Alwar Bypass Road, Bhiwadi.'},
        {keys:['phone','contact'], ans:'Phone / WhatsApp: 8058984540'},
        {keys:['owner','akhilesh'], ans:'Owner: Akhilesh Yadav'},
        {keys:['2009','established'], ans:'The shop was established on 2 Nov 2009.'},
        {keys:['email','mail'], ans:'Email: ambayhardwareandplywood@gmail.com'},
        {keys:['plywood'], ans:'Plywood: Century, Nexus, Virgo, Action Tesa.'},
        {keys:['laminate'], ans:'Laminates available: Virgo, Century and more.'},
        {keys:['hardware'], ans:'Hardware brands: Hettich, Dorset, Rider Ultima.'},
        {keys:['brands'], ans:'Hettich, Dorset, Astral, Nexus, Fevicol, Century, Tesa & more.'},
        {keys:['review'], ans:'Google Reviews ⭐ https://www.google.com/search?q=Ambay+Hardware+%26+Plywood+Bhiwadi'},
        {keys:['price','rate'], ans:'Prices vary by product. Please WhatsApp us.'},
        {keys:['help'], ans:'Try asking: timings, plywood, brands, address.'}
    ];

    /* Process Message */
    function handle(text){
        const q=text.toLowerCase();

        for(const item of kb){
            if(item.keys.some(k=>q.includes(k))){
                addBot(item.ans);
                return;
            }
        }

        addBot("I couldn't understand that.");
        addBot(`<a href="https://wa.me/918058984540" target="_blank"
            style="background:#25d366;color:white;padding:7px 12px;border-radius:8px;text-decoration:none;">
            Chat on WhatsApp</a>`, true);
    }

    /* Send Button */
    document.getElementById('ahp-chat-send').onclick = ()=>{
        if(!input.value.trim()) return;
        addUser(input.value);
        handle(input.value);
    };

    /* Suggestions */
    document.getElementById('ahp-suggestions').onclick = (e)=>{
        if(e.target.classList.contains("ahp-suggestion")){
            const q=e.target.textContent;
            addUser(q);
            handle(q);
        }
    };

})();

