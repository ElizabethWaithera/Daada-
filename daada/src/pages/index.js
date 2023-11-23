import React, { useState } from 'react';

const YourComponent = () => {
  const [apiKey, setApiKey] = useState("");
  const [botMessage, setBotMessage] = useState("");
  const API_URL = "https://api.openai.com/v1/chat/completions";

  const sendRequest = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: "Hello!" }],
        }),
      });

      const resJson = await response.json();

      // Check if choices array is present
      if (resJson.choices) {
        // Check if choices array has elements
        if (resJson.choices.length > 0) {
          setBotMessage(resJson.choices[0]?.message?.content || 'No message content available');
        } else {
          console.warn('Empty choices array in the response:', resJson);
          setBotMessage('No message content available');
        }
      } else {
        console.error('No choices array found in the response:', resJson);
        setBotMessage('Error in API response');
      }
    } catch (error) {
      console.error('Error in sendRequest:', error.message);
      setBotMessage('Error in API request');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow w-full">
        <div className="px-4 h-14 flex justify-between items-center">
          <div className="text-xl font-bold">DAADA</div>
          <div>
            <input
              type="password"
              className="border rounded p-1"
              placeholder="Enter API key.."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="p-4">
        {/* Button to trigger API request */}
        <button
          onClick={sendRequest}
          className="w-40 bordered rounded bg-blue-500 hover:bg-blue-600 text-white p-2"
        >
          Send Request
        </button>

        {/* Display the bot's response */}
        <div className="mt-4 text-lg">{botMessage}</div>

        {/* Add more UI elements as needed */}
      </div>

      {/* Add more UI elements below if needed */}
    </div>
  );
};

export default YourComponent;
