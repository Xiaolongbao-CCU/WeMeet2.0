const initialState = {
  grid: [
    [['', '', ''], ['', '', ''], ['', '', '']],
    [['', '', ''], ['', '', ''], ['', '', '']],
    [['', '', ''], ['', '', ''], ['', '', '']],
    [['', '', ''], ['', '', ''], ['', '', '']],
    [['', '', ''], ['', '', ''], ['', '', '']],
    [['', '', ''], ['', '', ''], ['', '', '']],
    [['', '', ''], ['', '', ''], ['', '', '']],
    [['', '', ''], ['', '', ''], ['', '', '']],
    [['', '', ''], ['', '', ''], ['', '', '']],
  ],
  isGridDetailOpen: false,
  isGridStart: false,
  isGridOpen: false,
};

export default function grid(state = initialState, action) {
  switch (action.type) {
    case 'setGrid':
      if (action.data.position == 'all') {
        return Object.assign({}, state, { grid: initialState.grid });
      }
      const a = action.data.position[0];
      const b = action.data.position[1];
      const c = action.data.position[2];
      const targetValue = action.data.value;

      const alter = [
        ...state.grid.slice(0, a),
        [
          ...state.grid[a].slice(0, b),
          [
            ...state.grid[a][b].slice(0, c),
            targetValue,
            ...state.grid[a][b].slice(c + 1),
          ],
          ...state.grid[a].slice(b + 1),
        ],
        ...state.grid.slice(a + 1),
      ];
      return Object.assign({}, state, { grid: alter });

    case 'setGridDetailOpen':
      return Object.assign({}, state, { isGridDetailOpen: true });
    case 'setGridDetailClose':
      return Object.assign({}, state, { isGridDetailOpen: false });
    case 'setGridStart':
      return Object.assign({}, state, { isGridStart: true });
    case 'setGridOpen':
      return Object.assign({}, state, { isGridOpen: true });
    case 'setGridClose':
      return Object.assign({}, state, { isGridOpen: false });
    default:
      return state;
  }
}
