'use client';
import { useRouter } from 'next/navigation';

export default function Chatbot() {
  const router = useRouter();

  return (
    <button 
      className="chatbot-trigger"
      onClick={() => router.push('/chat')}
      aria-label="Open chatbot"
      title="Chat with us"
    >
      💬
    </button>
  );
}