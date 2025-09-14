# Smart Cultural Storyteller

An interactive app that generates culturally nuanced visual stories for Indian folk tales, based on the Kahani research paper.

## ⚙️ Setup Instructions

### Backend
1. Create a free account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Set up a cluster and create a `.env` file:
   ```
   OPENAI_API_KEY=your-openai-api-key
   T2I_API_URL=https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0
   T2I_API_TOKEN=your-huggingface-token
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/culturalStories
   ```
3. Deploy the backend to [Render.com](https://render.com/).
4. Use `npm start` to run locally.

### Frontend
1. Update `App.js` to point to your deployed backend URL.
2. Deploy the frontend to [Vercel](https://vercel.com/).
3. Use `npm start` to run locally.

## 🚀 Usage
- Visit your frontend URL.
- Enter a story prompt (e.g., "A girl exploring Kerala backwaters finding an ancient boat").
- See the generated story and culturally accurate illustrations.