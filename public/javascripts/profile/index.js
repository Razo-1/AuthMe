const token = localStorage.getItem('token');

if (!token) {
    window.location.href = '/sign-in';
} else {
    fetch('/auth-me', {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then((response) => response.json()
        .then((data) => ({ ok: response.ok, data })))
        .then(({ ok, data }) => {

            if (!ok) throw new Error(data.message || 'Authorization failed');
            document.querySelectorAll('.user-name').forEach((element) => { element.textContent = data.name; });
            document.querySelector('.user-email').textContent = data.email;
            document.querySelector('.user-id').textContent = data._id;
            document.querySelector('.avatar').textContent = data.name.charAt(0).toUpperCase();

        })
        .catch(() => {

            localStorage.removeItem('token');
            window.location.href = '/sign-in';
            
        });
}

document.querySelector('#logout').addEventListener('click', () => {

    fetch('/logout', {

        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }

    })
    .then(res => res.json())
    .then(res => {

        if(res.ok){

            localStorage.removeItem('token');
            window.location.href = '/sign-in';

        }

    })
    .catch(rej => console.log(rej))
});