import React, { useEffect, Fragment, useState } from 'react'
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandling = (WrappedComponent) => {

    return (props) => {

        const [error, setErrorState] = useState(null);

        const errorHandling = () => {
            setErrorState(null);
        }

        useEffect(() => {
            // console.log(error);
        }, [error]);


        return (

            <Fragment>
                <Modal
                    modalStatus={error}
                    modalClosed={errorHandling}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} throwError={setErrorState} />
            </Fragment >
        )
    }

}

export default withErrorHandling;