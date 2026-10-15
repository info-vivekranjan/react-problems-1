"use client";

import { useState } from "react";
import { formFields } from "./formFields";

type FormInput = {
  name: string;
  email: string;
  dob: string;
  password: string;
};

export default function MultiStepForm() {
  const [formInput, setFormInput] = useState<FormInput>({
    name: "",
    email: "",
    dob: "",
    password: "",
  });
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormInput>({
    name: "",
    email: "",
    dob: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setFormInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleNext = () => {
    if (step === 1 && formInput.name.trim() === "") {
      setError("Name is required");
      return;
    } else if (step === 2 && formInput.email.trim() === "") {
      setError("Email is required");
      return;
    } else if (step === 3 && formInput.dob.trim() === "") {
      setError("DOB is required");
      return;
    }

    setStep((prev) => prev + 1);
    setError("");
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!formInput.password.trim()) {
      setError("Password is required");
      return;
    }
    console.log("Submitted...", formInput);
    setFormData({
      name: formInput.name,
      email: formInput.email,
      dob: formInput.dob,
      password: formInput.password,
    });
    setIsSubmitted(true);
    setError("");
  };

  return (
    <>
      <h1>Multi Step Form</h1>

      {!isSubmitted && (
        <form onSubmit={handleSubmit}>
          {formFields.map((field) => {
            return (
              <div key={field.id}>
                {step === field.step && (
                  <div>
                    <label htmlFor={field.id}>
                      <h1>Enter Name</h1>
                    </label>
                    <input
                      placeholder={field.placeholder}
                      type={field.type}
                      name={field.name}
                      id={field.id}
                      value={formInput[field.name as keyof FormInput]}
                      onChange={handleChange}
                      style={{
                        padding: "10px",
                        width: "300px",
                        fontSize: "18px",
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
          <div style={{ marginTop: "20px" }}>
            <button type="button" onClick={handleBack} disabled={step === 1}>
              Back
            </button>
            {step < 4 ? (
              <button type="button" onClick={handleNext}>
                Next
              </button>
            ) : (
              <button type="submit">Submit</button>
            )}
          </div>
        </form>
      )}
      {error && <h3 style={{ color: "red" }}>{error}</h3>}

      {isSubmitted && (
        <section
          style={{ border: "2px solid red", color: "green", width: "300px" }}
        >
          <h3>Name: {formData.name}</h3>
          <h3>Email: {formData.email}</h3>
          <h3>DOB: {formData.dob}</h3>
        </section>
      )}
    </>
  );
}
