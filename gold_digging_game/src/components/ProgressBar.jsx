import React from 'react';

const ProgressBar = ({energy}) => {
    return (
        <div className={"border border-black rounded w-80 h-6 flex justify-start"}>
            <div className={"bg-green-200 rounded"} style={{width: `${energy}%`}}></div>
        </div>
    );
};

export default ProgressBar;
