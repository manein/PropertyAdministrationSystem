import React from 'react';
import { Link } from 'react-router-dom';
import TenantNavbar from './TenantComponents/TenantNavbar';


const AboutUs = () => {
  return (
    <div> 
      <TenantNavbar/>
    <div className="about-us-container" style={{ backgroundColor: '#282c34', color:'white', textAlign: 'center', padding: '20px' }}>
       
      <Link className='nav-item' to='/demo'><h1 >Welcome to Property Administration System</h1></Link>
      <p>
        We are committed to revolutionizing property
        management through cutting-edge technology. Our Property Administration
        System, meticulously crafted with React, empowers property owners,
        managers, and tenants to streamline their operations and enhance their
        overall property experience.
      </p>

      <h2>Why Choose Our Property Administration System?</h2>
      <p>
        <strong>Innovative Technology, Exceptional Results</strong>
      </p>
        <strong>Built with React:</strong> Our system is developed using
          React, a leading JavaScript library for building user interfaces. This
          ensures a responsive, fast, and interactive user experience.<br></br>
        
        
          <strong>User-Centric Design:</strong> We prioritize user experience,
          creating an intuitive interface that minimizes the learning curve for
          both property owners and tenants.<br></br>
        
        
          <strong>Scalable and Flexible:</strong> Our system is designed to
          scale with your growing needs, providing flexibility to adapt to
          changes in the property management landscape.
        

      <h2>What Sets Us Apart?</h2>
      
        <strong>Dedicated to Your Success</strong>
      
      <ul>
        
          <strong>Customer-Centric Approach:</strong> Your success is our
          priority. We are dedicated to providing excellent customer support,
          ensuring you get the most out of our Property Administration System.
        
        
          <strong>Continuous Improvement:</strong> We are committed to staying
          ahead of the curve. Our team of developers is constantly working on
          updates and improvements to deliver the latest features and security
          enhancements.
        
      </ul>

      <h2>Meet the Team</h2>
  
      <strong>Passionate Experts in Property Technology</strong>  
       Manan Devani<br></br>
        Abdul Shaik<br></br>
        Jeevan Reddy<br></br>
        Harish <br></br>
        Harshal Dankhara<br></br>
        Gayathri Tamma<br></br>
      

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
