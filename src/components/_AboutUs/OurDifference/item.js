import React from 'react';
import RichText from '@components/RichText';
import AnimatedImage from '@Ui/AnimatedImage';
import * as classes from './index.module.css'
import PropTypes from 'prop-types';

const Item = ({item}) => {
    return (
        <div className={classes.itemRoot}>
            <div className={classes.itemCont}>
                <div className={classes.row}>
                    <div className={classes.contentCol}>
                        <h3 className={classes.itemTitle}>{item.title}</h3>
                        <RichText className={classes.content} content={item.content}/>
                    </div>
                    <div className={classes.imageCol}>
                        <div className={classes.imageContainer}>
                            <AnimatedImage
                            image={item.image}
                            height={1024}
                            width={1024}
                            className={classes.image}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Item.propTypes = {
    
};

export default Item;