import sys
import json

def calculate_torque(power: float, rpm: float, unit: str = "hp"):
    if rpm <= 0:
        return {"error": "RPM must be greater than zero"}

    try:
        if unit.lower() == "hp":
            torque = (power * 5252) / rpm  # Torque in lb-ft
            torque_unit = "lb-ft"
        elif unit.lower() == "kw":
            torque = (power * 9549) / rpm  # Torque in Nm
            torque_unit = "Nm"
        else:
            return {"error": "Invalid unit. Use 'hp' or 'kw'."}

        return {"torque": round(torque, 2), "unit": torque_unit}

    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    power = float(sys.argv[1])
    rpm = float(sys.argv[2])
    unit = sys.argv[3]
    print(json.dumps(calculate_torque(power, rpm, unit)))
