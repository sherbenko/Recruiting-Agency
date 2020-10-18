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
    h4: {
        fontWeight: '300',
        textTransform: 'uppercase',
        fontSize: '1rem',
        letterSpacing: '10px',
        margin: '50px 20px 0',
        textAlign: 'left'
    },
    p: {
        textAlign: 'left',
        fontSize: '1.5rem',
        margin: '60px 0'
    }
};

const lang = 'ru';
const servsName = ['КЛАССИЧЕСКИЙ РЕКРУТИНГ', 'EXECUTIVE SEARCH', 'АБОНЕНТСКИЙ РЕКРУТИНГ'];
const servs = ['Подбор руководителей и специалистов на типовые позиции. Активный поиск кандидатов и отбор лучших среди тех, кто готов рассматривать предложения от работодателей и хочет сменить работу.',
    'Целевой поиск топ-менеджеров и уникальных специалистов. Особенность услуги в том, что вы имеете возможность выбрать кандидатов из небольшого числа специалистов, работающих на предприятиях вашей отрасли. Как правило, специалисты, из которых производится отбор, не находятся в поиске работы.,' +
    'Закрытие всех ваших вакансий за фиксированную ежемесячную плату. Консультационная поддержка по вопросам управления персоналом.'];

function p(str) {
    return(
        <p className=" text  text-palette-5-dark-3  text-3" style={styles.p}>{str}
        <br/><br/></p>
    )
}
function h4(str) {
    return(
        <h4 style={styles.h5}>{str}
        <br/></h4>
    )
}
function f() {
    let str='';
    for (let i = 0; i<servs.length; i++){
        str+=servsName[i];
        str+='\n';
        str+=servs[i];
        str+='\n';str+='\n';
    }
    return str;
}
function Services(lang) {
    let langConst = [];
    if (lang === 'en') {
        langConst.push('Services');
    } else {
        langConst.push('Услуги');
    }

    return (
        <section className="section section-4" id="sec-6622">
            <div style={{textAlign: 'center', lineHeight: '1.6'}}>
                <h5 style={styles.h5}>{langConst[0]}</h5>
                <br/><br/>
                <p style={styles.p}>{f()}</p>
            </div>

        </section>
    )
}

export default Services