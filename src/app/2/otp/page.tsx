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

  const handleChangeDelete = (
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
    const pastedText = e.clipboardData.getData("text");

    console.log("pastedText===", pastedText);

    if (pastedText.trim().length > OTP_LENGTH) {
      return;
    }

    setOtp(pastedText.split(""));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const payload = {
      otp: otp.join(""),
    };

    setOtp(Array(OTP_LENGTH).fill(""));

    console.log(payload);
  };

  console.log(otp);

  return (
    <>
      <h1>OTP</h1>
      <form onSubmit={handleSubmit}>
        {otp?.map((item, index) => {
          return (
            <input
              maxLength={1}
              type="text"
              value={item}
              id={item + index}
              onChange={(e) => handleChangeOtp(e, index)}
              onKeyDown={(e) => handleChangeDelete(e, index)}
              onPaste={(e) => handlePaste(e)}
              placeholder={String(index)}
              ref={(ele) => {
                otpRef.current[index] = ele;
              }}
              style={{
                padding: "15px",
                fontSize: "25px",
                textAlign: "center",
                height: "35px",
                width: "35px",
                margin: "15px",
              }}
            />
          );
        })}
        <br />
        <input
          type="submit"
          value="Submit"
          style={{ padding: "10px", margin: "15px" }}
        />
      </form>
    </>
  );
}
