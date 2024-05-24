const ChatHeader = ({onClose}) => {
    return(
        <div className="chat-header">
            <h2>Chat</h2>
            <button onClick={onClose} className="close-button">X</button>
        </div>
    )
}
export default ChatHeader;