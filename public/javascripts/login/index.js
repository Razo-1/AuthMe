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
                throw new Error(result.message || 'Login failed');
            }

            localStorage.setItem('token', result.token);
            window.location.href = '/profile';

            fetch('/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${result.token}`
                }
            })
                .then((fetchResponse) => fetchResponse.json()
                .then((user) => ({
                    ok: fetchResponse.ok,
                    user
                })))
                .then(({ ok, user }) => {
                    if (!ok) {
                        throw new Error(user.message || 'Failed to fetch user information');
                    }

                    window.location.href = '/profile';
                })
                .catch((error) => {
                    console.error(error);
                    alert(error.message);
                });

            form.reset();
        })
        .catch((error) => {
            console.error(error);
            alert(error.message);
        });
});
