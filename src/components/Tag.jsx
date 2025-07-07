import React from "react";

import "./Tag.css";

const Tag = ({ tagName, selectTag, selected }) => {
    const tagStyle = {
        Urgent: { backgroundColor: "#fda821" },
        Important: { backgroundColor: "#15d4c8" },
        Optional: { backgroundColor: "#ffd12c" },
        default: { backgroundColor: "#f9f9f9" },
    };
    return (
        <button
            type='button'
            className='tag'
            style={selected ? tagStyle[tagName] : tagStyle.default}
            onClick={() => selectTag(tagName)}
            aria-pressed={selected}
            aria-label={`Tag ${tagName}${selected?"selected":""}`}
            >
            {tagName}
        </button>
    );
};

export default Tag;
