import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/meetings')
      .then((res) => res.json())
      .then(setMeetings)
      .catch(console.error);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Meetings</h1>
      <ul className="space-y-2">
        {meetings.map((m) => (
          <li key={m.id} className="p-4 bg-white rounded shadow">
            <div className="font-semibold">{m.title || `Meeting ${m.id}`}</div>
            <div className="text-sm text-gray-500">{m.date}</div>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <a
          href="http://localhost:3001/zoom/auth"
          className="text-blue-600 underline"
        >
          Connect Zoom
        </a>
      </div>
    </div>
  );
}

export default App;
