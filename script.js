const getBtn = document.getElementById("get");
const postBtn = document.getElementById("post");
const putPatchBtn = document.getElementById("put-patch");
const deleteBtn = document.getElementById("delete");
const aynıAndaIstekBtn = document.getElementById("ayni-anda-istek");
const headersBtn = document.getElementById("headers");
const hataBtn = document.getElementById("hata");


getBtn.addEventListener("click", getData);
postBtn.addEventListener("click", postData);
putPatchBtn.addEventListener("click", putPatchData);
deleteBtn.addEventListener('click', deleteItem)
aynıAndaIstekBtn.addEventListener("click", ayniAndaIstekData);
headersBtn.addEventListener("click", customHeader);
hataBtn.addEventListener("click", hataIslemleri);



function getData() {
  /* axios({
    method: "GET",
    url: "https://jsonplaceholder.typicode.com/users",
    params: {
        _limit:2
    }
  })
    .then(respone => sonucuEkranaYazdir(respone))
    .catch(error=> console.log(error))
    .then(() => console.log("get isteği tamamlandi")); */


    /* axios.get("https://jsonplaceholder.typicode.com/users",{
        params: {
            _limit:2
        }
    })
    .then(response => sonucuEkranaYazdir(response))
    .catch(hata=> console.log(hata)); */

    
    axios.get("https://jsonplaceholder.typicode.com/users?_limit=1")
    .then(response => sonucuEkranaYazdir(response))
    .catch(hata=> console.log(hata));

    axios("https://jsonplaceholder.typicode.com/users?_limit=1")
    .then(response => sonucuEkranaYazdir(response))
    .catch(hata=> console.log(hata));
}

function postData() {
 /* axios.post('https://jsonplaceholder.typicode.com/posts',{
    title: "yeni başlık",
    body: "Burası body kısmı",
    userId: 17
 })
 .then(response => sonucuEkranaYazdir(response))
 .catch(hata=> console.log(hata)); */

axios.post("https://jsonplaceholder.typicode.com/users",{
 name: "emre altunbilek",
 username: 'eörealtunbilek',
 email: 'emree@ldmdlm.com'
})
    .then(response => sonucuEkranaYazdir(response))
    .catch(hata=> console.log(hata));


}

function putPatchData() {

/* axios.put("https://jsonplaceholder.typicode.com/users/1",{
 name: "emre altunbilek",
 username: 'eörealtunbilek',
 email: 'emree@ldmdlm.com'
})
    .then(response => sonucuEkranaYazdir(response))
    .catch(hata=> console.log(hata)); */

axios.patch("https://jsonplaceholder.typicode.com/users/1",{
 name: "emre altunbilek",
 username: 'eörealtunbilek',
 email: 'emree@ldmdlm.com'
})
    .then(response => sonucuEkranaYazdir(response))
    .catch(hata=> console.log(hata));

}

function deleteItem(){
  axios.delete("https://jsonplaceholder.typicode.com/posts/1")
  .then(response => sonucuEkranaYazdir(response))
  .catch(hata=> console.log(hata));
}
 

function ayniAndaIstekData() {
/*   axios.all([
    axios.get("https://jsonplaceholder.typicode.com/users"),
    axios.get("https://jsonplaceholder.typicode.com/posts"),
  ]).then(response =>{
    console.log(response[0].data);  
    console.log(response[1].data); 
  }) */
  axios.all([
    axios.get("https://jsonplaceholder.typicode.com/users"),
    axios.get("https://jsonplaceholder.typicode.com/posts"),
  ]).then(axios.spread((users, posts)=>{
    console.log(users.data); 
    console.log(posts.data);
  }))
}

function customHeader() {
  

  const config ={
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Sizintokendeğerimiz' 
    }
  }
  axios.post("https://jsonplaceholder.typicode.com/users",{
 name: "emre altunbilek",
 username: 'eörealtunbilek',
 email: 'emree@ldmdlm.com'
},config)
    .then(response => sonucuEkranaYazdir(response))
    .catch(hata=> console.log(hata));

}

function hataIslemleri() {
  axios.post("https://jsonplaceholder.typicode.com/userssas?_limit=1")
  .then(response => sonucuEkranaYazdir(response))
  .catch(hata=> hatayiYazdir(hata));
}

function hatayiYazdir(hata) {

  document.querySelector(".sonuc").innerHTML = `
<div class="notification is-info">
<div class="column is-mobile is-vcentered">
    <div class="column"> <h1 class="subtitle">Sonuc</h1></div>
    <div class="column"> <h1 class="title">
    <pre>${JSON.stringify(hata.response, null, 2)}</pre>
    </h1></div>
</div>
</div> `
}

function sonucuEkranaYazdir(response) {
  document.querySelector(".sonuc").innerHTML = `
<div class="notification is-info">
<div class="column is-mobile is-vcentered">
    <div class="column"> <h1 class="subtitle">Sonuc</h1></div>
    <div class="column"> <h1 class="title">${response.status}</h1></div>
</div>
</div>

<div class="section">
<article class="message is-success">
  <div class="message-header">
    <p>Header</p>
  </div>
  <div class="message-body has-background-white has-text dark">
   <pre> ${JSON.stringify(response.headers,null,4)}</pre>
  </div>
</article>
</div>

<div class="section">
<article class="message is-warning">
  <div class="message-header">
    <p>Data</p>
  </div>
  <div class="message-body has-background-white has-text dark">
  <pre> ${JSON.stringify(response.data,null,4)}</pre>
  </div>
</article>
</div>

<div class="section">
<article class="message is-primary">
  <div class="message-header">
    <p>Config</p>
  </div>
  <div class="message-body has-background-white has-text dark">
  <pre> ${JSON.stringify(response.config,null,4)}</pre>
  </div>
</article>
</div>`;
}
