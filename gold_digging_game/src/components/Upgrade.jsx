import React from 'react';

const Upgrade = ({upgrade, onClick}) => {
    return (
        <div className={"p-4 bg-gray-200 rounded w-40 flex flex-col gap-4 items-center"}
             onClick={onClick}>
            <div>
                Price: {upgrade.price}
            </div>
            <div className={"text-center"}>
                {upgrade.upgrade}
            </div>
        </div>
    );
};

export default Upgrade;
