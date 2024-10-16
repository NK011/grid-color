import React, { memo, useState } from "react";
import "./Cell.css";

function Cell({ id, setStack, setGrid, isOff = true }) {
    console.log(id);
    const handleClick = () => {
        console.log("handler called = ", id);
        setGrid((prev) => {
            const gridCopy = prev.map((cell) =>
                cell.id === id
                    ? {
                          id: id,
                          isOff: cell.isOff ? false : true,
                      }
                    : cell
            );

            return gridCopy;
        });
        setStack(id);
    };

    return (
        <div
            onClick={handleClick}
            className="cell"
            style={{
                background: `${isOff ? "" : "green"}`,
            }}
        ></div>
    );
}

export default memo(Cell);
