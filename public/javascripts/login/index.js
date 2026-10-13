const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json().then((result) => ({
            ok: response.ok,
            result
        })))
        .then(({ ok, result }) => {
            if (!ok) {
                throw new Error(result.error || 'Login failed');
            }

            localStorage.setItem('token', result.token);
            window.location.href = '/profile';
        })
        .catch((error) => {
            console.error(error);
            showNotification('invalid email or password', 'error');
        });
});
