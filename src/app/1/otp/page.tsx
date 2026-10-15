"use client";

import { useRef, useState } from "react";

const OTP_LENGTH = 6;

export default function OTP() {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const otpRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChangeOtp = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = e.target;

    if (!/^\d*$/.test(value)) {
      return;
    }

    let newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (index < OTP_LENGTH - 1) {
      otpRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key !== "Backspace") return;

    // If current box has a value, let onChange clear it; stay put.
    if (otp[index]) return;

    // Current box is empty → move back and clear the previous box
    if (index > 0) {
      e.preventDefault();
      let newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      otpRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedOtp = e.clipboardData.getData("text");

    if (pastedOtp.length > OTP_LENGTH) {
      return;
    }

    setOtp(pastedOtp.split(""));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    console.log("OTP===", otp.join(""));
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
              type="text"
              value={item}
              name={item}
              maxLength={1}
              onChange={(e) => handleChangeOtp(e, index)}
              ref={(ele) => {
                otpRef.current[index] = ele;
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={(e) => handlePaste(e)}
              style={{
                padding: "10px",
                width: "25px",
                margin: "10px",
                textAlign: "center",
                fontSize: "25px",
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
