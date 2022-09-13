
const stateSelect = document.querySelector('#state-select');
const availableDiv = document.getElementById("availableDiv");


function handleSubmit(e) {
    e.preventDefault()  
    
}

const getAvailableServicesByState = async() => {
 
    const stateSelectedValue= document.querySelector('#state-select').value;
    console.log("in available services")    
    console.log("stateselect  RRR- ", stateSelectedValue)

    availableDiv.innerHTML="";

    var res = await axios.get(`http://localhost:5050/availableMedicalServicesByState/${stateSelectedValue}`)
        
            console.log("result data :: ",res.data)
            console.log("result data length  :: ",res.data.length)
            let tabledataL = '<table class="tableclass">'
            let i=2;
            res.data.forEach(elem => {
                // let appointmetdiv = getappointmentdiv(elem);
                if(i%2===0){
                    tabledataL +='<tr class="trclass">'
                }
                tabledataL += '<td class ="tdclass">'

                let stateCard = ` <div class="state-card" >
                <img src="./images/${elem.imagepath}" class = "imgcard"></img>
            
                <h2>${elem.servicename}<br>${elem.location} <br> ${elem.statename}</h2>
                <h3>Contact: ${elem.contact} </h3>
                <a href='./appointment.html?id=${elem.id}'>Make an Appointment</a>
                </div>
                `
               
                // availableDiv.innerHTML += stateCard
                tabledataL += stateCard
                tabledataL += `</td>`
                if(i%2===0){
                    tabledataL += `</tr>`
                }
                i++;
                
            })

            tabledataL += `</table>`
            availableDiv.innerHTML  += tabledataL
        
    }


const enableappointmentdiv =  (id,  location) =>{
    let appointmentdiv = document.getElementById(`appointment-card-${id}`);
    appointmentdiv.innerHTML = getappointmentdiv(id,location);
    if (appointmentdiv.style.display === "none") {
        appointmentdiv.style.display = "block";
      } 
}
const getappointmentdiv =  (id, location) =>{

    let appointmentCard = `
    <h4>Appointment for ${location}</h4>
    <table>
    <tr>
        <td>
            <label for="name-input">Name:</label>
        </td>
        <td>
            <input type='text' id="name-input-${id}"/>
        </td>
    </tr>
    <tr>
        <td>
            <label for="appointment-date">Date:</label>
        </td>
        <td>
            <input type="date" id="appointment-date-${id}" >
        </td>
    </tr>
    </table>
 
    <button onClick="makeAppointment(${id})">Submit</button>
    </h3>
    <br> <br><br><br>
    `
    return appointmentCard;

}

const makeAppointment = async(id, dateval, nameval) =>
{
alert(`in make appointment`)
    // let name = document.getElementById(`name-input-${id}`);
    // let date = document.getElementById(`appointment-date-${id}`);
       
        let body = {
            contactName: nameval, 
            appointmentDate : dateval,
            serviceId: id
    
        }
        alert(body)
        try{
                console.log("trying to insert from frontend")
                const res =  await axios.post('http://localhost:5050/appointment', body)
           
                console.log(res)
            
        }
        catch (errors)
        {
                console.error(errors)
    
        }
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