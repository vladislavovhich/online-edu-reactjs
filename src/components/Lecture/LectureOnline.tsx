import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { Api } from "../../api/api";
import { Constants } from "../../constants/constants";
import { LectureMessage, User as UserType } from "../../types/auth.types";
import { User } from "../User/User";
import { setLecture } from "../../store/slices/lecture-edit.slice";
import { useParams } from "react-router";
import { TextField } from "@mui/material";

export const LectureOnline = () => {
    const { lecture } = useSelector((state: RootState) => state.lectureEdit);
    const dispatch = useDispatch<AppDispatch>();
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const remoteRef = useRef<HTMLImageElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);

    const [started, setStarted] = useState<boolean>(false);
    const [broadcast, setBroadcast] = useState<boolean>(false);
    const [users, setUsers] = useState<UserType[]>([]);
    const [messages, setMessages] = useState<LectureMessage[]>([]);
    const [messageText, setMessageText] = useState<string>("");

    const { user } = useSelector((state: RootState) => state.auth);
    const params = useParams<{ lectureId: string }>();
    const lectureId = params.lectureId ? parseInt(params.lectureId) : null;

    useEffect(() => {
        if (!user) {
            return;
        }

        let timeListen = 100;

        if (user.role === "MENTOR") {
            timeListen = 1500;
        }

        const startListening = async () => {
            try {
                const response = await fetch(
                    `${Constants.apiUrl}/media/${lectureId}`
                );
                const json = await response.json();

                const ms = json.messages;

                ms.reverse();

                setMessages(ms);
                setUsers(json.students);

                if (remoteRef.current && user.role === "STUDENT") {
                    remoteRef.current.src = json.video;
                }

                setTimeout(startListening, timeListen);
            } catch (e) {}
        };

        startListening();
    }, []);

    useEffect(() => {
        if (!user) {
            return;
        }

        if (!canvasRef.current || !lectureId) {
            return;
        }

        if (!broadcast) {
            return;
        }

        if (user.role === "MENTOR" && (!started || !broadcast)) {
            return;
        }

        const startSending = async () => {
            if (!canvasRef.current || !videoRef.current) {
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
                await fetch(`${Constants.apiUrl}/media/${lectureId}/videos`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ video: imageData }),
                });

                setTimeout(startSending, 100);
            } catch (e) {}
        };

        startSending();
    }, [broadcast]);

    useEffect(() => {
        if (!user || !lectureId || user.role !== "STUDENT") {
            return;
        }

        const handle = async () => {
            await fetch(`${Constants.apiUrl}/media/${lectureId}/users`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user }),
            });
        };

        handle();
    }, []);

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
                    width: 1080,
                    height: 720,
                    frameRate: 20,
                },
                audio: false,
            });

            videoRef.current.srcObject = stream;

            setStarted(true);
            setStream(stream);
        } catch (e) {}
    };

    const onClickSendMessage = async () => {
        if (!lectureId) {
            return;
        }

        if (!messageText.trim()) {
            window.alert("Сообщение не может быть пустым!");
            return;
        }

        try {
            setMessageText("");
            await fetch(`${Constants.apiUrl}/media/${lectureId}/messages`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: messageText, user }),
            });
        } catch (e) {}
    };

    return (
        <div>
            <div>
                <div className="d-flex flex-column">
                    <div className="d-flex flex-row">
                        {user && user.role === "MENTOR" ? (
                            <div className="d-flex flex-column flex-grow-1">
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
                            </div>
                        ) : (
                            <div className="d-flex flex-column">
                                <h2>Экран преподавателя</h2>
                                <img
                                    ref={remoteRef}
                                    alt="sd"
                                    width="720"
                                    height="480"
                                />
                                <canvas hidden ref={canvasRef} />
                            </div>
                        )}
                        <div className="d-flex flex-column flex-grow-0 ms-3 students">
                            <div>Студенты на лекции:</div>

                            <hr />

                            {users.map((user) => (
                                <User
                                    {...user}
                                    userAuthorized={null}
                                    avatarSize={40}
                                    key={user.id}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="d-flex flex-column">
                        <div className="d-flex flex-row mt-3">
                            <TextField
                                type={"text"}
                                label={"Текст сообщения"}
                                variant="outlined"
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                size="small"
                                className="col-10"
                            />

                            <input
                                type="button"
                                className="btn btn-primary flex-grow-1 ms-2"
                                value="Отправить"
                                onClick={onClickSendMessage}
                            />
                        </div>

                        <hr />

                        <div className="d-flex flex-column lecture-messages">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className="d-flex flex-column bordered border py-3 px-4 mt-3"
                                >
                                    <User
                                        {...message.user}
                                        userAuthorized={null}
                                        avatarSize={30}
                                    />

                                    <hr />

                                    <div>{message.text}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <canvas ref={canvasRef} style={{ display: "none" }} />{" "}
            </div>
        </div>
    );
};
