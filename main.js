$( document ).ready(()=>{
    // variables and class instantiation
    $submit = $('#submit');   
    $myCard = $('#my-card');
    $currentLocationBtn = $("#current-location-btn");
    pageController = new Controller;

    $currentLocationBtn.click(()=>{
        let lat;
        let lon;
        let coords = navigator.geolocation.getCurrentPosition((position)=>{
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            pageController.swapElement("main-view", views.loader); 
            pageController.apiCall(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&APPID=44ea42967b627e5d041106235be0242a`);
        });
    })

    $submit.click(()=>{
        $city = $('#city').val();
        pageController.swapElement("main-view", views.loader)  
        pageController.apiCall(`https://api.openweathermap.org/data/2.5/forecast?zip=${$city}&units=imperial&APPID=44ea42967b627e5d041106235be0242a`)
    })
});

// all possible views in the app
views = {
    start:` <div class="main-header"><h1 class="main-font" id=main-text>Local Weather App</h1></div>  
    <div class="center" id="main-view">
        <input id="zip" class="rounded" type="text" pattern="[0-9]{5}" required minlength="5" required maxlength="5" placeholder="Enter Your Zip Code" />
        <button id="submit" type="button" class="success button full rounded font-white">Save</button>
    </div>`,
    loader:"<div id='loader-container' class='loader-container'><div id='loader' class='lds-dual-ring'></div><div>Beep Boop Beep...</div></div>",
    response(data){
        let icon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`  
        return(
        `
        <div id='my-card' class="my-card center">
            <h1> ${data.main.temp} F</h1>
            <img src=${icon} />
        </div>
        `
        )
    }
}

class Controller{    
    swapElement(id, newEle) {
        let $temp = $(`#${id}`)
        $temp.replaceWith(newEle)
    }

    async apiCall(url){
        try{
            const { data } = await axios.get(url) 
            this.apiData = data
        } catch (err) {
            console.log(err)
            return
        }
        setTimeout(()=>{
            this.swapElement("loader-container",views.response(this.apiData))
        },2500) 
    }
}