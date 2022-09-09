console.log("javascript connected 1");

// inputs

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const nameInput = document.querySelector('#username')
const submitBtn = document.querySelector('#submit_button');

const getSubmit = document.getElementById('getSubmit');

// response section
const responseSection = document.getElementsByClassName('response-area')[0];


const getValidateLogin = () => {
console.log("RRRRRRRRgetValidateLogin");
console.log(usernameInput.value);
    axios.get(`http://localhost:5051/login/${usernameInput.value}`)
    .then(res => {
        console.log("result ::" , res.data);
        res.data.forEach(login => {
            console.log(login);

        })
    })
}


submitBtn.addEventListener('click', getValidateLogin)