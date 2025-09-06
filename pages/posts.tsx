import { useRouter } from 'next/router';
import Header from './common/Header';
import Footer from './common/Footer';

function Posts() {
  const router = useRouter();

  const blogPostOneOnClick = () => {
    router.push("/posts/2025-08-05-Giving-Difficult-Feedback");
  };

  const blogPostTwoOnClick = () => {
    router.push("/posts/2025-08-19-Recovering-Team-Performance");
  };

  return (
    <div>
      <Header />
      <div className='container top-margin'>
        <h2>Posts</h2>
        <div className="blog-grid">
          <div className="post-card" id="blog-post-one" onClick={blogPostOneOnClick}>
            <img src="/img/feedback.jpg" alt="Giving Difficult Feedback" />
            <h2>Delivering Difficult News While Nurturing Talent</h2>
            <p>
              Feedback is critical for everyones succcess. It's easy when it's good feedback, the strugle comes when
              it's
              difficult feedback.
            </p>
            <div className="meta">August 5, 2025 | By <a href="#">Jason House</a></div>
          </div>

          <div className="post-card" id="blog-post-two" onClick={blogPostTwoOnClick}>
            <img src="/img/missing-the-target.jpg" alt="Blog Post 2" />
            <h2>Supporting Teams During Periods of Significant Change</h2>
            <p>
              When faced with sudden shifts in work environments, engineering teams often struggle with chanllenges
              emotionally and of delivery.
            </p>
            <div className="meta">August 19, 2025 | By <a href="#">Jason House</a></div>
          </div>

          <div className="post-card">
            <img src="/img/growth.jpg" alt="Blog Post 3" />
            <h2>Handling Underperformance</h2>
            <p>
              Coming soon!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Posts;