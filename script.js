async function kirimKeAI(pesanUser) {
    const API_URL = "https://api.monkedev.com/fun/chat"; 

    try {
        const response = await fetch(API_URL + "?msg=" + encodeURIComponent(pesanUser));
        const data = await response.json();

        return data.response || "AI tidak bisa menjawab.";
    } catch (e) {
        return "Terjadi kesalahan, coba lagi.";
    }
}

async function sendMessage() {
    let input = document.getElementById("userInput");
    let message = input.value.trim();

    if (message === "") return;

    addMessage(message, "user");
    input.value = "";

    addMessage("⏳ Sedang berpikir...", "ai");

    let jawaban = await kirimKeAI(message);

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
