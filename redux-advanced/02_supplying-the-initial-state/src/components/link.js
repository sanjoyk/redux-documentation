import React from 'react';
const Link = ({ filter, active, onFilterClick, children }) => {
    if (active) {
        return (
            <span>
                {children}
            </span>
        );
    }
    return (
        <a
            href="#"
            onClick={e => {
                e.preventDefault();
                onFilterClick(filter);
            }}
        >
            {children}
        </a>
    );
};
export default Link;
