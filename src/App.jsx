import { useState } from "react";
import "./App.css";

function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [advice, setAdvice] = useState("");

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(bmiValue);

      let cat = "";
      let adv = "";

      if (bmiValue < 18.5) {
        cat = "Underweight 😟";
        adv = "You may need to gain weight. Consult a nutritionist.";
      } else if (bmiValue >= 18.5 && bmiValue < 25) {
        cat = "Normal weight 😊";
        adv = "Great! You're in a healthy weight range!";
      } else if (bmiValue >= 25 && bmiValue < 30) {
        cat = "Overweight 😐";
        adv = "Consider increasing physical activity.";
      } else {
        cat = "Obese 😔";
        adv = "Consult a healthcare professional.";
      }

      setCategory(cat);
      setAdvice(adv);
    }
  };

  const reset = () => {
    setWeight("");
    setHeight("");
    setAge("");
    setGender("male");
    setBmi(null);
    setCategory("");
    setAdvice("");
  };

  // Calculate BMI indicator position on the chart (0-100%)
  const getBmiPosition = () => {
    if (!bmi) return 0;
    const bmiNum = parseFloat(bmi);
    if (bmiNum < 18.5) return (bmiNum / 18.5) * 25;
    if (bmiNum < 25) return 25 + ((bmiNum - 18.5) / 6.5) * 25;
    if (bmiNum < 30) return 50 + ((bmiNum - 25) / 5) * 25;
    return Math.min(75 + ((bmiNum - 30) / 10) * 25, 100);
  };

  return (
    <div className="app-container">
      <div className="bmi-card">
        
        <h1 className="title">💪 BMI Calculator</h1>
        <p className="subtitle">by The_Bozgun</p>
        
        {/* Gender selection */}
        <div className="form-group">
          <label className="label">Gender:</label>
          <div className="gender-options">
            <label className="radio-label">
              <input 
                type="radio" 
                value="male" 
                checked={gender === "male"} 
                onChange={(e) => setGender(e.target.value)} 
              />
              <span>♂ Male</span>
            </label>
            <label className="radio-label">
              <input 
                type="radio" 
                value="female" 
                checked={gender === "female"} 
                onChange={(e) => setGender(e.target.value)} 
              />
              <span>♀ Female</span>
            </label>
          </div>
        </div>

        {/* Age input */}
        <div className="form-group">
          <label className="label">Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            className="input-field"
          />
        </div>

        {/* Weight input */}
        <div className="form-group">
          <label className="label">Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter your weight"
            className="input-field"
          />
        </div>

        {/* Height input */}
        <div className="form-group">
          <label className="label">Height (cm):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter your height"
            className="input-field"
          />
        </div>

        {/* Action buttons */}
        <div className="button-group">
          <button onClick={calculateBMI} className="btn btn-primary">
            Calculate
          </button>
          <button onClick={reset} className="btn btn-secondary">
            Reset
          </button>
        </div>

        {/* Results section */}
        {bmi && (
          <div className="results">
            {/* BMI value display */}
            <h2 className="bmi-value" style={{ 
              color: bmi < 18.5 ? "#3498db" : bmi < 25 ? "#2ecc71" : bmi < 30 ? "#f39c12" : "#e74c3c"
            }}>
              BMI: {bmi}
            </h2>
            
            {/* Category display */}
            <h3 className="bmi-category">{category}</h3>

            {/* BMI visual chart */}
            <div className="bmi-chart">
              {/* Color bars representing BMI categories */}
              <div className="chart-bars">
                <div className="bar bar-blue"></div>
                <div className="bar bar-green"></div>
                <div className="bar bar-orange"></div>
                <div className="bar bar-red"></div>
              </div>

              {/* Indicator line showing user BMI position */}
              <div className="indicator" style={{ left: `${getBmiPosition()}%` }}></div>
              
              {/* BMI value label above indicator */}
              <div className="indicator-label" style={{ left: `${getBmiPosition()}%` }}>
                {bmi}
              </div>
            </div>

            {/* Category labels below chart */}
            <div className="chart-labels">
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>

            {/* BMI range values */}
            <div className="chart-ranges">
              <span>&lt;18.5</span>
              <span>18.5-24.9</span>
              <span>25-29.9</span>
              <span>≥30</span>
            </div>
            
            {/* Health advice based on BMI category */}
            <p className="advice">{advice}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;