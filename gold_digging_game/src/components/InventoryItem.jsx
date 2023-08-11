import React from 'react';

const InventoryItem = ({item}) => {
    return (
        <div className={"bg-gray-400 p-2 rounded w-16 h-16 text-center"}>
            {item} g.
        </div>
    );
};

export default InventoryItem;
