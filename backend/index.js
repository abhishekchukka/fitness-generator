const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 3001;

const API_KEY = "AIzaSyC2Sz-Hxn2dCJaVEWYRH2Xs88XBYn3vjSo";
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(cors());
app.use(express.json());

app.post("/generate-fitness-plan", async (req, res) => {
  const { age, gender, goal, equipment, experience, injuries, bar } = req.body;

  const prompt = `Create a workout plan daywise plan for a week, for a ${age}-year-old ${gender} who wants to ${goal} and has access to ${equipment} with an experience level of a ${experience} , injuries information : ${injuries}, availability of a bar: ${bar}. also attach youtube links for checking out form of each workout`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const workoutPlan = response.text(); // Extract workout plan from response
    res.json({ workoutPlan });
  } catch (error) {
    console.error("Error generating fitness plan:", error);
    res.status(500).json({ error: "Failed to generate fitness plan" });
  }
});

app.post("/generate-recipe", async (req, res) => {
  const { ingredients } = req.body;

  const recipePrompt = `Create a recipe using the following ingredients: ${ingredients.join(
    ", "
  )}. Include instructions and serving size.`;

  try {
    const recipeResult = await model.generateContent(recipePrompt);
    const recipeResponse = await recipeResult.response;
    const recipe = recipeResponse.text();
    res.json({ recipe });
  } catch (error) {
    console.error("Error generating recipe:", error);
    res.status(500).json({ error: "Failed to generate recipe" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
