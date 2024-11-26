import React, { useEffect, useRef, useState } from "react";
import { useWebSocketContext } from "./common/WebSocketProvider";

export const WsTest = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const remoteRef = useRef<HTMLImageElement>(null);
    const { lastMessage, sendMessage, readyState } = useWebSocketContext();
    const [message, setMessage] = useState<string>("");
    const [sourceBuffer, setSourceBuffer] = useState<SourceBuffer | null>(null);
    const [received, setReceived] = useState<Uint8Array[]>([]);
    const [started, setStarted] = useState<boolean>(false);

    const enableCamera = async () => {
        if (!videoRef.current || !remoteRef.current) {
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    width: 480,
                    height: 480,
                    frameRate: 15,
                },
                audio: false,
            });

            videoRef.current.srcObject = stream;

            const mediaSource = new MediaSource();

            remoteRef.current.src = URL.createObjectURL(mediaSource);

            setStarted(true);
        } catch (e) {}
    };

    setInterval(async () => {
        if (!canvasRef.current || !remoteRef.current || !videoRef.current) {
            return;
        }

        if (!started) {
            return;
        }

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context?.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = canvas.toDataURL("image/png");

        try {
            const response = await fetch("http://localhost:8080/video", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ img: imageData }),
            });

            const json = await response.json();

            remoteRef.current.src = json.img;
        } catch (e) {}
    }, 100);

    return (
        <div>
            <h2>Доступ к камере</h2>
            <div>
                <h2>Локальное видео с камеры</h2>
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    width="360"
                    height="360"
                />
                <canvas ref={canvasRef} style={{ display: "none" }} />{" "}
                <h2>Удаленное видео (эмуляция)</h2>
                <img ref={remoteRef} alt="sd" width="360" height="360" />
                <canvas hidden ref={canvasRef} />
                <button onClick={() => enableCamera()}>Start</button>
            </div>
        </div>
    );
};
