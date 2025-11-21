/* =====================================================
   FLOATING CHAT BUTTON + WINDOW
===================================================== */

let chatBtn = document.createElement("div");
chatBtn.id = "chatBtn";
chatBtn.innerHTML = "💬";
document.body.appendChild(chatBtn);

let chatWindow = document.createElement("div");
chatWindow.id = "chatWindow";
chatWindow.innerHTML = `
    <div id="chatHeader">Ambay Chatbot</div>
    <div id="chatMessages"></div>
    <input id="chatInput" type="text" placeholder="Ask something..." />
`;
document.body.appendChild(chatWindow);

chatBtn.onclick = () => {
    chatWindow.style.display =
        chatWindow.style.display === "block" ? "none" : "block";
    chatWindow.classList.add("fadeChat");
};

/* =====================================================
   FIXED BOT RESPONSES
===================================================== */
const botReplies = {
    "hi": "Hi! How can I assist you today?",
    "hello": "Hello! Ask me anything.",
    "timing": "We are open daily from 9 AM to 8 PM.",
    "time": "Shop timing: 9 AM – 8 PM.",
    "address": "We are located in Bhiwadi, Rajasthan.",
    "location": "Shop location: Bhiwadi, Rajasthan.",
    "plywood": "We offer Century, Action Tesa, Nexus, Virgo & more.",
    "laminate": "Laminates from Century, Virgo & premium brands.",
    "adhesive": "Adhesives available: Fevicol, Bondtite, Astral.",
    "hardware": "Hardware brands: Hettich, Dorset, Rider Ultima.",
    "contact": "Phone/WhatsApp: 8058984540",
    "enquiry": "You can enquire directly on WhatsApp: 8058984540"
};

/* =====================================================
   MESSAGE HANDLING
===================================================== */
const msgBox = document.getElementById("chatMessages");
const input = document.getElementById("chatInput");

input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    let text = input.value.trim();
    if (text === "") return;

    addMessage("You", text);
    input.value = "";

    let msg = text.toLowerCase();

    // Default fallback → WhatsApp button
    let reply = `
    I couldn’t understand that.  
    <br><br>
    <a href="https://wa.me/918058984540" target="_blank"
       style="background:#25d366;color:white;padding:6px 12px;border-radius:5px;text-decoration:none;">
       Chat on WhatsApp
    </a>
    `;

    for (let key in botReplies) {
        if (msg.includes(key)) {
            reply = botReplies[key];
            break;
        }
    }

    setTimeout(() => typeReply(reply), 300);
}

function addMessage(sender, text) {
    msgBox.innerHTML += `<div class="msg"><strong>${sender}:</strong> ${text}</div>`;
    msgBox.scrollTop = msgBox.scrollHeight;
}

/* =====================================================
   TYPING EFFECT FOR BOT
===================================================== */
function typeReply(text) {
    let container = document.createElement("div");
    container.className = "msg";
    container.innerHTML = `<strong>Bot:</strong> <span class="typing"></span>`;
    msgBox.appendChild(container);

    let span = container.querySelector(".typing");
    let index = 0;

    let interval = setInterval(() => {
        span.innerHTML = text.substring(0, index);
        index++;
        msgBox.scrollTop = msgBox.scrollHeight;
        if (index > text.length) clearInterval(interval);
    }, 15);
}

/* =====================================================
   CSS INJECTION
===================================================== */
let style = document.createElement("style");
style.innerHTML = `
#chatBtn {
    position: fixed;
    bottom: 22px;
    right: 22px;
    background: #0077cc;
    color: white;
    width: 55px;
    height: 55px;
    font-size: 26px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 3px 12px rgba(0,0,0,0.3);
    transition: 0.3s;
    z-index: 9999;
}
#chatBtn:hover {
    transform: scale(1.1);
}

#chatWindow {
    position: fixed;
    bottom: 90px;
    right: 22px;
    width: 280px;
    height: 360px;
    background: white;
    border-radius: 12px;
    display: none;
    flex-direction: column;
    box-shadow: 0 4px 18px rgba(0,0,0,0.25);
    overflow: hidden;
    z-index: 9999;
}

.fadeChat {
    animation: popUp 0.4s ease-out;
}

@keyframes popUp {
    from { transform: scale(0.85); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}

#chatHeader {
    background: #0077cc;
    color: white;
    padding: 12px;
    text-align: center;
    font-weight: bold;
}

#chatMessages {
    padding: 12px;
    height: 245px;
    overflow-y: auto;
    font-size: 14px;
}

#chatInput {
    width: 100%;
    padding: 12px;
    border: none;
    border-top: 1px solid #ccc;
    font-size: 14px;
}

.msg {
    margin-bottom: 10px;
    line-height: 1.4;
}
`;
document.head.appendChild(style);
