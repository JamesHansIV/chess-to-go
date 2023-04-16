
export default async function router(pathEnding, data) {
    var formBody = [];
    for (var property in data) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const url = `http://10.104.11.53:5000/${pathEnding}`;
    console.log(pathEnding)
    try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: formBody,
        });
        const result = await response.json();
        const links = [result.user1, result.user2];
        return links;
      } catch (error) {
        console.error(error);
        throw error;
      }
}