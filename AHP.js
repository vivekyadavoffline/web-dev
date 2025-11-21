/* AHP.js - Mini Chat Box (Small Chat Widget)
   - Short replies
   - Mini chat box style (option "c")
   - Uses local uploaded image as icon:
     /mnt/data/e86bd5c8-ace1-4fd3-a6b0-c8845c3dd67a.png
*/

/* ----------------------
   Inject CSS for widget
   ---------------------- */
(function injectAHPStyles(){
    const css = `
/* Chat widget - compact mini box */
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

#ahp-chat-btn:hover { transform: translateY(-4px); box-shadow: 0 10px 26px rgba(0,0,0,0.28); }

#ahp-chat-btn img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    object-fit: cover;
}

/* compact chat panel */
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

#ahp-chat-panel .ahp-header .title {
    font-weight: 700;
    font-size: 15px;
}

#ahp-chat-panel .ahp-header .subtitle {
    font-size: 12px;
    opacity: 0.9;
}

/* messages area */
#ahp-chat-messages {
    padding: 12px;
    flex: 1 1 auto;
    overflow-y: auto;
    background: linear-gradient(180deg,#f7fbff,#ffffff);
    display: flex;
    flex-direction: column;
    gap: 8px;
}

/* message bubbles */
.ahp-msg { font-size: 14px; line-height: 1.4; max-width: 82%; }
.ahp-msg.you { align-self: flex-end; background:#0077cc; color:#fff; padding:8px 12px; border-radius:12px 12px 8px 12px; }
.ahp-msg.bot { align-self: flex-start; background:#f1f5fb; color:#0b2b3a; padding:8px 12px; border-radius:12px 12px 12px 8px; }

/* input area */
#ahp-chat-input-row {
    padding: 10px;
    border-top: 1px solid #eee;
    display:flex;
    gap:8px;
    align-items:center;
    background: #fff;
}
#ahp-chat-input {
    flex: 1;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid #e6e9ee;
    outline: none;
    font-size: 14px;
}
#ahp-chat-send {
    background: linear-gradient(135deg,#0077cc,#005fa0);
    color: white;
    padding: 9px 12px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-weight: 600;
}

/* quick suggestions */
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
.ahp-suggestion:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,0.06); }

/* small screens tweak */
@media (max-width:420px) {
    #ahp-chat-panel { width: 94%; right: 3%; bottom: 82px; height: 70vh; }
    #ahp-chat-btn { right: 12px; bottom: 12px; }
}
`;
    const s = document.createElement('style');
    s.setAttribute('id','ahp-injected-style');
    s.innerHTML = css;
    document.head.appendChild(s);
})();

/* ----------------------
   Create DOM elements
   ---------------------- */
(function createAHPWidget(){
    // Chat button (uses uploaded image path as icon)
    const chatBtn = document.createElement('div');
    chatBtn.id = 'ahp-chat-btn';
    const icon = document.createElement('img');

    // <-- LOCAL UPLOADED FILE PATH USED HERE -->
    icon.src = '/mnt/data/e86bd5c8-ace1-4fd3-a6b0-c8845c3dd67a.png';
    icon.alt = 'Ambay';

    chatBtn.appendChild(icon);
    document.body.appendChild(chatBtn);

    // Chat panel
    const panel = document.createElement('div');
    panel.id = 'ahp-chat-panel';
    panel.innerHTML = `
        <div class="ahp-header">
            <div style="display:flex;flex-direction:column;">
                <div class="title">Ambay Chat</div>
                <div class="subtitle">Ask about timing, brands, plywood...</div>
            </div>
            <div style="margin-left:auto;cursor:pointer;color:rgba(255,255,255,0.9);" id="ahp-close">✕</div>
        </div>

        <div id="ahp-chat-messages">
            <div class="ahp-msg bot">Hi! I'm Ambay bot. Ask me about timings, plywood, laminates, hardware or type "help".</div>
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
            <input id="ahp-chat-input" placeholder="Type a question (or 'help')" />
            <button id="ahp-chat-send">Send</button>
        </div>
    `;
    document.body.appendChild(panel);

    // open/close logic
    chatBtn.addEventListener('click', ()=> {
        panel.style.display = panel.style.display === 'flex' ? 'none' : 'flex';
        // focus input when opened
        setTimeout(()=> document.getElementById('ahp-chat-input').focus(), 200);
    });
    document.getElementById('ahp-close').addEventListener('click', ()=> panel.style.display = 'none');

    // suggestion click binding (delegation)
    document.getElementById('ahp-suggestions').addEventListener('click', (e)=> {
        if (e.target.classList.contains('ahp-suggestion')) {
            const q = e.target.textContent.trim();
            sendUserMessage(q);
            handleMessage(q);
        }
    });

    // send button
    document.getElementById('ahp-chat-send').addEventListener('click', ()=> {
        const txt = document.getElementById('ahp-chat-input').value.trim();
        if (!txt) return;
        sendUserMessage(txt);
        handleMessage(txt);
    });

    // enter key
    document.getElementById('ahp-chat-input').addEventListener('keypress', (e)=> {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('ahp-chat-send').click();
        }
    });

    // helper function to append user message
    function sendUserMessage(text) {
        const box = document.createElement('div');
        box.className = 'ahp-msg you';
        box.textContent = text;
        document.getElementById('ahp-chat-messages').appendChild(box);
        scrollMessages();
        document.getElementById('ahp-chat-input').value = '';
    }

    // helper function to append bot message (with typing effect)
    function sendBotMessage(text, allowHtml=false) {
        const messages = document.getElementById('ahp-chat-messages');
        const box = document.createElement('div');
        box.className = 'ahp-msg bot';
        if (!allowHtml) {
            // simple typing effect
            let i = 0;
            box.innerHTML = '<span></span>';
            messages.appendChild(box);
            const span = box.querySelector('span');
            const t = setInterval(()=> {
                span.textContent += text.charAt(i++);
                messages.scrollTop = messages.scrollHeight;
                if (i > text.length) clearInterval(t);
            }, 10);
        } else {
            // allow HTML (for WhatsApp link)
            box.innerHTML = text;
            messages.appendChild(box);
        }
        scrollMessages();
    }

    function scrollMessages() {
        const m = document.getElementById('ahp-chat-messages');
        m.scrollTop = m.scrollHeight + 200;
    }

    /* ===========================
       Bot knowledge base (short answers)
       =========================== */
    const kb = [
        {keys: ['hi','hello','hey'], ans: 'Hello! How can I help you today?'},
        {keys: ['timing','time','open','opening'], ans: 'We are open 9:00 AM to 8:00 PM every day.'},
        {keys: ['address','location','where'], ans: 'Ambay Hardware & Plywood — Marble Market, Alwar Bypass Road, Bhiwadi.'},
        {keys: ['contact','phone','whatsapp','number'], ans: 'Phone / WhatsApp: 8058984540'},
        {keys: ['owner','akhilesh','akhilesh yadav'], ans: 'Owner: Akhilesh Yadav — serving Bhiwadi since 2009.'},
        {keys: ['plywood','plywood price','plywood enquiry'], ans: 'We stock Century, Nexus, Virgo, Action Tesa — message us what size or type you need.'},
        {keys: ['laminate','laminates'], ans: 'We have decorative & commercial laminates from Virgo, Century and more.'},
        {keys: ['hardware','fitting','hardiware','fittings'], ans: 'Hardware: Hettich, Dorset, Rider Ultima and similar brands.'},
        {keys: ['adhesive','fevicol','bondtite','astral'], ans: 'We sell Fevicol, Astral Bondtite and other adhesives.'},
        {keys: ['brands','brand list','what brands'], ans: 'Top brands: Hettich, Dorset, Astral Bondtite, Rider Ultima, Nexus, Fevicol, Virgo, Century, Action Tesa.'},
        {keys: ['delivery','deliver','shipment'], ans: 'We can arrange local delivery in and around Bhiwadi — contact us for details.'},
        {keys: ['price','rate','cost'], ans: 'Prices vary by product and size — please enquire for a quick price on WhatsApp.'},
        {keys: ['enquire','enquiry','quote'], ans: 'Tap the Enquire button to send a pre-filled message to our WhatsApp.'},
        {keys: ['help','what can you do'], ans: 'I can tell you shop timings, address, brands, product availability and connect you to WhatsApp.'},
        {keys: ['thanks','thank you','thx'], ans: 'You are welcome! If you need further help, type your question or tap WhatsApp.'},
        {keys: ['open since','established','since','shop age'], ans: 'Shop established on 2 November 2009.'}
    ];

    /* ===========================
       Primary message handling
       =========================== */
    function handleMessage(textRaw) {
        const text = textRaw.toLowerCase();
        // try to match knowledge base
        for (let item of kb) {
            for (let k of item.keys) {
                if (text.includes(k)) {
                    // known answer
                    setTimeout(()=> sendBotMessage(item.ans), 300);
                    return;
                }
            }
        }

        // if contains a brand name specifically, give brand reply
        const brands = {
            'hettich':'Hettich: premium hardware fittings. Enquire for stock & rates.',
            'dorset':'Dorset: locks & hardware. Enquire for latest models.',
            'astral':'Astral Bondtite: adhesives & glue solutions.',
            'rider':'Rider Ultima: reliable hardware accessories.',
            'nexus':'Nexus: premium plywood & laminates.',
            'fevicol':'Fevicol: trusted adhesive brand.',
            'virgo':'Virgo: laminates & decorative panels.',
            'century':'Century: top-quality plywood & laminates.',
            'action':'Action Tesa: high-performance boards.'
        };
        for (let b in brands) {
            if (text.includes(b)) {
                setTimeout(()=> sendBotMessage(brands[b]), 300);
                return;
            }
        }

        // If user asks for WhatsApp directly
        if (text.includes('whatsapp') || text.includes('chat on whatsapp') || text.includes('contact on whatsapp')) {
            openWhatsAppFallback();
            return;
        }

        // If message looks like price request, push to WhatsApp
        if (text.includes('price') || text.includes('rate') || text.includes('quote') || text.includes('cost')) {
            setTimeout(()=> sendBotMessage('Prices vary by product. Please tap below to ask on WhatsApp.'), 300);
            setTimeout(()=> sendBotMessage(`<a href="https://wa.me/918058984540" target="_blank" style="display:inline-block;background:#25d366;color:white;padding:6px 10px;border-radius:6px;text-decoration:none;">Chat on WhatsApp</a>`, true), 700);
            return;
        }

        // fallback -> WhatsApp (friendly)
        setTimeout(()=> sendBotMessage("Sorry, I couldn't understand that. You can chat with us on WhatsApp for quick help."), 300);
        setTimeout(()=> sendBotMessage(`<a href="https://wa.me/918058984540" target="_blank" style="display:inline-block;background:#25d366;color:white;padding:6px 10px;border-radius:6px;text-decoration:none;">Chat on WhatsApp</a>`, true), 700);
    }

    function openWhatsAppFallback() {
        sendBotMessage('Opening WhatsApp... Please wait.');
        window.open('https://wa.me/918058984540', '_blank');
    }

    // small greeting on open
    chatBtn.addEventListener('click', ()=> {
        // if first open has only initial message, greet more proactively
        const messages = document.getElementById('ahp-chat-messages');
        if (messages.children.length <= 1) {
            setTimeout(()=> sendBotMessage("Tip: try 'Timings', 'Plywood', 'Brands' or 'Contact'."), 400);
        }
    });

    // accessibility: ESC to close
    document.addEventListener('keydown', (e)=> {
        if (e.key === 'Escape') panel.style.display = 'none';
    });

    // attach a small welcome on load (delay)
    setTimeout(()=> {
        // only show when panel is not visible to not annoy
        if (panel.style.display !== 'flex') return;
        sendBotMessage('Welcome to Ambay. Type your question or tap a suggestion.');
    }, 1200);

})(); // end createAHPWidget

const kb = [
    {keys: ['hi','hello','hey'], ans: 'Hello! How can I help you today?'},
    {keys: ['timing','time','open','opening'], ans: 'We are open 9:00 AM to 8:00 PM every day.'},
    {keys: ['address','location','where'], ans: 'Ambay Hardware & Plywood — Marble Market, Alwar Bypass Road, Bhiwadi.'},
    {keys: ['contact','phone','number'], ans: 'Phone / WhatsApp: 8058984540'},

    {keys: ['owner name','owner','akhilesh','akhilesh yadav','who is owner'], 
     ans: 'Owner: Akhilesh Yadav.'},

    {keys: ['opening','started','established','2 nov','2009','since'], 
     ans: 'The shop was established on 2 November 2009.'},

    {keys: ['shop age','how old','how long'], 
     ans: 'We have been serving Bhiwadi since 2009.'},

    {keys: ['email','mail','gmail','contact email'], 
     ans: 'Our email: ambayhardwareandplywood@gmail.com'},

    {keys: ['plywood','plywood price','plywood enquiry'], ans: 'We offer plywood from Century, Nexus, Virgo, Action Tesa. What thickness do you need?'},
    {keys: ['laminate','laminates'], ans: 'We have decorative & commercial laminates from Virgo, Century and more.'},
    {keys: ['hardware','fitting','fittings'], ans: 'Hardware available: Hettich, Dorset, Rider Ultima and more.'},
    {keys: ['adhesive','fevicol','bondtite','astral'], ans: 'We sell Fevicol and Astral Bondtite adhesives.'},
    {keys: ['brands','brand list','what brands'], ans: 'Our brands: Hettich, Dorset, Astral Bondtite, Rider Ultima, Nexus, Fevicol, Virgo, Century, Action Tesa.'},
    {keys: ['delivery','deliver'], ans: 'We provide local delivery in Bhiwadi.'},
    {keys: ['price','rate','cost'], ans: 'Prices vary by product. For exact quotes please message us on WhatsApp.'},
    {keys: ['help','what can you do'], ans: 'I can help with timings, address, brands, product info and WhatsApp enquiry.'},
    {keys: ['thanks','thank you','thx'], ans: 'You are welcome!'},
];
{keys: ['review','reviews','google review','rating','google rating'], 
 ans: 'You can check our Google reviews here: https://www.google.com/search?q=Ambay+Hardware+%26+Plywood+Bhiwadi'},
