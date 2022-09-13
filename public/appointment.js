var urlParams;
const locationdiv = document.getElementById("location")
const nameInput  = document.getElementById("name-input")
const appointmentDate = document.getElementById("appointment-date")
// const appointmentLocationId = document.getElementById("serviceId")
const appointmentBtn  = document.getElementById("appointmentBtn")
const appointmentListDiv  = document.getElementById("appoitmentListDiv")


const listAppointmnets = async() => {
       
    try{

        // alert("test");
        const response = await axios.get(`http://localhost:5050/appointments`)
        console.log(response);
        // alert(response.data[0].contactname)
        let tabledataL = '<table class="tableclass">'
        let i=2;
        response.data.forEach(elem => {
            if(i%2===0){
                tabledataL +='<tr class="trclass">'
            }
            tabledataL += '<td class ="tdclass">'
            let appointCard =  `
            <div class="appoint_card">
                <h2>Name : ${elem.contactname}<br> 
                Date: ${elem.appointmentdate}<br>
                Location : ${elem.location}<br>
                Contact : ${elem.contact}<br>

                </h2>
            </div>
            `
            tabledataL += appointCard
            tabledataL += '</td>'
            if(i%2===0){
                tabledataL += '</tr>'
            }
            i++;
        })

        tabledataL += `</table>`;
        appointmentListDiv.innerHTML  += tabledataL
      


 
     }
        catch(error) {
         console.error(error)
 
         }
}


const getLocataion = async() => {
       
    try{
        if (document.getElementById("serviceId").value === 'undefined'){
            listAppointmnets()
            document.getElementById("bookApointmentForm").style.visibility ="hidden"
        return
    }
    //   console.log(`id value ${document.getElementById("serviceId").value}`)
        const response = await axios.get(`http://localhost:5050/availableMedicalServices/${document.getElementById("serviceId").value}`)
        // console.log(response);
      
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
       if( !(urlParams["id"] == 'undefined')){
            document.getElementById('serviceId').value = urlParams["id"];
        }
       getLocataion();
})();


function isInTheFuture(date) {
    const today = new Date();
  
    return date > today;
  }

const  createAppointment = async() => {
    console.log(` serviceid in createappointment ${document.getElementById("serviceId").value}`)
    if (nameInput.value.length < 1) {
        alert ('You must enter your details for making an appointment')
        return
    }
    console.log(appointmentDate.value)

    // if (!isInTheFuture(appointmentDate.value)) {
    //     alert (`Date has to be in future ${appointmentDate.value}` )
    //     return
    // }
   
    const body = {
        contactName: nameInput.value, 
        appointmentDate : appointmentDate.value,
        serviceId: document.getElementById("serviceId").value

    }
    console.log()
//   alert("debug 1" + document.getElementById("serviceId").value);
    try{
            console.log("trying to insert from frontend" + body.serviceId)
            // alert("trying to insert from frontend" + body.serviceId)
            const res =  await axios.post('http://localhost:5050/appointment', body)
       nameInput.value = body.Name;
       appointmentDate.value = body.appointmentDate;
       document.getElementById("servceId").value = body.serviceId
       alert(`appointment created for ${appointmentDate.value}`)
             getLocataion();
              }
              catch (errors){
             console.error(errors)

        }
}




appointmentBtn.addEventListener('click', createAppointment)