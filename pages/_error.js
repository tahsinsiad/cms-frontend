import React from 'react';
import ErrorPage from '../components/error_page/ErrorPage';


const DefaultErrorPage = () => {
    return (
        <ErrorPage status={400} subTitle="Sorry, something went wrong. Please try again later." />
    );
};

export default DefaultErrorPage;
