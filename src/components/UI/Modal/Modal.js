import React, { Fragment, useEffect } from 'react';

import classes from './Modal.module.scss';
import BackDrop from '../Backdrop/BackDrop';
import Card from '../Card/Card';

const Modal = (props) => {

    useEffect(() => {
        console.log("[Modal] Update");
    });

    const switchModalStatus = () => props.modalStatus ? classes.Modal_Show : classes.Modal_Hide;


    return (
        <Fragment>
            <BackDrop show={props.modalStatus} clicked={props.modalClosed} />
            {/* <div className={classes.Modal} style={{
                transform: props.modalStatus ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.modalStatus ? '1' : '0'
            }}> */}
            <Card roundedBorders={true} customStyles={[classes.Modal, switchModalStatus()]}>
                {props.children}
            </Card>
            {/* </div> */}
        </Fragment>
    );
}
export default Modal;
// export default React.memo(Modal,
//     (prevProps, nextProps) => {
//         let childrenCompration = null;
//         if (prevProps.children !== null && nextProps.children !== null) {
//             console.log(prevProps);
//             console.log(nextProps);
//             childrenCompration = JSON.stringify(Object.keys(prevProps.children.props))
//                 !== JSON.stringify(Object.keys(nextProps.children.props));
//         }
//         return !(prevProps.modalStatus !== nextProps.modalStatus || childrenCompration);
//     });