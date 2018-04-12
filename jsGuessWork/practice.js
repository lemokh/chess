let temp = 0;

function ok(arr) {
    for (let i = 0; i < arr.length; i++) {
        if ( arr[i + 1] - arr[i] === 1 ) { temp += 1; }
        else { temp = 0; }
        if ( temp === 3 ) { return true; }
    }
    return false;
}

console.log([4,1,3,1,2,3,5]);