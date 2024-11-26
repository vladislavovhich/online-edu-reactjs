import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { offlineLecture } from "../../store/slices/lecture-edit.slice";

export const LectureOnline = () => {
    const dispatch = useDispatch<AppDispatch>();
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const remoteRef = useRef<HTMLImageElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);

    const [started, setStarted] = useState<boolean>(false);
    const [broadcast, setBroadcast] = useState<boolean>(false);

    const { user } = useSelector((state: RootState) => state.auth);

    if (!user) {
        return null;
    }

    const enableCamera = async () => {
        if (!videoRef.current) {
            return;
        }

        if (stream && started) {
            stream.getTracks().forEach((track) => track.stop());
            setStream(null);
            setStarted(false);
        }

        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    width: 720,
                    height: 480,
                    frameRate: 15,
                },
                audio: false,
            });

            videoRef.current.srcObject = stream;

            setStarted(true);
            setStream(stream);
        } catch (e) {}
    };

    setInterval(async () => {
        if (!canvasRef.current) {
            return;
        }

        if (user.role === "MENTOR" && (!started || !broadcast)) {
            return;
        }

        if (user.role === "MENTOR" && videoRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            context?.drawImage(video, 0, 0, canvas.width, canvas.height);

            const imageData = canvas.toDataURL("image/png");

            try {
                await fetch("http://localhost:8080/video", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ img: imageData }),
                });
            } catch (e) {}
        } else {
            try {
                const response = await fetch("http://localhost:8080/content");
                const json = await response.json();

                if (remoteRef.current) {
                    remoteRef.current.src = json.img;
                }
            } catch (e) {}
        }
    }, 100);

    return (
        <div>
            <div>
                {user && user.role == "MENTOR" ? (
                    <>
                        <div className="d-flex flex-row">
                            <h3>Ваш экран</h3>
                            {started ? (
                                <button
                                    onClick={() => enableCamera()}
                                    className="btn btn-info ms-3"
                                >
                                    Выключить экран
                                </button>
                            ) : (
                                <button
                                    onClick={() => enableCamera()}
                                    className="btn btn-info ms-3"
                                >
                                    Включить экран
                                </button>
                            )}
                            {broadcast ? (
                                <button
                                    onClick={() => enableCamera()}
                                    className="btn btn-info ms-3"
                                >
                                    Закончить трансляцию
                                </button>
                            ) : (
                                <button
                                    onClick={() => setBroadcast(true)}
                                    className="btn btn-info ms-3"
                                >
                                    Начать трансляцию
                                </button>
                            )}
                        </div>
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            width="100%"
                            className="border bg-dark mt-3"
                        />
                    </>
                ) : (
                    <>
                        <h2>Экран преподавателя</h2>
                        <img
                            ref={remoteRef}
                            alt="sd"
                            width="720"
                            height="480"
                        />
                        <canvas hidden ref={canvasRef} />
                    </>
                )}
                <canvas ref={canvasRef} style={{ display: "none" }} />{" "}
            </div>
        </div>
    );
};
