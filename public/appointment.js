var urlParams;
const locationdiv = document.getElementById("location")
const nameInput  = document.getElementById("name-input")
const appointmentDate = document.getElementById("appointment-date")
const appointmentLocationId = document.getElementById("serviceId")
const appointmentBtn  = document.getElementById("appointmentBtn")

const getLocataion = async() => {
       
    try{
      console.log(`id value ${appointmentLocationId.value}`)
        const response = await axios.get(`http://localhost:5050/availableMedicalServices/${appointmentLocationId.value}`)
        console.log(response);
      
         locationdiv.innerHTML= response.data[0].location;
         appointmentLocationId.value = response.data[0].id;

 
     }
        catch(error) {
         console.error(error)
 
         }
}

(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);
  
    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
       console.log(urlParams)
       document.getElementById('serviceId').value = urlParams["id"];
       getLocataion();
})();


function isInTheFuture(date) {
    const today = new Date();
  
    return date > today;
  }

function createAppointment() {
    console.log(` serviceid in createappointment ${appointmentLocationId.value}`)
    if (nameInput.value < 1) {
        alert ('You must enter your details for making an appointment')
        return
    }
    console.log(appointmentDate.value)

    // if (!isInTheFuture(appointmentDate.value)) {
    //     alert (`Date has to be in future ${appointmentDate.value}` )
    //     return
    // }
   
    let body = {
        contactName: nameInput.value, 
        appointmentDate : appointmentDate.value,
        serviceId: appointmentLocationId.value

    }
    console.log()
    try{
            console.log("trying to insert from frontend")
            const res =  axios.post('http://localhost:5050/appointment', body)
       
            console.log(res)
            nameInput.value = ''
            appointmentDate = new Date()
            appointmentLocationId.value = res.data.serviceid
            getLocataion();
        
    }catch (errors){
            console.error(errors)

        }
}




appointmentBtn.addEventListener('click', createAppointment)