import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';
import '../components/css/style.css'
import '../components/css/common.css'
import '../components/css/style2.css'
import '../components/css/login.css'
import '../components/css/signup.css'
import wrapper from '../store/configureStore';
const NodeBird = ({ Component }) => (
  <>
    <Head >
      <meta charSet="utf-8" />
      <title>ChaCode</title>
    </Head>
    <Component />
  </>
);

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export function reportWebVitals(metric) {
  console.log(metric);
}

export default wrapper.withRedux(NodeBird);
