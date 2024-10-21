"use client"
import { sendMessage } from './actions';
import { useState } from 'react';

export default function Page() {
  const [message, setMessage] = useState('');
  const [output, setOutput] = useState(''); // State for storing the response

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Call sendMessage action with the entered message and store the response
    const response = await sendMessage(message);
    console.log(response)
    setOutput(response); // Update the output state with the response
    setMessage(''); // Clear the input after submission
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <form onSubmit={handleSubmit}>
        <label>
          Message:
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
          />
        </label>
        <button type="submit">Send Message</button>
      </form>
      
      {/* Display the output below the form */}
      {output && (
        <div>
          <strong>Response:</strong> {output}
        </div>
      )}
    </div>
  );
}