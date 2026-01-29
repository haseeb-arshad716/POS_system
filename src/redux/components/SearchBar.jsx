import React from 'react'

const SearchBar = ({value,onChange}) => {
    return (
     <div className="pos-search-wrapper">
    <input
        type="text"
        placeholder="Search product by name..."
        className="pos-search-input"
        value={value}
        onChange={onChange}
    />
    <div className="search-icon-right">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"/>
        </svg>
    </div>
</div>
    )
}

export default SearchBar
