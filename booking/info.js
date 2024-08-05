

fetch('https://se-tasks.vercel.app/events').then(function(res){
    return res.json();
}).then(function(data) {
    append_data(data);})
    .catch( function(error){
    console.log(error);
})

function append_data(data) {
    var box= document.querySelector('main')
    for(var i=0;i<data.length;i++){
        var card= document.createElement("div");
        card.className="card";
        var eve_name = document.createElement("h2");
        eve_name.innerHTML = data[i].name;
        card.appendChild(eve_name);
        //adding image
        var pic = document.createElement('img');
        if(data[i].name === "Summer Music Festival")
        {
            pic.src="/booking/musical.png";
        }
        else if(data[i].name === "Soccer Championship")
        {
            pic.src="/booking/football.png";
        }
        else{
            pic.src="/booking/mistique.png";
        }
        card.appendChild(pic);

        //adding effect of hover 
        var details = document.createElement('div');
        details.className='info';
        var description =  document.createElement("p");
        description.innerHTML= "About the event:- " +  data[i].description;
        details.appendChild(description);
        var date = document.createElement("p");
        date.innerHTML=" Date:- " +  (data[i].date).split('T')[0];
        details.appendChild(date);
        var time = document.createElement("p");
        time.innerHTML=" Timings:- " + data[i].time;
        details.appendChild(time);
        var loc = document.createElement("p");
        loc.innerHTML=" Venue:- " + data[i].venue;
        details.appendChild(loc);
        var book = document.createElement('button');
        book.innerHTML= "Book now";
        details.appendChild(book);

        book.addEventListener("click", (function(eventData) {
            return function() {
                var moreInfoDiv = createMoreInfoDiv(eventData);
                card.appendChild(moreInfoDiv);
                moreInfoDiv.style.display = 'block';
            }
        })(data[i])); // Immediately invoke the function with data[i]

        card.appendChild(details);
        box.appendChild(card);

    }
 }

    function createMoreInfoDiv(eventData){
    
        var div = document.createElement("div");
            div.className ='more_info';
            
    
            //div.style.display = 'none';
    
            //putting a cross at side
            var cross = document.createElement("span");
            cross.className ="cross";
            cross.innerHTML="&times;";
            div.appendChild(cross);
    
            cross.addEventListener('click', () => {
                div.style.display = 'none';
              });
    
             // event details:-
             var evename = document.createElement("p");
                evename.innerHTML = "Event Name: " + eventData.name;
                div.appendChild(evename);
                var description = document.createElement("p");
                description.innerHTML = "About the event: " + eventData.description;
                div.appendChild(description);
                var date = document.createElement("p");
                date.innerHTML = "Date: " + (eventData.date).split('T')[0];
                div.appendChild(date);
                var time = document.createElement("p");
                time.innerHTML = "Timings: " + eventData.time;
                div.appendChild(time);
                var loc = document.createElement("p");
                loc.innerHTML = "Venue: " + eventData.venue;
                div.appendChild(loc);
                var category = document.createElement("p");
                category.innerHTML = "Category: " + eventData.category;
                div.appendChild(category);


                return div;
            }

      
