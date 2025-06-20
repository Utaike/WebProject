Web Project
Overview
This is a web-based project developed to provide an interactive and responsive user experience. The project showcases a fitness program exploration interface with features like a sliding card gallery, modal sign-in/sign-up forms, and dynamic image updates.
Technologies Used

HTML: Structure of the web pages.
CSS: Styled with Tailwind CSS, a utility-first CSS framework, for rapid and responsive design.
JavaScript: Implements interactivity, including slider functionality, modal controls, and dynamic content updates.

Features

Slider Gallery: A horizontal scrollable section with cards representing different fitness programs (Personal Training, Group Classes, Achieve Your Fitness Goal).
Modal Authentication: Sign-in and sign-up modals with email/password and Google authentication options.
Dynamic Hero Image: Updates the background image based on the active card in the slider.
Responsive Design: Adapts to mobile and desktop views with tailored layouts.

Setup

Clone the Repository:git clone <repository-url>
cd <project-folder>

Install Dependencies:
Ensure you have a web server environment (e.g., live server extension for VS Code or a local server like XAMPP).
No additional dependencies are required as Tailwind CSS and Font Awesome are loaded via CDN.

Run the Project:
Open index.html in a web browser via a local server to enable JavaScript functionality.

File Structure

index.html: Main HTML file containing the project structure.
/css/index.css: Custom CSS file (if any additional styles are added).
/img/: Directory for image assets (e.g., cardio.png, fatloss.png, etc.).
/js/auth.js: JavaScript file for authentication logic.
/js/loadComponent.js: JavaScript file for loading components dynamically.
/pages/: Directory for linked pages (e.g., cardio-strength.html, if implemented).

Usage

Navigate the slider using the arrow buttons or by clicking/tapping cards.
Open the sign-in or sign-up modal by interacting with the respective links (to be implemented in auth.js).
Explore program details by clicking cards (links to be set up in /pages/).

Contributing

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make changes and commit (git commit -m "description").
Push to the branch (git push origin feature-branch).
Open a pull request.

License
This project is open-source. Feel free to use and modify it under the MIT License (add a LICENSE file if desired).
Contact
For questions or suggestions, please open an issue on the repository or contact the maintainer.
Acknowledgments

Tailwind CSS for styling.
Font Awesome for icons.
Image assets from external sources (e.g., Cloudinary links).
