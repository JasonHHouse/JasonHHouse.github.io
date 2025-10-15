import React, { useState, useEffect } from 'react';
import Header from './common/Header';
import Footer from './common/Footer';
import SEO from './common/SEO';
import styles from './secret.module.css';

interface Message {
  sender: string;
  text: string;
}

interface ConversationOption {
  text: string;
  destination: string;
}

interface ConversationNode {
  messages: Array<{ body: string; sender: string }>;
  options?: ConversationOption[];
  isEnd?: boolean;
}

interface ConversationData {
  nodes: Record<string, ConversationNode>;
  start_node: string;
}

const Secret: React.FC = () => {
  const [conversationData, setConversationData] = useState<ConversationData | null>(null);
  const [currentNode, setCurrentNode] = useState<string>('start');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load conversation JSON
  useEffect(() => {
    fetch('/conversation.json')
      .then(response => response.json())
      .then((data: ConversationData) => {
        setConversationData(data);
        setCurrentNode(data.start_node);
        // Initialize with first node's messages
        const firstNode = data.nodes[data.start_node];
        if (firstNode && firstNode.messages) {
          setMessages(firstNode.messages.map(msg => ({
            sender: msg.sender,
            text: msg.body
          })));
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading conversation:', error);
        setIsLoading(false);
      });
  }, []);

  const handleResponseClick = (option: ConversationOption) => {
    if (!conversationData) return;

    // Add user's response to messages
    setMessages(prev => [...prev, { sender: 'you', text: option.text }]);

    // Navigate to next node and add its messages after a delay
    setTimeout(() => {
      const nextNode = conversationData.nodes[option.destination];
      if (nextNode && nextNode.messages) {
        setMessages(prev => [
          ...prev,
          ...nextNode.messages.map(msg => ({
            sender: msg.sender,
            text: msg.body
          }))
        ]);
        setCurrentNode(option.destination);
      }
    }, 800);
  };

  if (isLoading) {
    return (
      <div>
        <SEO
          title="Secret Test Page - Jason House"
          description="Experimental test page for new ideas"
          noindex={true}
        />
        <Header />
        <div className="container">
          <h1>Loading conversation...</h1>
        </div>
        <Footer />
      </div>
    );
  }

  const currentNodeData = conversationData?.nodes[currentNode];
  const hasOptions = currentNodeData?.options && currentNodeData.options.length > 0;
  const isConversationEnd = currentNodeData?.isEnd;

  return (
    <div>
      <SEO
        title="Secret Test Page - Jason House"
        description="Experimental test page for new ideas"
        noindex={true}
      />
      <Header />
      <div className="container">
        <h1>Conversation Simulator</h1>

        <div className={styles.chatContainer}>
          {/* Messages */}
          <div className={styles.messagesArea}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.message} ${
                  msg.sender === 'you' ? styles.messageYou : styles.messageThem
                }`}
              >
                <div className={styles.messageText}>{msg.text}</div>
              </div>
            ))}
          </div>

          {/* Response Options */}
          {!isConversationEnd && hasOptions && (
            <div className={styles.responseOptions}>
              <h3>How do you respond?</h3>
              <div className={styles.optionsGrid}>
                {currentNodeData.options!.map((option, index) => (
                  <button
                    key={index}
                    className={styles.optionButton}
                    onClick={() => handleResponseClick(option)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isConversationEnd && (
            <div className={styles.responseOptions}>
              <h3>Conversation Complete</h3>
              <p>Thanks for exploring this conversation!</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Secret;
