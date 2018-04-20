import React from 'react';
import ReactDOM from 'react-dom';

import DaumPostcode from './../lib';

const style = {
  width: '50%',
  height: 600,
  margin: '0 auto',
};

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null,
    };
  }

  handleAddress = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    this.setState({ address: fullAddress });
  }

  render() {
    return (
      <div style={style}>
        <DaumPostcode
          onComplete={data => this.handleAddress(data)}
          autoResize
          autoClose
        />
        <div>
          {this.state.address}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Example/>, document.getElementById('root'));
