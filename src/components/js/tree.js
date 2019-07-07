function replace(arr, condition) {
    if (Array.isArray(condition)) {
        condition.forEach(item => {
            handlerKey(arr, item);
        });
    } else {
        handlerKey(arr, condition);
    }
    return arr;
}
function handlerKey(arr, obj) {
    let { keyLater, keyBefore } = obj;
    for (let i in arr) {
        let item = arr[i];
        item[keyLater] = item[keyBefore];
        delete item[keyBefore];
        if (item.children) handlerKey(item.children, obj);
    }
}
export { replace };
