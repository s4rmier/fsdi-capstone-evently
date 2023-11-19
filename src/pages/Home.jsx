import React from "react";
import "./home.css";

function Home() {
  return (
    <main id="home">
      <div className="container">
        <section className="hero-section flex-row align justify">
          <div className="headline flex-col">
            <h1 className="hero-headline main-headline">
              Evently: Your one-stop events management platform
            </h1>
            <h2 className="sub-headline">
              Craft and curate unforgettable events, share in style with
              stunning landing pages and scannable QR codes, effortlessly track
              and manage RSVPs with seamless functionality.
            </h2>
            <div className="cta flex-row">
              <button className="button btn-spec">
                Get Started<i className="fa-solid fa-arrow-right-long"></i>
              </button>
              <button className="button">Sign Up</button>
            </div>
          </div>
          <img src="/hero-img.png" />
        </section>

        <section className="features flex-col justify">
          <h2 className="main-headline">
            Create and manage your events with ease
          </h2>
          <h3 className="sub-headline">
            Our events management web app allows you to effortlessly create and
            manage your own events.
          </h3>
          <div className="card-container flex-row ">
            <div className="feature-card flex-col">
              <i className="fa-solid fa-cube"></i>
              <h3>Share Your Events with a Beautiful Landing Page</h3>
              <p>
                Share a unique landing page with your guests, complete with a
                link, QR code, and RSVP functionality.
              </p>
              <button className="button">Learn More</button>
            </div>
            <div className="feature-card flex-col">
              <i className="fa-solid fa-cube"></i>
              <h3>
                Customize your event with our flexible and intuitive tools
              </h3>
              <p>
                Tailor your event to your preferences with our easy-to-use and
                versatile event management tools.
              </p>
              <button className="button">Get Started</button>
            </div>
            <div className="feature-card flex-col">
              <i className="fa-solid fa-cube"></i>
              <h3>
                Effortlessly manage your guest list and RSVPs in one place
              </h3>
              <p>
                Keep track of your guest list and RSVPs with our convenient and
                centralized event management platform.
              </p>
              <button className="button">Sign Up</button>
            </div>
          </div>
        </section>

        <section className="showcase">
          <div className="container flex-row">
            <figure className="flex-row align">
              <img src="/event-sample.png" alt="" />
              <figcaption className="flex-col ">
                <h2 className="main-headline">
                  Go stress-free with digital invites—say goodbye to paper
                  hassle!
                </h2>
                <h3 className="sub-headline">
                  Craft unforgettable moments effortlessly with the convenience
                  of digital invitations, complete with a beautiful landing page
                  curated for your most memorable events.
                </h3>

                <div className="benefit-card flex-col">
                  <h3>
                    {" "}
                    <i className="fa-solid fa-cube"></i> Effortless Tracking
                  </h3>
                  <p>
                    Digital invites simplify RSVPs, eliminating manual tracking
                    for precise guest lists and planning efficiency.
                  </p>
                </div>
                <div className="benefit-card flex-col">
                  <h3>
                    {" "}
                    <i className="fa-solid fa-cube"></i> Customizable &
                    Eco-Friendly
                  </h3>
                  <p>
                    Digital invites allow personalized, interactive designs
                    while reducing paper waste and costs associated with
                    traditional invitations.
                  </p>
                </div>
                <div className="benefit-card flex-col">
                  <h3>
                    {" "}
                    <i className="fa-solid fa-cube"></i> Real-Time Updates
                  </h3>
                  <p>
                    Instantly send event updates and reminders, ensuring guests
                    stay informed without delay or missed details.
                  </p>
                </div>
              </figcaption>
            </figure>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;
