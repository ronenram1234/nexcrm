import { FunctionComponent } from "react";


interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  return (
    
    <div className="container">
    <header className="bg-primary text-white text-center p-4">
      <h1>User Guide: Profiles Overview</h1>
    </header>

    <section className="my-5">
      {/* Regular User Section */}
      <div className="card shadow-lg mb-4">
        <div className="card-body" style={{ maxHeight: '350px', overflowY: 'auto' }}>
          <h2 className="card-title text-primary">1. Regular User</h2>
          <p className="card-text">
            The Regular User profile is designed for individuals who have limited access to the platform, primarily focused on browsing and interacting with business content.
          </p>
          <h4 className="text-success">Key Features:</h4>
          <ul>
            <li>View Business Cards</li>
            <li>Search Business Cards</li>
            <li>Dark Mode/Light Mode Toggle</li>
            <li>Create User Profile</li>
            <li>Responsive Design</li>
          </ul>
        </div>
      </div>

      {/* Business User Section */}
      <div className="card shadow-lg mb-4">
        <div className="card-body" style={{ maxHeight: '350px', overflowY: 'auto' }}>
          <h2 className="card-title text-primary">2. Business User (IsBusiness)</h2>
          <p className="card-text">
            The Business User profile includes additional features for managing business-related content and customer interactions.
          </p>
          <h4 className="text-success">Key Features:</h4>
          <ul>
            <li>Create, Edit, and Delete Business Cards</li>
            <li>View Business Card Details</li>
            <li>Favorites</li>
            <li>View and Manage Own Cards</li>
            <li>Dashboard</li>
          </ul>
        </div>
      </div>

      {/* Admin User Section */}
      <div className="card shadow-lg mb-4">
        <div className="card-body" style={{ maxHeight: '350px', overflowY: 'auto' }}>
          <h2 className="card-title text-primary">3. Admin User</h2>
          <p className="card-text">
            The Admin User profile has the highest level of access to manage users, business cards, and overall system functions.
          </p>
          <h4 className="text-success">Key Features:</h4>
          <ul>
            <li>User Management</li>
            <li>Block/Unblock Users</li>
            <li>View All Business Cards</li>
            <li>Delete Business Cards</li>
            <li>Approve/Disapprove Content</li>
            <li>System-Wide Monitoring</li>
          </ul>
        </div>
      </div>

      {/* About Page Section */}
      <div className="card shadow-lg mb-5">
        <div className="card-body" style={{ maxHeight: '200px', overflowY: 'auto' }}>
          <h2 className="card-title text-primary">About This Module</h2>
          <p className="card-text">
            This module was created by Ronen Ram. It provides a comprehensive overview of user profiles and functionalities within the platform. The user guide is designed to help users understand their roles and how to interact with the system effectively. Whether you're a Regular User, Business User, or Admin, this guide will provide the necessary information to navigate and utilize the system features.
          </p>
          <p className="card-text">
            The platform includes various features tailored to each user role, allowing for a flexible and user-friendly experience. Business users can manage business cards, regular users can explore and interact with content, and admins can oversee the entire system, ensuring that everything runs smoothly.
          </p>
        </div>
      </div>
    </section>

    <div className="text-center p-3">
      <h3 className="font-weight-bold">Module created by Ronen Ram</h3>
    </div>
  </div>
    
  )
};

export default About;
