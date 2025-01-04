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
const { Content } = Layout;

const App = () => {
  return <Router>
    <TelLayout>
      <Content style={{ padding: '24px' }}>
        <Routes>
          <Route path="/" element={<PaymentForm />} />
          <Route path="/history" element={<PaymentHistory />} />
          <Route path="/example" element={<Example />} />
          <Route path="/example2" element={<Example2 />} />
          <Route path="/client" element={<Clients />} />
          <Route path="/call" element={<Call />} />
          <Route path="/station" element={<Stations />} />
        </Routes>
      </Content>
    </TelLayout>
  </Router>
};

export default App;
