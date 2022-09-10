console.log("javascript connected 1");

// inputs

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const nameInput = document.querySelector('#username')
const submitBtn = document.querySelector('#submit_button');
const errorDiv = document.querySelector('#errorDiv');

const getSubmit = document.getElementById('getSubmit');

// response section
const responseSection = document.getElementsByClassName('response-area')[0];


const getValidateLogin = () => {
console.log("RRRRRRRRgetValidateLogin");
console.log(usernameInput.value);
    axios.get(`http://localhost:5050/login/${usernameInput.value}`)
    .then(res => {

        console.log("result ::" , res.data);
        // res.data.forEach(login => {
        //     console.log(login);

        // })
        console.log(res.data[0].username);
        //console.log(res.length)
    
        if(res.data[0].password === passwordInput.value ){
            console.log(" password  is  equal ");
        }else {
            errorDiv.innerHTML = '<div><h5>Credentials are NOT valid. Please re-enter</h5></div>';
        }  
    })
}


submitBtn.addEventListener('click', getValidateLogin)