
console.log("Welcome to notes app. This is app.js");
showNotes()

// If user adds a note, add it to the localStorage
let addbutton= document.getElementById("addbutton");
addbutton.addEventListener("click",show); 
  function show(){
  let addTxt = document.getElementById("addTxt")
  let notes= localStorage.getItem("notes");
  
  if(notes==null){
    notesObj=[];
  }
  else{
    notesObj=JSON.parse(notes);
  }

  
  notesObj.push(addTxt.value);
  localStorage.setItem("notes",JSON.stringify(notesObj));
  addTxt.value="";

showNotes();

};

 var btnSpeak = document.querySelector('#btnSpeak');
 var synth = window.speechSynthesis;
 var voices = [];

 PopulateVoices();
 if(speechSynthesis !== undefined){
    speechSynthesis.onvoiceschanged = PopulateVoices;
 }

 btnSpeak.addEventListener('click', ()=> {
    var toSpeak = new SpeechSynthesisUtterance(addTxt.value);
    var selectedVoiceName = voiceList.selectedOptions[0].getAttribute('data-name');
    voices.forEach((voice)=>{
        if(voice.name === selectedVoiceName){
            toSpeak.voice = voice;
        }
    });
    synth.speak(toSpeak);
 });

 function PopulateVoices(){
    voices = synth.getVoices();
    var selectedIndex = voiceList.selectedIndex < 0 ? 0 : voiceList.selectedIndex;
    voiceList.innerHTML = '';
    voices.forEach((voice)=>{
        var listItem = document.createElement('option');
        listItem.textContent = voice.name;
        listItem.setAttribute('data-lang', voice.lang);
        listItem.setAttribute('data-name', voice.name);
        voiceList.appendChild(listItem);
    });

    voiceList.selectedIndex = selectedIndex;
}

//to display the notes
function showNotes() {
  
  let notes = localStorage.getItem("notes");
  if(notes==null){
    notesObj=[];
  }
  else{
    notesObj=JSON.parse(notes);
  }

 let html = ``
 notesObj.forEach(function(element,index) {
  html += `
  <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
      <div class="card-body">
          <h5 class="card-title"> Notes ${index + 1} </h5>
          <p class="card-text" id='txtInput'>${element}</p> <br><br>
        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        
      </div>
  </div> 
      ` 
 });


 console.log(notes)
  let notesElm=document.getElementById("notes");
  
  if (notesObj.length != 0)
   {
    notesElm.innerHTML = html;
  } 
  else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
  } 



// Function to delete a note
 function deleteNote(index) {
  //   console.log("I am deleting", index);
  
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
  
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
  };
  

  

