import React, { Component } from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

class NotAuthorizedPage extends Component {
  render() {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button type="primary"><Link to="/">Back to Home</Link></Button>}
      />
    );
  }
}

export default NotAuthorizedPage;
