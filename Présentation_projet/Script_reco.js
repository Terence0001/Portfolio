    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image
    // the link to your model provided by Teachable Machine export panel
    const URL = "./";
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    let model, webcam, labelContainer, maxPredictions;
    // Load the image model and setup the webcam
   
    var clicked = false
    async function init() {
        if (!clicked) {
            clicked=true
        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        alert("Veuillez patienter quelques secondes, le programme s'éxécute")
        // Convenience function to setup a webcam
        webcam = new tmImage.Webcam(400, 400); // width, height
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append elements to the DOM
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }
    }
}

    
        

    