const initialState = {
    grid: [
        [["1-1", "1-2", "1-3"], ["1-4", "次中心", "1-6"], ["1-7", "1-8", "1-9"]],
        [["2-1", "2-2", "2-3"], ["2-4", "次中心", "2-6"], ["2-7", "2-8", "2-9"]],
        [["3-1", "3-2", "3-3"], ["3-4", "次中心", "3-6"], ["3-7", "3-8", "3-9"]],
        [["4-1", "4-2", "4-3"], ["4-4", "次中心", "4-6"], ["4-7", "4-8", "4-9"]],
        [["1", "2", "3"], ["4", "中心", "6"], ["7", "8", "9"]],
        [["5-1", "5-2", "5-3"], ["5-4", "次中心", "5-6"], ["5-7", "5-8", "5-9"]],
        [["6-1", "6-2", "6-3"], ["6-4", "次中心", "6-6"], ["6-7", "6-8", "6-9"]],
        [["7-1", "7-2", "7-3"], ["7-4", "次中心", "7-6"], ["7-7", "7-8", "7-9"]],
        [["8-1", "8-2", "8-3"], ["8-4", "次中心", "8-6"], ["8-7", "8-8", "8-9"]]
    ],
    isGridDetailOpen: false,
    isGridStart: false
};

export default function grid(state = initialState, action) {
    switch (action.type) {
        case "setGrid":
            if (action.data.position == "all") {
                return Object.assign({}, state, { grid: initialState.grid });
            }
            let a = action.data.position[0];
            let b = action.data.position[1];
            let c = action.data.position[2];
            let targetValue = action.data.value;

            let alter = [
                ...state.grid.slice(0, a),
                [
                    ...state.grid[a].slice(0, b),
                    [
                        ...state.grid[a][b].slice(0, c),
                        targetValue,
                        ...state.grid[a][b].slice(c + 1)
                    ],
                    ...state.grid[a].slice(b + 1)
                ],
                ...state.grid.slice(a + 1)
            ];
            return Object.assign({}, state, { grid: alter });

        case "setGridDetailOpen":
            return Object.assign({}, state, { isGridDetailOpen: true });
        case "setGridDetailClose":
            return Object.assign({}, state, { isGridDetailOpen: false });
        case "setGridStart":
            return Object.assign({}, state, { isGridStart: true });
        default:
            return state;
    }
}
