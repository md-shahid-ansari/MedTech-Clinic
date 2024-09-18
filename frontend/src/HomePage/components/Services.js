import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Services.css';
import serviceImage1 from '../assets/image3.jpg';
import serviceImage2 from '../assets/image4.jpg';
import serviceImage3 from '../assets/health.jpg'


const featureData = [
    {
        text: '<span class="highlight">Strengthen patient relationships</span>: Empower patients with the information and digital access to manage their healthcare needs while reducing staff administrative work.',
        image: serviceImage1
    },
    {
        text: '<span class="highlight">Enable physician efficiency</span>: Reduce documentation time and distractions with robust record sharing and workflow support before and during encounters.',
        image: serviceImage2
    },
    // Add more data as needed
];


function Services() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % featureData.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + featureData.length) % featureData.length);
    };
    const {text, image} = featureData[currentIndex];

    return (
        <section className="services" id="services">
            <div className="container">
                <h2>Empowering <span className="diff-color">your health</span> with personalized care. Experience <span className="diff-color">excellence </span>in every visit at <span className="diff-color">MedTech Clinic.</span></h2>
                <div className="service-cards">
                    <div className="service-card">
                        <Link to="/patient-login">
                            <h3>Book Appoinment</h3>
                            <p>Get an appoinment for patient.</p>
                        </Link>
                    </div>
                    <div className="service-card">
                        <Link to="/clinic-login">
                            <h3>Manage Appoinment</h3>
                            <p>Manage appoinment for clinic.</p>
                        </Link>
                    </div>
                    <div className="service-card">
                        <Link to="/patient-login">
                            <h3>Doctor Login</h3>
                            <p>See your schedule of appoinment </p>
                        </Link> 
                    </div>
                </div>
                <div className="feature-point">
                    <div className="feature-point-content">
                        <div className="feature-point-text">
                            {/* Render HTML content */}
                            <p dangerouslySetInnerHTML={{ __html: text }} />
                        </div>
                        <div className="service-image">
                            <img src={image} alt="Clinic Feature" />
                        </div>
                    </div>    
                </div>
                <div className="arrows">
                        <button onClick={handlePrev} className="arrow-button">←</button>
                        <button onClick={handleNext} className="arrow-button">→</button>
                </div>
                <div className="about-us">
                    <div className="about-us-img">
                        <img src={serviceImage3} ></img>
                    </div>
                    <div className="about-us-text">
                        <h2>About Us</h2>
                        <p>
                            At MedTech Clinic, we are committed to delivering personalized,
                            high-quality healthcare that empowers you to take control of your
                            well-being. We combine innovation with compassionate care to offer
                            a variety of services tailored to meet your individual needs. Our
                            team of dedicated healthcare professionals uses the latest
                            technology to provide you with a seamless, efficient experience.
                            From booking appointments to managing your health records, we
                            ensure convenience and accessibility at every step. At MedTech
                            Clinic, your health is our priority. Whether you're here for a
                            routine check-up, consultation, or specialized treatment, you can
                            trust our team to provide the best care possible. Join us in
                            redefining healthcare excellence, where your well-being always
                            comes first.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Services;
