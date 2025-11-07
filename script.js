function getMoves([x, y]) {
    let possibleMoves = [
        [x + 2, y + 1],
        [x + 2, y - 1],
        [x - 2, y + 1],
        [x - 2, y - 1],
        [x + 1, y + 2],
        [x + 1, y - 2],
        [x - 1, y + 2],
        [x - 1, y - 2]
    ]

    let removeOOB = possibleMoves.filter(([x, y]) => {
        return x <= 7 && x >= 0 && y <= 7 && y >= 0;
    })

    return removeOOB;
}

function knightMoves(start, end) {
    let queue = [start];
    // Avoids duplicate "moves", toString() value allows for easier access instead of value[0][1].
    let visited = new Set();
    // Allows mapping using .get to find the path back to start square.
    let map = new Map();

    visited.add(start.toString());

    while (queue.length !== 0) {
        let space = queue.shift();

        if (space.toString() === end.toString()) {
            let path = [];
            let current = space.toString();

            while (current) {
                path.push(current);
                if (current === start.toString()) break;
                current = map.get(current);
            }

            return path.reverse();
        }

        getMoves(space).forEach((move) => {
            if (!visited.has(move.toString())) {
                queue.push(move);
                visited.add(move.toString());
                map.set(move.toString(), space.toString());
            }
        });
    }
}

console.log(knightMoves([3,3],[4,3]));
