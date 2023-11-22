import React from "react";
import "./home.css";

function Home() {
  return (
    <main id="home">
      <div className="home-section flex-col">
        <section className="hero-section container flex-row align justify">
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

        <section className="features container flex-col justify">
          <div>
            <h2 className="main-headline">
              Create and manage your events with ease
            </h2>
            <h3 className="sub-headline">
              Our events management web app allows you to effortlessly create
              and manage your own events.
            </h3>
          </div>
          <div className="card-container flex-row">
            <div className="feature-card flex-col">
              <i className="fa-solid fa-cube"></i>
              <h3>
                Share Your Events with a Beautiful & Personalized Landing Page
              </h3>
              <p>
                Share a unique landing page with your guests, complete with a
                link, QR code, and RSVP functionality.
              </p>
              <button className="button">Learn More</button>
            </div>
            <div className="feature-card flex-col">
              <i className="fa-solid fa-cube"></i>
              <h3>Customize Your Event with Our Flexible & Intuitive Tools</h3>
              <p>
                Craft a unique experience. Tailor your event to your preferences
                with our easy-to-use event management tools.
              </p>
              <button className="button">Get Started</button>
            </div>
            <div className="feature-card flex-col">
              <i className="fa-solid fa-cube"></i>
              <h3>Effortlessly Manage Your Guest List & RSVPs in One Place</h3>
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
            <figure className="flex-row align justify">
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

                <div>
                  <div className="benefit-card flex-col">
                    <h3>
                      {" "}
                      <i className="fa-solid fa-cube"></i> Effortless Tracking
                    </h3>
                    <p>
                      Digital invites simplify RSVPs, eliminating manual
                      tracking for precise guest lists and planning efficiency.
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
                      Instantly send event updates and reminders, ensuring
                      guests stay informed without delay or missed details.
                    </p>
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="testimonials">
          <div className="container flex-col align">
            <h2 className="main-headline">What our customers say</h2>
            <div className="testimonial-container flex-row justify">
              <div className="testimonial flex-col">
                <span>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </span>
                <p>
                  <i>
                    "I can't believe how easy it was to create and manage my
                    event using this app. It saved me so much time and stress!"
                  </i>
                </p>
                <figure className="reviewer flex-row align justify">
                  <img
                    src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
                    alt=""
                  />{" "}
                  <figcaption>
                    <h3>Mary J. Doe</h3>
                    <p>Marketing Advisor | ABC Marketing Group</p>
                  </figcaption>
                </figure>
              </div>
              <div className="testimonial flex-col">
                <span>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </span>
                <p>
                  <i>
                    "Simplified event logistics! This app saved me hours of
                    work. Highly recommended for event planning!"
                  </i>
                </p>
                <figure className="reviewer flex-row align justify">
                  <img
                    src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                  />{" "}
                  <figcaption>
                    <h3>John D. Doe</h3>
                    <p>Senior Events Coordinator | XYZ Catering</p>
                  </figcaption>
                </figure>
              </div>
              <div className="testimonial flex-col">
                <span>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </span>
                <p>
                  <i>
                    "This app made event planning a breeze! From registration to
                    engagement, it took away the stress. I'm thrilled with the
                    results!"
                  </i>
                </p>
                <figure className="reviewer flex-row align justify">
                  <img
                    src="https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                  />{" "}
                  <figcaption>
                    <h3>Mark E. Doe</h3>
                    <p>Customer | Atlanta, GA</p>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        <section className="FAQ">
          <div className="container flex-row">
            <div className="section-title flex-col">
              <h2 className="main-headline">Frequently Asked Questions</h2>
              <h3 className="sub-headline">
                Find answers to common questions and learn how our app can
                benefit you.
              </h3>
              <p>Still have questions?</p>
              <button className="button">Contact Us</button>
            </div>
            <div className="questions flex-col">
              <div className="question flex-col">
                <div className=" question-title flex-row">
                  <h3>How do I create an event?</h3>
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
                <p>
                  To create an event, simply navigate to the 'Create Event' page
                  and follow the step-by-step instructions.
                </p>
              </div>
              <div className="question flex-col">
                <div className=" question-title flex-row">
                  <h3>How do I invite guests?</h3>
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
                <p>
                  Once your event is created, you can easily invite guests by
                  sharing the provided link or QR code.
                </p>
              </div>
              <div className="question flex-col">
                <div className=" question-title flex-row">
                  <h3>Can I track RSVPs?</h3>
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
                <p>
                  Yes, our app allows you to track RSVPs and manage your guest
                  list in real-time.
                </p>
              </div>
              <div className="question flex-col">
                <div className=" question-title flex-row">
                  <h3>Is my event shareable?</h3>
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
                <p>
                  Absolutely! Each event you create comes with a shareable
                  landing page that includes the event details and RSVP
                  functionality.
                </p>
              </div>
              <div className="question flex-col">
                <div className=" question-title flex-row">
                  <h3>How can I customize my event page?</h3>
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
                <p>
                  Our app provides various customization options, allowing you
                  to personalize your event page to match your branding and
                  style.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;
