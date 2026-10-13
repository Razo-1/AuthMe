const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Registration failed');
        }

        localStorage.setItem('token', result.token);
        window.location.href = '/profile';
    } catch (error) {
        console.error(error);
        showNotification(error.message, 'error');
    }
});
