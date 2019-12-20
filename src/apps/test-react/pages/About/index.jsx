import { Component } from "react";
import { connect } from "react-redux";
import styles from "./styles.module.scss";
console.log(styles);
@connect(state => state)
export default class About extends Component {
  render() {
    const {
      dispatch,
      history,
      location,
      record,
      current,
      isLogined,
      message
    } = this.props;
    return (
      <div className={styles.about}>
        <div className={styles.abc}>About:{current}</div>
      </div>
    );
  }
  // 渲染之后
  componentDidMount() {}
}
