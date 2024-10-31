"use client"
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import { stringify } from 'querystring';
import { sendMessage } from './actions';
import { useState } from 'react';

export default function Page() {
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState(''); // State for language input
  const [additionalInfo, setAdditionalInfo] = useState(''); // State for additional info
  const [output, setOutput] = useState(''); // State for storing the response

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Call sendMessage action with the message, language, and additional info
    const response = await sendMessage(message, language, additionalInfo);
    setOutput(response as string); // Update the output state with the response
    setMessage(''); // Clear the message input after submission
    setLanguage(''); // Clear the language input after submission
    setAdditionalInfo(''); // Clear the additional info input after submission
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
        <label>
          Language:
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)} // Update the language state
          >
            <option value="">Select a language</option>
            <option value="German">German</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="Italian">Italian</option>
            <option value="Chinese">Chinese</option>
            <option value="Japanese">Japanese</option>
            {/* Add more languages as needed */}
          </select>
        </label>
        <label>
          Additional Info:
          <input
            type="text"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)} // Update the additional info state
            placeholder="Enter additional info"
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
