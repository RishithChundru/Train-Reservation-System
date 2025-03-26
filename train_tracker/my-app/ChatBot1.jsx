import React, { useMemo } from "react";
import ChatBot from "react-simple-chatbot";
import { Segment } from "semantic-ui-react";

function ChatBot1() {
    const steps = useMemo(
        () => [
            {
                id: "Greet",
                message: "Hello, Welcome to Mini IRCTC",
                trigger: "Ask Name",
            },
            {
                id: "Ask Name",
                message: "Please enter your name to better communicate with you",
                trigger: "waiting1",
            },
            {
                id: "waiting1",
                user: true,
                trigger: "Name",
            },
            {
                id: "Name",
                message: "Hi {previousValue}, Heartful Welcome to you. If you want to solve your issues, firstly you have to login to CareerBridge. If you have any issue, select below.",
                trigger: "issues",
            },
            {
                id: "issues",
                options: [
                    { value: "Job Openings", label: "Job Openings", trigger: "Job Opening" },
                    { value: "Mock Test", label: "Mock Test", trigger: "Mock Test" },
                    { value: "About Us", label: "About Us", trigger: "About Us" },
                    { value: "Contact Us", label: "Contact Us", trigger: "Contact Us" },
                    { value: "Terms And Conditions", label: "Terms And Conditions", trigger: "Terms And Conditions" },
                    { value: "Bye", label: "No thanks", trigger: "Goodbye" }
                ],
            },
            {
                id: "Job Opening",
                message: "You can view the latest job openings across various domains at the top of the home page after signing in. Explore opportunities in your field and apply directly.",
                trigger: "Ask More",
            },
            {
                id: "Mock Test",
                message: "Our mock tests are available at the top right of the website. We offer practice tests in four programming languages: Java, C, C++, and Python. It's a great way to improve your skills and prepare for real-world challenges.",
                trigger: "Ask More",
            },
            {
                id: "About Us",
                message: "On the 'About Us' page, you can learn more about our mission, our team, and the success stories of students we've helped place in various companies. Check the bottom of the website for this information.",
                trigger: "Ask More",
            },
            {
                id: "Contact Us",
                message: "If you need any assistance or have any queries, feel free to contact us through email. You'll find our contact details at the bottom of the website. We're here to help!",
                trigger: "Ask More",
            },
            {
                id: "Terms And Conditions",
                message: "Please make sure to review our Terms and Conditions. This section outlines the rules and regulations for using our platform and is available at the bottom of the website. It is mandatory to go through it before using our services.",
                trigger: "Ask More",
            },
            {
                id: "Ask More",
                message: "Would you like to ask anything else?",
                trigger: "issues", 
            },
            {
                id: "Goodbye",
                message: "Thank you for visiting Career Bridge! If you need further assistance, don't hesitate to reach out.",
                end: true,
            },
        ],
        [] 
    );

    return (
        <>
            <Segment floated="right">
                <ChatBot steps={steps} />
            </Segment>
        </>
    );
}

export default ChatBot1;