const fetched = JSON.parse(localStorage.getItem('facebuukUsers'))
console.log(fetched);

const signIn = () => {
    if (email.value.trim() === '' || password.value.trim() === '') {
        showError.style.display = 'block'
        showError2.style.display = 'none'
    } else {
        showError.style.display = 'none'
        const signInDetails = {
            mail: email.value,
            pass: password.value,
            logInTime: new Date().toLocaleTimeString()
        }
        // console.log(signInDetails);
        const found = fetched.find(user => user.mail === signInDetails.mail)
        // console.log(found);
        if (found) {
            const newFound = fetched.find(user => user.mail === signInDetails.mail && user.pass === signInDetails.pass)
            console.log(newFound);
            if (newFound) {
                console.log('go to dashboard');
                localStorage.setItem('user', JSON.stringify(signInDetails))
                setTimeout(() => {
                    window.location.href = "../dashboard/dashboard.html"
                }, 2000)
            } else {
                showError3.style.display = 'block'
                setTimeout(() => {
                    showError3.style.display = 'none'
                }, 2000)
            }
        } else {
            showError2.style.display = 'block'
            setTimeout(() => {
                showError2.style.display = 'none'
            }, 2000)
        }
    }
}