import React, { useState } from 'react';
//Styles
import styles from './ChatFooter.module.css';
import { CancelRounded, CheckCircleRounded, MicRounded, Send } from '@material-ui/icons';

const ChatFooter = ({ input, onChange, sendMessage, image, user, room, roomId, setAudioId }) => {
    //States
    const [isRecording, setRecording] = useState(false);

    const btnIcons = (
        <>
            <Send
                style={{
                    width: 20,
                    height: 20,
                    color: 'white',
                }}
            />
            <MicRounded
                style={{
                    width: 24,
                    height: 24,
                    color: 'white',
                }}
            />
        </>
    );

    const canRecord = navigator.mediaDevices.getUserMedia && window.MediaRecorder;

    return (
        <div className={styles.chat__footer}>
            <form>
                <input value={input} onChange={!isRecording ? onChange : null} placeholder='Type a message' />

                {canRecord ? (
                    <button
                        type='submit'
                        className={styles.send__btn}
                        onClick={input.trim() || (input === '' && image) ? sendMessage : () => false}>
                        {btnIcons}
                    </button>
                ) : (
                    <>
                        <label htmlFor='capture' className={styles.send__btn}>
                            {btnIcons}
                        </label>
                        <input style={{ display: 'none' }} type='file' id='capture' accept='audio/*' capture />
                    </>
                )}
            </form>

            {isRecording && (
                <div className={styles.record}>
                    <CancelRounded
                        style={{
                            width: 30,
                            height: 30,
                            color: '#f20519',
                        }}
                    />
                    <div>
                        <div className={styles.record__redcircle} />
                        <div className={styles.record__duration}></div>
                    </div>
                    <CheckCircleRounded
                        style={{
                            width: 30,
                            height: 30,
                            color: '#41bf49',
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default ChatFooter;
