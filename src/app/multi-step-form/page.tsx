"use client";

import { useState } from "react";

export default function MultiStepForm() {
  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    dob: "",
    password: "",
  });
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    dob: string;
    password: string;
  }>({ name: "", email: "", dob: "", password: "" });

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
          {step === 1 && (
            <div>
              <label htmlFor="name">
                <h1>Enter Name</h1>
              </label>
              <input
                placeholder="John Marry"
                type="text"
                name="name"
                id="name"
                value={formInput.name}
                onChange={handleChange}
                style={{ padding: "10px", width: "300px", fontSize: "18px" }}
              />
            </div>
          )}
          {step === 2 && (
            <div>
              <label htmlFor="email">
                <h1>Enter Email</h1>
              </label>
              <input
                placeholder="jhon.marry@example.com"
                type="email"
                name="email"
                id="email"
                value={formInput.email}
                onChange={handleChange}
                style={{ padding: "10px", width: "300px", fontSize: "18px" }}
              />
            </div>
          )}
          {step === 3 && (
            <div>
              <label htmlFor="dob">
                <h1>Enter DOB</h1>
              </label>
              <input
                type="date"
                name="dob"
                id="dob"
                value={formInput.dob}
                onChange={handleChange}
                style={{ padding: "10px", width: "300px", fontSize: "18px" }}
              />
            </div>
          )}
          {step === 4 && (
            <div>
              <label htmlFor="password">
                <h1>Enter Password</h1>
              </label>
              <input
                placeholder="Jhon@1234"
                type="password"
                name="password"
                id="password"
                value={formInput.password}
                onChange={handleChange}
                style={{ padding: "10px", width: "300px", fontSize: "18px" }}
              />
            </div>
          )}

          <div style={{ marginTop: "20px" }}>
            <button type="button" onClick={handleBack}>
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
