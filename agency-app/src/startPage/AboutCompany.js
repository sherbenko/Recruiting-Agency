import React from 'react';

const styles = {
    h5: {
        fontWeight: '300',
        textTransform: 'uppercase',
        fontSize: '1.125rem',
        letterSpacing: '10px',
        margin: '50px 20px 0',
        textAlign: 'center'
    },
    h2: {
        fontWeight: '300',
        fontSize: '3.75rem',
        margin: '34px 20px 0',
        fontFamily: 'Roboto, sans-serif',
        textAlign: 'center'
    },
    p: {
        textAlign: 'center',
        fontSize: '1.5rem',
        margin: '60px 0'
    }
};

function AboutCompany(lang) {
    const companyName = 'Recruiting agency';
    const infCom = 'Разнообразный и богатый опыт консультация с&nbsp; активом обеспечивает широкому кругу. ' +
        '12 лет опыта. Повседневная практика показывает, что реализация намеченных плановых заданий в значительной ' +
        'степени обуславливает создание превосходной модели развития в будующем.';
    let langConst;
    if(lang === 'en') langConst = 'Recruiting agency';
    else langConst = 'Рекрутинговое агенство';
    return (
        <section className="section  section-2" id="sec-6622">
            <div style={{textAlign: 'center', lineHeight: '1.6'}}>
                <h5 style={styles.h5}>{langConst}</h5>
                <h2 style={styles.h2}><b>{companyName}</b>
                </h2>
                <p style={styles.p}>{infCom}</p>
            </div>
        </section>
    )
}

export default AboutCompany;