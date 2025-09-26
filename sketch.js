//We need a variable to hold our image
let img;

//We will divide the image into segments
let numSegments = 50;

//We will store the segments in an array
let segments = [];

//lets add a variable to switch between drawing the image and the segments
let drawSegments = true;

let imageProperties = {
  aspect:0,
  width:0,
  height:0,
  xOffset:0,
  yOffset:0
}

let canvasAspectRatio = 0;

//lets load the image from disk
function preload() {
  img = loadImage('/assets/Mona_Lisa_by_Leonardo_da_Vinci_500_x_700.jpg');
}

function setup() {
  //We will make the canvas the same size as the image using its properties
  createCanvas(windowWidth, windowHeight);

  imageProperties.aspect = img.width / img.height;
  canvasAspectRatio = width / height;
  calculateImageProperties();


  //We can use the width and height of the image to calculate the size of each segment
  let segmentWidth = windowWidth / numSegments;
  let segmentHeight = windowHeight / numSegments;
  /*
  Divide the original image into segments, we are going to use nested loops
  */

  for (let segYPos=0; segYPos<imageProperties.height; segYPos+=segmentHeight) {
    //this is looping over the height
    for (let segXPos=0; segXPos<imageProperties.width; segXPos+=segmentWidth) {
      //We will use the x and y position to get the colour of the pixel from the image
      //lets take it from the centre of the segment
      let segmentColour = img.get(segXPos + segmentWidth / 2, segYPos + segmentHeight / 2);
       let segment = new ImageSegment(segXPos,segYPos,segmentWidth,segmentHeight,segmentColour);
       segments.push(segment);
    }
  }
}

function draw() {
  background(0);
  if (drawSegments) {
    //lets draw the segments to the canvas
    for (const segment of segments) {
      segment.draw();
    }
  } else {
    //lets draw the image to the canvas
    image(img, imageProperties.xOffset, imageProperties.yOffset, imageProperties.width,imageProperties.height
    );
  }
}
function keyPressed() {
  if (key == " ") {
    //this is a neat trick to invert a boolean variable,
    //it will always make it the opposite of what it was
    drawSegments = !drawSegments;
  }
}

function windowResized (){
  resizeCanvas(windowWidth, windowHeight);
  calculateImageProperties();
}

function calculateImageProperties(){
  canvasAspectRatio = width/height;
  //check if image is wider than the canvas
  if (imageProperties.aspect > canvasAspectRatio){
    imageProperties.width = width;
    imageProperties.height = width / imageProperties.aspect;
    imageProperties.yOffset = (height - imageProperties.height) / 2;
    imageProperties.xOffset = 0;
    //also check if the height of image is longer than the canvas
  } else if (imageProperties.aspect <canvasAspectRatio){
    imageProperties.height = height;
    imageProperties.width = height * imageProperties.aspect;
    imageProperties.xOffset = (width - imageProperties.width)/2;
    imageProperties.yOffset = 0;
  } else if (imageProperties.aspect == canvasAspectRatio){
    imageProperties.width = width;
    imageProperties.height = height;
    imageProperties.xOffset = 0;
    imageProperties.yOffset = 0;
  }
}


//Here is our class for the image segments, we start with the class keyword
class ImageSegment {

  constructor(srcImgSegXPosInPrm,srcImgSegYPosInPrm,srcImgSegWidthInPrmimage,srcImgSegHeightInPrm,srcImgSegColourInPrm) {
    //these parameters are used to set the internal properties of an instance of the segment
    //These parameters are named as imageSource as they are derived from the image we are using
    this.srcImgSegXPos = srcImgSegXPosInPrm;
    this.srcImgSegYPos = srcImgSegYPosInPrm;
    this.srcImgSegWidth = imageProperties.width;
    this.srcImgSegHeight = imageProperties.height;
    this.srcImgSegColour = srcImgSegColourInPrm;
  }

  draw() {
    //lets draw the segment to the canvas, for now we will draw it as an empty rectangle so we can see it
    stroke(0);
    fill(this.srcImgSegColour);
    rect(this.srcImgSegXPos, this.srcImgSegYPos, this.srcImgSegWidth, this.srcImgSegHeight);
  }
}