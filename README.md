## Company: CodTech IT Solutions  
##  Name: NEHASRI H
##  Intern Id: CT08DM1117
##  Domain: MERN STACK WEB DEVELOPMENT
##  Duration: 8 WEEKS
##  Mentor:NEELA SANTHOSH

# 📌 Project Overview – Real-Time Collaborative Whiteboard

As part of my internship at **CodTech IT Solutions**, I independently conceptualized, designed, and developed a fully functional real-time collaborative whiteboard application. Built entirely using **vanilla JavaScript**, **Node.js**, **Express**, **Socket.IO**, and **WebRTC**, the application enables users to draw simultaneously on a shared canvas while engaging in peer-to-peer video communication — all within a web browser and without the need for external libraries or frameworks.

I began by developing the **frontend user interface** using **HTML5 Canvas**, styled with **CSS**, and driven by **JavaScript**. The canvas served as the interactive drawing area and was programmed to respond to mouse inputs for freehand sketching. I implemented several essential tools including a **color picker**, **brush size control**, **eraser mode**, and a **clear canvas button**. This combination allowed users to create and edit visuals collaboratively with ease, simulating a physical whiteboard experience in a digital format.

To achieve **real-time drawing synchronization** across users, I integrated **Socket.IO** on both the client and server sides. The **Node.js** and **Express** backend listens for socket events — such as draw strokes, brush changes, or canvas clearing — and rebroadcasts these events to all other connected users except the initiator. Each drawing event was serialized into coordinate and style data and emitted over the WebSocket channel. On the receiving end, client browsers would decode the data and replicate the exact drawing on their own canvas in real time, ensuring full synchronization among participants.

In addition to visual collaboration, I implemented **WebRTC** to enable **live video communication**. Each user's webcam and microphone stream is accessed using the `navigator.mediaDevices.getUserMedia` API. I used **Socket.IO** as a signaling mechanism to exchange **WebRTC session descriptions** and **ICE candidates** between peers, allowing them to establish a direct media stream connection. Once connected, users could see and hear each other while using the whiteboard, significantly improving the collaborative experience.

The server played a critical role in both managing user connections and facilitating WebRTC signaling. All socket communications were maintained in memory, and no database layer was required, making the system highly lightweight, fast, and session-based. This approach ensured optimal performance, especially for short-lived collaborative sessions.

Finally, I deployed the backend on **Render**, which made the application publicly accessible via a secure HTTPS link. I thoroughly tested the system across multiple browsers and devices to ensure stable canvas synchronization and reliable video performance. Users were able to draw together and communicate in real time, even when accessing the application from different locations and networks.

This project provided a comprehensive, hands-on experience in building real-time web applications. It strengthened my skills in **event-driven programming**, **peer-to-peer communication**, and **full-stack JavaScript development** using modern browser APIs and networking tools.

---

## 📸 Demo Snapshots

<img width="1609" height="832" alt="Image" src="https://github.com/user-attachments/assets/96f80bf2-b6c9-4c0a-a0af-87625b5e9f85" />
<img width="1386" height="731" alt="Image" src="https://github.com/user-attachments/assets/c2da5a25-81db-4f8f-8696-0f3b7ea1302e" />
<img width="1511" height="703" alt="Image" src="https://github.com/user-attachments/assets/42456b32-db9b-42df-bdc2-1678c0397dd6" />

### 1️⃣ First Photo: Blank Whiteboard Interface
**Caption:**  
“Each participant starts with a clean, browser-based whiteboard. All drawing tools—including color picker, brush size slider, eraser, and clear buttons—are available, providing an intuitive interface for collaborative work.”

### 2️⃣ Second Photo: Black Stroke Drawn  
**Caption:**  
“One user begins drawing by creating a black line on the canvas. In a real-time session, this stroke appears instantly on every participant’s screen, ensuring immediate synchronization and feedback.”

### 3️⃣ Third Photo: Green Thick Stroke (Second User)  
**Caption:**  
“Another user selects a green color and larger brush size, adding a new line below the first. All edits and strokes—regardless of color or thickness—are immediately broadcast and reflected for all connected users, demonstrating seamless multi-user collaboration.”




