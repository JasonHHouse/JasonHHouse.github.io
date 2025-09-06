import React from 'react';
import Header from './common/Header';
import Footer from './common/Footer';

const CYOA = () => {
  return (
    <div>
      <Header />
      <div className="container top-margin">
        <h1>Interactive Leadership CYOA</h1>
        <h2>Coming Soon</h2>

        <p>
          Leadership isn't learned from textbooks alone—it's forged through real-world experiences, 
          difficult decisions, and the wisdom that comes from navigating complex human dynamics. 
          That's why I'm building something special for aspiring leaders like you.
        </p>

        <div className="blog-grid top-margin">
          <div className="post-card">
            <h2>🎯 Real-World Scenarios</h2>
            <p>
              Face authentic leadership challenges drawn from my years managing engineering teams, 
              navigating organizational change, and mentoring emerging leaders. Each scenario is 
              based on real situations I've encountered or witnessed.
            </p>
          </div>

          <div className="post-card">
            <h2>⚡ Interactive Decision Making</h2>
            <p>
              Make choices that matter. See how your decisions play out in realistic workplace 
              situations. Learn from both successes and failures in a safe environment where 
              mistakes become valuable learning opportunities.
            </p>
          </div>

          <div className="post-card">
            <h2>📚 Contextual Learning</h2>
            <p>
              After each scenario, dive deeper with explanations of leadership principles, 
              alternative approaches, and insights from my experience. Understand not just 
              what to do, but why certain approaches work better than others.
            </p>
          </div>

          <div className="post-card">
            <h2>🔄 Multiple Pathways</h2>
            <p>
              Explore different leadership styles and approaches. Replay scenarios with different 
              choices to see how various leadership philosophies play out in practice. Build your 
              own leadership toolkit through experiential learning.
            </p>
          </div>
        </div>

        <h3 className="top-margin">What You'll Experience</h3>
        
        <p>
          <strong>Difficult Conversations:</strong> Navigate performance reviews, deliver challenging 
          feedback, and handle conflicts between team members with empathy and effectiveness.
        </p>

        <p>
          <strong>Team Dynamics:</strong> Build trust within your team, motivate underperforming 
          members, and create psychological safety while maintaining high standards.
        </p>

        <p>
          <strong>Strategic Decisions:</strong> Balance competing priorities, allocate limited resources, 
          and make tough calls that affect both people and projects.
        </p>

        <p>
          <strong>Crisis Management:</strong> Lead through uncertainty, communicate during organizational 
          changes, and maintain team morale when facing significant challenges.
        </p>

        <div className="post-card top-margin">
          <h2>Why Choose Your Own Adventure?</h2>
          <p>
            Traditional leadership training often feels abstract and disconnected from real-world 
            complexity. CYOA format lets you experience the messy, nuanced reality of leadership 
            decisions. You'll develop intuition alongside knowledge, learning to trust your 
            judgment while understanding the reasoning behind effective leadership practices.
          </p>
          <p>
            Each path through the adventure reveals different aspects of leadership challenges, 
            helping you build a comprehensive understanding of what it truly means to lead with 
            both competence and compassion.
          </p>
        </div>

        <p className="top-margin">
          <strong>Stay tuned—this interactive leadership journey will be launching soon.</strong> 
          In the meantime, explore my blog posts to get a taste of the real-world leadership 
          challenges and insights you'll encounter in the full CYOA experience.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default CYOA;