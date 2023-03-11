const form = document.querySelector('form');
const btn = document.createElement('button');

const postData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    if (!response.ok) {
        throw new Error(`Couldn't fetch ${url}, status: ${response.status}`);
    }

    return await response.json();
}

const bindPostData = () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData));

        postData("/", json)
            .then(data => console.log(data))
            .finally(form.reset());
    });
}

document.querySelector('form').appendChild(btn).append('Accept');

bindPostData();