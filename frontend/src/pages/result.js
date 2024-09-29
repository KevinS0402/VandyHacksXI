import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Title, Text, Loader, Center } from "@mantine/core";

function JobDetails() {
    const location = useLocation();
    const { job, resumeText } = location.state || { job: null, resumeText: "" };

    const [suggestions, setSuggestions] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await fetch("http://localhost:8000/result", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ job, resumeText }),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch job details from backend");
                }

                const data = await response.json();
                console.log("Job details data:", data);

                setSuggestions(data.suggestions);
                setCoverLetter(data.coverLetter);
            } catch (error) {
                console.error("Error fetching job details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [job, resumeText]);

    if (loading) {
        return (
            <Center>
                <Loader size="lg" />
            </Center>
        );
    }

    return (
        <div>
            <Title order={1} mx="80" ta="center">
                {job.position} at {job.company}
            </Title>

            <br />

            <Title order={2} mx="80">
                Suggestions to Improve Your Resume:
            </Title>
            <Text mx="80" mt="md">
                {suggestions}
            </Text>

            <br />

            <Title order={2} mx="80">
                Cover Letter:
            </Title>
            <Text mx="80" mt="md">
                {coverLetter}
            </Text>
        </div>
    );
}

export default JobDetails;
