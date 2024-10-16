import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Cell from "./components/Cell";

function App() {
    const [grid, setGrid] = useState([]);
    const [stack, setStack] = useState([]);
    const [loadedGrid, setLoadedGrid] = useState(false);
    const [cols, setCols] = useState(3);

    const updateStack = useCallback((id) => {
        setStack((prev) =>
            prev.some((cellId) => cellId === id)
                ? prev.filter((cellId) => cellId !== id)
                : [...prev, id]
        );
    }, []);

    // Turn off a cell based on its id
    const switchOff = (id) => {
        setGrid((prevGrid) =>
            prevGrid.map((cell) =>
                cell.id === id ? { ...cell, isOff: true } : cell
            )
        );
    };

    // Effect to handle turning off cells in reverse order once all are clicked
    useEffect(() => {
        if (grid.length > 0 && stack.length === grid.length) {
            const intervalId = setInterval(() => {
                // Use a functional update to ensure we get the latest stack
                setStack((prevStack) => {
                    if (prevStack.length > 0) {
                        const lastItem = prevStack[prevStack.length - 1];
                        switchOff(lastItem); // Turn off the last clicked cell
                        return prevStack.slice(0, -1); // Remove the last item
                    } else {
                        clearInterval(intervalId); // Stop the interval when all cells are off
                        return prevStack;
                    }
                });
            }, 1000);
        }
    }, [stack, grid.length]); // Only run when stack or grid size changes

    useEffect(() => {
        const cells = Array.from({ length: cols * cols }, (_, index) => {
            return {
                id: new Date().getMilliseconds() + index,
                isOff: true,
            };
        });

        setGrid(cells);
        setLoadedGrid(true);
    }, [cols]);

    return (
        <div className="App">
            <div className="grid">
                {grid.map((cell) => (
                    <Cell
                        id={cell.id}
                        key={cell.id}
                        isOff={cell.isOff}
                        setStack={updateStack}
                        setGrid={setGrid}
                    />
                ))}
            </div>
        </div>
    );
}
new Array(5).fill(null);
export default App;
