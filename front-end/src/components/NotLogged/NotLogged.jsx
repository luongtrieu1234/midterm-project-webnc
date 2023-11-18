/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import './NotLogged.css';

const NotLogged = () => {
    return (
            <div >
                <div id="notlogged" >
                    <div className="notlogged ">
                        <div className="notlogged-403">
                            <h1>4<span>0</span>3</h1>
                        </div>
                        <h2>You are not logged in, please log in before entering this page!</h2>
                        <form className="notlogged-search">
                            <input type="text" placeholder="Search..."/>
                            <button type="button"><span></span></button>
                        </form>
                    </div>
                </div>
            </div>
    );
};

export default NotLogged;
