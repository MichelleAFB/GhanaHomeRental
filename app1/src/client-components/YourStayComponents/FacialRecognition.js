import React from 'react'
import {useState,useEffect,useRef} from 'react'
import { useMemo } from 'react';
import Webcam from 'react-webcam';
import { WebcamCapture} from './WebcamComponent'




function FacialRecognition({application}) {
  //var ref=useRef()

  const webcamRef = useRef(null);
  
  const[isLoading,setIsLoading]=useState(false)
  const [startRecord,setStartRecordWebcam]=useState(false)
  const [video,setVideo]=useState() 

  const videoRef=useRef(null) 
  console.log(window.navigator.mediaDevices.attributes)


  useEffect(()=>{

    const prom=new Promise((resolve,reject)=>{
      /*getVideo(videoRef).then((response)=>{
        console.log(response)
        resolve()
      })
      */
     resolve()
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


  const submitForm = () => {
      alert("Form submitted");
      setName('');
      setEmail('');
  }

  if(!isLoading){

    console.log(webcamRef)
  return (
   <div class="flex flex-col m-2">
      
      
      <div class="flex-col">
        <Webcam audio={false}
        ref={webcamRef}
        />
      
  
      <button onClick={(e)=>{
        e.preventDefault();
        capture(webcamRef)}}>Capture</button>
    </div>
    <div>
      <FaceEm
    </div>
  </div>)
  }else{
    return(<div></div>)
  }
}

/*


*/

export default FacialRecognition