import React, { useState, useEffect } from 'react';
import Header from './common/Header';
import Footer from './common/Footer';
import SEO from './common/SEO';
import styles from './cyoa.module.css';

interface Story {
  id: string;
  title: string;
  description: string;
  file: string;
  difficulty: string;
  themes: string[];
}

interface StoriesData {
  stories: Story[];
}

const CYOA = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/stories.json')
      .then(response => response.json())
      .then((data: StoriesData) => {
        setStories(data.stories);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading stories:', error);
        setLoading(false);
      });
  }, []);

  const handleStoryClick = (storyId: string) => {
    window.location.href = `/story?id=${storyId}`;
  };

  return (
    <div>
      <SEO
        title="Interactive Leadership CYOA - Choose Your Own Adventure"
        description="Choose from interactive leadership stories. Experience real-world leadership challenges through immersive storytelling and decision-making exercises."
        keywords={['interactive leadership', 'CYOA', 'leadership training', 'decision making', 'leadership scenarios', 'immersive learning', 'leadership development', 'management training', 'choose your own adventure']}
        type="website"
      />
      <Header />
      <div className="container top-margin">
        <h1 className={styles.title}>Choose Your Own Adventure</h1>
        <p className={styles.subtitle}>
          Select a story to begin your interactive journey
        </p>

        {loading ? (
          <div className={styles.loading}>Loading stories...</div>
        ) : (
          <div className={styles.storiesGrid}>
            {stories.map((story) => (
              <div
                key={story.id}
                className={styles.storyCard}
                onClick={() => handleStoryClick(story.id)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleStoryClick(story.id);
                  }
                }}
              >
                <h2 className={styles.storyTitle}>{story.title}</h2>
                <p className={styles.storyDescription}>{story.description}</p>
                <div className={styles.storyMeta}>
                  <span className={styles.difficulty}>
                    Difficulty: {story.difficulty}
                  </span>
                  <div className={styles.themes}>
                    {story.themes.map((theme, index) => (
                      <span key={index} className={styles.theme}>
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CYOA;