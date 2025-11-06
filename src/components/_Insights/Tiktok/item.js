import React from 'react';
import * as classes from './index.module.css'
import AnimatedImage from '@Ui/AnimatedImage'
import TiktokIcon from '@Svg/tiktok-play.svg'
import {useStore, setNavState, setVideoId} from '@UseCase/store'
import PropTypes from 'prop-types';

const Item = ({item}) => {

    const [store , dispatch] = useStore();
    const {navOpenState} = store;

    const openModal = () => {
        setNavState(dispatch, 'video');
        setVideoId(dispatch, item.url);
    }

    return (
        <div onClick={() => openModal()} className={classes.link}>
            <div className={classes.imageContainer}>
                <AnimatedImage image={item.image} height={1102} width={620} />
                <div className={classes.play}>
                    <TiktokIcon className={classes.icon} />
                </div>
                </div>
                <div className={classes.itmContent}>
                <h3 className={classes.itemTitle}>{item.title}</h3>
                <div className={classes.tags}>
                    {item.subText?.subText}
                </div>
            </div>
        </div>
    );
};

Item.propTypes = {
    
};

export default Item;