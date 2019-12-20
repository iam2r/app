import { Component } from "react";
import { connect } from "react-redux";
import styles from "./styles.module.scss";
import Count from "../../components/Count";
console.log(styles);
@connect(state => state)
export default class Home extends Component {
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
      <div className={styles.welcome}>
        <Count> </Count>
      </div>
    );
  }
  // 渲染之后
  componentDidMount() {}
}
