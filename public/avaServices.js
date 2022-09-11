// const form = document.querySelector('form')
// const nameInput = document.querySelector('#name-input')
const stateSelect = document.querySelector('#state-select')
const statesList = document.querySelector('#states-list')

function handleSubmit(e) {
    e.preventDefault()  
    
}

const getAvailableServicesByState = async() => {
    stateList.innerHTML = ''

    await axios.get(`http://localhost:5050/availableMedicalServices/${stateSelect}`)
        .then(res => {
            console.log(res)
            res.data.forEach(elem => {
                let stateCard = `<div class="state-card">
                    <h2>${elem.stateName}, ${elem.location}</h2>
                    <h3>Contact: ${elem.contact}</h3>
                    </div>
                `

                stateList.innerHTML += stateCard
            })
        })
}

const getStates = async()  => {
    try{
    console.log("grrtuui");
   const response = await axios.get('http://localhost:5050/states')
   console.log(response)
   if(Array.isArray(response.data) && response.data.length > 0) {
    const data = response.data;
    console.log(data);
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
//form.addEventListener('submit', handleSubmit)
statesList.addEventListener(`select`, getAvailableServicesByState)