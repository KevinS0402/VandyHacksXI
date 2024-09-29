import React from "react";
import { Flex, Text } from "@mantine/core";
import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job, resumeText }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/result", {
            state: { job, resumeText },
        });
    };

    return (
        <Flex
            w="100%"
            mx="80"
            h="150"
            direction="column"
            onClick={handleClick}
            className={css`
                justify-content: center;
                border-radius: 15px;
                background: linear-gradient(90deg, #ffdeeb, #d0bfff);
                cursor: pointer;
                transition: transform 0.3s;
                &:hover {
                    transform: scale(1.02);
                }
            `}
        >
            <Text
                fw={700}
                mx="90"
                c="black"
                size="30px"
                className={css`
                    transition: font-size 0.3s;
                    &:hover {
                        font-size: 32px;
                    }
                `}
            >
                {job.position}
            </Text>
            <Text
                mx="90"
                c="black"
                size="30px"
                className={css`
                    margin: 8px;
                    transition: font-size 0.3s;
                    &:hover {
                        font-size: 32px;
                    }
                `}
            >
                {job.company}
            </Text>
            {job.location && (
                <Text
                    fs="italic"
                    mx="90"
                    c="black"
                    size="20px"
                    className={css`
                        transition: font-size 0.3s;
                        &:hover {
                            font-size: 22px;
                        }
                    `}
                >
                    {job.location}
                </Text>
            )}
        </Flex>
    );
};

export default JobCard;
