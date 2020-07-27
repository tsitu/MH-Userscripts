// row (left-right), col (up-down) from [0, 0] to [5, 10]
// combos start at top-left corner for each shape
const allShapes = {
  "Chamberstick Candle": {
    default: {
      map: [[0, 1], [0, 1], [1, 1, 1]],
      combos: [
        [[0, 0], [0, 3], [0, 6], [3, 0], [3, 3], [3, 6]],
        [[0, 1], [0, 4], [0, 7], [3, 1], [3, 4], [3, 7]],
        [[0, 2], [0, 5], [0, 8], [3, 2], [3, 5], [3, 8]],
        [[1, 0], [1, 3], [1, 6]],
        [[1, 1], [1, 4], [1, 7]],
        [[1, 2], [1, 5], [1, 8]],
        [[2, 0], [2, 3], [2, 6]],
        [[2, 1], [2, 4], [2, 7]],
        [[2, 2], [2, 5], [2, 8]]
      ]
    },
    tipped_left: {
      map: [[0, 0, 1], [1, 1, 1], [0, 0, 1]],
      combos: [
        [[0, 0], [0, 3], [0, 6], [3, 0], [3, 3], [3, 6]],
        [[0, 1], [0, 4], [0, 7], [3, 1], [3, 4], [3, 7]],
        [[0, 2], [0, 5], [0, 8], [3, 2], [3, 5], [3, 8]],
        [[1, 0], [1, 3], [1, 6]],
        [[1, 1], [1, 4], [1, 7]],
        [[1, 2], [1, 5], [1, 8]],
        [[2, 0], [2, 3], [2, 6]],
        [[2, 1], [2, 4], [2, 7]],
        [[2, 2], [2, 5], [2, 8]]
      ]
    },
    tipped_right: {
      map: [[1], [1, 1, 1], [1]],
      combos: [
        [[0, 0], [0, 3], [0, 6], [3, 0], [3, 3], [3, 6]],
        [[0, 1], [0, 4], [0, 7], [3, 1], [3, 4], [3, 7]],
        [[0, 2], [0, 5], [0, 8], [3, 2], [3, 5], [3, 8]],
        [[1, 0], [1, 3], [1, 6]],
        [[1, 1], [1, 4], [1, 7]],
        [[1, 2], [1, 5], [1, 8]],
        [[2, 0], [2, 3], [2, 6]],
        [[2, 1], [2, 4], [2, 7]],
        [[2, 2], [2, 5], [2, 8]]
      ]
    },
    upside_down: {
      map: [[1, 1, 1], [0, 1], [0, 1]],
      combos: [
        [[0, 0], [0, 3], [0, 6], [3, 0], [3, 3], [3, 6]],
        [[0, 1], [0, 4], [0, 7], [3, 1], [3, 4], [3, 7]],
        [[0, 2], [0, 5], [0, 8], [3, 2], [3, 5], [3, 8]],
        [[1, 0], [1, 3], [1, 6]],
        [[1, 1], [1, 4], [1, 7]],
        [[1, 2], [1, 5], [1, 8]],
        [[2, 0], [2, 3], [2, 6]],
        [[2, 1], [2, 4], [2, 7]],
        [[2, 2], [2, 5], [2, 8]]
      ]
    }
  },
  "Candy Cane": {
    default: {
      map: [[1, 1], [1, 1], [1], [1]],
      combos: [
        [[0, 0], [0, 2], [0, 4], [0, 6], [0, 8]],
        [[0, 1], [0, 3], [0, 5], [0, 7], [0, 9]],
        [[1, 0], [1, 2], [1, 4], [1, 6], [1, 8]],
        [[1, 1], [1, 3], [1, 5], [1, 7], [1, 9]],
        [[2, 0], [2, 2], [2, 4], [2, 6], [2, 8]],
        [[2, 1], [2, 3], [2, 5], [2, 7], [2, 9]]
      ]
    },
    left: {
      map: [[1, 1], [1, 1], [0, 1], [0, 1]],
      combos: [
        [[0, 0], [0, 2], [0, 4], [0, 6], [0, 8]],
        [[0, 1], [0, 3], [0, 5], [0, 7], [0, 9]],
        [[1, 0], [1, 2], [1, 4], [1, 6], [1, 8]],
        [[1, 1], [1, 3], [1, 5], [1, 7], [1, 9]],
        [[2, 0], [2, 2], [2, 4], [2, 6], [2, 8]],
        [[2, 1], [2, 3], [2, 5], [2, 7], [2, 9]]
      ]
    },
    side_up_right: {
      map: [[0, 0, 1, 1], [1, 1, 1, 1]],
      combos: [
        [[0, 0], [0, 4], [2, 0], [2, 4], [4, 0], [4, 4]],
        [[0, 1], [0, 5], [2, 1], [2, 5], [4, 1], [4, 5]],
        [[0, 2], [0, 6], [2, 2], [2, 6], [4, 2], [4, 6]],
        [[0, 3], [0, 7], [2, 3], [2, 7], [4, 3], [4, 7]],
        [[1, 0], [1, 4], [3, 0], [3, 4]],
        [[1, 1], [1, 5], [3, 1], [3, 5]],
        [[1, 2], [1, 6], [3, 2], [3, 6]],
        [[1, 3], [1, 7], [3, 3], [3, 7]]
      ]
    },
    side_up_left: {
      map: [[1, 1], [1, 1, 1, 1]],
      combos: [
        [[0, 0], [0, 4], [2, 0], [2, 4], [4, 0], [4, 4]],
        [[0, 1], [0, 5], [2, 1], [2, 5], [4, 1], [4, 5]],
        [[0, 2], [0, 6], [2, 2], [2, 6], [4, 2], [4, 6]],
        [[0, 3], [0, 7], [2, 3], [2, 7], [4, 3], [4, 7]],
        [[1, 0], [1, 4], [3, 0], [3, 4]],
        [[1, 1], [1, 5], [3, 1], [3, 5]],
        [[1, 2], [1, 6], [3, 2], [3, 6]],
        [[1, 3], [1, 7], [3, 3], [3, 7]]
      ]
    },
    side_down_right: {
      map: [[1, 1, 1, 1], [0, 0, 1, 1]],
      combos: [
        [[0, 0], [0, 4], [2, 0], [2, 4], [4, 0], [4, 4]],
        [[0, 1], [0, 5], [2, 1], [2, 5], [4, 1], [4, 5]],
        [[0, 2], [0, 6], [2, 2], [2, 6], [4, 2], [4, 6]],
        [[0, 3], [0, 7], [2, 3], [2, 7], [4, 3], [4, 7]],
        [[1, 0], [1, 4], [3, 0], [3, 4]],
        [[1, 1], [1, 5], [3, 1], [3, 5]],
        [[1, 2], [1, 6], [3, 2], [3, 6]],
        [[1, 3], [1, 7], [3, 3], [3, 7]]
      ]
    },
    side_down_left: {
      map: [[1, 1, 1, 1], [1, 1]],
      combos: [
        [[0, 0], [0, 4], [2, 0], [2, 4], [4, 0], [4, 4]],
        [[0, 1], [0, 5], [2, 1], [2, 5], [4, 1], [4, 5]],
        [[0, 2], [0, 6], [2, 2], [2, 6], [4, 2], [4, 6]],
        [[0, 3], [0, 7], [2, 3], [2, 7], [4, 3], [4, 7]],
        [[1, 0], [1, 4], [3, 0], [3, 4]],
        [[1, 1], [1, 5], [3, 1], [3, 5]],
        [[1, 2], [1, 6], [3, 2], [3, 6]],
        [[1, 3], [1, 7], [3, 3], [3, 7]]
      ]
    },
    down_right: {
      map: [[1], [1], [1, 1], [1, 1]],
      combos: [
        [[0, 0], [0, 2], [0, 4], [0, 6], [0, 8]],
        [[0, 1], [0, 3], [0, 5], [0, 7], [0, 9]],
        [[1, 0], [1, 2], [1, 4], [1, 6], [1, 8]],
        [[1, 1], [1, 3], [1, 5], [1, 7], [1, 9]],
        [[2, 0], [2, 2], [2, 4], [2, 6], [2, 8]],
        [[2, 1], [2, 3], [2, 5], [2, 7], [2, 9]]
      ]
    },
    down_left: {
      map: [[0, 1], [0, 1], [1, 1], [1, 1]],
      combos: [
        [[0, 0], [0, 2], [0, 4], [0, 6], [0, 8]],
        [[0, 1], [0, 3], [0, 5], [0, 7], [0, 9]],
        [[1, 0], [1, 2], [1, 4], [1, 6], [1, 8]],
        [[1, 1], [1, 3], [1, 5], [1, 7], [1, 9]],
        [[2, 0], [2, 2], [2, 4], [2, 6], [2, 8]],
        [[2, 1], [2, 3], [2, 5], [2, 7], [2, 9]]
      ]
    }
  },
  "Crescent Cookie": {
    default: {
      map: [[1, 1], [1], [1, 1]],
      combos: [
        [
          [0, 0],
          [0, 2],
          [0, 4],
          [0, 6],
          [0, 8],
          [3, 0],
          [3, 2],
          [3, 4],
          [3, 6],
          [3, 8]
        ],
        [
          [0, 1],
          [0, 3],
          [0, 5],
          [0, 7],
          [0, 9],
          [3, 1],
          [3, 3],
          [3, 5],
          [3, 7],
          [3, 9]
        ],
        [[1, 0], [1, 2], [1, 4], [1, 6], [1, 8]],
        [[1, 1], [1, 3], [1, 5], [1, 7], [1, 9]],
        [[2, 0], [2, 2], [2, 4], [2, 6], [2, 8]],
        [[2, 1], [2, 3], [2, 5], [2, 7], [2, 9]]
      ]
    },
    down: {
      map: [[1, 1, 1], [1, 0, 1]],
      combos: [
        [
          [0, 0],
          [0, 3],
          [0, 6],
          [2, 0],
          [2, 3],
          [2, 6],
          [4, 0],
          [4, 3],
          [4, 6]
        ],
        [
          [0, 1],
          [0, 4],
          [0, 7],
          [2, 1],
          [2, 4],
          [2, 7],
          [4, 1],
          [4, 4],
          [4, 7]
        ],
        [
          [0, 2],
          [0, 5],
          [0, 8],
          [2, 2],
          [2, 5],
          [2, 8],
          [4, 2],
          [4, 5],
          [4, 8]
        ],
        [[1, 0], [1, 3], [1, 6], [3, 0], [3, 3], [3, 6]],
        [[1, 1], [1, 4], [1, 7], [3, 1], [3, 4], [3, 7]],
        [[1, 2], [1, 5], [1, 8], [3, 2], [3, 5], [3, 8]]
      ]
    },
    left: {
      map: [[1, 1], [0, 1], [1, 1]],
      combos: [
        [
          [0, 0],
          [0, 2],
          [0, 4],
          [0, 6],
          [0, 8],
          [3, 0],
          [3, 2],
          [3, 4],
          [3, 6],
          [3, 8]
        ],
        [
          [0, 1],
          [0, 3],
          [0, 5],
          [0, 7],
          [0, 9],
          [3, 1],
          [3, 3],
          [3, 5],
          [3, 7],
          [3, 9]
        ],
        [[1, 0], [1, 2], [1, 4], [1, 6], [1, 8]],
        [[1, 1], [1, 3], [1, 5], [1, 7], [1, 9]],
        [[2, 0], [2, 2], [2, 4], [2, 6], [2, 8]],
        [[2, 1], [2, 3], [2, 5], [2, 7], [2, 9]]
      ]
    },
    up: {
      map: [[1, 0, 1], [1, 1, 1]],
      combos: [
        [
          [0, 0],
          [0, 3],
          [0, 6],
          [2, 0],
          [2, 3],
          [2, 6],
          [4, 0],
          [4, 3],
          [4, 6]
        ],
        [
          [0, 1],
          [0, 4],
          [0, 7],
          [2, 1],
          [2, 4],
          [2, 7],
          [4, 1],
          [4, 4],
          [4, 7]
        ],
        [
          [0, 2],
          [0, 5],
          [0, 8],
          [2, 2],
          [2, 5],
          [2, 8],
          [4, 2],
          [4, 5],
          [4, 8]
        ],
        [[1, 0], [1, 3], [1, 6], [3, 0], [3, 3], [3, 6]],
        [[1, 1], [1, 4], [1, 7], [3, 1], [3, 4], [3, 7]],
        [[1, 2], [1, 5], [1, 8], [3, 2], [3, 5], [3, 8]]
      ]
    }
  },
  "Large Gift": {
    default: {
      map: [[1, 1], [1, 1], [1, 1]],
      combos: [
        [
          [0, 0],
          [0, 2],
          [0, 4],
          [0, 6],
          [0, 8],
          [3, 0],
          [3, 2],
          [3, 4],
          [3, 6],
          [3, 8]
        ],
        [
          [0, 1],
          [0, 3],
          [0, 5],
          [0, 7],
          [0, 9],
          [3, 1],
          [3, 3],
          [3, 5],
          [3, 7],
          [3, 9]
        ],
        [[1, 0], [1, 2], [1, 4], [1, 6], [1, 8]],
        [[1, 1], [1, 3], [1, 5], [1, 7], [1, 9]],
        [[2, 0], [2, 2], [2, 4], [2, 6], [2, 8]],
        [[2, 1], [2, 3], [2, 5], [2, 7], [2, 9]]
      ]
    },
    side: {
      map: [[1, 1, 1], [1, 1, 1]],
      combos: [
        [
          [0, 0],
          [0, 3],
          [0, 6],
          [2, 0],
          [2, 3],
          [2, 6],
          [4, 0],
          [4, 3],
          [4, 6]
        ],
        [
          [0, 1],
          [0, 4],
          [0, 7],
          [2, 1],
          [2, 4],
          [2, 7],
          [4, 1],
          [4, 4],
          [4, 7]
        ],
        [
          [0, 2],
          [0, 5],
          [0, 8],
          [2, 2],
          [2, 5],
          [2, 8],
          [4, 2],
          [4, 5],
          [4, 8]
        ],
        [[1, 0], [1, 3], [1, 6], [3, 0], [3, 3], [3, 6]],
        [[1, 1], [1, 4], [1, 7], [3, 1], [3, 4], [3, 7]],
        [[1, 2], [1, 5], [1, 8], [3, 2], [3, 5], [3, 8]]
      ]
    }
  },
  "Cozy Scarf": {
    default: {
      map: [[0, 1, 1], [1, 1]],
      combos: [
        [
          [0, 0],
          [0, 2],
          [0, 4],
          [0, 6],
          [0, 8],
          [2, 0],
          [2, 2],
          [2, 4],
          [2, 6],
          [2, 8],
          [4, 0],
          [4, 2],
          [4, 4],
          [4, 6],
          [4, 8]
        ],
        [
          [0, 1],
          [0, 3],
          [0, 5],
          [0, 7],
          [2, 1],
          [2, 3],
          [2, 5],
          [2, 7],
          [4, 1],
          [4, 3],
          [4, 5],
          [4, 7]
        ],
        [
          [1, 0],
          [1, 2],
          [1, 4],
          [1, 6],
          [1, 8],
          [3, 0],
          [3, 2],
          [3, 4],
          [3, 6],
          [3, 8]
        ],
        [[1, 1], [1, 3], [1, 5], [1, 7], [3, 1], [3, 3], [3, 5], [3, 7]]
      ]
    },
    falling: {
      map: [[1], [1, 1], [0, 1]],
      combos: [
        [
          [0, 0],
          [0, 2],
          [0, 4],
          [0, 6],
          [0, 8],
          [2, 0],
          [2, 2],
          [2, 4],
          [2, 6],
          [2, 8]
        ],
        [
          [0, 1],
          [0, 3],
          [0, 5],
          [0, 7],
          [0, 9],
          [2, 1],
          [2, 3],
          [2, 5],
          [2, 7],
          [2, 9]
        ],
        [
          [1, 0],
          [1, 2],
          [1, 4],
          [1, 6],
          [1, 8],
          [3, 0],
          [3, 2],
          [3, 4],
          [3, 6],
          [3, 8]
        ],
        [
          [1, 1],
          [1, 3],
          [1, 5],
          [1, 7],
          [1, 9],
          [3, 1],
          [3, 3],
          [3, 5],
          [3, 7],
          [3, 9]
        ]
      ]
    },
    falling_flipped: {
      map: [[0, 1], [1, 1], [1]],
      combos: [
        [
          [0, 0],
          [0, 2],
          [0, 4],
          [0, 6],
          [0, 8],
          [2, 0],
          [2, 2],
          [2, 4],
          [2, 6],
          [2, 8]
        ],
        [
          [0, 1],
          [0, 3],
          [0, 5],
          [0, 7],
          [0, 9],
          [2, 1],
          [2, 3],
          [2, 5],
          [2, 7],
          [2, 9]
        ],
        [
          [1, 0],
          [1, 2],
          [1, 4],
          [1, 6],
          [1, 8],
          [3, 0],
          [3, 2],
          [3, 4],
          [3, 6],
          [3, 8]
        ],
        [
          [1, 1],
          [1, 3],
          [1, 5],
          [1, 7],
          [1, 9],
          [3, 1],
          [3, 3],
          [3, 5],
          [3, 7],
          [3, 9]
        ]
      ]
    },
    flipped: {
      map: [[1, 1], [0, 1, 1]],
      combos: [
        [
          [0, 0],
          [0, 2],
          [0, 4],
          [0, 6],
          [0, 8],
          [2, 0],
          [2, 2],
          [2, 4],
          [2, 6],
          [2, 8],
          [4, 0],
          [4, 2],
          [4, 4],
          [4, 6],
          [4, 8]
        ],
        [
          [0, 1],
          [0, 3],
          [0, 5],
          [0, 7],
          [2, 1],
          [2, 3],
          [2, 5],
          [2, 7],
          [4, 1],
          [4, 3],
          [4, 5],
          [4, 7]
        ],
        [
          [1, 0],
          [1, 2],
          [1, 4],
          [1, 6],
          [1, 8],
          [3, 0],
          [3, 2],
          [3, 4],
          [3, 6],
          [3, 8]
        ],
        [[1, 1], [1, 3], [1, 5], [1, 7], [3, 1], [3, 3], [3, 5], [3, 7]]
      ]
    }
  },
  "Small Gift": {
    default: {
      map: [[1, 1], [1, 1]],
      combos: [
        [
          [0, 0],
          [0, 2],
          [0, 4],
          [0, 6],
          [0, 8],
          [2, 0],
          [2, 2],
          [2, 4],
          [2, 6],
          [2, 8],
          [4, 0],
          [4, 2],
          [4, 4],
          [4, 6],
          [4, 8]
        ],
        [
          [0, 1],
          [0, 3],
          [0, 5],
          [0, 7],
          [0, 9],
          [2, 1],
          [2, 3],
          [2, 5],
          [2, 7],
          [2, 9],
          [4, 1],
          [4, 3],
          [4, 5],
          [4, 7],
          [4, 9]
        ],
        [
          [1, 0],
          [1, 2],
          [1, 4],
          [1, 6],
          [1, 8],
          [3, 0],
          [3, 2],
          [3, 4],
          [3, 6],
          [3, 8]
        ],
        [
          [1, 1],
          [1, 3],
          [1, 5],
          [1, 7],
          [1, 9],
          [3, 1],
          [3, 3],
          [3, 5],
          [3, 7],
          [3, 9]
        ]
      ]
    }
  },
  "Winter Star": {
    default: {
      map: [[0, 1], [1, 1, 1], [0, 1]],
      combos: [
        [[0, 0], [0, 3], [0, 6], [3, 0], [3, 3], [3, 6]],
        [[0, 1], [0, 4], [0, 7], [3, 1], [3, 4], [3, 7]],
        [[0, 2], [0, 5], [0, 8], [3, 2], [3, 5], [3, 8]],
        [[1, 0], [1, 3], [1, 6]],
        [[1, 1], [1, 4], [1, 7]],
        [[1, 2], [1, 5], [1, 8]],
        [[2, 0], [2, 3], [2, 6]],
        [[2, 1], [2, 4], [2, 7]],
        [[2, 2], [2, 5], [2, 8]]
      ]
    }
  },
  "Holiday Tree": {
    default: {
      map: [[0, 1], [1, 1, 1], [1, 1, 1]],
      combos: [
        [[0, 0], [0, 3], [0, 6], [3, 0], [3, 3], [3, 6]],
        [[0, 1], [0, 4], [0, 7], [3, 1], [3, 4], [3, 7]],
        [[0, 2], [0, 5], [0, 8], [3, 2], [3, 5], [3, 8]],
        [[1, 0], [1, 3], [1, 6]],
        [[1, 1], [1, 4], [1, 7]],
        [[1, 2], [1, 5], [1, 8]],
        [[2, 0], [2, 3], [2, 6]],
        [[2, 1], [2, 4], [2, 7]],
        [[2, 2], [2, 5], [2, 8]]
      ]
    },
    right: {
      map: [[1, 1], [1, 1, 1], [1, 1]],
      combos: [
        [[0, 0], [0, 3], [0, 6], [3, 0], [3, 3], [3, 6]],
        [[0, 1], [0, 4], [0, 7], [3, 1], [3, 4], [3, 7]],
        [[0, 2], [0, 5], [0, 8], [3, 2], [3, 5], [3, 8]],
        [[1, 0], [1, 3], [1, 6]],
        [[1, 1], [1, 4], [1, 7]],
        [[1, 2], [1, 5], [1, 8]],
        [[2, 0], [2, 3], [2, 6]],
        [[2, 1], [2, 4], [2, 7]],
        [[2, 2], [2, 5], [2, 8]]
      ]
    },
    left: {
      map: [[0, 1, 1], [1, 1, 1], [0, 1, 1]],
      combos: [
        [[0, 0], [0, 3], [0, 6], [3, 0], [3, 3], [3, 6]],
        [[0, 1], [0, 4], [0, 7], [3, 1], [3, 4], [3, 7]],
        [[0, 2], [0, 5], [0, 8], [3, 2], [3, 5], [3, 8]],
        [[1, 0], [1, 3], [1, 6]],
        [[1, 1], [1, 4], [1, 7]],
        [[1, 2], [1, 5], [1, 8]],
        [[2, 0], [2, 3], [2, 6]],
        [[2, 1], [2, 4], [2, 7]],
        [[2, 2], [2, 5], [2, 8]]
      ]
    },
    // Verify existence
    down: {
      map: [[1, 1, 1], [1, 1, 1], [0, 1]],
      combos: [
        [[0, 0], [0, 3], [0, 6], [3, 0], [3, 3], [3, 6]],
        [[0, 1], [0, 4], [0, 7], [3, 1], [3, 4], [3, 7]],
        [[0, 2], [0, 5], [0, 8], [3, 2], [3, 5], [3, 8]],
        [[1, 0], [1, 3], [1, 6]],
        [[1, 1], [1, 4], [1, 7]],
        [[1, 2], [1, 5], [1, 8]],
        [[2, 0], [2, 3], [2, 6]],
        [[2, 1], [2, 4], [2, 7]],
        [[2, 2], [2, 5], [2, 8]]
      ]
    }
  },
  "Festive Wreath": {
    default: {
      map: [[1, 1, 1], [1, 0, 1], [1, 1, 1]],
      combos: [
        [[0, 0], [0, 3], [0, 6], [3, 0], [3, 3], [3, 6]],
        [[0, 1], [0, 4], [0, 7], [3, 1], [3, 4], [3, 7]],
        [[0, 2], [0, 5], [0, 8], [3, 2], [3, 5], [3, 8]],
        [[1, 0], [1, 3], [1, 6]],
        [[1, 1], [1, 4], [1, 7]],
        [[1, 2], [1, 5], [1, 8]],
        [[2, 0], [2, 3], [2, 6]],
        [[2, 1], [2, 4], [2, 7]],
        [[2, 2], [2, 5], [2, 8]]
      ]
    }
  },
  "Yule Log": {
    default: {
      map: [[1, 1, 1, 1, 1]],
      combos: [
        [
          [0, 0],
          [0, 5],
          [1, 0],
          [1, 5],
          [2, 0],
          [2, 5],
          [3, 0],
          [3, 5],
          [4, 0],
          [4, 5],
          [5, 0],
          [5, 5]
        ],
        [
          [0, 1],
          [0, 6],
          [1, 1],
          [1, 6],
          [2, 1],
          [2, 6],
          [3, 1],
          [3, 6],
          [4, 1],
          [4, 6],
          [5, 1],
          [5, 6]
        ],
        [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2]],
        [[0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3]],
        [[0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4]]
      ]
    },
    standing: {
      map: [[1], [1], [1], [1], [1]],
      combos: [
        [
          [0, 0],
          [0, 1],
          [0, 2],
          [0, 3],
          [0, 4],
          [0, 5],
          [0, 6],
          [0, 7],
          [0, 8],
          [0, 9],
          [0, 10]
        ],
        [
          [1, 0],
          [1, 1],
          [1, 2],
          [1, 3],
          [1, 4],
          [1, 5],
          [1, 6],
          [1, 7],
          [1, 8],
          [1, 9],
          [1, 10]
        ]
      ]
    }
  },
  "Magical Hat": {
    default: {
      map: [[0, 1, 1], [0, 1, 1], [1, 1, 1, 1]],
      combos: [
        [[0, 0], [0, 4], [3, 0], [3, 4]],
        [[0, 1], [0, 5], [3, 1], [3, 5]],
        [[0, 2], [0, 6], [3, 2], [3, 6]],
        [[0, 3], [0, 7], [3, 3], [3, 7]],
        [[1, 0], [1, 4]],
        [[1, 1], [1, 5]],
        [[1, 2], [1, 6]],
        [[1, 3], [1, 7]],
        [[2, 0], [2, 4]],
        [[2, 1], [2, 5]],
        [[2, 2], [2, 6]],
        [[2, 3], [2, 7]]
      ]
    },
    flip: {
      map: [[1, 1, 1, 1], [0, 1, 1], [0, 1, 1]],
      combos: [
        [[0, 0], [0, 4], [3, 0], [3, 4]],
        [[0, 1], [0, 5], [3, 1], [3, 5]],
        [[0, 2], [0, 6], [3, 2], [3, 6]],
        [[0, 3], [0, 7], [3, 3], [3, 7]],
        [[1, 0], [1, 4]],
        [[1, 1], [1, 5]],
        [[1, 2], [1, 6]],
        [[1, 3], [1, 7]],
        [[2, 0], [2, 4]],
        [[2, 1], [2, 5]],
        [[2, 2], [2, 6]],
        [[2, 3], [2, 7]]
      ]
    },
    left: {
      map: [[0, 0, 1], [1, 1, 1], [1, 1, 1], [0, 0, 1]],
      combos: [
        [[0, 0], [0, 3], [0, 6]],
        [[0, 1], [0, 4], [0, 7]],
        [[0, 2], [0, 5], [0, 8]],
        [[1, 0], [1, 3], [1, 6]],
        [[1, 1], [1, 4], [1, 7]],
        [[1, 2], [1, 5], [1, 8]],
        [[2, 0], [2, 3], [2, 6]],
        [[2, 1], [2, 4], [2, 7]],
        [[2, 2], [2, 5], [2, 8]]
      ]
    },
    right: {
      map: [[1], [1, 1, 1], [1, 1, 1], [1]],
      combos: [
        [[0, 0], [0, 3], [0, 6]],
        [[0, 1], [0, 4], [0, 7]],
        [[0, 2], [0, 5], [0, 8]],
        [[1, 0], [1, 3], [1, 6]],
        [[1, 1], [1, 4], [1, 7]],
        [[1, 2], [1, 5], [1, 8]],
        [[2, 0], [2, 3], [2, 6]],
        [[2, 1], [2, 4], [2, 7]],
        [[2, 2], [2, 5], [2, 8]]
      ]
    }
  }
};

// Global object to hold options
const globalOpts = {
  hitWeight: 0,
  algo: ""
};

// Map shorthand to full name
const shapeTypeMap = {
  candle: "Chamberstick Candle",
  candy_cane: "Candy Cane",
  cookie: "Crescent Cookie",
  large_gift: "Large Gift",
  scarf: "Cozy Scarf",
  small_gift: "Small Gift",
  star: "Winter Star",
  holiday_tree: "Holiday Tree",
  wreath: "Festive Wreath",
  yule_log: "Yule Log"
  // hat: "Magical Hat"
};

// Number of cells in shape - 1
const maxThreshold = {
  "Chamberstick Candle": 4,
  "Candy Cane": 5,
  "Crescent Cookie": 4,
  "Large Gift": 5,
  "Cozy Scarf": 3,
  "Small Gift": 3,
  "Winter Star": 4,
  "Holiday Tree": 6,
  "Festive Wreath": 7,
  "Yule Log": 4,
  "Magical Hat": 7
};

const shapeWeights = {};

function generateScoredBoard(board, shapeName, shapeWeights) {
  const shape = allShapes[shapeName];
  const masterValueTrack = [];
  const masterHitCounter = [];

  // Track highest amount of hits for all combos of a shape
  let highestHit = 0;

  for (let type in shape) {
    const map = shape[type]["map"];
    for (let combo of shape[type]["combos"]) {
      // Convert shape positions into array of 1-66 values
      const valueTrack = [];
      for (let el of combo) {
        const row = el[0];
        const col = el[1];
        const valueArr = [];
        for (let i = 0; i < map.length; i++) {
          for (let j = 0; j < map[i].length; j++) {
            // Check for 1
            if (map[i][j] === 1) {
              valueArr.push(getValue(row + i, col + j));
            }
          }
        }
        valueTrack.push(valueArr);
      }
      masterValueTrack.push(valueTrack);

      // Array to track hits per shape in a single combo board
      const hitCounter = [];
      hitCounter.length = valueTrack.length;
      hitCounter.fill(0);

      // Calculate number of hits for each shape
      // A miss is permanently represented by -1
      for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 11; col++) {
          const el = board[row][col];
          const [exists, index] = checkExist(getValue(row, col));
          if (exists && hitCounter[index] >= 0) {
            if (el === "miss") {
              hitCounter[index] = -1;
            } else if (el === "hit") {
              hitCounter[index] += 1;
            }
          }
        }
      }
      masterHitCounter.push(hitCounter);

      // Checks for existence in value tracking array
      function checkExist(value) {
        let returnBool = false;
        let index = 0;
        for (let i = 0; i < valueTrack.length; i++) {
          if (valueTrack[i].indexOf(value) > -1) {
            returnBool = true;
            index = i;
            break;
          }
        }

        return [returnBool, index];
      }

      for (let num of hitCounter) {
        highestHit = num > highestHit ? num : highestHit;
      }

      highestHit =
        highestHit > maxThreshold[shapeName]
          ? maxThreshold[shapeName]
          : highestHit;
    }
  }

  // Generate empty board for calculating scores
  const scoreBoard = generateEmptyBoard(0);

  // Populate with scores
  let iterCount = 0;
  let patternCount = 0; // For Paul's method
  let shapeHighScore = 0; // For Paul's method
  for (let type in shape) {
    const map = shape[type]["map"];
    for (let combo of shape[type]["combos"]) {
      const calcBoard = generateEmptyBoard(0);
      for (let x = 0; x < combo.length; x++) {
        const row = combo[x][0];
        const col = combo[x][1];
        for (let i = 0; i < map.length; i++) {
          for (let j = 0; j < map[i].length; j++) {
            if (
              masterValueTrack[iterCount][x].indexOf(
                getValue(row + i, col + j)
              ) > -1
            ) {
              const calcScore = calculateScore(x, iterCount, highestHit);
              calcBoard[row + i][col + j] = calcScore;
              if (calcScore > shapeHighScore) {
                shapeHighScore = calcScore;
                patternCount = 1;
              } else if (calcScore === shapeHighScore) {
                patternCount += 1;
              }
            }
          }
        }
      }
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 11; j++) {
          scoreBoard[i][j] += calcBoard[i][j];
        }
      }
      iterCount++;
    }
  }

  function calculateScore(index, iter, threshold) {
    const hit = masterHitCounter[iter][index];
    if (hit === -1) {
      return 0; // Miss
    } else if (hit === 0) {
      return 1; // Available
    } else if (hit >= 1) {
      const num = hit === threshold ? hit : 0;
      return num * globalOpts["hitWeight"] + 1; // Hit
    }
  }

  // Conditional return based on desired algorithm
  if (globalOpts["algo"] === "default") {
    return scoreBoard;
  } else if (globalOpts["algo"] === "basic-weight") {
    // Use total number of patterns for each shape as weighting
    return scoreBoard.map(row =>
      row.map(col => {
        return (col / shapeWeights[shapeName]) * 100;
      })
    );
  } else if (globalOpts["algo"] === "tran-weight") {
    // Use number of patterns that don't have a miss in them as weighting
    let nonMiss = 0;
    for (let i of masterHitCounter) {
      for (let j of i) {
        if (j !== -1) nonMiss++;
      }
    }
    return scoreBoard.map(row =>
      row.map(col => {
        return (col / nonMiss) * 10; // maybe tweak 10?
      })
    );
  } else if (globalOpts["algo"] === "paul-weight") {
    // Use number of patterns for each hit as weighting
    return scoreBoard.map(row =>
      row.map(col => {
        return (col / (patternCount / (maxThreshold[shapeName] + 1))) * 5;
      })
    );
  }
}

function makeGuess(guessBoard, currentShapes) {
  const boardState = guessBoard.map(row =>
    row.map(col => {
      if (col === 0) return "available";
      else if (col === 1) return "hit";
      else if (col === 4) return "miss";
    })
  );

  /**
   * Superpose remaining shape possibility boards
   */
  let sumBoard = generateEmptyBoard(0);

  for (let shape of currentShapes) {
    const scored = generateScoredBoard(boardState, shape, shapeWeights);
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 11; j++) {
        sumBoard[i][j] += scored[i][j];
      }
    }
  }

  // Set all non-available tiles to 0
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 11; j++) {
      if (boardState[i][j] !== "available") {
        sumBoard[i][j] = 0;
      }
    }
  }

  sumBoard = sumBoard.map(row =>
    row.map(col => {
      return parseFloat(col);
    })
  );
  // console.log(sumBoard);

  /**
   * Calculate scores and ideal position(s)
   */
  const scoreArray = [];
  const highScore = [0, []];
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 11; j++) {
      const dataVal = getValue(i, j);
      const score = sumBoard[i][j];
      scoreArray.push(score);
      if (score > highScore[0]) {
        highScore[0] = score;
        highScore[1] = [dataVal];
      } else if (score === highScore[0]) {
        highScore[1].push(dataVal);
      }
    }
  }
  // console.log(scoreArray);
  // console.log(highScore);

  return highScore;
}

/**
 * Generates a 6-row x 11-column pre-filled with a default value
 * @param {*} defaultValue
 */
function generateEmptyBoard(defaultValue) {
  const returnBoard = [];
  for (let i = 0; i < 6; i++) {
    const arr = [];
    arr.length = 11;
    arr.fill(defaultValue);
    returnBoard.push(arr);
  }

  return returnBoard;
}

/**
 * Convert array indices to an integer data-index value
 * @param {number} row Integer from 0-5
 * @param {number} col Integer from 0-10
 * @return {number} Integer from 1-66
 */
function getValue(row, col) {
  return row * 11 + (col + 1);
}

/**
 * Convert an integer data-index value to proper boardState array indices
 * @param {number} value Integer from 1-66
 * @return {object}
 */
function getArrayIndex(value) {
  let posX = (value % 11) - 1;
  let posY = Math.floor(value / 11);

  // Right-most column is a special case
  if (value % 11 === 0) {
    posX = 10;
    posY = Math.floor(value / 11) - 1;
  }

  return {
    x: posX,
    y: posY
  };
}

function arrayShuffle(input) {
  let l = input.length + 1;
  while (l--) {
    const r = ~~(Math.random() * l),
      o = input[r];

    input[r] = input[0];
    input[0] = o;
  }

  return input;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function generateGameBoard() {
  let gameObj = {};
  let randomShapes = [];
  let validBoard = false;
  while (!validBoard) {
    const gameBoard = generateEmptyBoard(0);
    gameObj = {};
    randomShapes = [];
    const shuffled = arrayShuffle(Object.keys(allShapes));
    const randNum = Math.floor(11 * Math.random());

    if (randNum < 8) {
      for (let j = randNum; j < randNum + 4; j++) {
        randomShapes.push(shuffled[j]);
      }
    } else if (randNum === 8) {
      randomShapes.push(shuffled[8]);
      randomShapes.push(shuffled[9]);
      randomShapes.push(shuffled[10]);
      randomShapes.push(shuffled[0]);
    } else if (randNum === 9) {
      randomShapes.push(shuffled[9]);
      randomShapes.push(shuffled[10]);
      randomShapes.push(shuffled[0]);
      randomShapes.push(shuffled[1]);
    } else if (randNum === 10) {
      randomShapes.push(shuffled[10]);
      randomShapes.push(shuffled[0]);
      randomShapes.push(shuffled[1]);
      randomShapes.push(shuffled[2]);
    }
    // console.log(randomShapes);

    let placedShapes = 0;
    for (let shape of randomShapes) {
      gameObj[shape] = [];
      const typeKeys = Object.keys(allShapes[shape]);
      const randType = typeKeys[getRandomInt(typeKeys.length)];
      const obj = allShapes[shape][randType];

      // Not guaranteed that every shape/type/combo is compatible
      // Stop and reroll once past certain iteration threshold
      let resetCounter = 0;
      while (true) {
        resetCounter += 1;
        if (resetCounter > 420) break;

        const randCombo = obj["combos"][getRandomInt(obj["combos"].length)];
        const randPoint = randCombo[getRandomInt(randCombo.length)];

        // Check if another shape is occupying the desired slots
        let isOccupied = false;
        for (let i = 0; i < obj.map.length; i++) {
          for (let j = 0; j < obj.map[i].length; j++) {
            // Check for 1
            if (obj.map[i][j] === 1) {
              if (gameBoard[randPoint[0] + i][randPoint[1] + j] === 1) {
                isOccupied = true;
                break;
              }
            }
          }
        }
        if (!isOccupied) {
          // Place shape onto board
          for (let i = 0; i < obj.map.length; i++) {
            for (let j = 0; j < obj.map[i].length; j++) {
              // Check for 1
              if (obj.map[i][j] === 1) {
                gameBoard[randPoint[0] + i][randPoint[1] + j] = 1;
                gameObj[shape].push(
                  getValue(randPoint[0] + i, randPoint[1] + j)
                );
              }
            }
          }
          // console.log(
          //   `shape: ${shape}, randType: ${randType}, randPoint: ${randPoint}`
          // );
          placedShapes += 1;
          break;
        }
      }
    }
    if (placedShapes === 4) {
      validBoard = true;
    }
  }
  // console.log(gameBoard);

  let totalCounter = 0;
  for (let shape in gameObj) {
    totalCounter += gameObj[shape].length;
  }

  return {
    game: gameObj,
    shapes: randomShapes,
    total: totalCounter
  };
}

function runAlgorithm(gameBoard, currentShapes) {
  const guessBoard = generateEmptyBoard(0);
  const guessArr = [];
  const remainingShapes = [...currentShapes];

  const solvedShapes = {};
  let concatBoard = [];
  for (let shape in gameBoard) {
    solvedShapes[shape] = false;
    concatBoard = concatBoard.concat(gameBoard[shape]);
  }

  // Bombs away
  while (true) {
    const guess = makeGuess(guessBoard, remainingShapes)[1][0];
    guessArr.push(guess);

    // Check if complete
    let isBoardSolved = false;
    for (let shape of currentShapes) {
      let shapeSolved = true;
      for (let el of gameBoard[shape]) {
        // Still missing a tile
        if (guessArr.indexOf(el) < 0) {
          shapeSolved = false;
          break;
        }
      }
      if (shapeSolved) {
        solvedShapes[shape] = true;
      }
    }

    // Check for newly completed shapes
    for (let shape in solvedShapes) {
      if (solvedShapes[shape] && remainingShapes.indexOf(shape) > -1) {
        // Remove solved shape from arrays
        const index = remainingShapes.indexOf(shape);
        remainingShapes.splice(index, 1);
        if (remainingShapes.length === 0) {
          // Done once nothing is remaining
          isBoardSolved = true;
          break;
        } else {
          for (let s in remainingShapes) {
            concatBoard = concatBoard.concat(gameBoard[s]);
          }

          // Mark solved shape tiles as "Miss"
          for (let tile of gameBoard[shape]) {
            const index = getArrayIndex(tile);
            guessBoard[index.y][index.x] = 4;
          }
        }
      }
    }

    if (!isBoardSolved) {
      const index = getArrayIndex(guess);
      if (
        concatBoard.indexOf(guess) > -1 &&
        guessBoard[index.y][index.x] !== 4
      ) {
        guessBoard[index.y][index.x] = 1;
      } else {
        guessBoard[index.y][index.x] = 4;
      }
    } else {
      break;
    }
  }

  return guessArr.length;
}

(function main() {
  console.time("Duration");

  // Calculate shape weighting
  for (let shape in allShapes) {
    let counter = 0;
    for (let type in allShapes[shape]) {
      for (let combo of allShapes[shape][type]["combos"]) {
        counter += combo.length;
      }
    }
    shapeWeights[shape] = counter;
  }

  // TESTING
  // const testBoard = generateGameBoard();
  // console.log(testBoard.total);
  // console.log(runAlgorithm(testBoard.game, testBoard.shapes));
  // for (let i = 0; i < 10000; i++) {
  // generateGameBoard();
  // }

  // MOAR TESTING
  // globalOpts["algo"] = "default";
  // globalOpts["algo"] = "basic-weight";
  // globalOpts["algo"] = "tran-weight";
  // globalOpts["algo"] = "paul-weight";
  // globalOpts["hitWeight"] = 10;
  // makeGuess(
  //   [
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [1, 1, 0, 0, 4, 0, 0, 0, 0, 0, 0],
  //     [1, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0],
  //     [1, 1, 1, 4, 4, 4, 4, 0, 0, 0, 0],
  //     [0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  //   ],
  //   ["Yule Log", "Festive Wreath", "Small Gift"]
  // );
  // console.log(
  //   runAlgorithm(
  //     {
  //       "Small Gift": [7, 8, 18, 19],
  //       "Yule Log": [50, 51, 52, 53, 54],
  //       "Winter Star": [27, 37, 38, 39, 49],
  //       "Festive Wreath": [12, 13, 14, 23, 25, 34, 35, 36]
  //     },
  //     ["Festive Wreath", "Small Gift", "Yule Log", "Winter Star"]
  //   ) - 22
  // );
  // console.log(
  //   runAlgorithm(
  //     {
  //       "Large Gift": [41, 42, 43, 52, 53, 54],
  //       "Crescent Cookie": [19, 20, 21, 30, 32],
  //       "Holiday Tree": [27, 28, 38, 39, 40, 49, 50],
  //       "Festive Wreath": [23, 24, 25, 34, 36, 45, 46, 47]
  //     },
  //     ["Festive Wreath", "Large Gift", "Crescent Cookie", "Holiday Tree"]
  //   ) - 22
  // );

  // const algos = ["default", "basic-weight", "tran-weight", "paul-weight"];
  // const algos = ["tran-weight", "paul-weight"];
  const algos = ["paul-weight"];
  const testWeights = [5, 10];
  // const iters = 1000;
  const iters = 100;
  // const iters = 10;
  // const iters = 42;
  // const iters = 2;

  // Generate shared game boards
  const sharedBoards = [];
  for (let i = 0; i < iters; i++) {
    sharedBoards.push(generateGameBoard());
  }

  const results = {};
  for (let algo of algos) {
    results[algo] = [];
    for (let hw of testWeights) {
      globalOpts["algo"] = algo;
      globalOpts["hitWeight"] = hw;
      let sum = 0;
      console.time(`${algo} (${hw})`);
      for (let i = 0; i < iters; i++) {
        const board = sharedBoards[i];
        const gameBoard = board.game;
        const currentShapes = board.shapes;
        // console.log(gameBoard);
        // console.log(`currentShapes: ${currentShapes}`);

        sum += runAlgorithm(gameBoard, currentShapes) - board.total;
        // console.log(sum);
      }
      console.timeEnd(`${algo} (${hw})`);
      console.log(`total miss: ${sum}\n`);
      results[algo].push([hw, sum]);
    }
  }

  console.log(`--- SUMMARY (${iters} boards)---`);
  for (let algo in results) {
    console.log(algo);
    let outputStr = "";
    for (let arr of results[algo]) {
      outputStr += `${arr[0]}: ${arr[1]} / `;
    }
    console.log(`${outputStr.slice(0, -2)}\n`);
  }
  console.timeEnd("Duration");
})();
