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


  useEffect(()=>{

    const prom=new Promise((resolve,reject)=>{
      /*getVideo(videoRef).then((response)=>{
        console.log(response)
        resolve()
      })
      */
     startVideo()
     videoRef && loadModels()
     setTimeout(()=>{
      resolve()
     },1000)
    
    })

    prom.then(()=>{
      console.log(videoRef)
      setIsLoading(false)
    }).catch((err)=>{
      alert(err)
    })

  },[])

  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);



  /*
  const handleDataAvailable = useMemo(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

 /* const handleStartCaptureClick = useMemo(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

  const handleStopCaptureClick = useMemo((mediaRecorderRef) => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, setCapturing]);

  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "user",
  };

  const handleDownload = useMemo(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);
  */
  
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

    const videoRef2=useRef()
    const canvasRef=useRef()

    const loadModels=()=>{
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("./face/public"),
        faceapi.nets.faceLandmark68Net.loadFromUri("./face/public/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("./face/public/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("./face/public/models")


      ]).then(()=>{
        faceMyDetect()
      })
    }

    const faceMyDetect=()=>{
      setInterval(async()=>{
        const detections=await faceapi.detectAllFaces(videoRef.current,
          new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()

          canvasRef.current.innerHtml=faceapi.createCanvasFromMedia(videoRef.current)
          faceapi.matchDimensions(canvasRef.current,{
            width:940,
            width:650
          })

          const resized=faceapi.resizeResults(detections,
           { width:940,
            height:650
           })

           faceapi.draw.drawDetections(canvasRef.current.resized)
           faceapi.draw.drawFaceLandmarks(canvasRef.current,resized)
           faceapi.draw.drawFaceExpressions(canvasRef.current,resized)

      },1000)
    }
 
  const startVideo=()=>{
    console.log(navigator.mediaDevices.getUserMedia({video:true}))
    navigator.mediaDevices.getUserMedia({video:true}).then((currentStream)=>{
      videoRef2.current.srcObject=currentStream
    }).catch((err)=>{
      console.log(err)
    })
  }

  if(!isLoading){

    console.log(webcamRef)
  return (
   <div class="flex flex-col m-2">
        <video crossOrigin="anonymous" ref={videoRef2} autoPlay></video>
        <canvas ref={canvasRef} width="950" hight="650"/>
    <div>
      <Profile />
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
export const Profile = () => {
  const [picture, setPicture] = useState('')
  const [images,setImages]=useState([])
  const webcamRef = React.useRef(null)
  const[files,setFiles]=useState([])
  const[hasImages,setHasImages]=useState(false)
  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot()
    //setPicture(pictureSrc)
    const prev=images
   
    var base64Icon = `data:image/jpg;base64,${pictureSrc}`;
    prev.push(pictureSrc)
    setImages(prev)
    const f=files
 
    console.log(typeof(pictureSrc))
    console.log(images)
    
  })


  return (
    <div>
      <h2 className="mb-5 text-center">
        React Photo Capture using Webcam Examle
      </h2>
      <div>
        
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
        <button class="bg-green-400 p-3 rounded-md" onClick={()=>{
          setHasImages(true)
        }}>
          show
        </button>
        {
          hasImages? 
          <div class="flex-row">
            {images.map((i)=>{
              return(<div>
                <img src={i} alt="img"/>

                <p>hi</p>
                </div>)
            })}
          </div>
          :
          <div></div>
        }
      </div>
    </div>
  )

};

/*


*/

export default FacialRecognition