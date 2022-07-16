
const API_KEY='api_key=d14678ed0457e9400492dcf8b9c4e888';
const BASE_URL='https://api.themoviedb.org/3';
const API_URL= BASE_URL + '/discover/movie?sort_by=popularity.desc&'+ API_KEY;
const search_URL= BASE_URL + '/search/movie?'+ API_KEY;
const IMG_URL='https://image.tmdb.org/t/p/w500';
const main=document.getElementById('main');
const form=document.getElementById('form');
const search=document.getElementById('search');
getResults(API_URL);
async function getResults(url)
 {
   const res=await axios.get(url);
   
console.log(res.data.results);
   ShowMovie(res.data.results);
   
 }

 function ShowMovie(data)
 {
    main.innerHTML='';
    data.forEach(movie => {
        const { title, poster_path,vote_average,overview} = movie;
        const movieEl=document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML= `
        <img src="${IMG_URL+poster_path}" alt="${title}">
        
        <div class="movie-info">
           <h1>${title}</h1>
           <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
           <h3>Overview</h3>
           ${overview}
        </div>
       </div>`
      main.appendChild(movieEl) ;
        
    })
 }
 
 function getColor(x)
   {
      if(x>=8)
         return "green"
      else if(x>=6.5)
        return "orange"
      else 
        return "red"

   }
   form.addEventListener('keyup',(e)=>
   { 
     e.preventDefault();
     const searchterm=search.value;
     console.log(searchterm);
     if(searchterm)
       {
        getResults(search_URL+'&query='+searchterm);
       }
      else
       {
        getResults(API_URL);
       }
   }
   )  
   