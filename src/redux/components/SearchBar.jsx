import React from 'react'

const SearchBar = ({value,onChange}) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Search product by name or code"
                className="pos-search-input"
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default SearchBar
