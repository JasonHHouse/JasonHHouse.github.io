import React, { useState, useEffect } from 'react';
import Header from './common/Header';
import Footer from './common/Footer';

const Story = () => {
  const [currentNode, setCurrentNode] = useState(null);
  const [story, setStory] = useState(null);
  type Message = { body: string; sender: string };
  const [messages, setDisplayStory] = useState<Message[]>([]);

  useEffect(() => {
    fetch('teststory.json')
      .then(response => response.json())
      .then(data => {
        setStory(data);
        setCurrentNode(data.start_node);
        setDisplayStory(data.nodes['start'].message);
      });
  }, []);

  const navigate = (destination: React.SetStateAction<null>) => {
    setCurrentNode(destination);
  };

  return (
    <div>
      <Header />
      <div className="container">
        {messages.map((message, index) => (
          <div key={index}>
            <p key="body">{message.body}</p>
            <p key="sender">{message.sender}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Story;
