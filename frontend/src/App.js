import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop"; // Import ScrollToTop component
import Home from "./pages/Home";
import HighbridgeGroupHome from "./pages/HighbridgeGroupHome";
import About from "./pages/About"; 
import AboutUsGroup from "./components/AboutUsGroup"; // Import AboutUsGroup component
import ServicesPage from "./pages/Services";
import Contact from "./pages/Contact";
import HighbridgeHeavenPage from "./pages/HighbridgeHeavenPage";
import HighbridgeCountyPage from "./pages/HighbridgeCountyPage";
import HighbridgeManorPage from "./pages/HighbridgeManorPage";
import MagisticLagosPage from "./pages/MagisticLagosPage";
import HighbridgeFarmcityPage from "./pages/HighbridgeFarmcityPage";
import HighbridgeResidencePage from "./pages/HighbridgeResidencePage";
import HighbridgeGardensPage from "./pages/HighbridgeGardensPage";
import BecomeRealtorPage from "./pages/BecomeRealtorPage";
import DigitalMarketingTrainingPage from "./pages/DigitalMarketingTrainingPage";
import SiteInspectionPage from "./pages/SiteInspectionPage";
import WoodlandExtensionPage from "./pages/WoodlandExtensionPage";
import WoodlandPage from "./pages/WoodlandPage";
import OaklandPage from './pages/OaklandPage';
import CedarsPage from "./pages/CedarsPage";
import Cedars3Page from "./pages/Cedars3Page";
import FarmcityPlusPage from "./pages/FarmcityPlusPage";
import ParkPage from "./pages/ParkPage";
import HighbridgeHillcity from "./pages/HighbridgeHillcity";
import PropertiesPage from "./pages/PropertiesPage";
import AllTeamsPage from "./pages/AllTeamsPage"; // Import the AllTeamsPage component
import CreateReport from "./components/CreateReport"; // Import CreateReport component
import ReportList from "./components/ReportList"; // Import ReportList component
import AddInventory from "./components/AddInventory"; // New import for AddInventory
import EnergyInventoryList from './components/EnergyInventoryList';
import CreateStaffReport from "./components/CreateStaffReport"; // Import CreateStaffReport component
import StaffReportList from "./components/StaffReportList"; // Import StaffReportList componen
import PaymentSuccess from "./components/PaymentSuccess"; // Import the success page
// Import RealtorList component
import RealtorList from "./components/RealtorList"; 
import DigitalMarketingTable from './components/DigitalMarketingTable'; // Import DigitalMarketingTable
import AgrovestLandingPage from "./pages/AgrovestLandingPage"; // Import AgrovestLandingPage
import AgrovestWebinarPage from "./pages/AgrovestWebinarPage"; // Import AgrovestLandingPage
import DashboardPage from './components/Dashboard';
import AdminDashboard from "./components/AdminDashboard"; // Import Admin Dashboard
// **Import New Components**
import AgroVest from "./components/AgroVest";
import Buy2Flip from "./components/Buy2Flip";



const App = () => {
  
  return (
    <Router>
      <ScrollToTop /> {/* Add the ScrollToTop component here */}
      <Routes>
      <Route path="/" element={<HighbridgeGroupHome />} />
      <Route path="/HighbridgeHomes" element={<Home />} />
        <Route path="/flipvest" element={<AgrovestLandingPage />} /> {/* New route for AgrovestLandingPage */}
        <Route path="/webiner" element={<AgrovestWebinarPage />} /> {/* New route for AgrovestLandingPage */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/heaven" element={<HighbridgeHeavenPage />} />
        <Route path="/highbridge-county" element={<HighbridgeCountyPage />} />
        <Route path="/highbridge-manor" element={<HighbridgeManorPage />} />
        <Route path="/magistic-lagos" element={<MagisticLagosPage />} />
        <Route path="/farmcity" element={<HighbridgeFarmcityPage />} />
        <Route path="/park" element={<ParkPage />} />
        <Route path="/farmcity-plus" element={<FarmcityPlusPage />} />
        <Route path="/residence" element={<HighbridgeResidencePage />} />
        <Route path="/garden" element={<HighbridgeGardensPage />} />
        <Route path="/become-realtor" element={<BecomeRealtorPage />} />
        <Route path="/digital-marketing-training" element={<DigitalMarketingTrainingPage />} />
        <Route path="/site-inspection" element={<SiteInspectionPage />} />
        <Route path="/woodland" element={<WoodlandExtensionPage />} />
        <Route path="/woodland2" element={<WoodlandPage />} />
        <Route path="/oakland" element={<OaklandPage />} />
        <Route path="/cedars" element={<CedarsPage />} />
        <Route path="/cedars3" element={<Cedars3Page />} />
        <Route path="/hilcity" element={<HighbridgeHillcity />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/all-teams" element={<AllTeamsPage />} /> {/* New route for all teams */}
        <Route path="/about-us-group" element={<AboutUsGroup />} /> {/* New AboutUsGroup Route */}
         {/* Report Management Routes */}
         <Route path="/create-report" element={<CreateReport />} /> {/* Route for creating reports */}
        <Route path="/reports" element={<ReportList />} /> {/* Route for viewing all reports */}
        {/* Add Inventory Route */}
        <Route path="/add-inventory" element={<AddInventory />} /> {/* Route for adding inventory */}
        <Route path="/energy-inventory-list" element={<EnergyInventoryList />} /> {/* Energy Inventory List route */}

        {/* Staff Report Management Routes */}
        <Route path="/create-staff-report" element={<CreateStaffReport />} /> {/* Route for creating staff reports */}
        <Route path="/staff-reports" element={<StaffReportList />} /> {/* Route for viewing all staff reports */}


        <Route path="/agrovest" element={<AgroVest />} />
        <Route path="/buy2flip" element={<Buy2Flip />} />


        {/* New Realtor List Route */}
        <Route path="/realtors" element={<RealtorList />} />
         {/* Digital Marketing Registrations Route */}
         <Route path="/digital-marketing-registrations" element={<DigitalMarketingTable />} /> {/* New route for viewing all digital marketing registrations */}
         <Route path="/dashboard/:userId" element={<DashboardPage />} />
         <Route path="/admin/dashboard" element={<AdminDashboard />} /> {/* Admin Dashboard Route */}
         <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
    </Router>
  );
};

export default App;