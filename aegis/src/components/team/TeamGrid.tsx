import React from "react";
import MemberCard from "./MemberCard";

const teamMembers = [
    {
        image: "/images/team/dummy1.jpg",
        name: "Alice Johnson",
        expertise: "UX/UI Designer",
        linkedin: "https://www.linkedin.com/in/alice-johnson",
        github: "https://github.com/alice-johnson",
        resume: "/resumes/alice.pdf",
    },
    {
        image: "/images/team/dummy2.jpg",
        name: "Bob Smith",
        expertise: "Backend Developer",
        linkedin: "https://www.linkedin.com/in/bob-smith",
        github: "https://github.com/bob-smith",
        resume: "/resumes/bob.pdf",
    },
    {
        image: "/images/team/dummy3.jpg",
        name: "Charlie Brown",
        expertise: "Project Manager",
        linkedin: "https://www.linkedin.com/in/charlie-brown",
        github: "https://github.com/charlie-brown",
        resume: "/resumes/charlie.pdf",
    },
    {
        image: "/images/team/djordje.jpg",
        name: "Djordje Ivanovic",
        expertise: "Frontend Developer",
        linkedin: "https://www.linkedin.com/in/djordje-ivanovic",
        github: "https://github.com/djordje-ivanovic",
        resume: "/resumes/djordje.pdf",
    },
];

const TeamGrid: React.FC = () => {
    return (
        <section className="py-20 sm:py-24 px-4 sm:px-6 text-center bg-background">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-primary mb-12 sm:mb-16 uppercase tracking-wide">
                    Meet the Team
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 sm:gap-x-12 sm:gap-y-16">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="flex justify-center transition-transform duration-300 hover:scale-[1.02]"
                        >
                            <div className="w-full max-w-[300px] sm:max-w-[320px]">
                                <MemberCard {...member} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamGrid;
