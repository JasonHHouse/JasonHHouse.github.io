import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from './common/Header';
import Footer from './common/Footer';
import styles from './story.module.css';

type Message = { body: string; sender: string };
type Option = { text: string; longText?: string; destination: string };
type Node = {
  message?: Message | Message[];
  messages?: Message[];
  options?: Option[];
  isEnd?: boolean;
};
type StoryData = {
  nodes: { [key: string]: Node };
  start_node: string;
  end_node?: string;
};

interface StoriesMetadata {
  stories: Array<{
    id: string;
    title: string;
    file: string;
  }>;
}

const Story = () => {
  const router = useRouter();
  const { id } = router.query;

  const [currentNode, setCurrentNode] = useState<string | null>(null);
  const [story, setStory] = useState<StoryData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    // Fetch stories metadata to get the file path
    fetch('/stories.json')
      .then(response => response.json())
      .then((metadata: StoriesMetadata) => {
        const storyInfo = metadata.stories.find(s => s.id === id);
        if (!storyInfo) {
          setError('Story not found');
          setLoading(false);
          return;
        }

        // Load the actual story file
        return fetch(`/${storyInfo.file}`);
      })
      .then(response => {
        if (!response) return;
        return response.json();
      })
      .then((data: StoryData | undefined) => {
        if (!data) return;

        setStory(data);
        setCurrentNode(data.start_node);

        // Handle both message formats
        const startNode = data.nodes[data.start_node];
        if (startNode.messages) {
          setMessages(startNode.messages);
        } else if (startNode.message) {
          setMessages(Array.isArray(startNode.message) ? startNode.message : [startNode.message]);
        }

        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading story:', err);
        setError('Failed to load story');
        setLoading(false);
      });
  }, [id]);

  const navigate = (destination: string) => {
    if (!story) return;

    setCurrentNode(destination);
    const node = story.nodes[destination];

    // Handle both message formats
    if (node.messages) {
      setMessages(node.messages);
    } else if (node.message) {
      setMessages(Array.isArray(node.message) ? node.message : [node.message]);
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="container">
          <p className={styles.loading}>Loading story...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="container">
          <p className={styles.error}>{error}</p>
          <a href="/cyoa" className={styles.backLink}>Back to story selection</a>
        </div>
        <Footer />
      </div>
    );
  }

  const currentNodeData = story && currentNode ? story.nodes[currentNode] : null;
  const isEnd = currentNodeData?.isEnd || false;

  return (
    <div>
      <Header />
      <div className={`container ${styles.storyContainer}`}>
        <div className={styles.messagesContainer}>
          {messages.map((message, index) => (
            <div key={index} className={styles.messageBox}>
              <p className={styles.messageBody}>{message.body}</p>
              <p className={styles.messageSender}>— {message.sender}</p>
            </div>
          ))}
        </div>

        {currentNodeData?.options && currentNodeData.options.length > 0 && (
          <div className={styles.optionsContainer}>
            <h3 className={styles.optionsTitle}>What do you do?</h3>
            {currentNodeData.options.map((option, index) => (
              <button
                key={index}
                className={styles.optionButton}
                onClick={() => navigate(option.destination)}
              >
                {option.text}
              </button>
            ))}
          </div>
        )}

        {isEnd && (
          <div className={styles.endContainer}>
            <a href="/cyoa" className={styles.playAgainButton}>
              Choose Another Story
            </a>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Story;
