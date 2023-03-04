from flask import Flask, request, jsonify

app = Flask(__name__)

# Define a list of schemes and their eligibility criteria
schemes = [
    {
        "name": "Pradhan Mantri Jan Dhan Yojana",
        "age_group": "18-59",
        "gender": "Both",
        "income_category": "Low-income",
        "description": "A financial inclusion scheme to provide banking services to all households."
    },
    {
        "name": "Ayushman Bharat Yojana",
        "age_group": "0-59",
        "gender": "Both",
        "income_category": "Low-income",
        "description": "A health insurance scheme to provide coverage for medical expenses."
    },
    {
        "name": "Pradhan Mantri Vaya Vandana Yojana",
        "age_group": "60+",
        "gender": "Both",
        "income_category": "Middle-income",
        "description": "A pension scheme to provide regular income for senior citizens."
    },
    {
        "name": "Pradhan Mantri Awas Yojana",
        "age_group": "18+",
        "gender": "Both",
        "income_category": "Low-income and Middle-income",
        "description": "A housing scheme to provide affordable homes for all."
    },
    {
        "name": "Pradhan Mantri Mudra Yojana",
        "age_group": "18-59",
        "gender": "Both",
        "income_category": "Low-income and Middle-income",
        "description": "A scheme to provide collateral-free loans to micro and small enterprises."
    },
    {
        "name": "Pradhan Mantri Kisan Samman Nidhi Yojana",
        "age_group": "18+",
        "gender": "Both",
        "income_category": "Low-income and Middle-income",
        "description": "A scheme to provide financial assistance to farmers."
    },
    {
        "name": "Sukanya Samriddhi Yojana",
        "age_group": "0-10",
        "gender": "Female",
        "income_category": "Low-income and Middle-income",
        "description": "A savings scheme for the education and marriage of girl children."
    }
    ]

@app.route('/')
def index():
    return app.send_static_file('suggest.html') # serve the HTML file

@app.route('/recommendation', methods=['POST'])
def recommendation():
    data = request.get_json() # get user inputs from AJAX request
    age = int(data['age'])
    gender = data['gender']
    income = data['income']
    eligible_schemes = []
    for scheme in schemes:
        if age >= int(scheme['age_group'].split('-')[0]) and age <= int(scheme['age_group'].split('-')[1]) and gender == scheme['gender'] and income == scheme['income_category']:
            eligible_schemes.append(scheme)
        if len(eligible_schemes) == 0:
            return jsonify('No schemes found for the given inputs.')
        else:
            recommendation = 'Recommended schemes:<br>'
    for scheme in eligible_schemes:
        recommendation += f"{scheme['name']} - {scheme['description']}<br>"
        return jsonify(recommendation)

if __name__ == 'main':
    app.run(debug=True)