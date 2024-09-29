import cors from "cors";
import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const PORT = 8000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route for Perplexity API call
app.post("/perplexity", async (req, res) => {
    console.log("Fetching data from Perplexity API...");
    try {
        const resumeText = req.body.query; // Extract the resume text from the request body

        const options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
                "Content-Type": "application/json",
            },
            data: {
                model: "llama-3.1-sonar-small-128k-online",
                messages: [
                    {
                        role: "system",
                        content:
                            'You are given the resume of a person. Your task is to analyze the resume and suggest three job roles that fit according to the person’s experience and skills. You should be precise and concise and only return the job roles without other details. Your response should be in JSON format with the following structure:```json\n{"job_roles": ["job_role1", "job_role2", "job_role3"]}```',
                    },
                    { role: "user", content: resumeText },
                ],
                max_tokens: 2000,
                temperature: 0.2,
                top_p: 0.9,
                return_citations: false,
                search_domain_filter: ["perplexity.ai"],
                return_images: false,
                return_related_questions: false,
                search_recency_filter: "month",
                top_k: 0,
                stream: false,
                presence_penalty: 0,
                frequency_penalty: 1,
            },
        };

        // Fetch data from Perplexity API using axios
        const response = await axios.post(
            "https://api.perplexity.ai/chat/completions",
            options.data,
            {
                headers: options.headers,
            }
        );

        // Extract the message content
        const responseMessage = response.data.choices[0].message;
        console.log("Raw responseText:", responseMessage);

        // Extract the JSON string between the backticks and parse it
        const content = responseMessage.content;

        const match = content.match(/```json\s*([\s\S]*?)\s*```/);
        if (!match || !match[1]) {
            console.error("Failed to parse job roles from response:", content);
            return res
                .status(500)
                .send("Failed to parse job roles from Perplexity response");
        }

        const jsonString = match[1];

        // Parse the JSON string
        const parsedResponse = JSON.parse(jsonString);
        const jobRoles = parsedResponse.job_roles;

        res.json({ job_roles: jobRoles });
    } catch (error) {
        console.error("Error fetching data from Perplexity API:", error);
        res.status(500).send("Error processing the Perplexity API request");
    }
});

// New route for getting job listings based on selected category
app.post("/jobs", async (req, res) => {
    console.log("Fetching job listings from Perplexity API...");
    try {
        const { resumeText, category } = req.body;

        const options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
                "Content-Type": "application/json",
            },
            data: {
                model: "llama-3.1-sonar-small-128k-online",
                messages: [
                    {
                        role: "system",
                        content: `
You are an assistant that provides job listings that he can apply for in JSON format based on a person's resume.

Instructions:
- Find the top 3 upcoming job openings, vacancies, or internship opportunities around US and Europe in big tech companies like google apple meta nvidia github etc.. Be diverse. that fit the person's experience and skills and match the given potential role.
- Your response **must be in JSON format only**, with no additional text or explanations.
- The JSON should have the following structure:

\`\`\`json
{
  "jobs": [
    {
      "position": "position_name1",
      "company": "company_name1"
      "location": "location_name1"
    },
    {
      "position": "position_name2",
      "company": "company_name2"
    "location": "location_name2"
    },
    {
      "position": "position_name3",
      "company": "company_name3"
        "location": "location_name3"
    }
  ]
}
\`\`\`
`,
                    },
                    {
                        role: "user",
                        content: `
Resume:
${resumeText}

Potential Role:
${category}
`,
                    },
                ],

                max_tokens: 2000,
                temperature: 0.2,
                top_p: 0.9,
                return_citations: false,
                search_domain_filter: ["perplexity.ai"],
                return_images: false,
                return_related_questions: false,
                search_recency_filter: "month",
                top_k: 0,
                stream: false,
                presence_penalty: 0,
                frequency_penalty: 1,
            },
        };

        // Fetch data from Perplexity API using axios
        const response = await axios.post(
            "https://api.perplexity.ai/chat/completions",
            options.data,
            {
                headers: options.headers,
            }
        );

        // Extract the message content
        const responseMessage = response.data.choices[0].message;
        console.log("Raw responseText:", responseMessage);

        // Extract the JSON string between the backticks and parse it
        const content = responseMessage.content;

        const match = content.match(/```json\s*([\s\S]*?)\s*```/);
        if (!match || !match[1]) {
            console.error("Failed to parse jobs from response:", content);
            return res
                .status(500)
                .send("Failed to parse jobs from Perplexity response");
        }

        const jsonString = match[1];

        // Parse the JSON string
        const parsedResponse = JSON.parse(jsonString);
        const jobs = parsedResponse.jobs;

        res.json({ jobs });
    } catch (error) {
        console.error("Error fetching data from Perplexity API:", error);
        res.status(500).send("Error processing the Perplexity API request");
    }
});

// New route for getting suggestions and cover letter
app.post("/result", async (req, res) => {
    console.log("Fetching job details from Perplexity API...");
    try {
        const { job, resumeText } = req.body;

        const options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
                "Content-Type": "application/json",
            },
            data: {
                model: "llama-3.1-sonar-small-128k-online",
                messages: [
                    {
                        role: "system",
                        content: `
You are an assistant that provides two pieces of information in JSON format based on a person's resume and a selected job:

1. Suggestions on how the person can improve their resume to better fit the selected job.
2. A cover letter tailored for the person to apply for the selected job.

Instructions:

- Analyze the provided resume and job details.
- Your response **must be in JSON format only**, with no additional text or explanations.
- The JSON should have the following structure:

\`\`\`json
{
  "suggestions": "Your suggestions here.",
  "coverLetter": "Your cover letter here."
}
\`\`\`
`,
                    },
                    {
                        role: "user",
                        content: `
Resume:
${resumeText}

Job Details:
Position: ${job.position}
Company: ${job.company}
${job.location ? `Location: ${job.location}` : ""}
`,
                    },
                ],
                max_tokens: 2000,
                temperature: 0.2,
                top_p: 0.9,
                return_citations: false,
                search_domain_filter: ["perplexity.ai"],
                return_images: false,
                return_related_questions: false,
                search_recency_filter: "month",
                top_k: 0,
                stream: false,
                presence_penalty: 0,
                frequency_penalty: 1,
            },
        };

        // Fetch data from Perplexity API using axios
        const response = await axios.post(
            "https://api.perplexity.ai/chat/completions",
            options.data,
            {
                headers: options.headers,
            }
        );

        // Extract the message content
        const responseMessage = response.data.choices[0].message;
        console.log("Raw responseText:", responseMessage);

        // Extract the JSON string between the backticks and parse it
        const content = responseMessage.content;

        const match = content.match(/```json\s*([\s\S]*?)\s*```/);
        if (!match || !match[1]) {
            console.error(
                "Failed to parse job details from response:",
                content
            );
            return res
                .status(500)
                .send("Failed to parse job details from Perplexity response");
        }

        const jsonString = match[1];

        // Parse the JSON string
        const parsedResponse = JSON.parse(jsonString);
        const { suggestions, coverLetter } = parsedResponse;

        res.json({ suggestions, coverLetter });
    } catch (error) {
        console.error("Error fetching data from Perplexity API:", error);
        res.status(500).send("Error processing the Perplexity API request");
    }
});

// Run the server locally
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
