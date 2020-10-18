import React from 'react';
import './Slider.css';
const styles = {
    h5: {
        fontWeight: '300',
        textTransform: 'uppercase',
        fontSize: '1.125rem',
        letterSpacing: '10px',
        margin: '50px 20px 0',
        textAlign: 'center'
    },
    h3: {
        color: 'white',
        fontWeight: '300',
        textTransform: 'uppercase',
        fontSize: '1.5rem',
        letterSpacing: '10px',
        margin: '50px 20px 0',
        textAlign: 'center'
    },
    h1: {
        textAlign: 'center',
        color: 'white',
        fontSize: '2em',

    },
    p: {
        textAlign: 'center',
        fontSize: '1.25rem',
        margin: '60px 0'
    }
};

function Clients(lang) {
    let langConst = [];
    if (lang === 'en') {
        langConst.push('Our clients');
    } else {
        langConst.push('Наши клиенты');
    }
    return (

        <section className="section section-3" id="sec-6622">
            <div style={{textAlign: 'center', lineHeight: '1.6'}}>
                <h5 style={styles.h5}>{langConst[0]}</h5>

                <br/><br/>
                <div className='walkthrough show reveal'>
                    <div className='walkthrough-pagination'>
                        <a className='dot active'/>
                        <a className='dot'/>
                        <a className='dot'/>
                        <a className='dot'/>
                        <a className='dot'/>
                    </div>
                    <div className='walkthrough-body'>
                        <ul className='screens animate'>
                            <li className='screen active'>
                                <div className='media logo'>
                                    <img className='logo' src='https://s3.amazonaws.com/jebbles-codepen/icon.png'/>
                                </div>
                                <h3 style={styles.h3}>
                                    Product Intro
                                    <br/>Walkthrough<br/>
                                </h3>
                                <p style={styles.p}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris.</p>
                            </li>
                            <li className='screen'>
                                <div className='media books'>
                                    <img className='icon' src='https://s3.amazonaws.com/jebbles-codepen/book_icon_1.png'/>
                                    <img className='icon' src='https://s3.amazonaws.com/jebbles-codepen/book_icon_2.png'/>
                                    <img className='icon' src='https://s3.amazonaws.com/jebbles-codepen/book_icon_3.png'/>
                                </div>
                                <h3>
                                    Data and File
                                    <br/>Management<br/>
                                </h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris.</p>
                            </li>
                            <li className='screen'>
                                <div className='media bars'>
                                    <img className='icon' src='https://s3.amazonaws.com/jebbles-codepen/bar_icon_axis.png'/>
                                    <img className='icon' src='https://s3.amazonaws.com/jebbles-codepen/bar_icon_3.png'/>
                                    <img className='icon' src='https://s3.amazonaws.com/jebbles-codepen/bar_icon_2.png'/>
                                    <img className='icon' src='https://s3.amazonaws.com/jebbles-codepen/bar_icon_1.png'/>
                                </div>
                                <h3>
                                    Analytics
                                    <br/>and Metrics<br/>
                                </h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris.</p>
                            </li>
                            <li className='screen'>
                                <div className='media files'>
                                    <img className='icon' src='https://s3.amazonaws.com/jebbles-codepen/file_icon_1.png'/>
                                    <img className='icon' src='https://s3.amazonaws.com/jebbles-codepen/file_icon_2.png'/>
                                    <img className='icon' src='https://s3.amazonaws.com/jebbles-codepen/file_icon_3.png'/>
                                    <img className='icon' src='https://s3.amazonaws.com/jebbles-codepen/file_icon_4.png'/>
                                </div>
                                <h3>
                                    Reporting
                                    <br/>and Insights<br/>
                                </h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris.</p>
                            </li>
                            <li className='screen'>
                                <div className='media comm'>
                                    <img className='icon' src='https://s3.amazonaws.com/jebbles-codepen/comm_icon_1.png'/>
                                    <img className='icon' src='https://s3.amazonaws.com/jebbles-codepen/comm_icon_2.png'/>
                                </div>
                                <h3>
                                    Communications
                                    <br/>Tools
                                    <br/>
                                </h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris.</p>
                            </li>
                        </ul>
                        <button className='prev-screen'>
                            <i>
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-left"
                                     fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                </svg>
                            </i>
                        </button>
                        <button className='next-screen'>
                            <i>
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-right"
                                     fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                </svg>
                            </i>
                        </button>
                    </div>
                    <div className='walkthrough-footer'>

                        <button className='button finish close' disabled={true}>Finish</button>
                    </div>
                </div>

            </div>
            <script src="./cF.js"/>
        </section>
    )
}

export default Clients