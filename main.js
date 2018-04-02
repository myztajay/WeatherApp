$( document ).ready(()=>{
    $button = $('#submit');
    
    $myCard = $('#my-card');
    pageController = new Controller;
    $button.click(()=>{
        $zip = $('#zip').val();
        pageController.swapElement("main-view", views.loader)  
        pageController.apiCall(`https://api.openweathermap.org/data/2.5/forecast?zip=${$zip}&units=imperial&APPID=44ea42967b627e5d041106235be0242a`)

    })
});

views = {
    start:` <div class="main-header"><h1 class="main-font" id=main-text>Local Weather App</h1></div>  
    <div class="center" id="main-view">
        <input id="zip" class="rounded" type="text" pattern="[0-9]{5}" required minlength="5" required maxlength="5" placeholder="Enter Your Zip Code" />
        <button id="submit" type="button" class="success button full rounded font-white">Save</button>
    </div>`,
    loader:"<div id='loader-container' class='loader-container'><div id='loader' class='lds-dual-ring'></div><div>Beep Boop Beep...</div></div>",
    response(data){
        let icon = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`
        
        return(
        `
        <div id='my-card' class="my-card center">
            <h1> ${data.list[0].main.temp} F</h1>
            <img src=${icon} />
        </div>
        `
        )
    }
}

class Controller{
    swapElement(id, newEle) {
        // change content of element
        let $temp = $(`#${id}`)
        $temp.replaceWith(newEle)
    }

    async apiCall(url){
        try{
 
            const { data } = await axios.get(url)
            console.log(data)
            this.weatherData = data
        } catch (err) {
            console.log(err)
            return
        }
        setTimeout(()=>{
            this.swapElement("loader-container",views.response(this.weatherData))
        },2500)
    }
}