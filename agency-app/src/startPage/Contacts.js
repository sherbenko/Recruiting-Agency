import React from 'react';

const styles = {
    a: {
        target: '_blank'
    },
    footer: {
        position: ' relative',
        color: '#ffffff',
        backgroundColor: '#292d33'
    },
    div: {
        padding: '30px',
        position: ' relative',
        textAlign: 'center',
        whiteSpace: 'nowrap',
    },
    img: {
        width: '40px',
        padding: '5px'
    }
};

function Contacts() {
    return (
        <footer style={styles.footer} id="sec-b411">
            <div style={styles.div}>
                <a style={styles.a} href="https://www.facebook.com/iTechArt.Group">
                    <img style={styles.img}
                         src="https://itechart-by.s3.amazonaws.com/storage/static/svg/icons/facebook.svg"/>
                </a>
                <a style={styles.a} href="https://www.instagram.com/itechart_official/">
                    <img style={styles.img}
                         src="https://itechart-by.s3.amazonaws.com/storage/static/svg/icons/instagram.svg"/>
                </a>
                <a style={styles.a} href="https://www.linkedin.com/showcase/itechart-life">
                    <img style={styles.img}
                         src="https://itechart-by.s3.amazonaws.com/storage/static/svg/icons/linked-in.svg"/>
                </a>
            </div>
            <div style={{position: 'fixed', right: '10px', bottom: '10px'}}><a href="#top" >
                <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-arrow-up-square" fill="currentColor"
                     xmlns="http://www.w3.org/2000/svg" style={{color: '#8F9396'}}>
                    <path fillRule="evenodd"
                          d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path fillRule="evenodd"
                          d="M4.646 8.354a.5.5 0 0 0 .708 0L8 5.707l2.646 2.647a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 0 .708z"/>
                    <path fillRule="evenodd" d="M8 11.5a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-1 0v5a.5.5 0 0 0 .5.5z"/>
                </svg></a></div>
        </footer>
    )
}

export default Contacts