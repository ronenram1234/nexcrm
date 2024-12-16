import { FunctionComponent } from "react";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  return (
    <div className="about-container">
      <h1>About This Project</h1>

      <section>
        <h2>Introduction</h2>
        <p>
          This project is a comprehensive web application designed to manage
          business cards in a user-friendly and interactive way. Users can
          create, update, delete, and view business cards, as well as mark them
          as favorites. The application integrates dynamic elements such as maps
          and card details, leveraging modern frontend technologies to deliver a
          smooth and intuitive experience. The app is suitable for both personal
          and business users, with specific functionalities tailored to each
          user role.
        </p>
      </section>

      <section>
        <h2>Features</h2>
        <ul>
          <li>
            <strong>Business Card CRUD Operations</strong>: Users can easily
            create, read, update, and delete business cards. Each card contains
            information such as the business name, description, contact
            information, and an interactive address map.
          </li>
          <li>
            <strong>Favorite Cards</strong>: Users can mark business cards as
            favorites for easy access later. They can view all their favorites
            in a dedicated "Favorite Cards" section.
          </li>
          <li>
            <strong>Interactive Map</strong>: Each business card contains an
            address, which is displayed on an interactive map. This allows users
            to see the exact location of the business.
          </li>
          <li>
            <strong>Responsive Design</strong>: The app is fully responsive,
            ensuring a seamless experience across desktops, tablets, and mobile
            devices.
          </li>
          <li>
            <strong>User Authentication</strong>: The app includes a robust
            authentication system, allowing users to securely sign up, log in,
            and manage their profiles.
          </li>
          <li>
            <strong>Admin Features</strong>: Admin users have the ability to
            manage all business cards and users, ensuring smooth operation and
            access control.
          </li>
        </ul>
      </section>

      <section>
        <h2>Technologies Used</h2>
        <ul>
          <li>
            <strong>React</strong>: The core JavaScript library for building the
            user interface.
          </li>
          <li>
            <strong>React Router</strong>: For dynamic page navigation and
            handling routes between different sections of the app.
          </li>
          <li>
            <strong>React Bootstrap</strong>: Used for responsive layout and
            design components like modals, carousels, and cards.
          </li>
          <li>
            <strong>Formik and Yup</strong>: To manage form state and
            validations efficiently.
          </li>
          <li>
            <strong>Axios</strong>: To make asynchronous HTTP requests to
            interact with the backend API for CRUD operations on business cards.
          </li>
          <li>
            <strong>FontAwesome</strong>: For providing icons such as heart,
            trash, and edit for actions on business cards.
          </li>
          <li>
            <strong>React-Toastify</strong>: For displaying toast notifications,
            such as success or error messages during form submissions or
            operations.
          </li>
          <li>
            <strong>Google Maps API</strong>: For displaying the business
            location on an interactive map.
          </li>
          <li>
            <strong>JWT Authentication</strong>: Secure user authentication
            using JSON Web Tokens for session management.
          </li>
        </ul>
      </section>

      <section>
        <h2>How to Use</h2>
        <p>
          1. <strong>Sign Up/Log In</strong>: First, create an account or log in
          to start managing your business cards.
        </p>
        <p>
          2. <strong>Add Business Cards</strong>: After logging in, users can
          create new business cards by providing details such as business name,
          description, phone number, email, and address.
        </p>
        <p>
          3. <strong>View and Edit Cards</strong>: View detailed information
          about each business card, including the option to update the
          information or mark a card as a favorite.
        </p>
        <p>
          4. <strong>Search and Filter</strong>: Users can search and filter
          business cards based on various criteria to easily find the card they
          need.
        </p>
        <p>
          5. <strong>Access Map</strong>: Each card includes an interactive map
          with the business location for easy navigation.
        </p>
      </section>

      <section>
        <h2>Contributors/Team</h2>
        <ul>
          <li>
            <strong>Ronen Ram</strong>: Lead Developer, ReactJS and UX Design.
          </li>
        </ul>
      </section>

      <section>
        <h2>Future Plans/Improvements</h2>
        <ul>
          <li>
            <strong>Mobile App Version</strong>: A mobile app version of the
            project to increase accessibility and improve the user experience on
            smartphones.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default About;
