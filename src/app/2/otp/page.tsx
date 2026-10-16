"use client";

import React, { useRef, useState } from "react";

const OTP_LENGTH = 6;
export default function OTP() {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const otpRef = useRef<HTMLInputElement[] | null[]>([]);

  const handleChangeOtp = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = e.target;

    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    if (index < OTP_LENGTH - 1) {
      otpRef.current[index + 1]?.focus();
    }
  };

  const handleRemoveOtp = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key !== "Backspace") return;

    if (otp[index]) return;

    if (index > 0) {
      e.preventDefault();
      const newOtp = [...otp];

      newOtp[index - 1] = "";
      setOtp(newOtp);

      otpRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedOtp = e.clipboardData.getData("text");
    console.log("pastedOtp===", pastedOtp);

    if (pastedOtp.length > OTP_LENGTH) {
      return;
    }

    setOtp(pastedOtp.split(""));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (otp.join("").length !== OTP_LENGTH) {
      return;
    }

    console.log("otp==", otp.join(""));
  };

  console.log(otp);

  return (
    <>
      <h1>OTP</h1>
      <form onSubmit={handleSubmit}>
        {otp.map((item, index) => {
          return (
            <input
              key={index}
              maxLength={1}
              type="text"
              value={item}
              id={item + index}
              onChange={(e) => handleChangeOtp(e, index)}
              onKeyDown={(e) => handleRemoveOtp(e, index)}
              onPaste={handlePaste}
              ref={(ele) => {
                otpRef.current[index] = ele;
              }}
              style={{
                padding: "10px",
                width: "35px",
                height: "35px",
                fontSize: "25px",
                textAlign: "center",
                margin: "10px",
              }}
            />
          );
        })}
        <br />
        <input type="submit" value="Submit" style={{ margin: "10px" }} />
      </form>
    </>
  );
}
