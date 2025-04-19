'use client';

import React from "react";
import TeamGrid from "@/components/team/TeamGrid";
import About from "@/components/team/About";

export default function TeamPage() {
    return (
        <div className="bg-background text-foreground">
            <About />
            <TeamGrid />
        </div>
    );
}
