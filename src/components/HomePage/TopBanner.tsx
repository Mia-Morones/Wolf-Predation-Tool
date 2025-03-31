import { CalciteButton } from '@esri/calcite-components-react';
import React from 'react';
import { Link } from 'react-router-dom';
import TopBannerImg from './top-banner.jpg';
import { PATH_CALCULATOR_PAGE } from '@constants/router';
// import TopBannerImg from './assets/top-banner.jpg';

export const TopBanner = () => {
    return (
        <div
            className="relative w-full py-10 top-banner-overlay"
            style={{
                height: 'calc(100vh - 65px)',
                background: `url(${TopBannerImg}) center center no-repeat`,
                backgroundSize: 'cover',
            }}
        >
            <div className=" absolute top-0 left-0 w-full h-full bg-black opacity-20"></div>

            <div className="container pt-8 pb-12 relative">
                <div className="text-center max-w-xl mx-auto mb-8">
                    <h1 className="text-4xl text-shadow text-white font-medium ">
                        Explore and calculate relative risk, impacts of
                        mitigation, and potential losses.
                    </h1>
                </div>

                <div className="max-w-[990px] text-center mx-auto text-shadow text-white my-16 text-xl">
                    <p className="mb-8">
                        This tool provides information about the economic
                        feasibility of non-lethal wolf conflict reduction
                        practices and devices, and it is tailored to an
                        individual livestock property. You can estimate the
                        probability of wolf conflict and estimate expected costs
                        of livestock loss as compared to the cost of mitigation.
                    </p>

                    <p>
                        Note: Analysis from this decision tool are estimates and
                        may vary from actual conditions.
                    </p>
                </div>

                <div className="mt-16 flex items-center justify-center">
                    <div className="">
                        <Link to={PATH_CALCULATOR_PAGE}>
                            <CalciteButton
                                width="full"
                                // kind="inverse"
                                scale="l"
                            >
                                <span className="text-lg uppercase">
                                    Open Calculator
                                </span>
                            </CalciteButton>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
