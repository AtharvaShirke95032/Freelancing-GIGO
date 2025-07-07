import noImage from '../../assets/Images/no-image.png';
import './TestimonialsSlider.scss';

export default function Testimonial({ data, role }) {
    return (
        <div className="testimonials">
            {data?.length > 0 ? (
                <div className="cards">
                    {data.map((testimonial, i) => (
                        <div key={i} className="card">
                            <img 
                                src={
                                    role === "freelancer" 
                                    ? (testimonial.clientAvatar && testimonial.clientAvatar !== "no-image.png" 
                                        ? `http://localhost:3001/ProfilePic/${testimonial.clientAvatar}` 
                                        : noImage) 
                                    : (testimonial.freelancerAvatar && testimonial.freelancerAvatar !== "no-image.png" 
                                        ? `http://localhost:3001/ProfilePic/${testimonial.freelancerAvatar}` 
                                        : noImage)
                                } 
                                alt="User Avatar"
                            />
                            <div className="info">
                                <div className="cardHeader">
                                    {role === "freelancer" ? testimonial.clientUsername : testimonial.freelancerUsername}:
                                </div>
                                <div className="cardDescription">
                                    {role === "freelancer" ? testimonial.text : testimonial.testimonialText}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="noTestimonials">No reviews yet.</div>
            )}
        </div>
    );
}
