import { useState } from "react";
import "./App.css";

function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [advancedMode, setAdvancedMode] = useState(false);
  
  // Advanced measurements
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  
  // Results
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [advice, setAdvice] = useState("");
  const [bodyFat, setBodyFat] = useState(null);
  const [whr, setWhr] = useState(null);
  const [whtr, setWhtr] = useState(null);

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

      // Advanced calculations
      if (advancedMode) {
        calculateAdvancedMetrics();
      }
    }
  };

  const calculateAdvancedMetrics = () => {
    // Body Fat Percentage (US Navy Method - CORRECTED FORMULA)
    if (neck && waist && height) {
      let bodyFatPercent = null;
      
      const neckValue = parseFloat(neck);
      const waistValue = parseFloat(waist);
      const heightValue = parseFloat(height);
      
      // Ensure measurements are valid
      if (waistValue <= neckValue) {
        setBodyFat(null);
      } else {
        if (gender === "male") {
          // Male formula (only needs neck, waist, height)
          bodyFatPercent = 495 / (1.0324 - 0.19077 * Math.log10(waistValue - neckValue) + 0.15456 * Math.log10(heightValue)) - 450;
          setBodyFat(bodyFatPercent.toFixed(1));
        } else {
          // Female formula (needs hip measurement too)
          if (hip) {
            const hipValue = parseFloat(hip);
            bodyFatPercent = 495 / (1.29579 - 0.35004 * Math.log10(waistValue + hipValue - neckValue) + 0.22100 * Math.log10(heightValue)) - 450;
            setBodyFat(bodyFatPercent.toFixed(1));
          } else {
            setBodyFat(null);
          }
        }
      }
    } else {
      setBodyFat(null);
    }

    // Waist-to-Hip Ratio (needs both waist and hip)
    if (waist && hip) {
      const whrValue = (parseFloat(waist) / parseFloat(hip)).toFixed(2);
      setWhr(whrValue);
    } else {
      setWhr(null);
    }

    // Waist-to-Height Ratio
    if (waist && height) {
      const whtrValue = (parseFloat(waist) / parseFloat(height)).toFixed(2);
      setWhtr(whtrValue);
    } else {
      setWhtr(null);
    }
  };

  const reset = () => {
    setWeight("");
    setHeight("");
    setAge("");
    setGender("male");
    setNeck("");
    setWaist("");
    setHip("");
    setBmi(null);
    setCategory("");
    setAdvice("");
    setBodyFat(null);
    setWhr(null);
    setWhtr(null);
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

  // Get body fat category
  const getBodyFatCategory = () => {
    if (!bodyFat) return "";
    const bf = parseFloat(bodyFat);
    
    if (gender === "male") {
      if (bf < 6) return "Essential Fat";
      if (bf < 14) return "Athletes";
      if (bf < 18) return "Fitness";
      if (bf < 25) return "Average";
      return "Obese";
    } else {
      if (bf < 14) return "Essential Fat";
      if (bf < 21) return "Athletes";
      if (bf < 25) return "Fitness";
      if (bf < 32) return "Average";
      return "Obese";
    }
  };

  // Get WHR risk level
  const getWHRRisk = () => {
    if (!whr) return "";
    const whrValue = parseFloat(whr);
    
    if (gender === "male") {
      if (whrValue < 0.95) return "Low Risk 💚";
      if (whrValue < 1.0) return "Moderate Risk 🟡";
      return "High Risk 🔴";
    } else {
      if (whrValue < 0.80) return "Low Risk 💚";
      if (whrValue < 0.85) return "Moderate Risk 🟡";
      return "High Risk 🔴";
    }
  };

  return (
    <div className="app-container">
      <div className="bmi-card">
        
        <h1 className="title">💪 BMI+ Calculator</h1>
        <p className="subtitle">by The_Bozgun</p>
        
        {/* Advanced Mode Toggle */}
        <div className="advanced-toggle">
          <label className="toggle-label">
            <input 
              type="checkbox" 
              checked={advancedMode} 
              onChange={(e) => setAdvancedMode(e.target.checked)}
              className="toggle-checkbox"
            />
            <span className="toggle-text">Advanced Analysis</span>
          </label>
        </div>

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

        {/* Advanced measurements */}
        {advancedMode && (
          <div className="advanced-section">
            <h3 className="section-title">📏 Body Measurements</h3>
            
            <div className="form-group">
              <label className="label">Neck Circumference (cm):</label>
              <input
                type="number"
                step="0.1"
                value={neck}
                onChange={(e) => setNeck(e.target.value)}
                placeholder="Measure around neck"
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label className="label">Waist Circumference (cm):</label>
              <input
                type="number"
                step="0.1"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                placeholder="Measure at belly button level"
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label className="label">Hip Circumference (cm):</label>
              <input
                type="number"
                step="0.1"
                value={hip}
                onChange={(e) => setHip(e.target.value)}
                placeholder="Measure at widest point"
                className="input-field"
              />
              <small className="input-hint">
                {gender === "female" ? "Required for body fat calculation" : "Required for WHR calculation"}
              </small>
            </div>
          </div>
        )}

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

            {/* Advanced Results */}
            {advancedMode && (bodyFat || whr || whtr) && (
              <div className="advanced-results">
                <h3 className="section-title">📊 Advanced Metrics</h3>
                
                <div className="metrics-grid">
                  {/* Body Fat */}
                  {bodyFat && (
                    <div className="metric-card">
                      <div className="metric-label">Body Fat Percentage</div>
                      <div className="metric-value">{bodyFat}%</div>
                      <div className="metric-category">{getBodyFatCategory()}</div>
                    </div>
                  )}

                  {/* WHR */}
                  {whr && (
                    <div className="metric-card">
                      <div className="metric-label">Waist-to-Hip Ratio</div>
                      <div className="metric-value">{whr}</div>
                      <div className="metric-category">{getWHRRisk()}</div>
                    </div>
                  )}

                  {/* WHtR */}
                  {whtr && (
                    <div className="metric-card">
                      <div className="metric-label">Waist-to-Height Ratio</div>
                      <div className="metric-value">{whtr}</div>
                      <div className="metric-category">
                        {whtr < 0.5 ? "Healthy 💚" : whtr < 0.6 ? "Increased Risk 🟡" : "High Risk 🔴"}
                      </div>
                    </div>
                  )}
                </div>

                {/* Info box */}
                <div className="info-box">
                  <strong>ℹ️ Note:</strong> Body fat calculations use the US Navy method. 
                  {gender === "female" && !hip && " Hip measurement required for accurate body fat calculation."}
                  {!hip && " Hip measurement required for Waist-to-Hip Ratio."}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;