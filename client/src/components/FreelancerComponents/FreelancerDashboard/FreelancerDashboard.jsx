import check from "../../../assets/svgs/check.svg";
import usd from "../../../assets/svgs/usd.svg";
import orders from "../../../assets/svgs/servicesIcon.svg";
import FreelancerMenu from "../FreelancerMenu/FreelancerMenu";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { tokenExists } from "../../../Redux/UserSlice";
import { myDashboard } from "../../../Redux/FreelancerSlice";
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";
import TestimonialSlider from "../../TestimonialsSlider/TestimonialsSlider";
import ExpenseLoader from "../../ExpenseLoader/ExpenseLoader";
import "./FreelancerDashboard.scss";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function FreelancerDashboard() {
  const { token } = useSelector((state) => state.user);
  const { data } = useSelector((state) => state.freelancer);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [goal, setGoal] = useState(1000); // Default revenue goal
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    tokenExists(token, navigate, dispatch).then(
      (data) =>
        (data === false ||
          JSON.parse(localStorage.getItem("userInfo")).role !== "freelancer" ||
          JSON.parse(localStorage.getItem("userInfo"))._id !== id) &&
        navigate("/login")
    );

    dispatch(myDashboard())
      .unwrap()
      .then((data) => {
        setTimeout(() => {
          setLoading(false);
          console.log(data);
          if (data.status === 404 || data.status === 403) {
            toast.error(data.msg);
            navigate("/login");
          }
          if (data.status === 505) {
            toast.error(data.msg);
          }
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          setLoading(false);
          toast.error(error);
        }, 1000);
      });
  }, []);
  const rating = data?.dashboard?.rating || 0;


  return (
    <>
      {loading && <Loading />}

      <div className="ghan">
        <div className="grid1">
          <div className="salmon1">
            <p className="maintext1">
              {" "}
              Welcome Back {data?.dashboard?.username}
            </p>
            <p className="subtext1"> Here is your dashboard </p>
          </div>
          <div className="broccoli1">
            <div className="title1">Total Orders:</div>
            <div className="body-stat1">{data?.dashboard?.ordersNumber}</div>
          </div>
          <div className="tamago1">
            {/* Expense Tracker */}
            <div className="collect1">
              <div className="goal-section">
                <h2>Set Revenue Goal </h2>
                <input
                  type="number"
                  value={goal}
                  onChange={(e) => setGoal(Number(e.target.value))}
                  placeholder="Enter goal"
                />
              </div>
              <ExpenseLoader
                totalBudget={goal}
                expenses={data?.dashboard?.revenues || 0}
              />
            </div>
          </div>
          <div className="pork1">
           
              <h2>Last Reviews </h2>
              <div className="cards">
                {data?.dashboard?.testimonials.length != 0 ? (
                  <TestimonialSlider
                    role="freelancer"
                    data={data?.dashboard?.testimonials}
                  />
                ) : (
                  <div className="noTestimonials">
                    You have no reviews for now
                  </div>
                )}
              </div>
           
          </div>
          <div className="edamame1">
            <div className="title1">Orders Completed</div>
            <div className="body-stat1">{data?.dashboard?.completedOrders}</div>
          </div>
          <div className="tomato1">
            <div className="title1">Rating</div>
            <div className="body-state1">
  {rating === 0 ? (
    <p>Not Rated Yet</p>
  ) : (
    <div className="stars">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} color={i < rating ? "#fcd34d" : "#d1d5db"} />
      ))}
    </div>
  )}
</div>

          </div>
        </div>
        <FreelancerMenu active="home" />
      </div>
    </>
  );
}
