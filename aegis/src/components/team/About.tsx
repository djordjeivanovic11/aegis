"use client";

import React from "react";

const AboutComponent: React.FC = () => {
    return (
        <section className="bg-background text-foreground px-4 sm:px-6 py-20 sm:py-24 text-center">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-wide text-primary mb-6 sm:mb-8">
                    About AEGIS
                </h1>
                <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-4">
                    AEGIS is a clinical documentation assistant built to support healthcare providers
                    in real time. It transcribes patient conversations locally and uses AI to generate
                    accurate summaries and care plans—instantly and securely.
                </p>
                <p className="text-sm sm:text-md md:text-lg text-muted leading-relaxed mb-8 sm:mb-10">
                    Designed for modern clinical workflows, AEGIS reduces administrative burden and
                    improves continuity of care, giving providers more time to focus on what matters most.
                </p>
                <button className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition">
                    Learn More
                </button>
            </div>
        </section>
    );
};

export default AboutComponent;
