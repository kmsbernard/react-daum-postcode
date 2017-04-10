import React from 'react';
import PropTypes from 'prop-types';

const daum = global.daum;

class DaumPostcode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'block',
      width: this.props.width,
      height: this.props.height,
    };
  }

  componentDidMount() {
    this.initiate();
  }

  initiate = () => {
    const comp = this;

    daum.postcode.load(() => {
      const Postcode = new daum.Postcode({
        oncomplete: function oncomplete(data) {
          comp.props.onComplete(data);
          if (comp.props.autoClose) comp.setState({ display: 'none' });
        },
        onresize: function onresize(size) {
          if (comp.props.autoResize) comp.setState({ height: size.height });
        },
        theme: comp.props.theme,
        animation: comp.props.animation,
        width: '100%',
        height: '100%',
      });

      Postcode.embed(this.wrap, { q: this.props.defaultQuery, autoClose: this.props.autoClose });
    });
  };

  render() {
    return (
      <div
        ref={(div) => { this.wrap = div; }}
        style={{
          ...this.props.style,
          display: this.state.display,
          width: this.state.width,
          height: this.state.height,
        }}
      />
    );
  }
}

DaumPostcode.propTypes = {
  onComplete: PropTypes.func.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  autoClose: PropTypes.bool,
  autoResize: PropTypes.bool,
  animation: PropTypes.bool,
  style: PropTypes.object,
  defaultQuery: PropTypes.string,
  theme: PropTypes.object,
};

DaumPostcode.defaultProps = {
  width: '100%',
  height: 400,
  autoClose: false,
  autoResize: false,
  animation: false,
  style: null,
  defaultQuery: null,
  theme: null,
};

export default DaumPostcode;
