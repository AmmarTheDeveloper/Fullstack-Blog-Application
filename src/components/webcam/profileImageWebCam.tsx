"use client";
import Image from "next/image";

import Webcam from "react-webcam";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface WebcamProps {
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}

export const ProfileImageWebCam = ({ image, setImage }: WebcamProps) => {
  const [isVisible, setVisibility] = useState<boolean>(false);
  const webcamRef = useRef(null);
  const capture = () => {
    setImage(webcamRef.current?.getScreenshot());
  };
  const retake = () => {
    setImage(null);
  };
  return (
    <>
      <div>
        {isVisible ? (
          <div className="image-webcam-container flex justify-center">
            {image ? (
              <Image
                src={image}
                width={400}
                height={400}
                alt="profile-image"
                className="rounded-lg mx-auto inline-block"
              />
            ) : (
              <Webcam
                width={"400px"}
                height={"400px"}
                className="rounded-lg"
                ref={webcamRef}
                mirrored={true}
                screenshotFormat="image/jpeg"
              />
            )}
          </div>
        ) : null}
        {isVisible ? (
          <div className="btn-container flex justify-center">
            {image ? (
              <Button onClick={retake} className="mt-4" type="button">
                Retake
              </Button>
            ) : (
              <Button onClick={capture} className="mt-4" type="button">
                Capture
              </Button>
            )}
          </div>
        ) : (
          <div>
            <Button onClick={() => setVisibility(true)} type="button">
              Open Camera
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
