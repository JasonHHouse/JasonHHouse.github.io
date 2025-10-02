import { useRouter } from 'next/router';
import Header from './common/Header';
import Footer from './common/Footer';
import SEO from './common/SEO';

const Home = () => {
  const router = useRouter();

  const blogPostOneOnClick = () => {
    router.push("/posts/2025-08-05-Giving-Difficult-Feedback");
  };

  const blogPostTwoOnClick = () => {
    router.push("/posts/2025-08-19-Recovering-Team-Performance");
  };

  const blogPostThreeOnClick = () => {
    router.push("/posts/2025-09-25-Retrospective");
  };

  const blogPostFourOnClick = () => {
    router.push("/posts/2025-09-28-Reading-List");
  };

  const handleKeyDown = (e: React.KeyboardEvent, onClick: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div>
      <SEO
        title="Leadership and Mentorship - Jason House's Blog"
        description="Leadership insights and mentorship guidance from Jason House. Explore leadership techniques, team management, and professional growth."
        keywords={['leadership', 'mentorship', 'team management', 'professional development', 'coaching', 'management', 'feedback', 'engineering leadership']}
        type="website"
      />
      <Header />
      <div className="container">

        <p className='top-margin'>Leadership is often perceived as an innate trait, but my experience shows it&#39;s far more than that. It&#39;s a
          dynamic,
          individualized journey shaped by learning the right techniques, building effective processes, and executing with
          purpose. Growth as a leader requires continuous effort, reflection, and a commitment to evolving with your team
          and
          circumstances.</p>

        <p>Mentorship is inseparable from leadership. To become an exceptional leader, understanding and practicing
          mentorship is
          essential. It&#39;s through guiding others that we refine our skills, foster trust, and create a lasting impact.
          People are
          adept at recognizing insincerity. Transparency, honesty, and integrity are foundational to your leadership
          journey.
          These qualities build credibility and create space for meaningful connection and growth.</p>

        <p>I&#39;m sharing my journey in leadership and mentorship to inspire and empower others to grow as well. By
          reflecting
          on my
          experiences, I hope to provide insights that help you navigate your path with confidence and clarity. I&#39;ve led
          teams in
          professional environments, sports, Scouting, and beyond. But why am I a good leader? I thrive in the complexity of
          human
          dynamics and take joy in helping others achieve their goals. My approach is rooted in empathy, accountability, and
          a
          belief that leadership is a shared responsibility.</p>

        <h2 className='top-margin'>Reviews</h2>

        <div className='blog-grid top-margin'>
          <div className="post-card">
            <h2>Senior Software Engineering Manager</h2>
            <p>Jason had been my manager and mentor for the past 2 years at Indeed. I have become
              a better manager and
              leader with his guidance. Jason showed me his management framework and processes on how to lead my teams
              effectively.</p>
            <p>One of Jason&#39;s assets is his ability to listen attentively and offer
              well-thought-out, timely,
              relevant
              advices to help me solve my problems. I also appreciated his candor when it comes to offering feedback and
              situational assessments (as in he wouldn&#39;t hesitate to tell me that we were in deep s***t).</p>
            <p>I wouldn&#39;t be where I am today with Jason&#39;s mentorship.</p>
          </div>

          <div className="post-card">
            <h2>Software Engineering Manager</h2>
            <p>Jason is an exceptional leader I&#39;ve had the privilege to work with. As a manager and mentor, he genuinely
              cares about
              his people. He consistently makes me feel supported, valued, and empowered to do my best work.</p>

            <p>Jason keeps the big picture in focus while always staying grounded in the needs of his team. He leads with
              empathy,
              never micromanages, and creates an environment where others can thrive.</p>

            <p>He&#39;s also an incredible resource for continuous learning. He genourously recommended books and that
              became the most
              impactful resources in my professional development. He has a talent for distilling complex ideas into
              actionable
              insights and always seems to have just the right recommendation at the right time.</p>

            <p>Anyone looking for a coach/leader who&#39;s wise, genuine, and invested in people&#39;s success would be
              lucky to work with
              Jason. Jason will challenge you to grow, support you through it, and leave you a better leader than you were
              before.</p>
          </div>

        </div>

        <h2 className='top-margin'>Recent Posts</h2>

        <div className="blog-grid">
          <div className="post-card" id="blog-post-four" onClick={blogPostFourOnClick} onKeyDown={(e) => handleKeyDown(e, blogPostFourOnClick)} tabIndex={0} role="link">
            <img src="/img/books.png" alt="Essential Leadership Reading List - Books That Shaped My Perspective" loading="lazy" />
            <h2>Essential Leadership Reading List</h2>
            <p>
              A curated collection of leadership, management, and personal development books that have fundamentally shaped my approach to leading teams and developing talent.
            </p>
            <div className="meta">September 28, 2025 | By Jason House</div>
          </div>

          <div className="post-card" id="blog-post-three" onClick={blogPostThreeOnClick} onKeyDown={(e) => handleKeyDown(e, blogPostThreeOnClick)} tabIndex={0} role="link">
            <img src="/img/retrospective.png" alt="Retrospectives: Looking Back to Move Forward" loading="lazy" />
            <h2>Retrospectives: Looking Back to Move Forward</h2>
            <p>
              Monthly retrospective questions for direct reports that foster transparency, ownership, and continuous improvement in leadership and team development.
            </p>
            <div className="meta">September 25, 2025 | By Jason House</div>
          </div>

          <div className="post-card" id="blog-post-one" onClick={blogPostOneOnClick} onKeyDown={(e) => handleKeyDown(e, blogPostOneOnClick)} tabIndex={0} role="link">
            <img src="/img/feedback.jpg" alt="Giving Difficult Feedback" loading="lazy" />
            <h2>Delivering Difficult News While Nurturing Talent</h2>
            <p>
              Feedback is critical for everyones success. It's easy when it's good feedback, the struggle comes when
              it's
              difficult feedback.
            </p>
            <div className="meta">August 5, 2025 | By Jason House</div>
          </div>

          <div className="post-card" id="blog-post-two" onClick={blogPostTwoOnClick} onKeyDown={(e) => handleKeyDown(e, blogPostTwoOnClick)} tabIndex={0} role="link">
            <img src="/img/missing-the-target.jpg" alt="Blog Post 2" loading="lazy" />
            <h2>Supporting Teams During Periods of Significant Change</h2>
            <p>
              When faced with sudden shifts in work environments, engineering teams often struggle with challenges
              emotionally and of delivery.
            </p>
            <div className="meta">August 19, 2025 | By Jason House</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
