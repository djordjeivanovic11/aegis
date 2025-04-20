'use client';

import React from 'react';
import { FaExternalLinkAlt, FaQuestionCircle } from 'react-icons/fa';
import Checklist from '../checklist/Checklist';
import { ExternalLink } from 'lucide-react';

interface PatientQuestionsProps {
}

const PatientQuestions: React.FC<PatientQuestionsProps> = ({ }) => (
    <section className="bg-card border border-default rounded-md p-4 shadow-sm h-full flex-1">
        <div className="flex justify-between items-center mb-4">
            <h4 className="flex items-center gap-2 text-lg font-semibold text-primary">
                <FaQuestionCircle /> Patient Questions
            </h4>
            <a
                href={'#'}
                download
                className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition"
            >
                <ExternalLink className="h-5 w-5" />
                Open in popup
            </a>
        </div>
        <Checklist />
    </section>
);

export default PatientQuestions;