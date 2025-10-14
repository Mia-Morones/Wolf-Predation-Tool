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
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20"></div>

            <div className="container pt-8 pb-12 relative">
                <div className="text-center max-w-xl mx-auto mb-6">
                    <h1 className="text-4xl text-shadow text-white font-medium ">
                        Ranching in Wolf Country
                        <br />
                        WolfWise Risk-Cost Calculator
                    </h1>
                </div>

                <div className="max-w-[990px] mx-auto text-shadow text-white text-xl text-center my-8">
  <ul className="list-disc list-inside inline-block text-left my-4 space-y-1">
    <li>How likely is it that your livestock might be killed by wolves?</li>
    <li>How much does it cost to prevent losses?</li>
    <li>How effective do prevention tools need to be to cover their costs?</li>
  </ul>
</div>

               <div className="max-w-5xl text-center mx-auto text-shadow text-white my-8 text-base">
  <p className="mb-4">
    This website provides livestock producers with an easy-to-use tool to evaluate the economic costs of using conflict 
    reduction practices specifically tailored to the location of a livestock operation and how likely wolf losses might 
    be. WolfWise estimates the probability and value of losing livestock to wolves and compares it to the costs of using 
    prevention tools. The program provides estimates based on conflict data and a prevention cost report from 2025 and 
    can be overwritten to experiment with a user’s personal experiences about a location or operation.  
  </p>

  <p>
    <strong>Note:</strong> Analysis from this decision tool are estimates and may vary from actual conditions. No information you enter is collected or shared.
  </p>
</div>

                <div className="mt-16 flex items-center justify-center">
                    <div>
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

