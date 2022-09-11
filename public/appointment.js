var urlParams;
const appointmentLocationId = "";

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
   
})();
const locationdiv = document.getElementById("location")

const getLocataion = async() => {
       
    try{
      
        const response = await axios.get(`http://localhost:5050/availableMedicalServices/${urlParams["id"]}`)
        console.log(response);
      
         locationdiv.innerHTML= response.data[0].location;
 
     }
        catch(error) {
         console.error(error)
 
         }
}

getLocataion();