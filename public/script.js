let canvas = document.getElementById("canvas");
let test = document.getElementById("test");

canvas.width = 0.98 * window.innerWidth;
canvas.height = window.innerHeight;

var io = io(); // Connects to same domain/server

let ctx = canvas.getContext("2d");

let x;
let y;
let mouseDown = false;
let dataChannel;
const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};
let pc = new RTCPeerConnection(servers);
let remoteStream;

console.log("created data channels");

function applyEvents() {
  dataChannel.onmessage = (e) => {
    let data = JSON.parse(e.data);

    if (data.draw) {
      ctx.strokeStyle = isEraser ? "#FFFFFF" : selectedColor;
      ctx.lineWidth = selectedSize;
      ctx.lineTo(data.draw.x, data.draw.y);
      ctx.stroke();
    }
    if (data.down) {
      ctx.moveTo(data.down.x, data.down.y);
    }
  };
}

window.onload = async () => {
  pc.addEventListener("connectionstatechange", (event) => {
    if (pc.connectionState === "connected") {
      console.log("WebRTC connection established");
    }
  });

  pc.ondatachannel = (e) => {
    console.log("received data channel");
    dataChannel = e.channel;
    applyEvents();
  };

  dataChannel = pc.createDataChannel("test");

  let stream = await navigator.mediaDevices.getUserMedia({ video: true });

  stream.getTracks().forEach((track) => {
    pc.addTrack(track, stream);
  });

  remoteStream = new MediaStream();

  pc.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  };

  test.srcObject = remoteStream;

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      io.emit("propogate", { ice: event.candidate });
    }
  };

  let offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  io.emit("propogate", {
    offer: { type: offer.type, sdp: offer.sdp },
  });
};

io.on("onpropogate", async (data) => {
  if (data.offer) {
    await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
    let answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    io.emit("propogate", { answer });
  }
  if (data.answer) {
    await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
  }
  if (data.ice) {
    await pc.addIceCandidate(data.ice);
  }
});

// Drawing tools
let selectedColor = "#000000";
let selectedSize = 3;
let isEraser = false;

const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");
const eraserBtn = document.getElementById("eraser");
const clearBtn = document.getElementById("clear");

colorPicker.oninput = (e) => {
  selectedColor = e.target.value;
  isEraser = false;
};

brushSize.oninput = (e) => {
  selectedSize = e.target.value;
};

eraserBtn.onclick = () => {
  isEraser = true;
};

clearBtn.onclick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// Drawing events
window.onmousedown = (e) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
  mouseDown = true;

  if (dataChannel) {
    dataChannel.send(JSON.stringify({ down: { x, y } }));
  }
};

window.onmouseup = () => {
  mouseDown = false;
};

window.onmousemove = (e) => {
  x = e.clientX;
  y = e.clientY;

  if (mouseDown) {
    ctx.strokeStyle = isEraser ? "#FFFFFF" : selectedColor;
    ctx.lineWidth = selectedSize;
    ctx.lineTo(x, y);
    ctx.stroke();

    if (dataChannel) {
      dataChannel.send(JSON.stringify({ draw: { x, y } }));
    }
  }
};
