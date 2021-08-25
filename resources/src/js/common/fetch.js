const request = ( url, opt ) => {
  return fetch( url, opt ).then( res => {
    /* Data checking */
    return res.json();
  } );
}