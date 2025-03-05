import { spawn } from "child_process";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { power, rpm, unit } = req.body;

    const pythonProcess = spawn("python3", [
      path.resolve("python_scripts/torque_calculator.py"),
      power,
      rpm,
      unit,
    ]);

    let result = "";
    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      if (code === 0) {
        res.status(200).json(JSON.parse(result));
      } else {
        res.status(500).json({ error: "Failed to calculate torque" });
      }
    });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
