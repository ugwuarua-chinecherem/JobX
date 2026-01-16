'use client';
import { useEffect } from 'react';

export default function ChatPage() {
  useEffect(() => {
    // Redirect to the chatbot URL after a brief moment to show the page
    const timer = setTimeout(() => {
      window.location.href = 'https://ai.studio/apps/drive/1V2STz75osdUN1hHttySORqVfmTquWb-F?fullscreenApplet=true';
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="loading-icon">💬</div>
        <h1>Connecting to Chat Assistant</h1>
        <div className="loading-spinner"></div>
        <p>Redirecting you to our AI assistant...</p>
        <a 
          href="https://ai.studio/apps/drive/1V2STz75osdUN1hHttySORqVfmTquWb-F?fullscreenApplet=true"
          className="chat-button"
        >
          Click here if not redirected automatically
        </a>
      </div>
    </div>
  );
}