import Link from "next/link";
import getConfig from "next/config";
const {publicRuntimeConfig} = getConfig();
const {DASHBOARD_PATH} = publicRuntimeConfig;
import { Button } from "antd";
import ErrorLayout from "../components/layout/error_layout/ErrorLayout";
import React from "react";
import {withAuthSync} from "../utils/withAuthSync";

const Home = () => {
    return (
      <ErrorLayout status={500} subTitle="You should never see this.">
        <Link href={DASHBOARD_PATH}>
          <Button>
                    Go To Dashboard
          </Button>
        </Link>
      </ErrorLayout>
    );
};

export default withAuthSync(Home);
