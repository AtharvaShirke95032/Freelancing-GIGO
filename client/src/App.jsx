import "./App.css";
import Nav from "./components/Nav/Nav";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Chat from "./components/Chat/Chat";
import Profile from "./components/Profile/Profile";

import FreelancerDashboard from "./components/FreelancerComponents/FreelancerDashboard/FreelancerDashboard";
import FreelancerServices from "./components/FreelancerComponents/FreelancerServices/FreelancerServices";
import FreelancerCreateService from "./components/FreelancerComponents/FreelancerCreateService/FreelancerCreateService";
import FreelancerManageServices from "./components/FreelancerComponents/FreelancerManageServices/FreelancerManageServices";
import FreelancerUpdateService from "./components/FreelancerComponents/FreelancerUpdateService/FreelancerUpdateService";
import ServiceDetails from "./components/ServiceDetails/ServiceDetails";

import ClientDashboard from "./components/ClientComponents/ClientDashboard/ClientDashboard";
import ClientFreelancers from "./components/ClientComponents/ClientFreelancers/ClientFreelancers";
import ClientOrders from "./components/ClientComponents/ClientOrder/ClientOrder";
import ClientMenu from "./components/ClientComponents/ClientMenu/ClientMenu";

function App() {
  return (
    <div className="App">
      <Nav />
     
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/freelancer/:id">
          <Route index element={<FreelancerDashboard />} />
          <Route path="services">
            <Route index element={<FreelancerServices />} />
            <Route path="create" element={<FreelancerCreateService />} />
            <Route path="manage" element={<FreelancerManageServices />} />
            <Route path="update/:serviceId" element={<FreelancerUpdateService />} />
            <Route path="show/:serviceId" element={<ServiceDetails type="1" />} />
          </Route>
          <Route path="chat" element={<Chat type="freelancer" />} />
          <Route path="profile" element={<Profile type="1" />} />
        </Route>
        <Route path="/dashboard/client/:id">
          <Route index element={<ClientDashboard />} />
          <Route path="services" element={<ClientFreelancers />} />
          <Route path="services/show/:serviceId" element={<ServiceDetails type="2" />} />
          <Route path="orders" element={<ClientOrders />} />
          <Route path="order/show/:serviceId" element={<ServiceDetails type="3" />} />
          <Route path="chat" element={<Chat type="2" />} />
          <Route path="profile" element={<Profile type="2" />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
