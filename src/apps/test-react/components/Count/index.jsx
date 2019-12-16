import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { Button } from 'antd';
import actions from '../../store/actions';


const CountApp = (props) => {
    const { login, addThenMinus } = actions;
    console.log(props)
    return (
        <div className={styles.normal}>
            <div className={styles.record}>Record: {props.record}</div>
            <div className={styles.current}>{props.current}</div>
            <p>{props.message}</p>
            <div className={styles.button}>
                <Button type="primary" onClick={() => { login({ username: 'zrnokia5230', password: 'zaq147895' }) }}>login</Button>
                <Button type="primary" onClick={() => { addThenMinus() }}>+ then -</Button>
            </div>
        </div>
    );
};



CountApp.propTypes = {

};

export default connect(state => state)(CountApp);

