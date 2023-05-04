import React from 'react'
import {useState,useEffect,useRef} from 'react'
import { useMemo } from 'react';
import Webcam from 'react-webcam';



import * as faceapi from 'face-api.js'

function FacialRecognition({application}) {
  //var ref=useRef()

  const webcamRef = useRef(null);
  
  const[isLoading,setIsLoading]=useState(false)
  const [startRecord,setStartRecordWebcam]=useState(false)
  const [video,setVideo]=useState() 
  const [images,setImages]=useState([])

  const videoRef=useRef(null) 
  console.log(window.navigator.mediaDevices.attributes)

  const videoRef2=useRef()
  const canvasRef=useRef() 

  useEffect(()=>{
   // startVideo(videoRef2)
   //  loadModels(videoRef2,canvasRef)

    const prom=new Promise((resolve,reject)=>{
      /*getVideo(videoRef).then((response)=>{
        console.log(response)
        resolve()
      })
      */

     setTimeout(()=>{
      resolve()
     },2000)
    
    })

    prom.then(()=>{
      console.log(videoRef)
  
    
    }).catch((err)=>{
      alert(err)
    })

  },[])

  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);



  
  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "user",
  };


  const capture =(webcamRef)=>(
    (webcamRef) => {
      console.log(webcamRef)
      const imageSrc = webcamRef.current.getSnapShot();
      console.log(imageSrc)
    },
    [webcamRef]
  );

  const [name, setName] = useState('')
  const [email, setEmail] = useState('');


/*
    const loadModels=(videoRef2,canvasRef)=>{
      console.log("here")
      console.log(faceapi.nets.tinyFaceDetector.load("./models"))
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models")


      ]).then((videoRef2,canvasRef)=>{
        console.log("here")
        faceMyDetect(videoRef2,canvasRef)
      }).catch((err)=>{
        console.log("loadModel Error")
      console.log(err)
    })
    }
/*
    const startVideo = (videoRef2)=>{
      navigator.mediaDevices.getUserMedia({video:true})
      .then((currentStream)=>{
        console.log(videoRef2)
        videoRef2.current.srcObject = currentStream
        console.log("startVideoSuccess")
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    
  const faceMyDetect = (videoRef2)=>{
    setInterval(async()=>{
      const detections = await faceapi.detectAllFaces(videoRef2.current,
        new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()

      // DRAW YOU FACE IN WEBCAM
      canvasRef.current.innerHtml = faceapi.createCanvas(videoRef2.srcObject)
      faceapi.matchDimensions(canvasRef.current,{
        width:940,
        height:650
      })

      const resized = faceapi.resizeResults(detections,{
         width:940,
        height:650
      })
      console.log("here2")
      faceapi.draw.drawDetections(canvasRef.current,resized)
      faceapi.draw.drawFaceLandmarks(canvasRef.current,resized)
      faceapi.draw.drawFaceExpressions(canvasRef.current,resized)


    },1000)
  }
/*
 
  // OPEN YOU FACE WEBCAM
  const startVideo = ()=>{
    navigator.mediaDevices.getUserMedia({video:true})
    .then((currentStream)=>{
      videoRef.current.srcObject = currentStream
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  // LOAD MODELS FROM FACE API

  const loadModels = ()=>{
    Promise.all([
      // THIS FOR FACE DETECT AND LOAD FROM YOU PUBLIC/MODELS DIRECTORY
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models")

      ]).then(()=>{
      faceMyDetect()
    })
  }

  const faceMyDetect = (videoRef2)=>{
    setInterval(async(videoRef2)=>{
      const detections = await faceapi.detectAllFaces(videoRef.current,
        new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()

      // DRAW YOU FACE IN WEBCAM
      canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef2.current)
      faceapi.matchDimensions(canvasRef.current,{
        width:940,
        height:650
      })

      const resized = faceapi.resizeResults(detections,{
         width:940,
        height:650
      })

      faceapi.draw.drawDetections(canvasRef.current,resized)
      faceapi.draw.drawFaceLandmarks(canvasRef.current,resized)
      faceapi.draw.drawFaceExpressions(canvasRef.current,resized)


    },1000)
  }
*/
  if(!isLoading){
      /**
       *    <video crossOrigin="anonymous" ref={videoRef2} autoPlay></video>
        <canvas ref={canvasRef} width="950" hight="650"/>
       */
    console.log(webcamRef)
  return (
   <div class="flex flex-col m-2">
     
    <div>
     {
      application
     }
    </div>
  </div>)
  }else{
    return(<div></div>)
  }
}



const WebcamComponent = () => <Webcam />
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
}
export const Profile = ({occupant}) => {
  const [picture, setPicture] = useState('')
  const [images,setImages]=useState([])
  const webcamRef = React.useRef(null)
  const[files,setFiles]=useState([])
  const[hasImages,setHasImages]=useState(false)
  const canvasRef=useRef()
 

  useEffect(()=>{
    loadModels(webcamRef,canvasRef)
  },[])




  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot()
  console.log(webcamRef.current)
    const prev=images
   
    var base64Icon = `data:image/jpg;base64,${pictureSrc}`;
    prev.push(pictureSrc)
    setImages(prev)
    const f=files
    f.push(webcamRef.current.canvas)
    setFiles(f)
 
    console.log(files)
    console.log(images)
    
  })

  const detect=async(files)=>{
    console.log(typeof(files[0]))
    console.log(files[0])
   try{
    const r=await faceapi.detectAllFaces(document.getElementById("img_0"))
    console.log(r)
    return r
   }catch(err){
    console.log("err here:")
    console.log(err)
   }
 
  }

 

  const loadModels = (videoRef,canvasRef)=>{
    console.log("here")
    Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),     
       faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models")

      ]).then(()=>{
        console.log("\n\n\nhello")
      faceMyDetect(videoRef,canvasRef)
    }).catch((err)=>{
      console.log("\n\n\n\n")
      console.log(err)
    })
  }

  const faceMyDetect = (videoRef,canvasRef)=>{
    setInterval(async(videoRef2,canvasRef)=>{
     

        const detections = await faceapi
        .detectAllFaces(videoRef, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();

        console.log("\n\n\n")
        console.log(detections)
      // DRAW YOU FACE IN WEBCAM
      canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current)
      faceapi.matchDimensions(canvasRef.current,{
        width:940,
        height:650
      })

      const resized = faceapi.resizeResults(detections,{
         width:940,
        height:650
      })

      faceapi.draw.drawDetections(canvasRef.current,resized)
      faceapi.draw.drawFaceLandmarks(canvasRef.current,resized)
      faceapi.draw.drawFaceExpressions(canvasRef.current,resized)


    },1000)
  }

console.log(files)
console.log(document.getElementById("img_0"))
  return (
    <div>
      <h2 className="mb-5 text-center">
        React Photo Capture using Webcam Examle
      </h2>
     
      <div>
        <canvas ref={canvasRef}/>
        {picture == '' ? (
          <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            width={400}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={picture} />
        )}
      </div>
      <div>
        {picture != '' ? (
          <button
            onClick={(e) => {
              e.preventDefault()
              setPicture()
            }}
            className="btn btn-primary"
          >
            Retake
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault()
              capture()
            }}
            className="btn btn-danger"
          >
            Capture
          </button>
        )}
        <button class="bg-purple-400 p-3 rounded-md" onClick={()=>{
          detect(files).then((res)=>{
            console.log(res)
          })
        }}>
          detect
        </button>
        <button class="bg-green-400 p-3 rounded-md" onClick={()=>{
          setHasImages(true)
        }}>
          show
        </button>
        {
          hasImages? 
          <div class="flex-row">
            {images.map((i,key)=>{
              console.log(key)
              return(
                <img src={i} key={key} id={"img_"+key} alt="img"/>

             )
            })}
          </div>
          :
          <div></div>
        }
      </div>
    </div>
  )

};


function CompName() {
  const [file, setFile] = useState([]);
  const [canvas, setcanvas] = useState([]);
  const [Image, setImg] = useState(null);
  const [isModeuleLoded, setIsModeleLoded] = useState(false);
  const[files,setFiles]=useState()
  const[images,setImages]=useState() 

  function fileChangeHandler(event) {
    // console.log(event);
    const obj = URL.createObjectURL(event);
    console.log(obj);
    setImg(obj);
    setFile(event);
  }

  useEffect(() => {
    loadModels();

    if (file.size > 0) {
      detectF();
      // console.log("file ", file);
    }
  }, [file]);

  async function loadModels() {
    console.log("enterd");
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
    await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
    await faceapi.nets.faceExpressionNet.loadFromUri("/models");
    setcanvas(faceapi.createCanvas(file));
    console.log("file 1 ", file.size);
    setIsModeleLoded(true);
    document.getElementById("mycanvas").append(canvas);
    console.log("models loaded");
  }

  const displaySize = {
    width: "955",
    height: "623"
  };

  faceapi.matchDimensions(canvas, displaySize);
  const webcamRef=useRef() 
  async function detectF() {
    console.log(file);
    const img = await faceapi.bufferToImage(file);
    const detections = await faceapi
      .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks();
    console.log(detections);
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    // const landmarkPositions = resizedDetections[0].landmarks.positions;

    console.log({ detections });
  }
  const handleImageLoad = () => {};

  const capture = React.useCallback((webcamRef) => {
    const pictureSrc = webcamRef.current.getScreenshot()
  console.log(webcamRef.current)
    const prev=images
   
    var base64Icon = `data:image/jpg;base64,${pictureSrc}`;
    prev.push(pictureSrc)
    setImages(prev)
    const f=files
    f.push(webcamRef.current.canvas)
    setFiles(f)
 
    console.log(files)
    console.log(images)
    
  })

  return (
    <div>
      {isModeuleLoded ? (
        <>
          <input
            type="file"
            onChange={(e) => fileChangeHandler(e.target.files[0])}
          />
           <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            width={400}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <button class="bg-green-300 p-3 rounded-md" onClick={()=>{
            capture(webcamRef)
          }}>
            Capture
          </button>
          <div id="mycanvas" style={{ position: "fixed" }}>
            {Image && (
              <img
                src={Image}
                style={{
                  position: "absolute",
                  width: "1024px",
                  height: "623px"
                }}
                id="canvsdraw"
                onLoad={handleImageLoad}
                alt="check"
              />
            )}
          </div>{" "}
        </>
      ) : (
        <h1>Wait for module to load</h1>
      )}
    </div>
  );
}


/*


*/

export default FacialRecognition