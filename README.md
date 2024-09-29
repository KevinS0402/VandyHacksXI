## Motto
_Search higher with SearchHire._

## Inspiration
As students who have navigated the complexities of the recruiting process firsthand, we recognize the difficulties in finding roles that truly align with your skills, crafting personalized cover letters, and pinpointing areas for resume improvement. This experience inspired us to create SearchHire—a platform designed to help users efficiently uncover relevant job opportunities, enhance their resumes, and boost their chances of securing the right position.

## What it does
SearchHire is an innovative web application designed to streamline job discovery by matching users with opportunities that align with their unique skill set. By simply uploading a resume, users trigger an AI-powered parsing system that analyzes their qualifications and feeds the data into a sophisticated search algorithm. This algorithm scours available job listings across the web, identifying the top three categories that best suit the user's experience and expertise. From there, users can refine their search by exploring tailored job recommendations, receive actionable feedback to enhance their resume (such as suggested keywords for optimization), and even generate personalized cover letters that align with specific job descriptions.

## How we built it
The frontend of SearchHire was primarily developed using React, providing a dynamic and responsive user interface, while the backend leverages JavaScript for efficient data processing. For conducting real-time job search queries, we integrated the Perplexity Pro API, which offers up-to-date insights on available job listings across the web. To handle PDF resume parsing, we utilized the "Resume Parser" library in Node.js, allowing us to seamlessly convert uploaded resumes into structured, readable text, which is then analyzed to generate highly relevant search queries tailored to the user's skillset.

## Challenges we ran into
One of our greatest challenges was developing a unique concept that addressed a widespread problem. With our team’s diverse backgrounds and varying levels of technical expertise, we began by brainstorming a wide range of ideas, eventually narrowing it down to three core concepts. Although we were passionate about each one, we soon realized that by integrating key features from all three, we could create a more comprehensive and powerful solution—leading to the development of our final product.

## Accomplishments that we're proud of
One of our most notable achievements was successfully establishing the connection between the frontend and backend, specifically by creating the API calls that send search queries to the Perplexity Pro API and retrieve the corresponding responses. This integration allowed us to efficiently handle and display data from our queries. Another key milestone was fully developing the frontend using React, enabling us to design an interactive and visually appealing interface that makes our platform intuitive and user-friendly.

However, the accomplishment we’re most proud of is the wealth of knowledge we gained throughout the development of SearchHire and the obstacles we overcame along the way. We’re deeply grateful to VandyHacks for organizing this incredible event and to the sponsors who provided us with the valuable resources that helped bring our vision to life.

## What we learned
Through the development of SearchHire and our participation in the hackathon, we gained invaluable insights and skills. We deepened our understanding of React, mastering key concepts like useState and useEffect to manage data changes and build a dynamic, intuitive frontend. Additionally, we learned how to effectively work with the Perplexity Pro API, embedding API calls into our backend to seamlessly send queries and retrieve data from the system. This experience not only strengthened our technical expertise but also enhanced our ability to build a fully integrated and responsive application.

## What's next for SearchHire
Looking ahead, we aim to incorporate additional features that further enhance the user experience during the recruitment process. One of our future goals is to enable users to upload their resumes, have our platform directly make edits, and return a polished PDF ready for submission with job applications. We also plan to introduce personalized accounts, allowing users to save job opportunities, track their progress, and easily return to them at a later time. These improvements will provide a more seamless and tailored experience, helping users navigate their job search with greater ease and efficiency.
