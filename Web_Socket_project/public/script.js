const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");

const startBtn = document.getElementById("startBtn");
const callBtn = document.getElementById("callBtn");
const hangupBtn = document.getElementById("hangupBtn");

const acceptBtn = document.getElementById("acceptBtn");
const rejectBtn = document.getElementById("rejectBtn");

const incomingCallDiv = document.getElementById("incomingCall");
const statusText = document.getElementById("status");
const roomInput = document.getElementById("roomInput");
const joinRoomBtn = document.getElementById("joinRoomBtn");

let roomId = null;


let localStream;
let pc;
let currentOffer = null;

const socket = io();

const iceServers = [
  { urls: "stun:global.stun.twilio.com:3478" },
  {
    urls: "turn:global.turn.twilio.com:3478?transport=udp",
    username: "7c77354c99a4c42261d4fda3c6b613caec4e3d2203acc6566e693adc1c5ff5a5",
    credential: "lNHyjECcQcUt2N1QSq4ggC5kjOGUKjhrI+qm0ZN2oKg="
  }
];

socket.on("offer", handleIncomingOffer);
socket.on("answer", handleAnswer);
socket.on("candidate", handleCandidate);

function setStatus(msg) {
  statusText.innerText = "Status: " + msg;
}

// Start Camera
startBtn.onclick = async () => {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });

    localVideo.srcObject = localStream;

    startBtn.disabled = true;
    callBtn.disabled = false;

    setStatus("Camera started. Ready to call.");
  } catch (err) {
    console.error(err);
    alert("Camera/Mic permission denied!");
  }
};

//room create
joinRoomBtn.onclick = () => {
  const room = roomInput.value.trim();

  if (!room) {
    alert("Please enter room ID!");
    return;
  }

  roomId = room;
  socket.emit("join-room", roomId);
  setStatus("Joining room: " + roomId);
};


// Create PeerConnection
function createPeerConnection() {
  pc = new RTCPeerConnection({ iceServers });

  localStream.getTracks().forEach(track => {
    pc.addTrack(track, localStream);
  });

  pc.ontrack = event => {
    remoteVideo.srcObject = event.streams[0];
    setStatus("Connected 🎉");
  };

  pc.onicecandidate = event => {
    if (event.candidate) {
      socket.emit("candidate", event.candidate);
    }
  };

  pc.onconnectionstatechange = () => {
    setStatus("Connection: " + pc.connectionState);
  };
}

// Start Call
callBtn.onclick = async () => {
  createPeerConnection();

  hangupBtn.disabled = false;
  callBtn.disabled = true;

  setStatus("Calling...");

  try {
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    socket.emit("offer", offer);
  } catch (err) {
    console.error(err);
  }
};

// Handle Incoming Offer
function handleIncomingOffer(offer) {
  currentOffer = offer;
  incomingCallDiv.classList.remove("hidden");
  setStatus("Incoming call...");
}

// Accept Call
acceptBtn.onclick = async () => {
  incomingCallDiv.classList.add("hidden");

  if (!localStream) {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });

    localVideo.srcObject = localStream;
    startBtn.disabled = true;
  }

  createPeerConnection();
  hangupBtn.disabled = false;

  try {
    await pc.setRemoteDescription(currentOffer);

    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    socket.emit("answer", answer);
    setStatus("Call accepted...");
  } catch (err) {
    console.error(err);
  }

  currentOffer = null;
};

// Reject Call
rejectBtn.onclick = () => {
  currentOffer = null;
  incomingCallDiv.classList.add("hidden");
  setStatus("Call rejected ❌");
};

// Handle Answer
async function handleAnswer(answer) {
  if (pc) {
    await pc.setRemoteDescription(answer);
    setStatus("Answer received...");
  }
}

// Handle ICE Candidate
async function handleCandidate(candidate) {
  if (pc) {
    try {
      await pc.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (err) {
      console.error("ICE error:", err);
    }
  }
}

//room
socket.on("joined-room", (room) => {
  setStatus("Joined room: " + room);
});

socket.on("room-full", () => {
  setStatus("Room is full ❌");
  alert("Room already has 2 users!");
});

socket.on("user-joined", () => {
  setStatus("User joined room ✅ Now you can call.");
});

socket.on("user-left", () => {
  setStatus("User left the room ❌");
});


// End Call
hangupBtn.onclick = () => {
  if (pc) {
    pc.close();
    pc = null;
  }

  remoteVideo.srcObject = null;

  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
    localStream = null;
  }

  

  localVideo.srcObject = null;

  startBtn.disabled = false;
  callBtn.disabled = true;
  hangupBtn.disabled = true;

  incomingCallDiv.classList.add("hidden");

  setStatus("Call ended.");
};

// Cleanup
window.onbeforeunload = () => {
  socket.disconnect();
  if (pc) pc.close();
};
