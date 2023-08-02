const table = document.getElementById('contents');
const btn_loc = document.getElementById('locate');
const txtbox = document.getElementById('addrs');
console.log(btn_loc);

api_key = "ee2dfca941774c139225977bbddebb90" 

function onSuccess(position)
{
    let {latitude,longitude} = position.coords;
    console.log(latitude,longitude);
    fetch('https://api.opencagedata.com/geocode/v1/json?q='+latitude+','+longitude+'&key='+api_key)
    .then(response=>(response.json())).then(result=>{
        let details = result.results[0].components;
        let {county,country,postcode} = details;
        // console.log(county,country,postcode);
        console.log(details);
        for(obj in details)
        {
            txtbox.innerHTML += obj+"--->"+details[obj];
            txtbox.innerHTML+="|  ";
            let row = '<tr><td>'+obj+'</td><td>'+details[obj]+'</td></tr>';
            table.innerHTML+=row;
            
        }
    })
}

function onError(error)
{
    console.log(error);
}
btn_loc.addEventListener("click", ()=>{
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    }
    else
    {
        btn_loc.innerText = "Geoloaction not supported";
    }
})

// console.log(latd,longt);
