import React from 'react';
import { NavLink } from 'react-router-dom';
const FilterLink = ({ filter, children }) => {
    console.log('filter', filter);
    return (
        <NavLink
            to={filter === 'all' ? '' : filter}
            activeStyle={{
                textDecoration: 'none',
                color: 'black'
            }}
        >
            {children}
        </NavLink>
    );
};
export default FilterLink;
