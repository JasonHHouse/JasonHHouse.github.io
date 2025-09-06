import React from 'react';
import Header from './common/Header';
import Footer from './common/Footer';

const Privacy = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <h1 className='top-margin'>Privacy Policy</h1>
        <p><em>Last updated: {new Date().toLocaleDateString()}</em></p>

        <h2 className='top-margin-single'>Information We Collect</h2>
        <p>This website is a personal blog focused on leadership and mentorship content. We collect minimal information:</p>
        <ul>
          <li>Basic analytics data (page views, referral sources) through standard web server logs</li>
          <li>Any information you voluntarily provide through contact forms or comments</li>
        </ul>

        <h2>How We Use Information</h2>
        <p>Any information collected is used solely to:</p>
        <ul>
          <li>Improve the content and user experience of this blog</li>
          <li>Respond to inquiries or feedback you submit</li>
          <li>Understand which content is most valuable to readers</li>
        </ul>

        <h2>Information Sharing</h2>
        <p>We do not sell, trade, or share your personal information with third parties. Your information remains private and is only used for the purposes stated above.</p>

        <h2 className='top-margin-single'>Cookies</h2>
        <p>This website may use minimal cookies for basic functionality and analytics. These do not store personal information and are used only to improve your browsing experience.</p>

        <h2 className='top-margin-single'>External Links</h2>
        <p>This blog may contain links to external websites. We are not responsible for the privacy practices of other sites and encourage you to review their privacy policies.</p>

        <h2 className='top-margin-single'>Data Security</h2>
        <p>We implement reasonable security measures to protect any information collected through this website.</p>

        <h2 className='top-margin-single'>Changes to This Policy</h2>
        <p>This privacy policy may be updated from time to time. Any changes will be reflected with an updated date at the top of this page.</p>

        <h2 className='top-margin-single'>Contact</h2>
        <p>If you have questions about this privacy policy, please contact us through the <a href="/contact">contact page</a>.</p>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;