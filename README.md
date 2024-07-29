# SSLCertificateExpirationChecker
A Node.js application that checks the SSL certificate expiration status of specified websites.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Visual Studio Code](https://code.visualstudio.com/) (or any code editor of your choice)

## Setup Instructions

### 1. Clone the Repository

Clone the project repository from GitHub.

```bash
git clone https://github.com/nitinguptahipl/SSLCertificateExpirationChecker.git

2. Navigate to the Project Directory
bash
Copy code
cd ssl-expiration-checker
3. Install Dependencies
Install the necessary dependencies using npm.

bash
Copy code
npm install
4. Configure Environment Variables
Create a .env file in the root directory of your project and add the necessary environment variables. Refer to the .env.example file for guidance.

bash
Copy code
cp .env.example .env
# Edit .env file and add your environment variables
5. Running the Project
In VS Code
Open the project in VS Code:

bash
Copy code
code .
Open the integrated terminal in VS Code (Ctrl + ` or from the menu: Terminal > New Terminal).

Start the development server:

bash
Copy code
npm start
In Any Other Code Editor
Open the project folder in your preferred code editor.

Open a terminal or command prompt in the project directory.

Start the development server:

bash
Copy code
npm start
6. Using the Application
Once the server is running, you can check the SSL expiration status of websites.

Open your web browser and go to http://localhost:3000 (or the port specified in your project).

Enter the URL of the website you want to check and click the "Check SSL Expiration" button.
