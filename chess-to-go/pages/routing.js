
export default async function router(pathEnding, data, setData) {
    var formBody = [];
    for (var property in data) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const url = `http://10.104.11.53:5000/${pathEnding}`;
    console.log(pathEnding)
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
    }).then(result => result.json())
        .then(result => {
            const links = [result.user1, result.user2]
            console.log(links)
            setData(links)
        })
}