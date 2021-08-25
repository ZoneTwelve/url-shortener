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
    request( `${location.origin}/new/`, {
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfmiddlewaretoken,
      },
      body: JSON.stringify(data)
    } ).then( json => {
      // apply data
      console.log( json );
    } );

  }catch(e){
    alert(e);
  }
  return false;
};

const show_history = ( ) => {
  // using localStorage
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
  document.forms.creator.onsubmit = create;
  show_history( );

  //test zone
  for(let el of document.querySelectorAll('.short_url'))
    el.onclick = () => copy_text( el );
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