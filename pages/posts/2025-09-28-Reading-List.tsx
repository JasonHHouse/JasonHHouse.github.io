import React from 'react';
import TagList from '../../components/TagList';
import Header from '../common/Header';
import Footer from '../common/Footer';
import SEO from '../common/SEO';
import styles from './2025-09-28-Reading-List.module.css'

const ReadingList = () => {
  
  return (
    <div>
      <SEO
        title="Essential Leadership Reading List - Books That Shaped My Perspective - Jason House"
        description="A curated collection of leadership, management, and personal development books that have fundamentally shaped my approach to leading teams and developing talent."
        keywords={['leadership books', 'management reading list', 'professional development', 'leadership development', 'book recommendations', 'management books', 'team leadership', 'coaching books', 'mentorship resources']}
        type="article"
        publishedTime="2025-09-29T00:00:00.000Z"
        tags={['leadership', 'development', 'resources']}
        readingTime="6"
        image="/img/books.png"
      />
      <Header />
      <div className="container">

      <p>September 29, 2025</p>
      <br />

      <div className="post">
        <h1 className={styles.header1}>Essential Leadership Reading List</h1>

        <p><i>All names, company references, role titles, specific locations, project details, and other identifying
          information have been obscured to protect anonymity and privacy in this narrative account.</i></p>

        <img src="/img/books.png" alt="Stack of leadership and management books on a desk with coffee and notepad" style={{ width: '100%', height: 'auto', margin: '1rem 0' }} />

        <p>Throughout my leadership journey, books have been invaluable companions. They've challenged my thinking, provided frameworks for difficult situations, and offered perspectives from leaders who've navigated similar challenges. Books give you more tools in your toolbox. The books on this list aren't just theoretical. Rather, they're practical guides that have directly influenced how I approach team development, difficult conversations, and organizational change.</p>

        <p>I've organized this reading list into categories that align with different aspects of leadership development. Whether you're a new manager or a seasoned executive, these books offer insights that can transform how you lead and develop others. Each recommendation comes with why it made the list and how it's shaped my leadership approach. The list is unordered.</p>

        <h2 className={styles.categoryHeader}>Core Leadership Foundations</h2>
        
        <div className={styles.bookCard}>
          <h3 className={styles.bookTitle}>Leadership Is Language: The Hidden Power of What You Say--and What You Don't</h3>
          <p className={styles.author}>by L. David Marquet</p>
          <p className={styles.description}>Written by a retired Navy Captain, the book reviews a broad range of leadership failures and identifies key actions that could and would have helped their situations. Introduces red work and blue work concept. Red work being action. Blue work being thinking. Focuses on having individuals do both, which is a break from transitional white collar/blue collar industrial age thinking.</p>
          <p className={styles.keyTakeaway}><strong>Key Takeaway:</strong> Balance red work (doing) with blue work (thinking). The language leaders use determines whether teams operate in reactive execution mode or thoughtful problem-solving mode. Small changes in word choice can dramatically shift team dynamics.</p>
          <p className={styles.affiliateLink}>
            <a href="https://amzn.to/4nCJh4r" target="_blank" rel="noopener noreferrer" className={styles.amazonLink}>
              📚 Get it on Amazon
            </a>
          </p>
        </div>
          
        <div className={styles.bookCard}>
          <h3 className={styles.bookTitle}>Managing Humans: Biting and Humorous Tales of a Software Engineering Manager</h3>
          <p className={styles.author}>by Michael Lopp</p>
          <p className={styles.description}>A humorous, deep dive from a software engineer in their experiences managing people. Covers people, like free electrons, process, thinking, and much more. Has a slight focus on startups and building from the beginning.</p>
          <p className={styles.keyTakeaway}><strong>Key Takeaway:</strong> Engineers are not machines—they're humans with unique motivations, quirks, and needs. Success comes from understanding what makes each person tick, managing the "free electrons" who create chaos, and balancing process with creative freedom.</p>
          <p className={styles.affiliateLink}>
            <a href="https://amzn.to/3VDyTNB" target="_blank" rel="noopener noreferrer" className={styles.amazonLink}>
              📚 Get it on Amazon
            </a>
          </p>
        </div>

        <div className={styles.bookCard}>
          <h3 className={styles.bookTitle}>Become an Effective Software Engineering Manager: How to Be the Leader Your Development Team Needs</h3>
          <p className={styles.author}>by Dr. James Stanier</p>
          <p className={styles.description}>A very practical approach to becoming a manager day one and growing from there. Gives clear, well thought actions to take in every aspect of management. This is a great resource when looking to solve a problem and wanting clear action items to focus on.</p>
          <p className={styles.keyTakeaway}><strong>Key Takeaway:</strong> Engineering management is a learnable craft with specific skills and practices. Focus on the fundamentals: regular one-on-ones, clear goal setting, effective delegation, and continuous feedback. Start with systems and processes, then adapt to your team's unique needs.</p>
          <p className={styles.affiliateLink}>
            <a href="https://amzn.to/46L1YeY" target="_blank" rel="noopener noreferrer" className={styles.amazonLink}>
              📚 Get it on Amazon
            </a>
          </p>
        </div>
          
        <div className={styles.bookCard}>
          <h3 className={styles.bookTitle}>The New One Minute Manager </h3>
          <p className={styles.author}>by Ken Blanchard and Spencer Johnson M.D.</p>
          <p className={styles.description}>The New One Minute Manager is told as a young manager getting to know an experienced manager and his team. The young manager learns of the One Minute Manager and its three main techniques: One Minute Goals, One Minute Praisings, and One Minute Redirects. The main objective is to convey information quickly and effectively.</p>
          <p className={styles.keyTakeaway}><strong>Key Takeaway:</strong> Effective management comes down to three simple techniques: setting clear one-minute goals, giving immediate one-minute praisings for good performance, and providing swift one-minute redirects when correction is needed. The power lies in brevity and consistency—people perform better when they know exactly what's expected and receive timely feedback.</p>
          <p className={styles.affiliateLink}>
            <a href="https://amzn.to/3WcBuy7" target="_blank" rel="noopener noreferrer" className={styles.amazonLink}>
              📚 Get it on Amazon
            </a>
          </p>
        </div>

        <h2 className={styles.categoryHeader}>Communication</h2>
          
        <div className={styles.bookCard}>
          <h3 className={styles.bookTitle}>Radical Candor: Fully Revised & Updated Edition: Be a Kick-Ass Boss Without Losing Your Humanity</h3>
          <p className={styles.author}>by Kim Scott</p>
          <p className={styles.description}>A former YouTuber/Googler writes about her experiences wanting honest, clear feedback that comes from a place of support and growth, while also tackling her own development in feedback. Gives users a quad-chart approach to how we manage and has great approaches for process improvements.</p>
          <p className={styles.keyTakeaway}><strong>Key Takeaway:</strong> Care personally and challenge directly. Most feedback fails because it falls into ruinous empathy (caring without challenging) or obnoxious aggression (challenging without caring). Radical candor requires both genuine concern for the person and willingness to have difficult conversations.</p>
          <p className={styles.affiliateLink}>
            <a href="https://amzn.to/3KsAd3o" target="_blank" rel="noopener noreferrer" className={styles.amazonLink}>
              📚 Get it on Amazon
            </a>
          </p>
        </div>
          
        <h2 className={styles.categoryHeader}>Product Effectiveness</h2>
          
        <div className={styles.bookCard}>
          <h3 className={styles.bookTitle}>Inspired: How to Create Tech Products Customers Love</h3>
          <p className={styles.author}>by Marty Cagan</p>
          <p className={styles.description}>User focused, product driven, iterative approach to development and growth.</p>
          <p className={styles.keyTakeaway}><strong>Key Takeaway:</strong> Successful product teams are given problems to solve, not features to build. Empowerment comes from having the autonomy to discover the best solutions while being held accountable for outcomes, not outputs.</p>
          <p className={styles.affiliateLink}>
            <a href="https://amzn.to/4gQPGXd" target="_blank" rel="noopener noreferrer" className={styles.amazonLink}>
              📚 Get it on Amazon
            </a>
          </p>
        </div>

        <h2 className={styles.categoryHeader}>Business Studies</h2>
          
        <div className={styles.bookCard}>
          <h3 className={styles.bookTitle}>How the Mighty Fall: And Why Some Companies Never Give In</h3>
          <p className={styles.author}>by Jim Collins</p>
          <p className={styles.description}>A deep dive into once great companies that feel on hard times. Some recovered, others didn't. Provides a framework to leverage for spotting decline.</p>
          <p className={styles.keyTakeaway}><strong>Key Takeaway:</strong> Decline often begins with arrogance born from success. The five stages—hubris, undisciplined pursuit of more, denial of risk, grasping for salvation, and capitulation—provide early warning signs to watch for in any organization.</p>
          <p className={styles.affiliateLink}>
            <a href="https://amzn.to/4pH7oAl" target="_blank" rel="noopener noreferrer" className={styles.amazonLink}>
              📚 Get it on Amazon
            </a>
          </p>
        </div>

        <h2 className={styles.categoryHeader}>Building Your Reading Practice</h2>

        <p>Reading is just the beginning—the real value comes from application. Here's how I approach leadership reading:</p>

        <ul className={styles.practiceList}>
            <li><strong>Take notes actively:</strong> I keep a record of what I read, what I gained from the book, and use sticky tabs to highlight key areas I read and would want to reference. Here is the coding I use:
              <p></p>
              <p><img src="/img/lightbulb-20x20.png" alt="Yellow lightbulb" className={styles.questionMarkIcon} /> Yellow - Insight/Big Idea - Core Argument, keye takeaway, or main concept</p>
              <p><img src="/img/question-mark-20x20.png" alt="Blue question mark" className={styles.questionMarkIcon} /> Blue - Question/Curiosity - Something to explore futher or research</p>
              <p><img src="/img/checkmark-20x20.png" alt="Green checkmark" className={styles.questionMarkIcon} /> Green - Action / To-Do - Something you want to act on or apply</p>
              <p><img src="/img/exclamation-mark-20x20.png" alt="Orange exclamation point" className={styles.questionMarkIcon} /> Orange - Important Detail - Stats, facts, names, or useful supporting information</p>
              <p><img src="/img/quote-20x20.png" alt="Pink quote" className={styles.questionMarkIcon} /> Pink - Quote / Language - Memorable quotes, phrasing, or turns of phrase</p>
            </li>
          <li><strong>Experiment immediately:</strong> Try one new concept from each book within a week of reading it. Small experiments lead to big insights. Take notes as you experiement and get feedback with your team on what worked and didn't at the end to interate.</li>
          <li><strong>Share with your team:</strong> Discussing books with colleagues creates shared language and accelerates learning for everyone.</li>
          <li><strong>Revisit favorites:</strong> Great leadership books reveal new insights at different stages of your journey. Don't be afraid to reread. Some books get updates, which may provide new insights too.</li>
          <li><strong>Connect the dots:</strong> Look for patterns across different authors and approaches. The best insights often come from synthesizing multiple perspectives.</li>
        </ul> 

        <p>Leadership development is a continuous journey, and these books have been trusted guides along the way. They've helped me navigate challenges, develop others, and build stronger teams. Most importantly, they've reminded me that great leadership is learnable. It's a set of skills and mindsets that can be developed through intention, practice, and reflection.</p>

        <p>What books have shaped your leadership approach? I'm always looking for new perspectives and would love to hear your recommendations.</p>

      </div>

       <div className="sidebar">
        <br />
        <TagList tags={['leadership', 'development', 'resources']} />
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReadingList;