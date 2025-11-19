import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './Meeting.css';
import { socketBaseUrl } from '../config';

const Meeting = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [socket, setSocket] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const newSocket = io(socketBaseUrl || window.location.origin, {
      transports: ['websocket', 'polling']
    });
    setSocket(newSocket);

    newSocket.emit('join-room', roomId);

    // Initialize WebRTC
    initializeWebRTC(newSocket);

    // Load chat history
    loadChatHistory();

    // Listen for chat messages
    newSocket.on('chat-message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      newSocket.emit('leave-room', roomId);
      newSocket.disconnect();
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
    };
  }, [roomId]);

  const initializeWebRTC = async (socket) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      const configuration = {
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      };

      peerConnectionRef.current = new RTCPeerConnection(configuration);

      stream.getTracks().forEach(track => {
        peerConnectionRef.current.addTrack(track, stream);
      });

      peerConnectionRef.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('ice-candidate', { roomId, candidate: event.candidate });
        }
      };

      socket.on('video-offer', async (data) => {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await peerConnectionRef.current.createAnswer();
        await peerConnectionRef.current.setLocalDescription(answer);
        socket.emit('video-answer', { roomId, answer });
      });

      socket.on('video-answer', async (data) => {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.answer));
      });

      socket.on('ice-candidate', async (data) => {
        if (data.candidate) {
          await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
      });

      // Create and send offer
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);
      socket.emit('video-offer', { roomId, offer });
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const loadChatHistory = async () => {
    try {
      const response = await axios.get(`/api/chat/${roomId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const sendMessage = async () => {
    if (!messageInput.trim() || !socket) return;

    const messageData = {
      roomId,
      message: messageInput,
      sender: 'current-user',
      timestamp: new Date()
    };

    socket.emit('chat-message', messageData);
    
    // Save to database
    try {
      await axios.post(`/api/chat/${roomId}`, { message: messageInput });
    } catch (error) {
      console.error('Error saving message:', error);
    }

    setMessageInput('');
  };

  return (
    <div className="meeting-container">
      <div className="video-section">
        <div className="video-grid">
          <video ref={localVideoRef} autoPlay muted className="video-local" />
          <video ref={remoteVideoRef} autoPlay className="video-remote" />
        </div>
      </div>
      <div className="chat-section">
        <div className="chat-header">{t('chat')}</div>
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className="chat-message">
              <strong>{msg.sender?.name || 'You'}:</strong> {msg.message}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={t('typeMessage')}
          />
          <button onClick={sendMessage} className="btn btn-primary">
            {t('send')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Meeting;


