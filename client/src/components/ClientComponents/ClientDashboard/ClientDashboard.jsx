import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { myDashboard } from "../../../Redux/ClientSlice";
import ClientMenu from "../ClientMenu/ClientMenu";
import Testimonial from "../../TestimonialsSlider/TestimonialsSlider";
import { tokenExists } from "../../../Redux/UserSlice";
import Loading from "../../Loading/Loading";
import "./ClientDashboard.scss";
import ExpenseLoader from "../../ExpenseLoader/ExpenseLoader";

export default function ClientDashboard() {
  const { token } = useSelector((state) => state.user);
  const { data } = useSelector((state) => state.client);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [totalBudget, setTotalBudget] = useState(5000); // Default budget
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    tokenExists(token, navigate, dispatch).then((data) => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (
        data == false ||
        userInfo?.role !== "client" ||
        userInfo?._id !== id
      ) {
        navigate("/login");
      }
    });

    dispatch(myDashboard())
      .unwrap()
      .then((response) => {
        setTimeout(() => {
          setLoading(false);
          if ([404, 403, 505].includes(response.status)) {
            toast.error(response.msg);
            navigate("/login");
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

  return (
    <>
      {loading && <Loading />}

      <div className="con">
        <div className="grid">
          <div className="salmon">
            <p className="maintext">
              {" "}
              Welcome Back {data?.dashboard?.username}{" "}
            </p>
            <p className="subtext"> Here is your dashboard </p>
          </div>

          <div className="broccoli">
            <h2>Total Orders</h2>
            <p>{data?.dashboard?.orders}</p>
          </div>

          <div className="tamago">
            <div className="collect">
              <h2>Set Your Budget</h2>
              <input
                type="number"
                value={totalBudget}
                onChange={(e) =>
                  setTotalBudget(e.target.value ? Number(e.target.value) : "")
                }
                placeholder="Enter your total budget"
              />
            </div>

            <ExpenseLoader
              totalBudget={totalBudget}
              expenses={parseFloat(data?.dashboard?.expenses || 0)}
            />
          </div>

          <div className="pork">
            <h2>Last Review Made By You </h2>
            <div className="cards">
              {Array.isArray(data?.dashboard?.testimonials) &&
              data.dashboard.testimonials.length > 0 ? (
                <Testimonial role="client" data={data.dashboard.testimonials} />
              ) : (
                <div className="noTestimonials">
                  You have no reviews for now
                </div>
              )}
            </div>
          </div>

          <div className="edamame">
            <h2>Completed Orders</h2>
            <p>{data?.dashboard?.completedOrders}</p>
          </div>
        </div>
        <ClientMenu/>
      </div>
    </>
  );
}
