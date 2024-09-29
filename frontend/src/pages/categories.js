import React from "react";
import { Button, Center, Title, Text } from "@mantine/core";
import { css } from "@emotion/css";
import { useLocation, useNavigate } from "react-router-dom";

function Categories() {
    const location = useLocation();
    const navigate = useNavigate();
    const { jobRoles, resumeText } = location.state || {
        jobRoles: [],
        resumeText: "",
    };

    const handleCategoryClick = async (category) => {
        try {
            // Send the resumeText and selected category to the backend
            const response = await fetch("http://localhost:8000/jobs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ resumeText, category }),
            });
            const data = await response.json();
            console.log("Jobs data:", data);

            // Navigate to JobListings page with data
            navigate("/jobs", {
                state: { jobs: data.jobs },
            });
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    return (
        <div>
            <h1>
                <Title order={1} mx="80" ta="center">
                    Based on your resume, here are some types of jobs that you'd
                    be a great fit for.
                </Title>
                <Title order={1} mx="80" ta="center">
                    Pick your favorite one!
                </Title>
            </h1>
            <br />

            {jobRoles.length > 0 ? (
                jobRoles.map((category, index) => (
                    <Center key={index}>
                        <Button
                            fullWidth
                            variant="gradient"
                            gradient={{
                                from: "#ffdeeb",
                                to: "#d0bfff",
                                deg: 90,
                            }}
                            mx="80"
                            radius="lg"
                            h="150"
                            className={css`
                                &:hover {
                                    transition: scale 0.4s;
                                    scale: 1.02;
                                }
                                transition: scale 0.3s;
                            `}
                            onClick={() => handleCategoryClick(category)}
                        >
                            <Text
                                size="40"
                                fw={700}
                                mx="90"
                                c="black"
                                className={css`
                                    &:hover {
                                        size: 120;
                                    }
                                `}
                            >
                                {category}
                            </Text>
                        </Button>
                        <br />
                    </Center>
                ))
            ) : (
                <Center>
                    <Text size="40" fw={700} mx="90" c="black">
                        No job roles found.
                    </Text>
                </Center>
            )}
        </div>
    );
}

export default Categories;
