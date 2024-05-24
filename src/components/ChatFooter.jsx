const ChatFooter = ({input, setInput, onSendMessage, currentRecipient}) => {
    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            if (!input.trim()) {
                alert('Please type a message!');
                return;
            }
            onSendMessage({text: input, to: currentRecipient});
            setInput('');
        }
    }

    const handleSendClick = () => {
        if (!input.trim()) {
            alert('Please type a message!');
            return;
        }
        onSendMessage({text: input, to: currentRecipient});
        setInput('');
    }

    return(
        <div className="chat-footer">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <button onClick={handleSendClick}>Send</button>
        </div>
    )
}

export default ChatFooter;