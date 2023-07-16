import React from 'react';
import { openDataRoute } from 'urls';
import { PrimaryButton } from 'components';
import logo from 'images/big-logo.svg';
import bg from 'images/main-bg.svg';

export default React.memo(Auth);

function Auth() {
	return (
		<main className="main-container" style={{ minHeight: '909px' }}>
			<div className="main-page">
				<div className="main-page__top">
					<div className="container">
						<div className="row">
							<div className="col-12 col-lg-7"><img className="main-page__big-logo" src={logo} alt=""/></div>
							<div className="col-12 col-lg-5 position-static"><img className="main-page__top-bg" src={bg} alt=""/></div>
						</div>
					</div>
				</div>
				<div className="main-page__body">
					<div className="container">
						<div className="row">
							<div className="col-12 col-lg-5">
								<h1>Личный кабинет</h1>
								<ul>
									<li>
										<h5>Получите информацию о своих объектах интеллектуальной собственности в едином пространстве</h5>
									</li>
									<li>
										<h5> Подавайте заявки/заявления и следите за их статусом в личном кабинете</h5>
									</li>
									<li>
										<h5>Получайте техническую и юридическую поддержку</h5>
									</li>
								</ul>
								<PrimaryButton
									className="attention"
									title="Войти с помощью ЕСИА"
									onClick={() => window.location.assign('/accounts/esia/login')}
								/>
							</div>
							<div className="col-12 col-lg-5 offset-lg-1">
								<h1>Открытые данные</h1>
								<ul>
									<li>
										<h5>Получайте данные по всем объектам интеллектуальной собственности в открытых реестрах</h5>
									</li>
									<li>
										<h5>Осуществляйте расширенный поиск по объектам интеллектуальной собственности</h5>
									</li>
									<li>
										<h5>Воспользуйтесь данными патентной аналитики</h5>
									</li>
									<li>
										<h5>Воспользуйтесь информацией по пошлинам и патентным поверенным</h5>
									</li>
								</ul>
								<PrimaryButton
									className="attention"
									title="Перейти к «Открытым данным»"
									onClick={() => window.location.assign(openDataRoute)}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
