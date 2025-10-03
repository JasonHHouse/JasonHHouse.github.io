import TagList from '../../components/TagList';
import ShareButtons from '../../components/ShareButtons';
import Header from '../common/Header';
import Footer from '../common/Footer';
import SEO from '../common/SEO';
import styles from './2025-09-25-Retrospective.module.css'

const NewPostTitle = () => {
  
  return (
    <div>
      <SEO
        title="Retrospectives: Looking Back to Move Forward - Jason House"
        description="Monthly retrospective questions for direct reports that foster transparency, ownership, and continuous improvement in leadership and team development."
        keywords={['retrospectives', 'leadership', 'mentorship', 'team development', 'continuous improvement', 'feedback', 'management', 'team building', 'reflection']}
        type="article"
        publishedTime="2025-09-25T00:00:00.000Z"
        tags={['reflection', 'teambuilding', 'growth']}
        readingTime="4"
        image="/img/retrospective.png"
      />
      <Header />
      <div className="container">

      <p>September 25, 2025</p>
      <br />

      <div className="post">
        <h1 className={styles.header1}>Retrospectives: Looking back to move forward</h1>

        <p><i>All names, company references, role titles, specific locations, project details, and other identifying
          information have been obscured to protect anonymity and privacy in this narrative account.</i></p>

        <img src="/img/retrospective.png" alt="Monthly retrospective meeting with team members reflecting on progress and planning next steps" className={styles.heroImage} loading="lazy" />

        <h1 className={styles.header1}>Monthly Retrospective Questions for Direct Reports</h1>
        <p>Monthly retrospectives with direct reports are more than just a check-in; they’re an opportunity to strengthen alignment, build trust, and foster a culture of continuous improvement. By carving out time for structured reflection, we help each report stay focused on what matters most, connect their work to broader goals, and think intentionally about where they want to grow next.</p>
        <p>In my experience, these conversations don’t always feel natural at first. For some, they can even feel uncomfortable. But after a few sessions of working through the questions and leaning into the topics that matter most, something shifts. People start showing up prepared with thoughtful answers, a clearer sense of direction, and a growing sense of ownership over their future. That’s when the conversations become truly meaningful and not just status updates, but deep, coaching-driven discussions.</p>
        <p>These retrospectives give individuals a chance to feel seen and supported while also surfacing wins, blockers, and growth opportunities. Over time, they create a shared rhythm of accountability and adaptability, two essential traits of a high-performing, healthy team. The questions below are simply a starting point. The real value comes in the conversations they spark.</p>
        <p>These questions help guide monthly 1:1 retrospectives with my direct reports. The goal is to reflect on progress, identify opportunities for growth, and build a culture of transparency, ownership, and continuous improvement.</p>

        <h2 className={styles.header2}>1. What are the key initiatives you focused on since the last retrospection?</h2>
        <p className={styles.why}><strong>Why:</strong> Clarifies what work was prioritized and whether time was spent effectively. Encourages reflection on ownership and transparency.</p>

        <h2 className={styles.header2}>2. How did they map to your list of priorities?</h2>
        <p className={styles.why}><strong>Why:</strong> Highlights alignment (or misalignment) between planned priorities and actual work done. Useful for future planning and focus.</p>

        <h2 className={styles.header2}>3. What went well this month, individually or in process improvements?</h2>
        <p className={styles.why}><strong>Why:</strong> Reinforces celebration of wins and surfaces successful habits or improvements that can be shared across the team.</p>

        <h2 className={styles.header2}>4. What did you learn?</h2>
        <p className={styles.why}><strong>Why:</strong> Encourages a mindset of growth and reflection. Surfaces lessons learned that might benefit the whole team.</p>

        <h2 className={styles.header2}>5. Where do you see opportunities for improvement/growth, individually or in process improvements?</h2>
        <p className={styles.why}><strong>Why:</strong> Promotes ownership of challenges and reinforces a culture of continuous improvement.</p>

        <h2 className={styles.header2}>6. What went well for the team?</h2>
        <p className={styles.why}><strong>Why:</strong> Shifts focus from the individual to the collective. Helps identify strong team dynamics or cross-functional wins.</p>

        <h2 className={styles.header2}>7. Where do you see opportunities for improvement/growth for the team?</h2>
        <p className={styles.why}><strong>Why:</strong> Encourages systems thinking and provides insight into broader patterns or blockers impacting team performance.</p>

        <h2 className={styles.header2}>8. In what ways did I help?</h2>
        <p className={styles.why}><strong>Why:</strong> Opens the door for feedback on leadership. Helps identify what support was effective and appreciated.</p>

        <h2 className={styles.header2}>9. In what ways could I have helped more?</h2>
        <p className={styles.why}><strong>Why:</strong> Fosters trust and psychological safety. Encourages upward feedback and opportunities for leadership growth.</p>

        <h2 className={styles.header2}>10. What are the key priorities for the next month or so?</h2>
        <p className={styles.why}><strong>Why:</strong> Sets a clear path forward. Reinforces alignment and ownership over upcoming initiatives.</p>

        <ShareButtons
          url="https://jasonhhouse.github.io/posts/2025-09-25-Retrospective"
          title="Retrospectives: Looking Back to Move Forward"
          description="Monthly retrospective questions for direct reports that foster transparency and growth."
        />

      </div>

       <div className="sidebar">
        <br />
        <TagList tags={['reflection', 'teambuilding', 'growth']} />
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewPostTitle;