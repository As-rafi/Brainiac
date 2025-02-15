import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    
    emailjs
      .sendForm(
        "service_kefi9ql",   //  EmailJS Service ID
        "template_9cso8ed",  //  EmailJS Template ID
        formRef.current,
        "VE2iSZYr85KvBwxB1"    //  EmailJS Public Key
      )
      .then(
        (result) => {
          console.log("Success:", result.text);
          setSuccessMessage("Message sent successfully!");
          formRef.current.reset();
        },
        (error) => {
          console.error("Failed:", error.text);
          setSuccessMessage("Failed to send message. Try again.");
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <div className="container mt-5 ">
      <div className="row justify-content-center shadow mb-5 pt-3 pb-5">
        <div className="col-md-4 mt-2 mb-4 ms-2">
              <div className=" p-2 justify-content-center mt-2">
                <p className="text-muted fw-bold mt-2" style={{ fontSize: "15px" }}>
                  Keep in touch
                </p>

                <h2 className="text-dark mt-5 fw-bold" style={{  }}>
                  Want to Contact us? Let&apos;s talk!
                </h2>

                <div className="ms-1 mt-5 text-secondary mb-4">
                  <i className="fa-solid fa-location-dot mb-2 "></i> 
                  <span className="ms-2" style={{ fontSize: "14px" }}>Chittagong, Bangladesh</span>
                  <br />
                  <i className="fa-solid fa-envelope"></i> 
                  <span className="ms-2" style={{ fontSize: "14px" }}>brainiacbd25@gmail.com</span>
                </div>
              </div>
              </div>


             

           <div className="col-md-6">
              <div className="justify-content-center p-2 ms-2">

                <form ref={formRef} onSubmit={sendEmail}>

                  <div className="form-floating mt-3 mb-3">
                    <input type="text" className="form-control" id="name" name="user_name" placeholder="Enter Name" required />
                    <label htmlFor="name">Enter your Fullname</label>
                  </div>

                  <div className="form-floating mb-3 mt-3">
                    <input type="email" className="form-control" id="email" name="user_email" placeholder="Enter Email Account" required />
                    <label htmlFor="email">Enter Email Account</label>
                  </div>

                  <div className="form-floating mt-3 mb-3">
                    <input type="text" className="form-control" id="sub" name="subject" placeholder="Type a reason for contact" required />
                    <label htmlFor="sub">Subject (Reason for Contact)</label>
                  </div>

                  <div className="form-floating">
                    <textarea className="form-control" id="comment" name="message" rows="6" placeholder="Message" required></textarea>
                    <label htmlFor="comment">Message</label>
                  </div>

                  <div>
                    <button type="submit" className="btn text-light mt-4" style={{ width: "30%", backgroundColor: "#ff6600" }} disabled={loading}>
                      {loading ? "Sending..." : "Submit"}
                    </button>
                  </div>

                  {successMessage && <p className="mt-3 text-success">{successMessage}</p>}
                </form>
              </div>
            </div>
         
        </div>
    </div>
  );
}
