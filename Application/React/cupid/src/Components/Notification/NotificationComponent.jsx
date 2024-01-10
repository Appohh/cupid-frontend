import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import { Context } from '../../App.jsx';
import { useContext } from 'react'

const NotificationComponent = () => {
    const [messagesReceived, setMessagesReceived] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    const { loggedUser, sendNotification, setSendNotification } = useContext(Context);

    useEffect(() => {
        const stompClient = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        stompClient.onConnect = () => {
            console.log('Connected!', `/user/${loggedUser.id}/chat`);
            stompClient.subscribe(`/user/${loggedUser.id}/chat`, (data) => {
                onMessageReceived(data);
            });
        };

        stompClient.onStompError = (frame) => {
            console.error('Broker reported error: ', frame.headers['message']);
        };

        stompClient.activate();

        setStompClient(stompClient);

        return () => {
            if (stompClient && stompClient.connected) {
                stompClient.deactivate();
            }
        };
    }, []);

    useEffect(() => {
        console.log("sendNotification", sendNotification);
        if (sendNotification && sendNotification.receiverId && sendNotification.text) {
            onSendMessage(sendNotification.text, sendNotification.receiverId);
            console.log("sendNotification1", sendNotification);
        } else {
            return;
        }

        setSendNotification({
            receiverId: null,
            message: '',
        });
        

    }, [sendNotification, setSendNotification]);



    const onSendMessage = (newMessage, receiverId) => {
        const payload = {
            senderId: loggedUser.id,
            receiverId: receiverId,
            text: newMessage
        };
        console.log('Published!', `/user/${payload.receiverId}/chat`, payload)
        stompClient.publish({
            destination: `/user/${payload.receiverId}/chat`,
            body: JSON.stringify(payload)
        });
    };

    const onMessageReceived = (data) => {
        const message = JSON.parse(data.body);
        console.log('Received!', message.text);
        setMessagesReceived(messagesReceived => [...messagesReceived, { senderId: message.senderId, receiverId: message.receiverId, content: message.text, timestamp: new Date().toISOString() }]);
        console.log("messagesReceived", messagesReceived);
    };

    const handleDisconnect = () => {
        if (stompClient && stompClient.connected) {
            stompClient.deactivate();
        }
        onClose();
    };




    return (
        <></>
    );
};

export default NotificationComponent;