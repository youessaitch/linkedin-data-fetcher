from flask import Flask, request, jsonify
from flask_cors import CORS
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from bs4 import BeautifulSoup
import time
from bs2json import BS2Json

app = Flask(__name__)
CORS(app)

# "C:\Users\HP\Desktop\PPPP"
driver_path = r"C:\Users\HP\Desktop\PPPP\SELENIUM\chromedriver-win64\chromedriver.exe"

def get_linkedin_data(company):
    cService = ChromeService(executable_path=driver_path)
    driver = webdriver.Chrome(service=cService)
    driver.get("https://www.linkedin.com/checkpoint/rm/sign-in-another-account")
    time.sleep(5)

    username = driver.find_element(By.ID, "username")
    username.send_keys("exquisitedumbledore@gmail.com")
    
    pword = driver.find_element(By.ID, "password")
    pword.send_keys("Password007768")
    driver.find_element(By.CSS_SELECTOR, 'button.btn__primary--large').click()

    # Wait for manual OTP entry
    time.sleep(20)

    profile_url = f"https://www.linkedin.com/company/{company}/posts/?feedView=all"
    about_url = f"https://www.linkedin.com/company/{company}/about/"

    # For followers
    driver.get(profile_url)
    time.sleep(3)  # wait for page to load

    start = time.time()
    initialScroll = 0
    finalScroll = 1000
    
    while True:
        driver.execute_script("window.scrollTo(0,1000)")
        initialScroll = finalScroll
        finalScroll += 1000
        time.sleep(3)
        end = time.time()
        if round(end - start) > 20:
            break

    src = driver.page_source
    
    soup = BeautifulSoup(src, 'html.parser')
    followers_tag = soup.find('p', {'class': 't-14 t-normal text-align-center'})
    followers = followers_tag.get_text() if followers_tag else "N/A"

    # For employees
    driver.get(about_url)
    time.sleep(3)  # wait for page to load
    
    src = driver.page_source
    # driver.quit()
    
    soup = BeautifulSoup(src, 'html.parser')
    employees_tag = soup.find('a', {'id': 'ember3430'}).find('span') if soup.find('a', {'id': 'ember3430'}) else None
    employees = employees_tag.text.strip() if employees_tag else "N/A"

    driver.quit()
    return {
        "followers": followers,
        "employees": employees
    }

@app.route('/api/data', methods=['POST'])
def get_data():
    data = request.get_json()
    company = data.get('company')
    if not company:
        return jsonify({"error": "Company name is required"}), 400
    
    try:
        result = get_linkedin_data(company)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
