let PUB_KEY = 'pk_live_27e038d7c1551d2458a93d3b96d304b7dc0e1997';
let TEST_KEY =  'pk_test_ff549a15ff6161fc7c8b1607e20ef05a0f32692d';
// PUB_KEY = TEST_KEY;

  //this happens after the payment is completed successfully
function pstackComplete(response) {
  var reference = response.reference;
  document.querySelector('#paymentRef').value = reference;

    uploadPhoto();
}

function pstackAbort() {
  alert('Transaction was not completed, window closed.');
  enableSubmit();
}


// start: payWithPaystack()
function payWithPaystack(event) {
  event.preventDefault();

  disableSubmit();

  var handler = PaystackPop.setup({
    key: PUB_KEY, // Replace with your public key
    email: document.getElementById('email').value,
    amount: 5000 * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
    currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
    callback: pstackComplete,
    onClose: pstackAbort,
  });


  handler.openIframe();
}
// end: payWithPaystack()
document.querySelector('#subscr-form').addEventListener('submit', payWithPaystack, false);

// TODO: functions to develop
function disableSubmit () { // Disable form submission button
  const submit = document.querySelector('#submit-button');
  submit.disabled = true;
  submit.classList.add('disabled');
  submit.value = '...please wait';
  
}

function enableSubmit () { // Enable form submission button
  const submit = document.querySelector('#submit-button');
  submit.disabled = false;
  submit.ClassList.remove('disabled');
  submit.value = "Submit";
  
}

// Upload image to server
function uploadPhoto () { // returns uploaded photo url


  const photo = document.querySelector('#photo').files[0];
  const filename = photo.name.toLowerCase().replace(/\s+/g, '-');
  const mimetype = photo.type;
  const FILESTACK_API_KEY = 'AQ8ohPiIqQKqE7YxlN9Fjz';
let url = `https://www.filestackapi.com/api/store/s3?key=${FILESTACK_API_KEY}&mimetype=${photo.type}&filename=${filename}`;
  
    const reader = new FileReader();
  reader.onload = event => {

        const rawData = new Uint8Array(event.target.result);
        fetch(url, {
            method: 'POST',
            body: rawData,
            headers: {
                'Content-Type': mimetype
            }
        })
            .then(response => response.json())
            .then(data => document.querySelector('#photo-url').value = data?.url || '_blank')
      .then( mailForm )
            .catch( err => document.querySelector('#delme').textContent = err.toString())
      .finally(() => enableButton())
  }
    reader.readAsArrayBuffer(photo);


  
}

function mailForm () {
  document.querySelector('#subscr-form').submit();
  
}

async function emailFormData (arguments) {
  
  const form = document.getElementById('subscr-form');


  const formData = new FormData(form);

  const response = await fetch('https://formsubmit.co/kamalustudio@yandex.com', {
    method: 'POST',
    body: formData
  });

  const data = await response.json();

  console.log(data);
}
// end TODO: functions to develop
