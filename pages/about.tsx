import React from 'react';
import Header from './common/Header';
import Footer from './common/Footer';

const About = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <h1 className='top-margin'>About Jason</h1>
        
        <p>I'm Jason House, a seasoned leader passionate about mentorship and team development. Through my leadership journey across technology companies, scouting, and sports, I've discovered that exceptional leadership isn't innate—it's cultivated through continuous learning, authentic connection, and purposeful action.</p>

        <h2 className='top-margin-single'>Professional Experience</h2>
        <p>Currently at Indeed.com, I've built a career around successfully leading cross-functional teams and driving meaningful outcomes. My approach has earned recognition, including the "Rookie of the Year" award at TriTek Solutions in 2012, and more importantly, the trust of teams who describe me as an "exceptional leader" who "genuinely cares about his people."</p>

        <p>What drives me most is developing others. I've had the privilege of mentoring colleagues who've gone on to become better managers and leaders themselves. I believe that true leadership impact is measured not just by what you accomplish, but by the growth you enable in others.</p>

        <h2 className='top-margin-single'>Leadership Philosophy</h2>
        <p>My approach to leadership is rooted in three core principles:</p>
        <ul>
          <li><strong>Transparency:</strong> People thrive when they understand the 'why' behind decisions</li>
          <li><strong>Empathy:</strong> Leading with understanding creates space for authentic growth</li>
          <li><strong>Accountability:</strong> Clear expectations and honest feedback drive performance</li>
        </ul>

        <p>I thrive in the complexity of human dynamics and take genuine joy in helping others achieve their goals. Whether navigating difficult conversations, supporting teams through change, or coaching individuals toward promotion, I approach each situation with empathy and a commitment to shared success.</p>

        <h2 className='top-margin-single'>Beyond Work</h2>
        <p>My leadership journey extends far beyond the professional realm. As an Eagle Scout (2005), I learned early that leadership is about service and developing others. This foundation has informed my approach whether leading teams in corporate environments, coaching in sports, or mentoring in Scouting.</p>

        <p>I'm also passionate about technology and innovation, having developed projects like FileHog (an Android app for mobile file management) and Gaps (a Plex Server collection management tool). These projects reflect my belief that great leaders must stay curious and continue learning.</p>

        <h2 className='top-margin-single'>Education</h2>
        <p>I'm a graduate of Rochester Institute of Technology (2006-2010), where I developed both technical skills and leadership capabilities that continue to serve me today.</p>

        <h2 className='top-margin-single'>Why I Share</h2>
        <p>Leadership and mentorship are inseparable. Through this blog, I share real experiences, challenges, and lessons learned with the hope of helping others navigate their own leadership journey with confidence and clarity. Every story shared is grounded in authenticity—because people recognize insincerity, and genuine leadership requires genuine connection.</p>

        <p>If you're looking to grow as a leader, face a challenging team dynamic, or simply want to connect about leadership and mentorship, I'd love to hear from you. Reach out through the <a href="/contact">contact page</a>.</p>
      </div>
      <Footer />
    </div>
  );
};

export default About;