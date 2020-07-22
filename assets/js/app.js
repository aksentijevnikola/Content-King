let templateContainer = document.querySelector('.template-container')
let formContainer = document.querySelector('.form-container');
let inputWrapper = document.querySelector('.input-wrapper');
let headlineInput = document.querySelector('.headline-input');
let subheadInput = document.querySelector('.subhead-input');
let textAreaOne = document.querySelector('.text-area-one');
let textAreaTwo = document.querySelector('.text-area-two');
let headlineInputWrapper = document.querySelector('.headline-input-wrapper')
let subheadInputWrapper = document.querySelector('.subhead-input-wrapper')
let textAreaOneWrapper = document.querySelector('.text-area-one-wrapper')
let textAreaTwoWrapper = document.querySelector('.text-area-two-wrapper')
let wrapper = document.querySelector('.template-wrapper')
let selectInputs = document.querySelectorAll('input, textarea');
selectInputs[0].focus()

let headlineValue;
let subheadValue;
let textAreaOneValue;
let textAreaTwoValue;
let insertWarning = function (type) {
  return `<div class="empty-warning ${type}-empty-warning">
    <div class="warning-icon">
      <i class="fas fa-info-circle"></i>
    </div> 
    <div class="warning-right">
      <p class="warning-title">Warning</p>
      <p class="warning-text">Please fill out this section</p>
    </div>
  </div>`
}
let insertLimitWarning = function (type, version) {
  return `<div class="warning ${type}-warning">
  <div class="warning-icon">
    <i class="fas fa-info-circle"></i>
  </div> 
  <div class="warning-right">
    <p class="warning-title">Warning</p>
    <p class="warning-text">Your ${version} is running a bit long. Want to re-think it?</p>
  </div>
</div>`
}
function createForm() {
  return `<form class="form-one">
  <label class="form-label version-number font-16">
    <div class="star"><i class="fas fa-asterisk"></i></div>(v.1)
  </label>
  <label class="form-label font-16">
    <div class="star"><i class="fas fa-asterisk"></i></div>Headline
  </label>
  <div class="headline-input-wrapper">
    <div class="warning-container"></div>
    <input type="text" class="form-input headline-input" onKeyDown="limitText(this,36);" onKeyUp="limitText(this,36);">
  </div>
  <label class="ingress-label  font-12">
    <div class="star"><i class="fas fa-asterisk"></i></div>Ingress text...
  </label>
  <div class="text-area-one-wrapper">
    <div class="warning-container"></div>
    <textarea class="form-textarea text-area-one" cols="30" rows="8" onKeyDown="limitText(this,351);" onKeyUp="limitText(this,351);"></textarea>
  </div>
  <label class="form-label font-16">
    <div class="star"><i class="fas fa-asterisk"></i></div>SubHead
  </label>
  <div class="subhead-input-wrapper">
    <div class="warning-container"></div>
    <input type="text" class="form-input subhead-input" onKeyDown="limitText(this,46);" onKeyUp="limitText(this,46);">
  </div>
  <label class="ingress-label font-12">
    <div class="star"><i class="fas fa-asterisk"></i></div>Ingress text...
  </label>
  <div class="text-area-two-wrapper">
    <div class="warning-container"></div>
    <textarea class="form-textarea text-area-two" cols="30" rows="8" onKeyDown="limitText(this,351);" onKeyUp="limitText(this,351);"></textarea>
  </div>
  <button class="btn-primary sendBtn">Send</button>
</form>`
}
let showText = function (headline, area1, subhead, area2) {
  formContainer.innerHTML += `
        <div class="text-wrapper">
          <p class="headline-text font-16">${headline}</p>
          <p class="headline-ingress-text font-12">${area1}</p>
          <p class="subhead-text font-16">${subhead}</p>
          <p class="subhead-ingress-text font-12">${area2}</p>
        </div>`
}
function createPost() {
  headlineValue = document.querySelector('.headline-input').value;
  subheadValue = document.querySelector('.text-area-one').value;
  textAreaOneValue = document.querySelector('.subhead-input').value;
  textAreaTwoValue = document.querySelector('.text-area-two').value;
  if (headlineValue != "" && subheadValue != "" && textAreaOneValue != "" && textAreaTwoValue != "") {
    console.log(headlineValue, subheadValue, textAreaOneValue, textAreaTwoValue)
    formContainer.innerHTML = '';
    formContainer.classList.remove('page-1')
    formContainer.classList.add('page-2')
    showText(headlineValue, textAreaOneValue, subheadValue, textAreaTwoValue)
    formContainer.innerHTML += `
    <div class="btn-wrapper">
      <button class="btn-primary submitBtn">Submit</button>
      <button class="btn-primary back-btn">Back</button>
    </div>
    <div class="btn-container">
      <i class="fas fa-download download-icon"></i>
    </div>`
    if (formContainer.offsetHeight < window.innerHeight) {
      templateContainer.style.height = "100vh"
      wrapper.style.height = "100vh"
      document.querySelector('.btn-wrapper').classList.add('btn-wrapper-absolute')
      document.querySelector('.btn-container').classList.add('btn-container-absolute')
      document.querySelector('.submitBtn').classList.add('submitBtn-absolute')
      document.querySelector('.back-btn').classList.add('back-btn-absolute')
    } else if (formContainer.offsetHeight > window.innerHeight) {
      templateContainer.style.height = "auto"
      wrapper.style.height = "auto"
      document.querySelector('.btn-wrapper').classList.remove('btn-wrapper-absolute')
      document.querySelector('.btn-container').classList.remove('btn-container-absolute')
      document.querySelector('.submitBtn').classList.remove('submitBtn-absolute')
      document.querySelector('.back-btn').classList.remove('back-btn-absolute')
    }
  }
  if (headlineValue == "") {
    headlineInputWrapper.innerHTML = "";
    headlineInputWrapper.innerHTML += `${insertWarning('input')}<input type="text" class="form-input headline-input">`
  }
  if (subheadValue == "") {
    subheadInputWrapper.innerHTML = "";
    subheadInputWrapper.innerHTML += `${insertWarning('input')}<input type="text" class="form-input subhead-input">`
  }
  if (textAreaOneValue == "") {
    textAreaOneWrapper.innerHTML = "";
    textAreaOneWrapper.innerHTML += `${insertWarning('text-area')}<textarea class="form-textarea text-area-one" cols="30" rows="8"></textarea>`
  }
  if (textAreaTwoValue == "") {
    textAreaTwoWrapper.innerHTML = "";
    textAreaTwoWrapper.innerHTML += `${insertWarning('text-area')}<textarea class="form-textarea text-area-two" cols="30" rows="8"></textarea>`
  }
  
}
function previousPage() {
  if (formContainer.classList.contains('page-2')) {
    formContainer.innerHTML = "";
    formContainer.innerHTML = createForm();
    document.querySelector('.headline-input').value = headlineValue;
    document.querySelector('.text-area-one').value = textAreaOneValue;
    document.querySelector('.subhead-input').value = subheadValue;
    document.querySelector('.text-area-two').value = textAreaTwoValue;
    templateContainer.style.height = "auto"
    formContainer.classList.remove('page-2');
    formContainer.classList.add('page-1');
  } if (formContainer.classList.contains('page-3')) {
    document.querySelector('.download-icon').style.display = 'block';
    document.querySelector('.submitBtn').innerHTML = `Submit`;
    if (formContainer.offsetHeight > window.innerHeight) {
      document.querySelector('.btn-wrapper').style.marginBottom = '0'
    }
    formContainer.classList.remove('page-3')
    formContainer.classList.add('page-2')
  }
}

wrapper.addEventListener('click', function (e) {
  e.preventDefault()
  if (e.target.classList.contains('sendBtn')) {
    createPost()
  }
  if (e.target.classList.contains('submitBtn')) {
    document.querySelector('.download-icon').style.display = 'none';
    document.querySelector('.submitBtn').innerHTML = `Release`;
    formContainer.classList.remove('page-2');
    formContainer.classList.add('page-3');
    if (formContainer.offsetHeight > window.innerHeight) {
      document.querySelector('.btn-wrapper').style.marginBottom = '4rem'
    }
  }
  if (e.target.classList.contains('back-btn')) {
    previousPage()
  }
  let index = e.target.parentNode.firstElementChild.classList;
  if (index == undefined) {
    return;
  } else if (index.contains('empty-warning')) {
    e.target.previousSibling.remove();
  } else {
    return;
  }
})

function limitText(limitField, limitNum) {
  if (limitField.value.length > limitNum) {
    if (limitField.nodeName == "INPUT") {
      limitField.parentNode.firstElementChild.innerHTML = insertLimitWarning('input', 'headline')
    } else {
      limitField.parentNode.firstElementChild.innerHTML = insertLimitWarning('text-area', 'headline')
    }
  }
  if (limitField.value.length < limitNum) {
    limitField.parentNode.firstElementChild.innerHTML = ""
  }
}

document.addEventListener('keyup', function(e) {
  if(wrapper) {
    let lastFocus = document.activeElement;
    if(e.keyCode == 9 && lastFocus.previousElementSibling == null) {
      return;
    } else if(e.keyCode == 9 && lastFocus.previousElementSibling.classList.contains('empty-warning')){
      lastFocus.previousElementSibling.remove();
    }
  }
})
