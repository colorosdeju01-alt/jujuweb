async function kirimKeAI(pesanUser) {
    const API_URL = "https://api.monkedev.com/fun/chat"; 

    const response = await fetch(API_URL + "?msg=" + encodeURIComponent(pesanUser));
    const data = await response.json();

    return data.response || "AI tidak bisa menjawab.";
}

async function sendMessage() {
    let input = document.getElementById("userInput");
    if (input.value.trim() === "") return;

    addMessage(input.value, "user");

    addMessage("⏳ Sedang berpikir...", "ai");

    let jawaban = await kirimKeAI(input.value);

    // Hapus loading
    let chat = document.getElementById("chat");
    chat.removeChild(chat.lastChild);

    addMessage(jawaban, "ai");
}

function addMessage(text, sender) {
    let chat = document.getElementById("chat");
    let msg = document.createElement("div");
    msg.className = "message " + sender;
    msg.innerText = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}
