# LinkedIn Company Data Fetcher

This project is a web application that fetches LinkedIn company data such as the number of followers and employees for a given company. The application consists of a backend server built with Flask and a frontend built with React.

## Backend

The backend is built with Flask and uses Selenium for web scraping LinkedIn data. It includes the following dependencies:

- `Flask`: A lightweight WSGI web application framework in Python.
- `Flask-CORS`: A Flask extension for handling Cross-Origin Resource Sharing (CORS).
- `selenium`: A tool for automating web browsers.
- `BeautifulSoup`: A library for parsing HTML and XML documents.
- `bs2json`: A library to convert BeautifulSoup objects to JSON.

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/youessaitch/linkedin-data-fetcher.git
    cd linkedin-data-fetcher
    ```

2. **Set up a virtual environment and install dependencies:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    pip install -r requirements.txt
    ```

3. **Place your `chromedriver` executable in the specified path or update the path in the `driver_path` variable in the code:**
    ```python
    example: (for me it was)
    driver_path = r"C:\Users\HP\Desktop\PPPP\SELENIUM\chromedriver-win64\chromedriver.exe"
    ```

4. **Run the Flask app:**
    ```bash
    flask run
    ```

### Code Explanation

- **get_linkedin_data(company)**: This function uses Selenium to log into LinkedIn and fetch the number of followers and employees for a specified company. It handles the login process, navigates to the company's LinkedIn page, scrapes the data, and returns it as a dictionary.
- **API Endpoint `/api/data`**: This POST endpoint receives a JSON object with the company name, calls the `get_linkedin_data` function, and returns the scraped data as a JSON response.

## Frontend

The frontend is built with React and styled-components for styling. It includes the following dependencies:

- `React`: A JavaScript library for building user interfaces.
- `styled-components`: A library for styling React components.
- `React useState hook`: For managing state in functional components.

### Installation

1. **Navigate to the `frontend` directory:**
    ```bash
    cd frontend
    ```

2. **Install the dependencies:**
    ```bash
    npm install
    ```

3. **Run the React app:**
    ```bash
    npm start
    ```

### Code Explanation

- **App Component**: The main component that renders the form for inputting company names, handles form submission, and displays the fetched data.
  - **State Management**: Uses `useState` hook to manage the state for companies, data, loading, and error.
  - **handleChange**: Updates the `companies` state when the textarea value changes.
  - **handleSubmit**: Handles form submission, sends a POST request to the backend API for each company, and updates the state with the fetched data.
  - **Styled Components**: Utilizes `styled-components` for styling various parts of the application, such as the container, header, form, buttons, and result display.

## Usage

1. **Start the Backend Server**:
    ```bash
    flask run
    ```

2. **Start the Frontend Development Server**:
    ```bash
    npm start
    ```

3. **Open the Application in a Browser**:
    - Navigate to `http://localhost:3000` in your web browser.
    - Enter company names in the textarea, each on a new line.
    - Click the "Get Data" button to fetch LinkedIn data for the entered companies.
    - The results will be displayed below the form.

## Notes

- **Manual OTP Entry**: The script waits for manual OTP entry during the LinkedIn login process. Ensure you enter the OTP within the given time frame.
- **LinkedIn Credentials**: Replace the placeholder email and password in the `get_linkedin_data` function with valid LinkedIn credentials.
- **ChromeDriver Path**: Ensure the `chromedriver` executable path is correct in the backend code.

##created by Ayush Kumar(IIT Kharagpur'25)
