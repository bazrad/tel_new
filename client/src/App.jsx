import React from "react";
import TelLayout from "./components/layout";
import { Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PaymentForm from "./components/Payment/PaymentForm";
import PaymentHistory from "./components/Payment/PaymentHistory";
import Example from "./components/Payment/Example";
import Example2 from "./components/Payment/Example2";
import Clients from "./components/Client/ClientsList";
import Call from "./components/Payment/Call";
import Stations from "./components/Station/staionList";
import LoginForm from "./components/login";
const { Content } = Layout;

const App = () => {
  return <Router>
    <Content style={{ padding: '24px' }}>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/payment" element={<TelLayout><PaymentForm /></TelLayout>} />
        <Route path="/history" element={<TelLayout><PaymentHistory /></TelLayout>} />
        <Route path="/example" element={<TelLayout><Example /></TelLayout>} />
        <Route path="/example2" element={<TelLayout><Example2 /></TelLayout>} />
        <Route path="/client" element={<TelLayout><Clients /></TelLayout>} />
        <Route path="/call" element={<TelLayout><Call /></TelLayout>} />
        <Route path="/station" element={<TelLayout><Stations /></TelLayout>} />
      </Routes>
    </Content>
  </Router>
};

export default App;
