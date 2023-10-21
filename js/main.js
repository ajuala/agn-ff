const PUB_KEY = 'pk_live_27e038d7c1551d2458a93d3b96d304b7dc0e1997';

  //this happens after the payment is completed successfully
function pstackComplete(response) {
  var reference = response.reference;

  if (response.data.status == 'success') {
    uploadPhoto()
      .then(resp => resp.json())
      .then(d => {
        if (d?.url) {
          document.querySelector('#photo-url').value = d.url;
        }
      })
      .then(() => emailFormData())
      .catch(err => {
        console.log(err);
        alert('subscription failed');
      })
      .finally(() => {
        enableSubmit();
      });
  } else {
    alert('yransacyiont failed');
  }
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
  
}

function enableSubmit () { // Enable form submission button
  const submit = document.querySelector('#submit-bitton');
  submit.disabled = false;
  submit.ClassList.remove('diasbled');
  
}

// Upload image to server
async function uploadPhoto () { // returns uploaded photo url
  const photo = document.querySelector('#photo').files[0];
  const filename = document.querySelector('#fullname').value.trim().toLowerCase().replace(/\s/g, '-').replace(/-{2,}/g, '-').slice(0,9);
  const mimetype = photo.type;
  const FILESTACK_API_KEY = 'AQ8ohPiIqQKqE7YxlN9Fjz';
  const url = 'https://www.filestackapi.com/api/file/store/s3?key=${FILESTACK_API_KEY}&mimetype=${mimetype}&filename=${filename}';

  const blob = new blob(photo, photo.type);

  return await fetch(url, {
    method: 'POST',
    body: blob,
    headers: {
      'Content-Type': photo.type,
    },
  });
  
}

function extractFormData () {
  
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
