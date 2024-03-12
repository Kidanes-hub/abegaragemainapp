import React from "react";
import ExperienceSection from "../components/ExperienceSection/ExperienceSection";

import BottomBanner from "../components/BottomBanner/BottomBanner";
import BottomSchedule from "../components/BottomSchedule/BottomSchedule";
// import ServicesSection from "../components/AddServicesForm/AddServicesForm";
import WhyChooseUs from "../components/whyChooseUs/WhyChooseUs";

function Home() {
  return (
    <div>
      <section className="video-section">
        <div
          data-parallax={{ y: 50 }}
          className="sec-bg"
          style={{ backgroundImage: "url(/assets/images/banner/banner.jpg)" }}
        ></div>
        <div className="auto-container">
          <h5>Drinking Beso since the 1970s</h5>
          <h2>
            We make the Beso <br />
            on the go
          </h2>
          <div className="video-box">
            <div className="video-btn">
              <a
                href="https://www.youtube.com/watch?v=nfP5N9Yc72A&amp;t=28s"
                className="overlay-link lightbox-image video-fancybox ripple"
              >
                <i className="flaticon-play"></i>
              </a>
            </div>
            <div className="text">
              Watch the art of <br />
              beso making
            </div>
          </div>
        </div>
      </section>

      <ExperienceSection />
      <section className="services-section">
      <div className="auto-container">
        <div className="sec-title style-two">
          <h2>Our Services</h2>
          <div className="text">Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution.</div>
        </div>
        <div className="row">
          <div className="col-lg-4 service-block-one">
            <div className="inner-box hvr-float-shadow">
              <h5>Service and Repairs</h5>
              <h2>Performance Upgrade</h2>
              <a href="#" className="read-more">read more  +</a>
              <div className="icon"><span className="flaticon-power"></span></div>
            </div>
          </div>
          <div className="col-lg-4 service-block-one">
            <div className="inner-box hvr-float-shadow">
              <h5>Service and Repairs</h5>
              <h2>Transmission Services</h2>
              <a href="#" className="read-more">read more  +</a>
              <div className="icon"><span className="flaticon-gearbox"></span></div>
            </div>
          </div>
          <div className="col-lg-4 service-block-one">
            <div className="inner-box hvr-float-shadow">
              <h5>Service and Repairs</h5>
              <h2>Break Repair & Service</h2>
              <a href="#" className="read-more">read more  +</a>
              <div className="icon"><span className="flaticon-brake-disc"></span></div>
            </div>
          </div>
          <div className="col-lg-4 service-block-one">
            <div className="inner-box hvr-float-shadow">
              <h5>Service and Repairs</h5>
              <h2>Engine Service & Repair</h2>
              <a href="#" className="read-more">read more  +</a>
              <div className="icon"><span className="flaticon-car-engine"></span></div>
            </div>
          </div>
          <div className="col-lg-4 service-block-one">
            <div className="inner-box hvr-float-shadow">
              <h5>Service and Repairs</h5>
              <h2>Tyre & Wheels</h2>
              <a href="#" className="read-more">read more  +</a>
              <div className="icon"><span className="flaticon-tire"></span></div>
            </div>
          </div>
          <div className="col-lg-4 service-block-one">
            <div className="inner-box hvr-float-shadow">
              <h5>Service and Repairs</h5>
              <h2>Denting & Painting</h2>
              <a href="#" className="read-more">read more  +</a>
              <div className="icon"><span className="flaticon-spray-gun"></span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

      <section className="features-section">
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-6">
              <div className="inner-container">
                <h2>
                  Quality Service And <br />
                  Customer Satisfaction !!
                </h2>
                <div className="text">
                  We utilize the most recent symptomatic gear to ensure your
                  vehicle is fixed or adjusted appropriately and in an opportune
                  manner. We are an individual from Professional Auto Service, a
                  first class execution arrange, where free assistance offices
                  share shared objectives of being world-class car
                  administration focuses.
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="image">
                <img src="assets/images/custom/misc/image-3.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUs />

      <BottomBanner />
      <BottomSchedule />
    </div>
  );
}

export default Home;
