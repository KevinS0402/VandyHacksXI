import { css } from "@emotion/css";
import { Center, Text, Title } from "@mantine/core";
import React from "react";
import { useLocation } from "react-router-dom";
import JobCard from "../components/JobCard";

function Jobs() {
    const location = useLocation();
    const { jobs, resumeText } = location.state || { jobs: [], resumeText: "" };

    return (
        <div>
            <Title order={1} mx="80" ta="center">
                Here are some jobs in the category you requested
            </Title>
            <Title order={1} mx="80" ta="center">
                Pick your favorite one!
            </Title>

            <br />

            {jobs.length > 0 ? (
                jobs.map((job, index) => (
                    <React.Fragment key={index}>
                        <Center>
                            <JobCard job={job} resumeText={resumeText} />
                        </Center>
                        <br />
                    </React.Fragment>
                ))
            ) : (
                <Center>
                    <Text size="40" fw={700} mx="90" c="black">
                        No job listings found.
                    </Text>
                </Center>
            )}
        </div>
    );
}

export default Jobs;
