export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
}

export const postUrl = (givenUrl, givenTitle) => {
	const request = {
		method: 'POST',
		headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      long_url: givenUrl,
      title: givenTitle
    })
	}
	
	const response = fetch('http://localhost:3001/api/v1/urls', request);

	if (response.ok) {
		const data = response.json();
		return data;
	} else {
		throw new Error(response.statusText);
	}
}