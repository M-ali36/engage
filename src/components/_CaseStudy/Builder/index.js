import React from 'react';
import PropTypes from 'prop-types';
import Results from '../Results';
import Information from '../Information';
import SideBySide from '../SideBySide';
import Testimonials from '@components/Testimonials'
import Banner from '../Banner';


const Builder = ({ list }) => {

    
    return (
        <>
            {list?.map((item, index) => {
                switch (item.__typename) {
                    case 'ContentfulResults':
                        return (
                            <Results key={index} data={item}/>
                        );
                    case 'ContentfulInformation':
                        return (
                            <>
                            {item.type === 'Paragraph' ?
                                <Information data={item}/>
                                :
                                <SideBySide data={item}/>
                            }
                            </>
                        );
                    case 'ContentfulTestimonials':
                        return (
                            <Testimonials items={item.items} image={item.image}/>
                        );

                    case 'ContentfulBanner':
                        return (
                            <Banner image={item.image} videoId={item.videoUrl}/>
                        );

                    default:
                        return null;
                }
            })}
        </>
    );
};

Builder.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    backgroundColour: PropTypes.string,
    textColour: PropTypes.string,
    theme: PropTypes.string
};

export default Builder;
