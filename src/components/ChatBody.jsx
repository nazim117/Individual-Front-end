const ChatBody = ({messagesReceived, currentUser}) => {
    return(
        <div className="chat-body">
                <ul>
                    {messagesReceived.map((msg, index) => (
                        <li key={index} className={msg.from === currentUser ? 'sent' : 'received'}>
                            {msg.text}
                        </li>
                    ))}
                </ul>
            </div>
    )
}

export default ChatBody;