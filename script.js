const API_URL = "https://juju-ai.colorosdeju01.workers.dev/";

async function sendMessage() {
  let input = document.getElementById("input");
  let messages = document.getElementById("messages");

  // tampilkan pesan user
  let userBubble = document.createElement("div");
  userBubble.className = "bubble user";
  userBubble.innerText = input.value;
  messages.appendChild(userBubble);

  // kirim ke worker
  let res = await fetch(API_URL, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ message: input.value })
  });

  let data = await res.json();
  let reply = data.choices?.[0]?.message?.content || "Maaf, terjadi error.";

  // tampilkan balasan bot
  let botBubble = document.createElement("div");
  botBubble.className = "bubble bot";
  botBubble.innerText = reply;
  messages.appendChild(botBubble);

  input.value = "";
  messages.scrollTop = messages.scrollHeight;
}
