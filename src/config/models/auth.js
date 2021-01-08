export const authModel = {
    firstName: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Enter first name'
        },
        elementUIConfig: {
            grid: 'col-12'
        },
        value: '',
        displayText: 'First Name',
        addToRequest: true
    },
    lastName: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Enter last name'
        },
        elementUIConfig: {
            grid: 'col-12'
        },
        value: '',
        displayText: 'Last Name',
        addToRequest: true
    },
    email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'Enter email'
        },
        elementUIConfig: {
            grid: 'col-12'
        },
        value: '',
        displayText: 'Email',
        addToRequest: true,
        loginField: true
    },
    password: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'Enter password'
        },
        elementUIConfig: {
            grid: 'col-12'
        },
        value: '',
        displayText: 'Password',
        addToRequest: true,
        loginField: true
    }
}