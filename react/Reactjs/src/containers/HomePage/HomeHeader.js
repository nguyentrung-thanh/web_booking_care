import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage, injectIntl } from 'react-intl';
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from '../../store/actions/appActions';
class HomeHeader extends Component {


    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
        // fire redux event : actions
    }

    render() {
        let language = this.props.language;
        const { formatMessage } = this.props.intl;
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <div className="header-logo"></div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.speciality"></FormattedMessage></b></div>
                                <div className="subs-title"><FormattedMessage id="home-header.searchdoctor"></FormattedMessage></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.health-facility"></FormattedMessage></b></div>
                                <div className="subs-title"><FormattedMessage id="home-header.select-room"></FormattedMessage></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.doctor"></FormattedMessage></b></div>
                                <div className="subs-title"><FormattedMessage id="home-header.searchdoctor"></FormattedMessage></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.fee-planning"></FormattedMessage></b></div>
                                <div className="subs-title"><FormattedMessage id="home-header.general-health-check"></FormattedMessage></div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="fas fa-question-circle"></i>
                                <span className="span"> <FormattedMessage id="home-header.support"></FormattedMessage></span>
                            </div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span ></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span ></div>
                            <div className={language === LANGUAGES.CN ? 'language-cn active' : 'language-cn'}><span onClick={() => this.changeLanguage(LANGUAGES.CN)}>CN</span ></div>
                            <div className={language === LANGUAGES.JP ? 'language-jp active' : 'language-jp'}><span onClick={() => this.changeLanguage(LANGUAGES.JP)}>JP</span ></div>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className="content-up">
                        <div className="title1"><FormattedMessage id="banner.title1"></FormattedMessage></div>
                        <div className="title2"><FormattedMessage id="banner.title2"></FormattedMessage></div>

                        <div className="content-up">
                            <div className="search">
                                <i className="fas fa-search"></i>
                                <input type="text" placeholder={formatMessage({ id: "banner.search" })} />
                            </div>
                        </div>
                    </div>
                    <div className="content-down">
                        <div className="options">
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-hospital"></i></div>
                                <div className="text-child"><FormattedMessage id="banner.child1"></FormattedMessage></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-mobile-alt"></i></div>
                                <div className="text-child"><FormattedMessage id="banner.child2"></FormattedMessage></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-procedures"></i></div>
                                <div className="text-child"><FormattedMessage id="banner.child3"></FormattedMessage></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-flask"></i></div>
                                <div className="text-child"><FormattedMessage id="banner.child4"></FormattedMessage></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-user-md"></i></div>
                                <div className="text-child"><FormattedMessage id="banner.child5"></FormattedMessage></div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(HomeHeader));