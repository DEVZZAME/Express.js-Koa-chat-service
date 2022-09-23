// @ts-check

// IIFE(Immediately Invoked Function Expression, 즉시 실행 함수)
(function () {
  const socket = new WebSocket(`ws://${window.location.host}/chat`);

  const btn = document.getElementById('btn');
  const inputEl = document.getElementById('input');
  const chatEl = document.getElementById('chat');

  btn?.addEventListener('click', () => {
    const msg = inputEl.value;
    const data = {
      name: 'hansol',
      msg: msg,
    };
    socket.send(JSON.stringify(data));
    inputEl.value = '';
  });

  socket.addEventListener('open', () => {
    // socket.send('Welcome to my channel! I am client for this chat channel:D');
  });

  socket.addEventListener('message', (event) => {
    const { name, msg } = JSON.parse(event.data);

    const msgEl = document.createElement('p');
    msgEl.innerText = `${name} : ${msg}`;
    msgEl.classList.add('p-2');
    msgEl.classList.add('bg-danger');
    msgEl.classList.add('text-white');
    msgEl.classList.add('fw-bold');
    chatEl.appendChild(msgEl);
    chatEl.scrollTop = chatEl.scrollHeight - chatEl.clientHeight;
  });
})();
