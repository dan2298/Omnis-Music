export function noDuplicateArrays(arr1, arr2) {
    if(!arr1.length) {
        return arr2;
    }
    
    const obj = {}
        for(let i = 0; i < arr1.length; i++) {
        obj[arr1[i].fileName] = 1;
    }
    
    return arr2.filter(el => {
        const fileName = el.fileName
        if(!obj[fileName]) return el;
    })
}

export function replaceElemInArr(arr, song) {
    let found = false

    const newArr = arr.map(el => {
        if (el.name === song.name && el.artist === song.artist){
            found = true
            return song
        } 
        return el
    })

    if (!found) {
        newArr.push(song)
    }
    
    return newArr;   
}