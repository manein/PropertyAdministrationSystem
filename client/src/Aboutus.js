import React from 'react';
import Navbar from './NavBar';

const AboutUs = () => {
  return (
    <div> <Navbar />
    <div className="about-us-container" style={{ backgroundColor: '#282c34', color:'white', textAlign: 'center', padding: '20px' }}>
       
      <h1>Welcome to Prperty Administration System</h1>
      <p>
        We are committed to revolutionizing property
        management through cutting-edge technology. Our Property Administration
        System, meticulously crafted with React, empowers property owners,
        managers, and tenants to streamline their operations and enhance their
        overall property experience.
      </p>

      <h2>Our Mission</h2>
      <p>
        <strong>Empowering Property Management Excellence</strong>
      </p>
      <p>
        We strive to empower property owners and managers with the tools they
        need to efficiently and effectively administer their properties. Our
        mission is to simplify complex processes, enhance communication, and
        provide a seamless experience for all stakeholders in the property
        management ecosystem.
      </p>

      <h2>Why Choose Our Property Administration System?</h2>
      <p>
        <strong>Innovative Technology, Exceptional Results</strong>
      </p>
      <ul>
        <li>
          <strong>Built with React:</strong> Our system is developed using
          React, a leading JavaScript library for building user interfaces. This
          ensures a responsive, fast, and interactive user experience.
        </li>
        <li>
          <strong>User-Centric Design:</strong> We prioritize user experience,
          creating an intuitive interface that minimizes the learning curve for
          both property owners and tenants.
        </li>
        <li>
          <strong>Scalable and Flexible:</strong> Our system is designed to
          scale with your growing needs, providing flexibility to adapt to
          changes in the property management landscape.
        </li>
      </ul>

      <h2>What Sets Us Apart?</h2>
      <p>
        <strong>Dedicated to Your Success</strong>
      </p>
      <ul>
        <li>
          <strong>Customer-Centric Approach:</strong> Your success is our
          priority. We are dedicated to providing excellent customer support,
          ensuring you get the most out of our Property Administration System.
        </li>
        <li>
          <strong>Continuous Improvement:</strong> We are committed to staying
          ahead of the curve. Our team of developers is constantly working on
          updates and improvements to deliver the latest features and security
          enhancements.
        </li>
      </ul>

      <h2>Meet the Team</h2>
      <p>
        <strong>Passionate Experts in Property Technology</strong>
      </p>
      <ul>
        <li>Manan Devani</li>
        <li>Abdul</li>
        <li>Jeevan</li>
        <li>Harish</li>
        <li>Harshal</li>
        <li>Gayathri</li>
      </ul>

      <h2>Get in Touch</h2>
      <p>
        Have questions or want to learn more about us and our
        Property Administration System? We're here to help. Contact us today at{' '}
        <a href="mailto:mdevani@albany.edu">mdevani@albany.edu</a> or{' '}
        <a href="tel:+123456789">+123 456 789</a>. We look forward to being
        your trusted partner in property management.
      </p>

      </div>
    </div>
  );
};

export default AboutUs;
