let userName;

let xhr;

// Make an object
let msg = {
  type: 'message',
  text: '',
  name: '',
  id: '',
  date: Date.now()
}

// Message to be stored in chat.txt
let msgInfo;


// Start web socket server
window.onload = (e) => {

  xhr = new XMLHttpRequest();

  // Get user's name
  userName = prompt('Enter Your Name');

  xhr.open('GET', './bin/chat-server.php', true);
  xhr.send();
  loadMsg();
}

// Initialize Web Socket
let conn = new WebSocket('ws://localhost:8080');
conn.onopen = (e) => {
  console.log('Connection Established!');
}
conn.onmessage = (e) => {
  console.log(e.data);
  receiveMsg();
}

// Send Message
window.onkeyup = (e) => {
  if(e.keyCode === 13) {

    console.log('Message Send');
    if(document.readyState === "complete" || document.readyState === "interactive") {
      sendMsg();
    } else {
      console.log('ReadyState not complete');
    }

    conn.send('Message Received');
  }
}

window.onunload = window.onbeforeunload = function(e) {
  conn.close();
  xhr.abort();
}

// When message has been sent
function sendMsg() {

  msg.text = document.getElementById('text').value;
  msg.name = userName;
  msg.id = userName + '123853';

  let sendXhr = new XMLHttpRequest();
  sendXhr.open('GET', './test.php?chatInput='+msg.text+'&name='+msg.name), true;
  sendXhr.send(null);
  loadMsg();
  // setTimeout(loadMsg, 300);
}

// When message is received...
function receiveMsg(){
  if(document.readyState === "complete" || document.readyState === "interactive") {
    // setTimeout(loadMsg, 200);
    loadMsg();
  } else {
    console.log('ReadyState not complete');
  }
}

// To load message
function loadMsg(){
  let loadXhr = new XMLHttpRequest();
  loadXhr.open('GET', './chat.txt', true);
  loadXhr.onreadystatechange = () => {
    if(loadXhr.readyState === XMLHttpRequest.DONE) {
      console.log(loadXhr.status);
      // console.log(loadXhr.responseText);
      document.querySelector('.chat-box').innerHTML = loadXhr.responseText;

    }
  }
  loadXhr.send(null);

  document.getElementById('text').value = "";
}
