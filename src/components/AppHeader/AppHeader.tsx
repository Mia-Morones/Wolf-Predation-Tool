import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    PATH_CALCULATOR_PAGE,
    PATH_HOME_PAGE,
    PATH_ABOUT_PAGE,
} from '@constants/router';
import CSU_LOGO from './csu-stacked.svg';

export const AppHeader = () => {
    return (
        <div className="h-[65px] w-full flex items-center justify-between bg-theme-brand px-4">
            <div className="w-80 shrink-0 flex items-center">
                <a
                    href={'https://www.colostate.edu/'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        className="h-10 w-auto mr-6"
                        alt="logo"
                        src={CSU_LOGO}
                    />
                </a>
            </div>
            <h5 className=" text-xl text-white">
                Wolf Livestock Conflict Calculator
            </h5>

            <div className=" w-80 shrink-0 flex items-center justify-end text-sm">
                <div className="text-center mx-3">
                    <Link to={PATH_HOME_PAGE}>
                        <span className="underline text-white opacity-90 hover:opacity-100 uppercase">
                            Home
                        </span>
                    </Link>
                </div>

                <div className="text-center mx-3">
                    <Link to={PATH_CALCULATOR_PAGE}>
                        <span className="underline text-white opacity-90 hover:opacity-100 uppercase">
                            Calculator
                        </span>
                    </Link>
                </div>

                <div className="text-center mx-3">
                    <Link to={PATH_ABOUT_PAGE}>
                        <span className="underline text-white opacity-90 hover:opacity-100 uppercase">
                            About
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};
