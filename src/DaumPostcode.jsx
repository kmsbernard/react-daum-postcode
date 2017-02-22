import React from 'react';


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
  }

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
  onComplete: React.PropTypes.func.isRequired,
  width: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
  height: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
  autoClose: React.PropTypes.bool,
  autoResize: React.PropTypes.bool,
  animation: React.PropTypes.bool,
  style: React.PropTypes.object,
  defaultQuery: React.PropTypes.string,
  theme: React.PropTypes.object,
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
