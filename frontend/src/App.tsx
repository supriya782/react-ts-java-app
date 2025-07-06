import React, { useState, useEffect } from 'react';
import './App.css';

function sanitizeInput(input: string) {
  // Basic sanitization: escape <, >, &
  return input.replace(/[<>&]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]!));
}

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [messages, setMessages] = useState<{id: number, content: string}[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/api/messages')
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error('Error fetching messages:', err));
  }, [response]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sanitized = sanitizeInput(message);
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: sanitized })
      });
      const text = await res.text();
      setResponse(text);
      setMessage('');
    } catch (err) {
      setResponse('Error: Could not send message');
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Message Storage App</h2>
        <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Enter your message"
            required
            maxLength={200}
            style={{ padding: 8, width: 250 }}
          />
          <button type="submit" disabled={loading} style={{ marginLeft: 10, padding: 8 }}>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
        {response && <div style={{ marginBottom: 20 }}>{response}</div>}
        <h3>Stored Messages</h3>
        <ul style={{ textAlign: 'left', maxWidth: 400, margin: '0 auto' }}>
          {messages.map(m => (
            <li key={m.id}>{m.content}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
