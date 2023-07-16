import React from 'react';
import fb from 'images/fb.svg'
import insta from 'images/insta.svg'
import twitter from 'images/twitter.svg'

export default React.memo(SiteFooter);

function SiteFooter() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-3">
                        <nav className="footer-nav">
                            <ul>
                                <li><a href="/">Поиск</a></li>
                                <li><a href="/">О роспатенте</a></li>
                                <li><a href="/">Калькулятор пошлин</a></li>
                                <li><a href="/">Документы и формы</a></li>
                                <li><a href="/">Патентные поверенные</a></li>
                                <li><a href="/">Открытые данные</a></li>
                                <li><a href="/">Поддержка пользователей</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-12 col-lg-3">
                        <h5 className="title"> Контакты</h5>
                        <p>Бережковская наб., д. 30, корп. 1, Москва, Г-59, ГСП-3, 125993, РФ</p><a className="mb-4" href="mailto:fips@rupto.ru">   fips@rupto.ru</a><a className="mb-4" href="tel:+7(499)240-6015">   +7 (499) 240-6015</a>
                        <ul className="soc mt-5">
                            <li className="soc__item">
                                <a href="/">
                                    <img src={fb} width="32px" alt="" />
                                </a>
                            </li>
                            <li className="soc__item">
                                <a href="/">
                                    <img src={insta} width="32px" alt="" />
                                </a>
                            </li>
                            <li className="soc__item">
                                <a href="/">
                                    <img src={twitter} width="32px" alt="" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-12 col-lg-3">
                        <h5 className="title"> Режим рабочего времени ФИПС</h5>
                        <p>Понедельник - Четверг: 9:30 – 18:15<br /> Пятница: 9:30 – 17:00<br /> Суббота, воскресенье, нерабочие и<br /> праздничные дни – выходные дни.</p>
                    </div>
                    <div className="col-12 col-lg-3">
                        <h5 className="title"> Режим работы окон приема документов:</h5>
                        <p>Понедельник – Четверг: 9:00 – 17:45 <br />Пятница: 9:00 – 16:30 <br />Без перерыва на обед</p>
                        <div className="copyright"> © 2009 - 2020 ФИПС</div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
