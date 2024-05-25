import { useEffect, useState } from "react";
import {Client} from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';
import TokenManager from "../API/TokenManager";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

const ChatPopup = ({onClose}) => {
    const claims = TokenManager.getClaimsFromLocalStorage();
    const [input, setInput] = useState('');
    const [stompClient, setStompClient] = useState(null);
    const [messagesReceived, setMessagesReceived] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [currentRecipient, setCurrentRecipient] = useState('customer_service@example.com');

    // send the data using Stomp
    const handleSendMessage = (message) => {
        if(isConnected && stompClient){
            const payload = { 'id': uuidv4(), 'from': claims.sub, 'to': message.to, 'text': message.text };
            stompClient.publish({ destination: `/user/${payload.to}/queue/inboxmessages`, body: JSON.stringify(payload) });
            setMessagesReceived(prevMessages => [...prevMessages, payload]);
        }else{
            console.error('STOMP client is not connected');
        }
    };

    // display the received data
    const onMessageReceived = (data) => {
        const message = JSON.parse(data.body);

        setMessagesReceived(prevMessages => {
            if(!prevMessages.some(msg => msg.id === message.id)){
                return [...prevMessages, message];
            }
            return prevMessages;
        });
        setCurrentRecipient(message.from);
    };

    useEffect(() => {
        if(!claims){
            alert("Login to chat");
            onClose();
            return;
        }

        const setupStompClient = (username) => {
            // stomp client over websockets
            const client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            connectHeaders: {
                Authorization: `Bearer ${TokenManager.getAccessTokenFromLocalStorage()}`,
            },
            debug: (str) => {
                console.log(str);
            }
            });
            
            client.onConnect = () => {
                // subscribe to the backend "private" topic
                client.subscribe(`/user/${username}/queue/inboxmessages`, (data) => {
                    onMessageReceived(data);
                });
            };
    
            setIsConnected(true);
    
            client.onStompError = (frame) => {
                console.error(`Broker reported error: ${frame.headers['message']}`);
                console.error(`Additional details: ${frame.body}`);
            }

            client.onDisconnect = () => {
                setIsConnected(false);
                setStompClient(null);
            }
            
            // initiate client
            client.activate();
            // maintain the client for sending and receiving
            setStompClient(client);
        };

        if(!stompClient){
            setupStompClient(claims.sub)
        }

        return () => {
            if(stompClient){
                stompClient.deactivate();
                setIsConnected(false);
            }
        }
    }, []);

    if(!claims){
        return null;
    }

    return(
        <div className="chat-popup">
            <ChatHeader onClose={onClose}/>
            <ChatBody messagesReceived={messagesReceived} currentUser={claims.sub}/>
            <ChatFooter input={input} setInput={setInput} onSendMessage={handleSendMessage} currentRecipient={currentRecipient}/>
        </div>
    )
}

export default ChatPopup;