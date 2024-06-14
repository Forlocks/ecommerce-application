import React from 'react';
import { IPage } from '../IPage';
import './AboutUsPage.scss';

export const AboutUsPage: React.FC<IPage> = function () {
  return (
    <div className="about_page">
      <div className="about_title">
        <h1>About Us</h1>
      </div>
      <div className="about_aside">
        <h2>Meet Our Team</h2>
        <span>
          Welcome to our development team! This project is the result of our collaborative efforts,
          and we're excited to share our journey with you. Below, you'll find detailed information
          about each team member, their contributions to the project, and our methods of
          collaboration.
        </span>
        <span>
          Our team's effective collaboration was instrumental in the successful completion of this
          project. Each member brought their unique skills and expertise, working together
          seamlessly to overcome challenges and innovate solutions. Regular meetings, transparent
          communication, and a collaborative spirit allowed us to synchronize our efforts and
          maintain a unified vision throughout the development process.
        </span>
        <span>This is a student project created as part of the RS School educational program.</span>
        <a href="https://rs.school/">
          <img src="./assets/icons/rs_school_js.svg" alt="Logo" className="logo-image" />
        </a>
      </div>
      <div className="about_container">
        <div className="developer_container">
          <div className="bio_container">
            <img src="./assets/images/anna.webp" alt="anna" />
            <div className="bio_name">
              <h3>Anna</h3>
              <a href="https://github.com/GBRJo">
                <h3>GBRJo</h3>
              </a>
            </div>
            <h4>Biography:</h4>
            <span>
              Anna lives in the city of Saratov. She graduated from the Physics Faculty of Saratov
              State University and later completed her studies at the Bogolyubov Art School. Anna
              has been working as a UI/UX designer.
            </span>
          </div>
          <div className="role_container">
            <h3>Role:</h3>
            <p>Front-End Developer, UI/UX Designer, Content Manager</p>
            <h3>Collaboration:</h3>
            <p>
              Worked closely with the development team on GitHub, routing, and integrating with
              commercetools.
            </p>
            <h3>Contributions:</h3>
            <ul>
              <li>
                <p>
                  Front-End Development: She was responsible for implementing her designs into the
                  actual website, ensuring that the visual aspects were perfectly aligned with the
                  functional components.
                </p>
              </li>
              <li>
                <p>
                  UI/UX Design: Anna played a crucial role in creating the visual elements of our
                  website. Her designs focus on enhancing user experience through intuitive and
                  attractive interfaces.
                </p>
              </li>
              <li>
                <p>
                  Content Management: Anna also managed the content and product listings for our
                  e-commerce platform, ensuring that all information was accurate and up-to-date.
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="developer_container">
          <div className="bio_container">
            <img src="./assets/images/Alexey888888.webp" alt="Alexey888888" />
            <div className="bio_name">
              <h3>Alexey</h3>
              <a href="https://github.com/Alexey888888">
                <h3>Alexey888888</h3>
              </a>
            </div>
            <h4>Biography:</h4>
            <span>
              Alexey is from Minsk but currently is based in Sofia. He graduated from Belarusian
              State University of Informatics and Radioelectronics, Faculty of Information
              Technology and Control.
            </span>
          </div>
          <div className="role_container">
            <h3>Role:</h3>
            <p>Front-End Developer</p>
            <h3>Collaboration:</h3>
            <p>
              Worked with the development team on GitHub, contributed significantly to the
              integration with CommerceTools.
            </p>
            <h3>Contributions:</h3>
            <ul>
              <li>
                <p>
                  Integration with commercetools: Installed, customized and used the TypeScript SDK
                  to integrate our commerce application with Composable Commerce APIs.
                </p>
              </li>
              <li>
                <p>
                  Front-End Development: Created and extended visual components. Designed and
                  implemented the component for displaying, adding and editing customer addresses.
                </p>
              </li>
              <li>
                <p>CommerceTools Project: Created and configured the project's customization.</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="developer_container">
          <div className="bio_container">
            <img src="./assets/images/Forlocks.webp" alt="Forlocks" />
            <div className="bio_name">
              <h3>Aleksey</h3>
              <a href="https://github.com/Forlocks">
                <h3>Forlocks</h3>
              </a>
            </div>
            <h4>Biography:</h4>
            <span>
              Aleksey lives in St. Petersburg, completing his 4th year of studies at the State
              University of Aerospace Instrumentation.
            </span>
          </div>
          <div className="role_container">
            <h3>Role:</h3>
            <p>Front-End Developer, Team Leader</p>
            <h3>Collaboration:</h3>
            <p>
              Aleksey was the leader along with everyone else. Worked with the team using GitHub and
              YouGile.
            </p>
            <h3>Contributions:</h3>
            <ul>
              <li>
                <p>
                  Visual Components: Created separate visual components, such as sliders or modal
                  windows.
                </p>
              </li>
              <li>
                <p>
                  Routing: Responsible for routing and accessing application pages, from main pages
                  to their subcategories.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
