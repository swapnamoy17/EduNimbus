import React, { createContext, useState, useEffect } from 'react';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [websocket, setWebSocket] = useState(null);
    const [userId, setUserId] = useState(null);

    const connectWebSocket = () => {
        console.log("inside connect ws");
        if (websocket) {
            websocket.close();
        }

        const ws = new WebSocket(process.env.REACT_APP_NOTIFY_GATEWAY_ENDPOINT);
        ws.onopen = () => {
            console.log('WebSocket connection opened.');
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ action: "store", userId: userId }));
            }
        };
        ws.onmessage = (event) => {
            console.log('Message from server:', event.data);
            const data = JSON.parse(event.data);
            alert('Video has been successfully uploaded!');
        };
        ws.onerror = error => {
            console.error('WebSocket error:', error);
            // Implementing a basic retry logic with delay
            // setTimeout(() => {
            //     connectWebSocket();
            // }, 5000);  // Retry every 5 seconds
        };
        ws.onclose = event => {
            console.log('WebSocket closed', event);
            if (!event.wasClean) {
                console.log('Reconnecting WebSocket...');
                // setTimeout(() => {
                //     connectWebSocket();
                // }, 5000); // Retry every 5 seconds
            }
        };
        setWebSocket(ws);
    };

    const disconnectWebSocket = () => {
        console.log("inside disconnect ws");
        if (websocket) {
            websocket.close();
            setWebSocket(null);
        }
    };

    useEffect(() => {
        console.log("inside use effect webs....userId: ", userId);
        if (userId) {
            connectWebSocket();
        } else {
            disconnectWebSocket();
        }

        return () => {
            disconnectWebSocket();
        };
    }, [userId]);

    return (
        <WebSocketContext.Provider value={{ setUserId, disconnectWebSocket }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export default WebSocketContext;
