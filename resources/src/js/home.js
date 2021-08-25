const create = ( self ) => {
  let form = self.currentTarget;
  try{
    console.log( form );
    // let csrftoken = getCookie('csrftoken');
    let url = form.url.value,
        csrfmiddlewaretoken = form.csrfmiddlewaretoken.value;
    let data = {
      url, csrfmiddlewaretoken
    }
    console.log( csrfmiddlewaretoken );
    form.url.value = "";
    request( `${location.origin}/new/`, {
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfmiddlewaretoken,
      },
      body: JSON.stringify(data)
    } ).then( json => {
      // apply data
      apply_information( json )
      // alert( JSON.stringify(json) );
      console.log( json );
    } );

  }catch(e){
    alert(e);
  }
  return false;
};

const apply_information = ( json ) => {
  try{
    if( localStorage.getItem("urls") == null ){
      localStorage.setItem("urls", "[]");
    }
    let urls = JSON.parse( localStorage.getItem("urls") );
    if( json != undefined ){
      urls.push( json );
      localStorage.setItem("urls", JSON.stringify( urls ));
    }
    apply_view( urls );
  }catch(e){
    alert(e);
  }
}

const apply_view = ( urls ) => {
  let history = document.querySelector("#history");
  history.innerHTML = "";
  for(let u of urls){
    console.log( u );
    let main  = createElement("div", {className:"md:flex"}),
        view  = createElement("div", {className:"w-full px-4 py-2"}),
        space = createElement("div", {className:"space-x-4"}),
        urlel = createElement("a", {href:u.url, innerText:u.url, onclick: ( self ) => copy_text(self.target), className:"short_url inline-block btn rounded-md bg-gray-200 text-gray-700 border border-gray-200 px-2 py-2 w-9/12"}),
        show  = createElement("button", {innerText:"Show", onclick: () => alert("準備中owo"), className:"inline-block btn rounded-md bg-gray-200 text-gray-700 border border-gray-200 px-4 py-2 text-center"});

    space.appendChild( urlel );
    space.appendChild( show );
    view.appendChild( space );
    main.appendChild( view );
    history.appendChild( main );
  }
  if( urls.length == 0 ){
    history.appendChild( createElement("p", {innerText:"Empty...", className:"md:flex w-full px-12"}) )    
  }
}

const copy_text = ( node ) => {
  if (document.body.createTextRange) {
    var range = document.body.createTextRange();
    range.moveToElementText(node);
    range.select();
    document.execCommand("copy");
    alert("複製成功!");
  } else if (window.getSelection) {
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
    alert("複製成功!");
  } else {
    alert('無法複製內容、瀏覽器不支援');       
  }
}

window.onload = function( ){
  apply_information( );
  document.forms.creator.onsubmit = create;
  // show_history( );

  //test zone
  // for(let el of document.querySelectorAll('.short_url'))
  //   el.onclick = () => copy_text( el );
}

// function getCookie(name) {
//   var cookieValue = null;
//   if (document.cookie && document.cookie !== '') {
//       var cookies = document.cookie.split(';');
//       for (var i = 0; i < cookies.length; i++) {
//           var cookie = cookies[i].trim();
//           if (cookie.substring(0, name.length + 1) === (name + '=')) {
//               cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//               break;
//           }
//       }
//   }
//   return cookieValue;
// }