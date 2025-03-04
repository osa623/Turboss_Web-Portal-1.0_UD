from flask import Flask, request, jsonify
from flask_cors import CORS
import math

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

def horsepower_to_torque(hp, rpm):
    if rpm == 0:
        return "RPM cannot be zero."
    return round((hp * 5252) / rpm, 2)

def engine_displacement(bore, stroke, cylinders):
    displacement_cc = math.pi * (bore / 2) ** 2 * stroke * cylinders
    displacement_liters = displacement_cc / 1000
    return round(displacement_cc, 2), round(displacement_liters, 2)

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    hp = data.get('hp', 0)
    rpm = data.get('rpm', 0)
    bore = data.get('bore', 0)
    stroke = data.get('stroke', 0)
    cylinders = data.get('cylinders', 0)

    torque = horsepower_to_torque(hp, rpm)
    displacement = engine_displacement(bore, stroke, cylinders)

    response = {
        "torque": torque,
        "displacement_cc": displacement[0],
        "displacement_liters": displacement[1]
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Run Flask on port 5001
