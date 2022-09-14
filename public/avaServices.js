
const stateSelect = document.querySelector('#state-select');
const availableDiv = document.getElementById("availableDiv");


// function handleSubmit(e) {
//     e.preventDefault()  
    
// }

const getAvailableServicesByState = async() => {
 
    const stateSelectedValue= document.querySelector('#state-select').value;
    console.log("in available services")    
    console.log("stateselect  RRR- ", stateSelectedValue)

    availableDiv.innerHTML="";

    var res = await axios.get(`http://localhost:5050/availableMedicalServicesByState/${stateSelectedValue}`)
        
            console.log("result data :: ",res.data)
            console.log("result data length  :: ",res.data.length)
           
            res.data.forEach(elem => {
               

                let stateCard = ` <div class="state-card" >
                <img src="./images/${elem.imagepath}" class = "imgcard"></img>
            
                <h2>${elem.servicename}<br>${elem.location} <br> ${elem.statename}</h2>
                <h3>Contact: ${elem.contact} </h3>
                <a href='./appointment.html?id=${elem.id}'>Make an Appointment</a>
                </div>
                `
               availableDiv.insertAdjacentHTML("beforeend", stateCard)
                
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

stateSelect.addEventListener(`change`, getAvailableServicesByState)