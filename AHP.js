/* =========================================
   AHP.js - Final Stable Mini Chat Widget
========================================= */

/* -------------------------
   Inject Chatbot CSS
-------------------------- */
(function injectAHPStyles() {
    const css = `
/* Button */
#ahp-chat-btn {
    position: fixed;
    right: 18px;
    bottom: 18px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 6px 18px rgba(0,0,0,0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 99999;
    transition: .2s ease;
    user-select:none;
}
#ahp-chat-btn:hover { transform: translateY(-4px); }
#ahp-chat-btn img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    object-fit: cover;
}

/* Panel */
#ahp-chat-panel {
    position: fixed;
    right: 18px;
    bottom: 88px;
    width: 320px;
    max-width: calc(100% - 36px);
    height: 420px;
    background: #ffffff;
    display: none;
    flex-direction: column;
    border-radius: 14px;
    box-shadow: 0 18px 50px rgba(0,0,0,0.28);
    z-index: 99999;
    overflow: hidden;
    font-family: 'Segoe UI', Arial, sans-serif;
}

/* Header */
.ahp-header {
    background: linear-gradient(90deg,#0077cc,#005fa0);
    padding: 12px 14px;
    color: white;
    display: flex;
    align-items: center;
}
.ahp-header .title { font-size: 15px; font-weight: 600; }
.ahp-header .subtitle { font-size: 12px; opacity: 0.9; }

/* Messages */
#ahp-chat-messages {
    padding: 12px;
    background: #f7fbff;
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.ahp-msg {
    font-size: 14px;
    line-height: 1.4;
    max-width: 80%;
}
.ahp-msg.you {
    align-self: flex-end;
    background: #0077cc;
    color: #fff;
    padding: 8px 12px;
    border-radius: 12px 12px 8px 12px;
}
.ahp-msg.bot {
    align-self: flex-start;
    background: #eef4ff;
    color: #053056;
    padding: 8px 12px;
    border-radius: 12px 12px 12px 8px;
}

/* Input Row */
#ahp-chat-input-row {
    padding: 10px;
    border-top: 1px solid #eee;
    display: flex;
    gap: 8px;
}
#ahp-chat-input {
    flex: 1;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #d9d9d9;
}
#ahp-chat-send {
    background: linear-gradient(135deg,#0077cc,#005fa0);
    color: #fff;
    border: none;
    padding: 9px 12px;
    border-radius: 10px;
    cursor: pointer;
}

/* Suggestions */
.ahp-suggestions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 8px 12px;
    background: #fff;
}
.ahp-suggestion {
    padding: 7px 10px;
    font-size: 13px;
    background: #eef6ff;
    border-radius: 8px;
    cursor: pointer;
    user-select: none;
    transition: .15s;
}
.ahp-suggestion:hover {
    background: #dcecff;
}
/* Mobile */
@media (max-width:420px) {
    #ahp-chat-panel { width: 94%; right: 3%; height: 72vh; }
}
`;
    const s = document.createElement("style");
    s.innerHTML = css;
    document.head.appendChild(s);
})();
/* -------------------------
   Chatbot Core
-------------------------- */
(function createAHPWidget() {

    /* Chat Button */
    const chatBtn = document.createElement("div");
    chatBtn.id = "ahp-chat-btn";

    const icon = document.createElement("img");
    icon.src = "ahpbot.png";   // YOUR LOGO
    chatBtn.appendChild(icon);

    document.body.appendChild(chatBtn);


    /* Chat Panel */
    const panel = document.createElement("div");
    panel.id = "ahp-chat-panel";

    panel.innerHTML = `
        <div class="ahp-header">
            <div>
                <div class="title">AHP Bot</div>
                <div class="subtitle">Ask timings, plywood, brands…</div>
            </div>
            <div id="ahp-close" style="margin-left:auto;cursor:pointer;">✕</div>
        </div>

        <div id="ahp-chat-messages">
            <div class="ahp-msg bot">Hi! I'm AHP Bot. How can I help?</div>
        </div>

        <div class="ahp-suggestions" id="ahp-suggestions">
            <div class="ahp-suggestion">Timings</div>
            <div class="ahp-suggestion">Address</div>
            <div class="ahp-suggestion">Plywood</div>
            <div class="ahp-suggestion">Hardware</div>
            <div class="ahp-suggestion">Brands</div>
            <div class="ahp-suggestion">Owner</div>
        </div>
        <div id="ahp-chat-input-row">
            <input id="ahp-chat-input" placeholder="Type a question..." />
            <button id="ahp-chat-send">Send</button>
        </div>
    `;
    document.body.appendChild(panel);
    /* Toggle Panel */
    chatBtn.onclick = () => panel.style.display = 
        (panel.style.display === "flex") ? "none" : "flex";
    document.getElementById("ahp-close").onclick = () => 
        panel.style.display = "none";
    /* Core Helpers */
    const messages = document.getElementById("ahp-chat-messages");
    const input = document.getElementById("ahp-chat-input");
    function addUser(msg) {
        const box = document.createElement("div");
        box.className = "ahp-msg you";
        box.textContent = msg;
        messages.appendChild(box);
        scrollChat();
    }
    function addBot(msg, html=false) {
        const box = document.createElement("div");
        box.className = "ahp-msg bot";
        box[html ? "innerHTML" : "textContent"] = msg;
        messages.appendChild(box);
        scrollChat();
    }

    function scrollChat() {
        messages.scrollTop = messages.scrollHeight;
    }



    /* -----------------------------
       Knowledge Base (Compact)
    ------------------------------ */
    const kb = [
        { keys:['hi','hello'], ans:'Hello! How can I assist?' },
        { keys:['timing','open','closing'], ans:'We are open 9 AM – 8 PM daily.' },
        { keys:['address','location'], ans:'Marble Market, Alwar Bypass Road, Bhiwadi.' },
        { keys:['phone','contact'], ans:'Phone / WhatsApp: 8058984540' },
        { keys:['owner','akhilesh'], ans:'Owner: Akhilesh Yadav' },
        { keys:['2009','established'], ans:'We started on 2 November 2009.' },
        { keys:['email','mail'], ans:'Email: ambayhardwareandplywood@gmail.com' },
        { keys:['plywood'], ans:'We sell Century, Nexus, Virgo, Action Tesa plywood.' },
        { keys:['laminate'], ans:'Laminates from Century, Virgo & more.' },
        { keys:['hardware'], ans:'Hardware brands: Hettich, Dorset, Rider Ultima.' },
        { keys:['brands'], ans:'Brands: Hettich, Dorset, Fevicol, Astral, Nexus, Century, Tesa & more.' },
        { keys:['review'], ans:'Google Reviews ⭐ https://www.google.com/search?q=Ambay+Hardware+%26+Plywood+Bhiwadi' },
        { keys:['price','rate'], ans:'Prices vary. Please WhatsApp us!' },
        { keys:['help'], ans:'You can ask: timings, plywood, brands, address, owner info.' }
    ];
    /* -----------------------------
       Handle User Message
    ------------------------------ */
    function processMessage(text) {
        const q = text.toLowerCase();

        for (let item of kb) {
            if (item.keys.some(k => q.includes(k))) {
                addBot(item.ans);
                return;
            }
        }

        addBot("I didn’t understand that.");
        addBot(`<a href="https://wa.me/918058984540" 
            target="_blank" 
            style="background:#25d366;color:white;padding:7px 12px;border-radius:8px;text-decoration:none;">
            Chat on WhatsApp
        </a>`, true);
    }


    /* Send button */
    document.getElementById("ahp-chat-send").onclick = () => {
        if (!input.value.trim()) return;
        addUser(input.value);
        processMessage(input.value);
        input.value = "";
    };

    /* Enter Key */
    input.addEventListener("keypress", e => {
        if (e.key === "Enter") {
            document.getElementById("ahp-chat-send").click();
        }
    });

    /* Suggestions */
    document.getElementById("ahp-suggestions").onclick = e => {
        if (e.target.classList.contains("ahp-suggestion")) {
            const txt = e.target.textContent;
            addUser(txt);
            processMessage(txt);
        }
    };
})();






