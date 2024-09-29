import React, { useState } from "react";
import ConvertApi from "convertapi-js";
import { useNavigate } from "react-router-dom";

const Resume = () => {
    const navigate = useNavigate(); // useNavigate hook for navigation
    const [loading, setLoading] = useState(false);

    const handlePDFUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setLoading(true);
            let convertApi = ConvertApi.auth(
                `${process.env.REACT_APP_API_CONVERTAPI_KEY}`
            );
            let params = convertApi.createParams();
            params.add("file", file);
            try {
                let result = await convertApi.convert("pdf", "txt", params);

                if (result && result.dto && result.dto.Files.length > 0) {
                    // Fetch the converted file's content (text)
                    const text = await fetch(result.dto.Files[0].Url).then(
                        (res) => res.text()
                    );
                    console.log("Converted text:", text);

                    // Send the extracted text to the backend
                    const backendResponse = await fetch(
                        "http://localhost:8000/perplexity",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ query: text }),
                        }
                    ).then((res) => res.json());

                    console.log("Backend response:", backendResponse);

                    // Navigate to the Categories page with job roles and resume text as state
                    navigate("/categories", {
                        state: {
                            jobRoles: backendResponse.job_roles,
                            resumeText: text, // Pass the resume text
                        },
                    });
                } else {
                    console.error("No files returned from conversion");
                }
            } catch (error) {
                console.error("Error during the conversion process:", error);
            } finally {
                setLoading(false); // Stop the loading state
            }
        }
    };

    return (
        <div>
            <h1>Upload Resume</h1>
            <input type="file" accept=".pdf" onChange={handlePDFUpload} />
            {loading && <p>Processing your resume...</p>}{" "}
            {/* Loading indicator */}
        </div>
    );
};

export default Resume;
