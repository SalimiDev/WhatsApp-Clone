import { CircularProgress } from '@material-ui/core';
import styles from './ChatMessages.module.css';
import AudioPlayer from './AudioPlayer';

const ChatMessages = ({ messages, user, roomId }) => {
    if (!messages) return null;
    return messages.map(message => {
        const isSender = message.uid === user.uid;

        return (
            <div key={message.id} className={`${styles.chat__message} ${isSender ? styles.chat__messageSender : ''}`}>
                <span className={styles.chat__name}>{message.name}</span>

                {message.imageUrl === 'uploading' ? (
                    <div className={styles.imageContainer}>
                        <div className={styles.image__containerLoader}>
                            <CircularProgress
                                style={{
                                    width: 40,
                                    height: 40,
                                }}
                            />
                        </div>
                    </div>
                ) : message.imageUrl ? (
                    <div className={styles.imageContainer}>
                        <img src={message.imageUrl} alt={message.name} />
                    </div>
                ) : null}

                <span className={styles.chat__timestamp}>{message.time}</span>
                {message.audioName ? (
                    <AudioPlayer
                        sender={isSender}
                        roomId={roomId}
                        id={message.id}
                        audioUrl={message.audioUrl}
                    />
                ) : (
                    <span className={styles.chat__messageMessage}>{message.message}</span>
                )}
            </div>
        );
    });
};
export default ChatMessages;
