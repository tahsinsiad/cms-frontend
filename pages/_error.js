import React from 'react';
import {Button} from 'antd';
import Link from 'next/link';
import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig();
const {DASHBOARD_PATH, ROOT_PATH} = publicRuntimeConfig;
import ErrorLayout from "../components/layout/error_layout/ErrorLayout";

const ErrorPage = () => {
    return (
        <ErrorLayout status={400} subTitle="Sorry, something went wrong. Please try again later.">
            <Link href={DASHBOARD_PATH}>
                <Button>
                    Go To Dashboard
                </Button>
            </Link>
        </ErrorLayout>
    );
};

export default ErrorPage;
