import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacilty.scss';
import Slider from 'react-slick';

// import MedicalFaciltyImg from "../../../assets/special/co-xuong-khop.jpg";

// Định nghĩa 2 component mũi tên ngay tại đây cho sạch sẽ
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

class MedicalFacilty extends Component {

    render() {
        // 1. Lấy isShowMore và hàm từ props do HomePage truyền xuống
        let { isShowMore, handleViewDetail, settings } = this.props;


        return (
            <div className='section-share section-Medical-facilty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span>Cơ sở y tế nổi bật</span>
                        <button className='show-content' onClick={() => handleViewDetail()}>
                            {isShowMore ? 'Ẩn bớt' : 'Xem thêm'}
                        </button>
                    </div>

                    {isShowMore && (
                        <div className='section-body'>
                            {/* Dùng đúng biến settings đã khai báo ở trên */}
                            <Slider {...settings}>
                                <div className='section-customize'>
                                    <div className='bg-image' />
                                    <div className='section-name'>Cơ Xương Khớp 1</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image' />
                                    <div className='section-name'>Cơ Xương Khớp 2</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image' />
                                    <div className='section-name'>Cơ Xương Khớp 3</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image' />
                                    <div className='section-name'>Cơ Xương Khớp 4</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image' />
                                    <div className='section-name'>Cơ Xương Khớp 5</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image' />
                                    <div className='section-name'>Cơ Xương Khớp 6</div>
                                </div>
                            </Slider>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacilty);