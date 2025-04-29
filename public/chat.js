const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('message');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value.trim()) {
    const li = document.createElement('li');
    li.textContent = 'Tú: ' + input.value;
    messages.appendChild(li);
    socket.emit('chat-message', input.value);
    input.value = '';
  }
});

socket.on('chat-message', (msg) => {
  const li = document.createElement('li');
  li.textContent = '👤 Agente: ' + msg;
  messages.appendChild(li);
});
