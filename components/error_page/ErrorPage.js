import React from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig();
const { DASHBOARD_PATH } = publicRuntimeConfig;
import ErrorLayout from "../layout/error_layout/ErrorLayout";

const ErrorPage = ({ status, subTitle }) => {
    return (
        <ErrorLayout status={status} subTitle={subTitle}>
            <Link href={DASHBOARD_PATH}>
                <Button>
                    Go To Dashboard
                </Button>
            </Link>
        </ErrorLayout>
    );
};

export default ErrorPage;
