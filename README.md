## Company: CodTech IT Solutions  
##  Name: NEHASRI H
##  Intern Id: CT08DM1117
##  Domain: MERN STACK WEB DEVELOPMENT
##  Duration: 8 WEEKS
##  Mentor:NEELA SANTHOSH

##  Project Task Description — Real-Time Collaborative Whiteboard

As part of my role at **CodTech IT Solutions**, I independently developed a real-time collaborative whiteboard web application. This project combined real-time drawing with peer-to-peer video communication, allowing multiple users to collaborate visually and verbally on a shared canvas from anywhere in the world.

### Objective  
The goal of this project was to build an interactive, web-based whiteboard tool that supports simultaneous collaboration. The application needed to offer drawing tools, real-time synchronization, and embedded video calling—all in a lightweight and browser-accessible interface. An emphasis was placed on low latency, usability, and modern web standards.

###  Development Process  

#### UI & Drawing Layer  
The frontend was built using **HTML5**, **CSS**, and **vanilla JavaScript**. The core drawing experience was implemented using the **HTML5 `<canvas>`** element. Custom JavaScript was written to handle:
- Mouse and touch events for drawing lines  
- A **color picker** to choose brush colors  
- **Brush size control** for variable stroke widths  
- An **eraser tool** to remove specific parts of the drawing  
- A **clear canvas** button to reset the board for all users  

The interface was designed to be clean and distraction-free, focusing on ease of collaboration.

#### Real-Time Collaboration  
Real-time drawing functionality was enabled using **Socket.IO**, which allowed each user’s strokes to be broadcast and mirrored across all connected clients instantly. I created custom socket events to handle draw actions, color changes, and canvas resets.

To ensure smooth performance, drawing data was sent at optimized intervals to balance speed and bandwidth. Each client's canvas state stayed synchronized regardless of how many participants joined the session.

#### Peer-to-Peer Video Integration  
For live video collaboration, I implemented **WebRTC**. This allowed users to initiate **peer-to-peer video calls** within the whiteboard session without relying on third-party services.

Features included:
- Accessing webcam and microphone using browser APIs  
- Creating peer connections via **WebRTC RTCPeerConnection**  
- Using **Socket.IO** as the signaling channel for offer/answer negotiation  
- Exchanging ICE candidates to establish a stable video stream between users  

The integration ensured minimal delay in video transmission and enabled natural communication alongside visual collaboration.

#### Backend Setup  
The backend was built using **Node.js** and **Express.js**. It served the static frontend files and handled WebSocket events via **Socket.IO**. No database was required, as session state was managed entirely in memory.

The server responsibilities included:
- Hosting static assets  
- Handling socket connections and signaling  
- Managing WebRTC offer/answer exchanges between clients

#### Deployment  
The project was deployed on **Render**, offering public access to the live whiteboard at [https://whiteboard-916d.onrender.com](https://whiteboard-916d.onrender.com). The deployment supports HTTPS and enables secure peer-to-peer connections across devices.

#### Testing & Validation  
I tested the application on multiple browsers and devices to ensure:
- Real-time drawing synchronization  
- Stable video communication  
- Responsive UI design  
- Cross-tab and multi-user functionality

### ✅ Outcome  
The **Real-Time Collaborative Whiteboard** is a fully functional web application that combines canvas drawing with live video communication. The project strengthened my expertise in **WebRTC**, **Socket.IO**, and real-time application architecture using only frontend and backend JavaScript technologies.

<img width="1849" height="816" alt="Image" src="https://github.com/user-attachments/assets/c983551b-8a8b-42fd-ae62-c74e12fe9fec" />

