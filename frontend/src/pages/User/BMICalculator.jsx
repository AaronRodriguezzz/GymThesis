import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function BMICalculator() {
  const [unit, setUnit] = useState("metric");
  const [form, setForm] = useState({
    gender: "male",
    age: "",
    height: "",
    weight: "",
    activity: "1.2",
  });

  const [results, setResults] = useState({ bmi: null, bmr: null, tdee: null, category: '' });

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const getBMICategory = (bmi) => {
    const val = Number(bmi);
    if (val < 18.5) return "Underweight";
    if (val < 25) return "Normal weight";
    if (val < 30) return "Overweight";
    if (val < 35) return "Obesity Class I";
    if (val < 40) return "Obesity Class II";
    return "Obesity Class III";
  };

  const getBMIColor = (category) => {
    switch (category) {
      case "Underweight":
        return "text-yellow-500";
      case "Normal weight":
        return "text-green-500";
      case "Overweight":
        return "text-orange-500";
      case "Obesity Class I":
        return "text-red-500";
      case "Obesity Class II":
        return "text-red-600";
      case "Obesity Class III":
        return "text-red-700";
      default:
        return "text-gray-500";
    }
  };

  useEffect(() => {
    const { age, height, weight, gender, activity } = form;

    if (!age || !height || !weight) return;

    let wkg = Number(weight);
    let hcm = Number(height);

    if (unit === "imperial") {
      wkg = wkg * 0.453592; // lbs → kg
      hcm = hcm * 2.54; // in → cm
    }

    const hm = hcm / 100;
    const bmi = (wkg / (hm * hm)).toFixed(1);
    const sVal = gender === "male" ? 5 : -161;
    const bmr = (10 * wkg + 6.25 * hcm - 5 * Number(age) + sVal).toFixed(0);
    const tdee = (bmr * Number(activity)).toFixed(0);

    const bmiCategory = getBMICategory(bmi);

    setResults({ bmi, bmr, tdee, category: bmiCategory });
  }, [form, unit]);

  return (
    <main className="bg-gradient-to-r from-blue-900 to-blue-800 min-h-screen text-gray-900 flex flex-col items-center justify-center py-25 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white max-w-2xl w-full p-8 rounded-2xl shadow-lg"
      >
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-2 tracking-tighter">
          TDEE & BMI Calculator
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Calculate your daily calorie needs and body mass index to understand
          your fitness goals better.
        </p>

        {/* Unit System */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-blue-900 mb-2">
            Unit System
          </label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:outline-none"
          >
            <option value="metric">Metric (kg, cm)</option>
            <option value="imperial">Imperial (lbs, in)</option>
          </select>
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-blue-900 mb-2">
            Gender
          </label>
          <select
            value={form.gender}
            onChange={handleChange("gender")}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:outline-none"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Age */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-blue-900 mb-2">
            Age
          </label>
          <input
            type="number"
            placeholder="Enter your age"
            value={form.age}
            onChange={handleChange("age")}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:outline-none"
          />
        </div>

        {/* Weight */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-blue-900 mb-2">
            Weight ({unit === "metric" ? "kg" : "lbs"})
          </label>
          <input
            type="number"
            placeholder="Enter your weight"
            value={form.weight}
            onChange={handleChange("weight")}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:outline-none"
          />
        </div>

        {/* Height */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-blue-900 mb-2">
            Height ({unit === "metric" ? "cm" : "in"})
          </label>
          <input
            type="number"
            placeholder="Enter your height"
            value={form.height}
            onChange={handleChange("height")}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:outline-none"
          />
        </div>

        {/* Activity */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-blue-900 mb-2">
            Activity Level
          </label>
          <select
            value={form.activity}
            onChange={handleChange("activity")}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:outline-none"
          >
            <option value="1.2">Sedentary (little to no exercise)</option>
            <option value="1.375">Lightly Active (1–3 days/week)</option>
            <option value="1.55">Moderately Active (3–5 days/week)</option>
            <option value="1.725">Very Active (6–7 days/week)</option>
            <option value="1.9">Extra Active (intense daily exercise)</option>
          </select>
        </div>

        {/* Results */}     
        {results.bmi && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-blue-50 to-white border border-blue-100 p-6 rounded-xl shadow text-center"
          >
            <h2 className="text-2xl font-semibold text-blue-900 mb-4 tracking-tight">
              Your Results
            </h2>

            <div className="grid grid-cols-3 gap-4 text-sm text-blue-900">
              <div className="flex flex-col">
                <span className="font-bold text-lg text-blue-900">
                  {results.bmi}
                </span>
                <span className="text-gray-600">BMI</span>
              </div>

              <div className="flex flex-col">
                <span className="font-bold text-lg text-blue-900">
                  {results.bmr}
                </span>
                <span className="text-gray-600">BMR (kcal/day)</span>
              </div>

              <div className="flex flex-col">
                <span className="font-bold text-lg text-blue-900">
                  {results.tdee}
                </span>
                <span className="text-gray-600">TDEE (kcal/day)</span>
              </div>
            </div>

            <p className={`py-6 text-xl font-semibold ${getBMIColor(results.category)}`}>
              {results.category}
            </p>

            <p className="text-sm text-gray-600">
              *Your BMI helps estimate body fat based on height and weight, while
              your TDEE shows daily calorie needs.
            </p>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
