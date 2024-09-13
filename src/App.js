import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./auth/firebase"; // Firebase authentication
import "./App.css";
import "./index.css";

const instructions = `
### Instructions

#### For Generating a Fitness Plan:
1. **Age**: Enter your age in years.
2. **Gender**: Enter your gender (e.g., male, female, etc.).
3. **Goal**: Describe your fitness goal (e.g., getting fit, losing weight, gaining muscle).
4. **Equipment**: List the equipment you have access to (e.g., nothing available, basic equipment, full gym).
5. **Experience**: Specify your fitness experience level (e.g., beginner, intermediate, advanced).
6. **Injuries**: Mention any injuries or physical limitations.
7. **Bar**: Indicate if a bar is available for exercises.

#### For Generating a Recipe:
1. **Ingredients**: List the ingredients you have available, separated by commas (e.g., tomato, onion, chicken).
`;

function App() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [goal, setGoal] = useState("");
  const [equipment, setEquipment] = useState("");
  const [experience, setExperience] = useState("");
  const [injuries, setInjuries] = useState("");
  const [bar, setBar] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [workoutData, setWorkoutData] = useState(null);
  const [recipeData, setRecipeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle login
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      setError(null);
    } catch (error) {
      setError("Failed to log in: " + error.message);
    }
  };

  // Handle signup
  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      setError(null);
    } catch (error) {
      setError("Failed to sign up: " + error.message);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      setError("Failed to log out: " + error.message);
    }
  };

  const generateFitnessPlan = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://fitness-generator.onrender.com/generate-fitness-plan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            age: parseInt(age),
            gender,
            goal,
            equipment,
            experience,
            injuries,
            bar,
          }),
        }
      );

      const data = await response.json();
      setWorkoutData(data.workoutPlan);
    } catch (error) {
      setError("Failed to generate fitness plan");
    } finally {
      setLoading(false);
    }
  };

  const generateRecipe = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://fitness-generator.onrender.com/generate-recipe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ingredients: ingredients.split(",").map((item) => item.trim()),
          }),
        }
      );

      const data = await response.json();
      setRecipeData(data.recipe);
    } catch (error) {
      setError("Failed to generate recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Health and Fitness Plan Generator</h1>
      </header>

      {user ? (
        <div>
          <h2>Welcome, {user.email.split("@")[0]}</h2>
          <button onClick={handleLogout} className="button">
            Logout
          </button>

          <div className="container">
            <div className="form">
              <h2>Fitness Plan</h2>
              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <input
                type="text"
                placeholder="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
              <input
                type="text"
                placeholder="Elaborate your fitness goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
              <input
                type="text"
                placeholder="Do you have any equipment?"
                value={equipment}
                onChange={(e) => setEquipment(e.target.value)}
              />
              <input
                type="text"
                placeholder="Experience, elaborate if possible"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
              <input
                type="text"
                placeholder="Injuries... if any, explain"
                value={injuries}
                onChange={(e) => setInjuries(e.target.value)}
              />
              <input
                type="text"
                placeholder="Do you have a bar available?"
                value={bar}
                onChange={(e) => setBar(e.target.value)}
              />
              <button onClick={generateFitnessPlan}>
                Generate Fitness Plan
              </button>
            </div>
            <div className="form">
              <h2>Generate Recipe from Available Ingredients</h2>
              <input
                type="text"
                placeholder="Ingredients (comma-separated)"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
              <button onClick={generateRecipe}>Generate Recipe</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-center">
          <div className="loginform">
            <input
              style={{ padding: 10, width: 300, borderRadius: 5 }}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              style={{ padding: 10, width: 300, borderRadius: 5 }}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div style={{ display: "flex", gap: 15, marginTop: 10 }}>
              <button className="button" onClick={handleLogin}>
                Login
              </button>
              <button className="button" onClick={handleSignup}>
                Signup
              </button>
            </div>
            {error && alert(error)}
          </div>
        </div>
      )}
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {workoutData && (
        <div className="output">
          <h2>Workout Plan</h2>
          <ReactMarkdown>{workoutData}</ReactMarkdown>
        </div>
      )}
      {recipeData && (
        <div className="output">
          <h2>Recipe</h2>
          <ReactMarkdown>{recipeData}</ReactMarkdown>
        </div>
      )}
      {!workoutData && !recipeData && (
        <div className="output">
          <ReactMarkdown>{instructions}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default App;
