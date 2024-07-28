import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const App = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [goal, setGoal] = useState("");
  const [equipment, setEquipment] = useState("");
  const [experience, setExperience] = useState("");
  const [injuries, setInjuries] = useState("");
  const [bar, setBar] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [fitnessPlan, setFitnessPlan] = useState("");
  const [recipe, setRecipe] = useState("");

  const handleFitnessPlanSubmit = async () => {
    try {
      const response = await axios.post(
        "https://fitness-generator.onrender.com/generate-fitness-plan",
        {
          age,
          gender,
          goal,
          equipment,
          experience,
          injuries,
          bar,
        }
      );
      setFitnessPlan(response.data.workoutPlan);
    } catch (error) {
      console.error("Error generating fitness plan:", error);
    }
  };

  const handleRecipeSubmit = async () => {
    try {
      const response = await axios.post(
        "https://fitness-generator.onrender.com/generate-recipe",
        {
          ingredients: ingredients.split(","),
        }
      );
      setRecipe(response.data.recipe);
    } catch (error) {
      console.error("Error generating recipe:", error);
    }
  };

  return (
    <div>
      <h1>Health and Fitness App</h1>

      <div>
        <h2>Generate Fitness Plan</h2>
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
          placeholder="Goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <input
          type="text"
          placeholder="Equipment"
          value={equipment}
          onChange={(e) => setEquipment(e.target.value)}
        />
        <input
          type="text"
          placeholder="Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
        <input
          type="text"
          placeholder="Injuries"
          value={injuries}
          onChange={(e) => setInjuries(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bar Availability"
          value={bar}
          onChange={(e) => setBar(e.target.value)}
        />
        <button onClick={handleFitnessPlanSubmit}>Generate Fitness Plan</button>
      </div>

      {fitnessPlan && (
        <div>
          <h3>Fitness Plan</h3>
          <ReactMarkdown>{fitnessPlan}</ReactMarkdown>
        </div>
      )}

      <div>
        <h2>Generate Recipe</h2>
        <input
          type="text"
          placeholder="Ingredients (comma separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <button onClick={handleRecipeSubmit}>Generate Recipe</button>
      </div>

      {recipe && (
        <div>
          <h3>Recipe</h3>
          <ReactMarkdown>{recipe}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default App;
