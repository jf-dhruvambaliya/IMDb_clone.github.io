
    let waiting_Movie;

    let box = document.querySelector(".imgbox");
    // click on search button so call a function checkOn1
    function CheckOn1(){
        let Search = document.querySelector("#moviename").value;
        CheckOn(Search)
    }
// main data collection for API 
    async function CheckOn(Search) {
        try {
        
            let res = await fetch("https://www.omdbapi.com/?t=" + `${Search}` + "&APIKEY=8d23f071&");

            let data = await res.json();
        

            if (data.DVD === undefined) {
                var fake = {
                    Poster: "https://reactnativecode.com/wp-content/uploads/2018/01/Error_Img-300x238.png",
                    Title: "Data Not Found",
                    imdbRating: "Data Not Found",
                    DVD: "Data Not Found",
                }
                display(fake);
            }
            else {
                display(data);
            }
            document.querySelector("#moviename").value = "";

        }
        catch (error) {
            console.log("my first use of async await", error)


        }
    }

    let p = document.querySelector(".recommended")
// main poster data display function 
    function display(data) {
        p.innerHTML = "";
        box.innerHTML = "";
        let div = document.createElement("div");
        let des = document.createElement("div");
        des.className = "des";
        let img = document.createElement("img");
        img.className = "Moimg"
        img.src = data.Poster;
        let Movie_name = document.createElement("h2");
        Movie_name.textContent = data.Title;
        Movie_name.className = "Movie_name"
        let Date = document.createElement("p");
        Date.innerText = data.DVD;
        Movie_name.className = "Movie_date"
        if (Number(data.imdbRating) > 8.5) {
            p.innerHTML = "";
            let recom = document.createElement("p");
            recom.textContent = "Imdb Rating is Above ⭐8.5"
            p.append(recom);
            console.log("here");
        }
        let rating = document.createElement("p");
        rating.innerText = "⭐" + data.imdbRating;
        Movie_name.className = "Movie_rating"

        des.append(Movie_name, Date, rating)
        div.append(img);
        box.append(div, des);

    }


    // debounce function on search bar 
    async function searchMovie() {
        try {
            let Movie = document.querySelector("#moviename").value;

            let res = await fetch("https://www.omdbapi.com/?s=" + `${Movie}` + "&APIKEY=8d23f071&");

            let data = await res.json();
            suggetion(data.Search);
            
        



        }
        catch (error) {
           console.log("debounce",error)
        }
    }

    //   fetch requriced for same time  and cancel requriced for API 
    function debounce(func, delay) {
        if (waiting_Movie) {
            clearTimeout(waiting_Movie)
        }

        waiting_Movie = setTimeout(function () {
            func();
        }, delay);
    }


    // disply function of debounce
    let sugBox = document.querySelector(".suggetion");
    function suggetion(data) {
        
        sugBox.innerHTML = "";
        data.forEach(function (ele) {
            let MOname = document.createElement("h1");

            MOname.textContent = ele.Title;
            MOname.style.color = "white"
            let img = document.createElement("img")
            img.src = ele.Poster;
            img.className = "manuimg";
            let innerbox = document.createElement("div");
            innerbox.className = "innerbox"
            innerbox.style.cursor="pointer"
            innerbox.addEventListener("click",function(){
                clickOn(ele);
            })
            let hr = document.createElement("hr");
            innerbox.append(MOname, img)
            sugBox.append(innerbox, hr);
        })



    }

    //  debounce suggetion movie click function
    function clickOn(ele){
        sugBox.innerHTML = "";
        document.querySelector("#moviename").value = "";
        CheckOn(ele.Title)
       


    }

