let allUsers = []
if (localStorage.facebuukUsers) {
    const fetched = JSON.parse(localStorage.getItem('facebuukUsers'))
    allUsers = fetched
} else {
    allUsers = []
}

// localStorage.facebuukUsers?allUsers=JSON.parse(localStorage.getItem('facebuukUsers')):allUsers=[]

// let newUsers = JSON.parse(localStorage.getItem('facebuukUsers')) || []


const signUp = () => {
    if (firstName.value.trim() === '' || lastName.value.trim() === '' || email.value.trim() === '' || password.value.trim() === '') {
        showError.style.display = 'block'
        showError2.style.display = 'none'
    } else {
        showError.style.display = 'none'
        const userObj = {
            first_name: firstName.value,
            last_name: lastName.value,
            mail: email.value,
            pass: password.value
        }
        let regexString = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const confirmEmail = regexString.test(userObj.mail)
        if (confirmEmail) {
            const found = allUsers.find(user => user.mail === userObj.mail)
            if (found) {
                alert('account already exists')
            } else {
                signupButton.innerHTML = `
                <span class="spinner-border spinner-border-sm" 
                aria-hidden="true"></span>
                 <span role="status">Loading...
                 </span>`
                allUsers.push(userObj)
                localStorage.setItem('facebuukUsers', JSON.stringify(allUsers))
                setTimeout(() => {
                    window.location.href = "../signin/signin.html"
                }, 2000)
            }
        } else {
            showError2.style.display = 'block'
        }


        firstName.value = ''
        lastName.value = ''
        email.value = ''
        password.value = ''
    }
}