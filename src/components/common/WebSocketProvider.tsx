import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

interface WebSocketProviderProps {
    children: ReactNode;
}

const url = `ws://${process.env.REACT_APP_API_HOST}`;
const WebSocketContext = createContext<any>(null);

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
    children,
}) => {
    const [messageHistory, setMessageHistory] = useState<any[]>([]);
    const [lastMessage, setLastMessage] = useState<string>("");
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [status, setStatus] = useState<"waiting" | "connected" | "error">(
        "waiting"
    );

    const sendMessage = (data: string) => {
        if (!ws) {
            return;
        }

        ws.send(data);
    };

    useEffect(() => {
        if (ws) {
            return;
        }
    }, []);

    return (
        <WebSocketContext.Provider
            value={{ sendMessage, messageHistory, lastMessage }}
        >
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocketContext = () => {
    return useContext(WebSocketContext);
};
