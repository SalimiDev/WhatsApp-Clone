import styles from './MediaPreview.module.css';
import { CloseRounded } from '@material-ui/icons';

const MediaPreview = ({ src, closePreview }) => {
    if (!src) return null;

    return (
        <div className={styles.mediaPreview}>
            <CloseRounded onClick={closePreview} />
            <img src={src} alt='Preview' />
        </div>
    );
};
export default MediaPreview;
