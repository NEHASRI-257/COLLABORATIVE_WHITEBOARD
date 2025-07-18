let canvas = document.getElementById("canvas");
let test = document.getElementById("test");

canvas.width = 0.98 * window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext("2d");
let socket = io(); // Connect to backend

let x, y;
let mouseDown = false;
let selectedColor = "#000000";
let selectedSize = 3;
let isEraser = false;

// 🎨 UI elements
const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");
const eraserBtn = document.getElementById("eraser");
const clearBtn = document.getElementById("clear");

// UI Event Handlers
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
  socket.emit("clear");
};

// 🖌️ Drawing Events
window.onmousedown = () => {
  ctx.beginPath();
  ctx.moveTo(x, y);
  mouseDown = true;
  socket.emit("mousedown", { x, y });
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

    socket.emit("draw", {
      x,
      y,
      color: selectedColor,
      size: selectedSize,
      eraser: isEraser,
    });
  }
};

// 📡 Socket.IO listeners
socket.on("onmousedown", ({ x, y }) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
});

socket.on("ondraw", ({ x, y, color, size, eraser }) => {
  ctx.strokeStyle = eraser ? "#FFFFFF" : color;
  ctx.lineWidth = size;
  ctx.lineTo(x, y);
  ctx.stroke();
});

socket.on("onclear", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// 📹 WebRTC for Video (no drawing)
let pc = new RTCPeerConnection({
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
});

let remoteStream = new MediaStream();

window.onload = async () => {
  pc.addEventListener("connectionstatechange", () => {
    if (pc.connectionState === "connected") {
      console.log("WebRTC connection established");
    }
  });

  pc.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  };

  test.srcObject = remoteStream;

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("propogate", { ice: event.candidate });
    }
  };

  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  stream.getTracks().forEach((track) => pc.addTrack(track, stream));

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  socket.emit("propogate", { offer: { type: offer.type, sdp: offer.sdp } });
};

socket.on("onpropogate", async (data) => {
  if (data.offer) {
    await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    socket.emit("propogate", { answer });
  }
  if (data.answer) {
    await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
  }
  if (data.ice) {
    await pc.addIceCandidate(data.ice);
  }
});
