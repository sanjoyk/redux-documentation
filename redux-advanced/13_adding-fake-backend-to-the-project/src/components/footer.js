import React from 'react';
import FilterLink from '../containers/filterlink';
const Footer = () => {
    return (
        <div>
            Show: <FilterLink filter="all">All</FilterLink>{' '}
            <FilterLink filter="active">Active</FilterLink>{' '}
            <FilterLink filter="completed">Completed</FilterLink>
        </div>
    );
};
export default Footer;
