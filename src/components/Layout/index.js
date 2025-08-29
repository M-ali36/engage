import React from 'react';
import Store from "@UseCase/store";
import LayoutWrapper from './layout';
import PropTypes from 'prop-types';

const Layout = ({children, location}) => {
    
    return (
        <Store>
            <LayoutWrapper children={children} location={location}/>
        </Store>
    );
};

Layout.propTypes = {
    location: PropTypes.object.isRequired,
};

export default Layout;