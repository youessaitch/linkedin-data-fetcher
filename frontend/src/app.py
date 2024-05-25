from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/": {"origins": "https://localhost:3000"}})

@app.route('/', methods=['POST'])
def receive_domains():
    data = request.get_json()
    domainList = data.get('domains', [])
    
    # Mock data generation
    results = []
    for domain in domainList:
        # Replace this with actual logic to fetch LinkedIn data
        mock_result = {
            "domain": domain,
            "employees": len(domain) * 10  # Just a mock example, e.g., 10 employees per character
        }
        results.append(mock_result)
    
    return jsonify(results)
 
if __name__ == '__main__':
    app.run(debug=True, port=5000)
