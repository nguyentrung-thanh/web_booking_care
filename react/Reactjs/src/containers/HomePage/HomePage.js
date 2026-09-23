import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacilty from './Section/MedicalFacilty';
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 1. Khai báo đủ các state tương ứng với từng section
            isShowMoreSpecialty: false,
            isShowMoreMedical: false
        }
    }

    // 2. Viết hàm dùng chung nhận vào stateKey để đổi trạng thái đúng cái cần đổi
    handleViewDetail = (stateKey) => {
        this.setState({
            [stateKey]: !this.state[stateKey]
        });
    }

    render() {
        let { isShowMoreSpecialty, isShowMoreMedical } = this.state;
        let settings = {
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };

        return (
            <div>
                <HomeHeader />

                {/* 3. Truyền đúng tên hàm và bọc arrow function gọi kèm 'stateKey' */}
                <Specialty
                    settings={settings}
                    isShowMore={isShowMoreSpecialty}
                    handleViewDetail={() => this.handleViewDetail('isShowMoreSpecialty')}
                />

                <MedicalFacilty
                    settings={settings}
                    isShowMore={isShowMoreMedical}
                    handleViewDetail={() => this.handleViewDetail('isShowMoreMedical')}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);