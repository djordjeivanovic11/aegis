'use client';

import React, { useRef, useState } from 'react';
import { FaPlay, FaStop, FaSpinner } from 'react-icons/fa';
import transcriptService from '@/services/transcript';

export default function SessionControls() {
    const [sessionStatus, setSessionStatus] = useState<
        'idle' | 'recording' | 'processing' | 'completed'
    >('idle');

    const [transcript, setTranscript] = useState('');
    const [summary, setSummary] = useState('');
    const [soapNote, setSoapNote] = useState('');
    const [takeaways, setTakeaways] = useState<string[]>([]);

    const patient = {
        patientId: 'bdc15d67-2237-4365-a54c-22a6b801609b',
    };

    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const wsRef = useRef<WebSocket | null>(null);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const ws = new WebSocket(
            `ws://localhost:8000/ws/transcribe/${patient.patientId}`
        );
        wsRef.current = ws;

        ws.onopen = () => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.start(1000);

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0 && ws.readyState === WebSocket.OPEN) {
                    ws.send(e.data);
                }
            };
            mediaRecorder.onstop = () =>
                stream.getTracks().forEach((t) => t.stop());

            setIsRecording(true);
            setSessionStatus('recording');
        };

        ws.onerror = (err) => console.error('WebSocket error', err);
    };

    const processTranscript = async () => {
        setSessionStatus('processing');
        try {
            // 1️⃣ Poll until transcript is available
            let rawText = '';
            for (let i = 0; i < 15; i++) {
                const visit = await transcriptService.getTranscript(
                    patient.patientId
                );
                if (visit.transcript?.trim()) {
                    rawText = visit.transcript;
                    break;
                }
                await new Promise((r) => setTimeout(r, 2000));
            }
            setTranscript(rawText || '— no transcript received —');

            // 2️⃣ WAIT exactly 60 seconds before requesting summary
            await new Promise((r) => setTimeout(r, 60_000));

            // 3️⃣ Fetch AI summary
            const sumResp = await transcriptService.getSummary(
                patient.patientId
            );
            setSummary(sumResp.content);

            // 4️⃣ Fetch SOAP note
            const soapResp = await transcriptService.getSoap(
                patient.patientId
            );
            setSoapNote(soapResp.content);

            // 5️⃣ Fetch follow‑up checklist
            const fuResp = await transcriptService.getFollowup(
                patient.patientId
            );
            setTakeaways(
                fuResp.content
                    .split('\n')
                    .map((l) => l.trim())
                    .filter((l) => l)
            );
        } catch (err) {
            console.error(err);
            setTranscript('Error fetching transcript.');
            setSummary('Error fetching summary.');
            setSoapNote('Error fetching SOAP note.');
            setTakeaways([]);
        }
        setSessionStatus('completed');
    };

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
        wsRef.current?.close();
        setIsRecording(false);
        processTranscript();
    };

    return (
        <div className="flex flex-col items-center space-y-6 p-6">
            {/* Status Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium">
                {sessionStatus === 'idle' && (
                    <span className="bg-gray-100 text-gray-700">No Session</span>
                )}
                {sessionStatus === 'recording' && (
                    <span className="bg-red-100 text-red-700">
            <FaStop className="inline mr-1" />
            Recording…
          </span>
                )}
                {sessionStatus === 'processing' && (
                    <span className="bg-yellow-100 text-yellow-700 animate-pulse">
            <FaSpinner className="inline mr-1 animate-spin" />
            Processing…
          </span>
                )}
                {sessionStatus === 'completed' && (
                    <span className="bg-green-100 text-green-700">Done</span>
                )}
            </div>

            {/* Controls */}
            <div className="flex space-x-4">
                <button
                    onClick={startRecording}
                    disabled={isRecording}
                    className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full disabled:opacity-50"
                >
                    <FaPlay /> Start
                </button>
                <button
                    onClick={stopRecording}
                    disabled={!isRecording}
                    className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full disabled:opacity-50"
                >
                    <FaStop /> Stop
                </button>
            </div>

            {/*/!* Results *!/*/}
            {/*{sessionStatus === 'completed' && (*/}
            {/*    <div className="w-full max-w-xl bg-white p-4 rounded-lg shadow space-y-4">*/}
            {/*        <section>*/}
            {/*            <h3 className="font-semibold">Transcript</h3>*/}
            {/*            <pre className="whitespace-pre-wrap text-sm">{transcript}</pre>*/}
            {/*        </section>*/}

            {/*        <section>*/}
            {/*            <h3 className="font-semibold">Summary</h3>*/}
            {/*            <p className="text-sm whitespace-pre-wrap">{summary}</p>*/}
            {/*        </section>*/}

            {/*        <section>*/}
            {/*            <h3 className="font-semibold">SOAP Note</h3>*/}
            {/*            <p className="text-sm whitespace-pre-wrap">{soapNote}</p>*/}
            {/*        </section>*/}

            {/*        {takeaways.length > 0 && (*/}
            {/*            <section>*/}
            {/*                <h3 className="font-semibold">Follow‑Up Checklist</h3>*/}
            {/*                <ul className="list-disc list-inside text-sm">*/}
            {/*                    {takeaways.map((t, i) => (*/}
            {/*                        <li key={i}>{t}</li>*/}
            {/*                    ))}*/}
            {/*                </ul>*/}
            {/*            </section>*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
}
