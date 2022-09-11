// const form = document.querySelector('form')
// const nameInput = document.querySelector('#name-input')
const stateSelect = document.querySelector('#state-select');
const availableDiv = document.getElementById("availableDiv");
// const stateSlectedValue = document.querySelector('#state-select').value;
// const statesList = document.querySelector('#states-list')

function handleSubmit(e) {
    e.preventDefault()  
    
}

const getAvailableServicesByState = async() => {
 
    const stateSelectedValue= document.querySelector('#state-select').value;
    console.log("in available services")    
    console.log("stateselect  RRR- ", stateSelectedValue)

    availableDiv.innerHTML="";

    await axios.get(`http://localhost:5050/availableMedicalServicesByState/${stateSelectedValue}`)
        .then(res => {
            console.log("result data :: ",res.data)
            console.log("result data length  :: ",res.data.length)
            res.data.forEach(elem => {
                let stateCard = `<div class="state-card">
                    <h2>${elem.statename}, ${elem.stateid},${elem.location},${elem.servicename}</h2>
                    <h3>Contact: ${elem.contact}, 
                 
                    <a href='./appointment.html?id=${elem.id}'>Make an Appointment</a>
                    </h3>
                    <br> <br><br><br>
                    </div>
                `

                availableDiv.innerHTML += stateCard
            })
        })
}

const getStates = async()  => {
    try{
    console.log("grrtuui");
   const response = await axios.get('http://localhost:5050/states')
//    console.log(response)
   if(Array.isArray(response.data) && response.data.length > 0) {
    const data = response.data;
    // console.log(data);
    data.forEach(state => {
        const option = document.createElement('option')
        option.setAttribute('value', state['stateid'])
        option.textContent = state.statename
        stateSelect.appendChild(option)
    })

    
   }
}catch(errors){
    console.error(errors)
}


}


getStates()
getAvailableServicesByState()
//form.addEventListener('submit', handleSubmit)
stateSelect.addEventListener(`change`, getAvailableServicesByState)