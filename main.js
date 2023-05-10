prediction = ""


Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
  });

camera = document.getElementById("camera");

Webcam.attach('#camera');

      
function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

  console.log('ml5 version:', ml5.version);
  
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ONBpZhaUy/model.json',modelLoaded);

  function modelLoaded() {
    console.log('Model Loaded!');
  }
  
function speak(){
  var synth = window.speechSynthesis;
  speak_data = prediction;
  var utterThis = new SpeechSynthesisUtterance(speak_data);
  synth.speak(utterThis);
}


  function check()
  {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
  }


function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    document.getElementById("result_object_name").innerHTML = results[0].label;
    
    prediction = results[0].label;
   to_speak=""
    speak();
    if(prediction == "GENIAL")
    {
	    
      document.getElementById("result_object_gesture_icon").innerHTML = "&#128076;";
      to_speak="esto se ve genial"
    }
    if(prediction == "BIEN")
    {
	    document.getElementById("result_object_gesture_icon").innerHTML = "&#128077;";
      to_speak="todo bien"
    }
    if(prediction == "VICTORIA")
    {
	    document.getElementById("result_object_gesture_icon").innerHTML = "&#9996;";
      to_speak="esa fue una victoria maravillosa"
    }

  }
}

