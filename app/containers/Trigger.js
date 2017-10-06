import React, { Component } from 'react'

export default (WrappedComponent) => class  extends Component {
  constructor(props) {
    super(props);
    this.isMount = false;
    this.listeners = [];
    this.onPopup = this._onPopup.bind(this);
  }
  isContains(root, node) {
    while(node) {
      if(root === node) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }
  isFunction(func) {
    return typeof func === 'function';
  }
  onDocumentClick(event, callback) {
    const root = this.container;
    const target = event.target
    if(
      this.isMount &&
      this.isFunction(callback) &&
      !this.isContains(root, target)
    ) {
      callback(event);
    }
  }
  addEventListener(target, event, callback) {
    const cb = (e) => this.onDocumentClick(e, callback);
    if(target && target.addEventListener) {
      target.addEventListener(event, cb, false);
      return () => {target.removeEventListener(event, cb, false)};
    }
  }
  _onPopup(e, cb) {
    this.listeners.push(
      this.addEventListener(
        document,
        e, 
        (event) => {
          this.isFunction(cb) && cb();
        }
      )
    )
  }
  componentDidMount() {
    this.isMount = true;
  }
  componentWillUnmount() {
    this.isMount = false;
    this.listeners.map((func) => {
      this.isFunction(func) && func();
    })
  }
  render() {
    return (
      <div ref = {(ref) => this.container = ref}>
        <WrappedComponent 
          {...this.props}
          onPopup = {this.onPopup}
        />
      </div>
    );
  }
} 