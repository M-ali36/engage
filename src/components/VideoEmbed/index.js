import React from 'react';
import AnimatedImage from '@Ui/AnimatedImage';
import * as classes from './index.module.css';
import {useStore, setNavState, setVideoId} from '@UseCase/store'
import Play from '@Svg/play.svg'
import PropTypes from 'prop-types';

const VideoEmbed = ({data}) => {
    const {image, url} = data;

    const [store , dispatch] = useStore();
    const {navOpenState} = store;

    const openModal = () => {
        setNavState(dispatch, 'video');
        setVideoId(dispatch, url);
    }

    return (
        <div className={classes.root} onClick={() => openModal()}>
            {image && 
                <div className={classes.imageContainer}>
                    <AnimatedImage
                        image={image}
                        height={1920}
                        width={1080}
                        className={classes.image}
                    />
                </div>
            }
            <div className={classes.play}>
                <Play className={classes.icon} />
            </div>
        </div>
    );
};

VideoEmbed.propTypes = {
    
};

export default VideoEmbed;