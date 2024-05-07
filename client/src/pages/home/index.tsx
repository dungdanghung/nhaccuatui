import { useAppContext } from "../../context"
import "./home_content.css"
import { GetHotSongs } from "../../api/music"
import { useEffect, useState, useRef } from "react"
import { baseIMG } from "../../config/api"
import PackageSlice from "@danghung_dung/slice_item2"

export default function Home() {
    const [hot_songs, set_hot_songs] = useState([]);
    const { music } = useAppContext()
    const slicehotthumbnailsong = useRef<HTMLDivElement>(null);

    useEffect(() => {
        GetHotSongs()
            .then((rs) => {
                set_hot_songs(rs);
            })
    }, [])
    useEffect(() => {
        let sliderIndex = 1;
        let sliderLenght = hot_songs.length;
        const sliderItems = document.querySelectorAll('.option-all__song-slider-img');

        function changeImage() {
            sliderItems.forEach((item, index) => {
                if (index == sliderIndex) {
                    sliderItems[index].classList.replace('option-all__song-slider-img-third', 'option-all__song-slider-img-first');
                    sliderItems[index].classList.replace('option-all__song-slider-img-second', 'option-all__song-slider-img-first');
                } else if (index == sliderIndex + 1) {
                    sliderItems[index].classList.replace('option-all__song-slider-img-first', 'option-all__song-slider-img-second');
                    sliderItems[index].classList.replace('option-all__song-slider-img-third', 'option-all__song-slider-img-second');
                } else {
                    sliderItems[index].classList.replace('option-all__song-slider-img-first', 'option-all__song-slider-img-third');
                    sliderItems[index].classList.replace('option-all__song-slider-img-second', 'option-all__song-slider-img-third');
                }
                if (sliderIndex == sliderLenght - 1) {
                    sliderItems[0].classList.replace('option-all__song-slider-img-first', 'option-all__song-slider-img-second');
                    sliderItems[0].classList.replace('option-all__song-slider-img-third', 'option-all__song-slider-img-second');
                }
            })
            sliderIndex++;
            if (sliderIndex >= sliderLenght) {
                sliderIndex = 0;
            }
        }

        if (sliderItems.length != 0) {
            setInterval(changeImage, 2000);
        }

        PackageSlice(slicehotthumbnailsong.current, 3, 5, 0.7, 'ease')
    }, [hot_songs])

    return (
        <>
            <div className="content">

                <div className="main-container-pertional main_content js__container-panes active" style={{ width: '100%' }}>
                    <div className="option-all panes-item active">

                        <div className="option-all__song option-all__margin_bot">
                            <div className="slicesonghot">
                                <div ref={slicehotthumbnailsong} className="wrapslicesonghot">
                                    {
                                        hot_songs.map((item) => {
                                            return (
                                                <div key={item['id']} className="sliceitem">
                                                    <div className="wrapsliceitem">
                                                        <div className="wrapthumbnailsliceimg">
                                                            <img src={`${baseIMG}uploads/image/336x188/${item['image']}`}></img>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="option-all__song option-all__margin_bot">
                            <div className="option-heading option-all__song-heading ">
                                <h3 className="option-heading-name option-all__song-heading-left mobile-hiden js__main-color">Bài Hát</h3>
                                <div className="option-all__song-heading-right">
                                    <div className="more-list mobile-hiden">
                                        <span className="js__main-color">Tất cả</span>
                                        <i className="fas fa-chevron-right js__main-color"></i>
                                    </div>
                                    <div className="btn option-all__song-heading-right-upload-btn mobile-hiden js__main-color js__backgroundColor">
                                        <i className="fas fa-upload"></i>
                                        Tải lên
                                    </div>
                                    <div className="btn option-all__song-heading-right-playall-btn js__playall-0">
                                        <i className="fas fa-play"></i>
                                        Phát tất cả
                                    </div>
                                </div>
                            </div>
                            <div className="grid row">
                                <div className="col l-3 m-0 s-0">
                                    <div className="option-all__song-slider">
                                        {
                                            hot_songs.map((item, index) => {
                                                if (index == 3) return
                                                return (
                                                    <img key={item['id']} src={`${baseIMG}uploads/image/336x188/${item['image']}`} alt="anh slider" className="option-all__song-slider-img option-all__song-slider-img-first" />
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                                <div className="col l-9 m-12 s-12">
                                    <div className="option-all__songs">
                                        <ul className="option-all__songs-list songs-list">
                                            {
                                                hot_songs.map((item) => {
                                                    return (
                                                        <li key={item['id']} className={`songs-item ${music.get?.id == item['id'] ? 'songs-item--active' : ''}`} data-index={item['id']}>
                                                            <div className="songs-item-left">
                                                                <div style={{ backgroundImage: `url(${baseIMG}uploads/image/168x94/${item['image']})` }} className="songs-item-left-img js__songs-item-left-img-0"
                                                                    onClick={() => {
                                                                        if (music.get?.id != item['id']) {
                                                                            music.set(item)
                                                                        } else if (music.play) {
                                                                            music.setplay(false)
                                                                        } else {
                                                                            music.setplay(true);
                                                                        }
                                                                    }}
                                                                >
                                                                    {
                                                                        music.get?.id == item['id'] ?
                                                                            music.play ?
                                                                                <div className="songs-item-left-img-playing-box">
                                                                                    <img className="songs-item-left-img-playing" src="/src/assets/img/svg/icon-playing.gif" alt="playing" />
                                                                                </div> : <div className="songs-item-left-img-playbtn"><i className="fas fa-play"></i></div> :
                                                                            <div className="songs-item-left-img-playbtn"><i className="fas fa-play"></i></div>
                                                                    }
                                                                </div>

                                                                <div className="songs-item-left-body">
                                                                    <h3 className="songs-item-left-body-name js__main-color">{item['title']}</h3>
                                                                    <span className="songs-item-left-body-singer js__sub-color">{item['artists']}</span>
                                                                </div>
                                                            </div>

                                                            <div className="songs-item-right mobile-hiden ">
                                                                <span className="songs-item-right-mv ipad-air-hiden"><i className="fas fa-photo-video js__main-color"></i></span>
                                                                <span className="songs-item-right-lyric ipad-air-hiden"><i className="fas fa-microphone js__main-color"></i></span>
                                                                <span className="songs-item-right-tym">
                                                                    <i className="fas fa-heart songs-item-right-tym-first"></i>
                                                                    <i className="far fa-heart songs-item-right-tym-last"></i>
                                                                </span>
                                                                <span className="songs-item-right-more js__main-color"><i className="fas fa-ellipsis-h"></i></span>
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            }


                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="option-all__playlist option-all__margin_bot">
                            <div className="option-heading option-all__playlist-heading">
                                <h3 className="option-heading-name js__main-color">Mới phát hành</h3>
                                <div className="more-list mobile-hiden">
                                    <span className="js__main-color">Tất cả</span>
                                    <i className="fas fa-chevron-right js__main-color"></i>
                                </div>
                            </div>
                            <ul className="option-all__playlist-list">
                                <div className="row row_new_songs">
                                    <li className="new_song_item songs-item songs-item--active">
                                        <div className="songs-item-left">
                                            <img src="./assets/img/songs/0.webp" alt="danh sanh nhac" className="songs-item-left-img" />
                                            <div className="songs-item-left-body">
                                                <h3 className="songs-item-left-body-name">Cưới Luôn Được Không</h3>
                                                <span className="songs-item-left-body-singer">Út Nhị x KenPham Remix</span>
                                                <span className="songs-item-left-body-singer">1 ngày trước</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="new_song_item songs-item songs-item--active">
                                        <div className="songs-item-left">
                                            <img src="./assets/img/songs/0.webp" alt="danh sanh nhac" className="songs-item-left-img" />
                                            <div className="songs-item-left-body">
                                                <h3 className="songs-item-left-body-name">Cưới Luôn Được Không</h3>
                                                <span className="songs-item-left-body-singer">Út Nhị x KenPham Remix</span>
                                                <span className="songs-item-left-body-singer">1 ngày trước</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="new_song_item songs-item songs-item--active">
                                        <div className="songs-item-left">
                                            <img src="./assets/img/songs/0.webp" alt="danh sanh nhac" className="songs-item-left-img" />
                                            <div className="songs-item-left-body">
                                                <h3 className="songs-item-left-body-name">Cưới Luôn Được Không</h3>
                                                <span className="songs-item-left-body-singer">Út Nhị x KenPham Remix</span>
                                                <span className="songs-item-left-body-singer">1 ngày trước</span>
                                            </div>
                                        </div>
                                    </li>
                                </div>
                                <div className="row row_new_songs">
                                    <li className="new_song_item songs-item songs-item--active">
                                        <div className="songs-item-left">
                                            <img src="./assets/img/songs/0.webp" alt="danh sanh nhac" className="songs-item-left-img" />
                                            <div className="songs-item-left-body">
                                                <h3 className="songs-item-left-body-name">Cưới Luôn Được Không</h3>
                                                <span className="songs-item-left-body-singer">Út Nhị x KenPham Remix</span>
                                                <span className="songs-item-left-body-singer">1 ngày trước</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="new_song_item songs-item songs-item--active">
                                        <div className="songs-item-left">
                                            <img src="./assets/img/songs/0.webp" alt="danh sanh nhac" className="songs-item-left-img" />
                                            <div className="songs-item-left-body">
                                                <h3 className="songs-item-left-body-name">Cưới Luôn Được Không</h3>
                                                <span className="songs-item-left-body-singer">Út Nhị x KenPham Remix</span>
                                                <span className="songs-item-left-body-singer">1 ngày trước</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="new_song_item songs-item songs-item--active">
                                        <div className="songs-item-left">
                                            <img src="./assets/img/songs/0.webp" alt="danh sanh nhac" className="songs-item-left-img" />
                                            <div className="songs-item-left-body">
                                                <h3 className="songs-item-left-body-name">Cưới Luôn Được Không</h3>
                                                <span className="songs-item-left-body-singer">Út Nhị x KenPham Remix</span>
                                                <span className="songs-item-left-body-singer">1 ngày trước</span>
                                            </div>
                                        </div>
                                    </li>
                                </div>
                                <div className="row row_new_songs">
                                    <li className="new_song_item songs-item songs-item--active">
                                        <div className="songs-item-left">
                                            <img src="./assets/img/songs/0.webp" alt="danh sanh nhac" className="songs-item-left-img" />
                                            <div className="songs-item-left-body">
                                                <h3 className="songs-item-left-body-name">Cưới Luôn Được Không</h3>
                                                <span className="songs-item-left-body-singer">Út Nhị x KenPham Remix</span>
                                                <span className="songs-item-left-body-singer">1 ngày trước</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="new_song_item songs-item songs-item--active">
                                        <div className="songs-item-left">
                                            <img src="./assets/img/songs/0.webp" alt="danh sanh nhac" className="songs-item-left-img" />
                                            <div className="songs-item-left-body">
                                                <h3 className="songs-item-left-body-name">Cưới Luôn Được Không</h3>
                                                <span className="songs-item-left-body-singer">Út Nhị x KenPham Remix</span>
                                                <span className="songs-item-left-body-singer">1 ngày trước</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="new_song_item songs-item songs-item--active">
                                        <div className="songs-item-left">
                                            <img src="./assets/img/songs/0.webp" alt="danh sanh nhac" className="songs-item-left-img" />
                                            <div className="songs-item-left-body">
                                                <h3 className="songs-item-left-body-name">Cưới Luôn Được Không</h3>
                                                <span className="songs-item-left-body-singer">Út Nhị x KenPham Remix</span>
                                                <span className="songs-item-left-body-singer">1 ngày trước</span>
                                            </div>
                                        </div>
                                    </li>
                                </div>
                            </ul>
                        </div>

                        <div className="option-all__playlist option-all__margin_bot">
                            <div className="option-heading option-all__playlist-heading">
                                <h3 className="option-heading-name js__main-color">Playlist</h3>
                                <div className="more-list mobile-hiden">
                                    <span className="js__main-color">Tất cả</span>
                                    <i className="fas fa-chevron-right js__main-color"></i>
                                </div>
                            </div>
                            <ul className="option-all__playlist-list">
                                <div className="row">
                                    <div className="col l-2-4 m-3 s-6 mobile-margin-bot-10px">
                                        <li className="option-all__playlist-item0">
                                            <i className="fas fa-plus"></i>
                                            <span>Tạo playlist mới</span>
                                        </li>
                                    </div>
                                    <div className="col l-2-4 m-3 s-6 mobile-margin-bot-10px">
                                        <li className="option-all__playlist-item">
                                            <div className="option-all__playlist-item-img-wrapper">
                                                <div className="option-all__playlist-item-img-wrapper-action">
                                                    <i className="fas fa-times option-all__playlist-item-img-wrapper-action-icon1"></i>
                                                    <i className="fas fa-play option-all__playlist-item-img-wrapper-action-icon2"></i>
                                                    <i className="fas fa-ellipsis-h option-all__playlist-item-img-wrapper-action-icon3"></i>
                                                </div>
                                                <div className="option-all__playlist-item-img option-all__playlist-item-img-fix" style={{ backgroundImage: 'url(/src/assets/playlist/3.webp)' }}></div>
                                            </div>
                                            <div className="option-all__playlist-item-content">
                                                <div className="option-all__playlist-item-content-name1 js__main-color">#zingchart</div>
                                                <div className="option-all__playlist-item-content-name2 js__sub-color">Zing MP3</div>
                                            </div>
                                        </li>
                                    </div>
                                    <div className="col l-2-4 m-0 s-6 mobile-margin-bot-10px">
                                        <li className="option-all__playlist-item option-all__playlist-item-margin-top">
                                            <div className="option-all__playlist-item-img-wrapper">
                                                <div className="option-all__playlist-item-img-wrapper-action">
                                                    <i className="fas fa-times option-all__playlist-item-img-wrapper-action-icon1"></i>
                                                    <i className="fas fa-play option-all__playlist-item-img-wrapper-action-icon2"></i>
                                                    <i className="fas fa-ellipsis-h option-all__playlist-item-img-wrapper-action-icon3"></i>
                                                </div>
                                                <div className="option-all__playlist-item-img" style={{ backgroundImage: 'url(/src/assets/playlist/4.webp)' }}></div>
                                            </div>
                                            <div className="option-all__playlist-item-content">
                                                <div className="option-all__playlist-item-content-name1 js__main-color">Nhạc của Văn Sơn</div>
                                                <div className="option-all__playlist-item-content-name2 js__sub-color">Zing MP3</div>
                                            </div>
                                        </li>
                                    </div>
                                </div>
                            </ul>
                        </div>

                        <div className="option-all__playlist option-all__margin_bot">
                            <div className="option-heading option-all__playlist-heading">
                                <h3 className="option-heading-name js__main-color">MV</h3>
                                <div className="more-list mobile-hiden">
                                    <span className="js__main-color">Tất cả</span>
                                    <i className="fas fa-chevron-right js__main-color"></i>
                                </div>
                            </div>
                            <ul className="option-all__playlist-list">
                                <div className="row">
                                    <div className="col l-4 m-4 s-12 mobile-margin-bot-30px">
                                        <li className="option-all__playlist-item">
                                            <div className="option-all__playlist-item-img-wrapper">
                                                <div className="option-all__playlist-item-img-wrapper-action">
                                                    <i
                                                        className="fas fa-play option-all__playlist-item-img-wrapper-action-icon2"></i>
                                                </div>
                                                <div className="option-all__playlist-item-img option-all__playlist-item-img-mv"></div>
                                            </div>
                                            <div className="option-all__playlist-item-content-mv">
                                                <img src="./assets/img/mv/icon1.jpg" alt="thanh hung"
                                                    className="option-all__playlist-item-content-img" />
                                                <div className="option-all__playlist-item-content-name">
                                                    <div className="option-all__playlist-item-content-name1 js__main-color">
                                                        Thay Tôi Yêu Cô Ấy</div>
                                                    <div className="option-all__playlist-item-content-name2 js__sub-color">
                                                        Thanh Hưng</div>
                                                </div>
                                            </div>
                                        </li>
                                    </div>
                                    <div className="col l-4 m-4 s-12 mobile-margin-bot-30px">
                                        <li className="option-all__playlist-item">
                                            <div className="option-all__playlist-item-img-wrapper">
                                                <div className="option-all__playlist-item-img-wrapper-action">
                                                    <i
                                                        className="fas fa-play option-all__playlist-item-img-wrapper-action-icon2"></i>
                                                </div>
                                                <div className="option-all__playlist-item-img option-all__playlist-item-img-mv"></div>
                                            </div>
                                            <div className="option-all__playlist-item-content-mv">
                                                <img src="./assets/img/mv/icon2.jpg" alt="Han Sara"
                                                    className="option-all__playlist-item-content-img" />
                                                <div className="option-all__playlist-item-content-name">
                                                    <div className="option-all__playlist-item-content-name1 js__main-color">
                                                        Đếm Cừu</div>
                                                    <div className="option-all__playlist-item-content-name2 js__sub-color">
                                                        Han Sara, Kay Trần</div>
                                                </div>
                                            </div>
                                        </li>
                                    </div>
                                    <div className="col l-4 m-4 s-12 mobile-margin-bot-30px">
                                        <li className="option-all__playlist-item">
                                            <div className="option-all__playlist-item-img-wrapper">
                                                <div className="option-all__playlist-item-img-wrapper-action">
                                                    <i
                                                        className="fas fa-play option-all__playlist-item-img-wrapper-action-icon2"></i>
                                                </div>
                                                <div className="option-all__playlist-item-img option-all__playlist-item-img-mv"></div>
                                            </div>
                                            <div className="option-all__playlist-item-content-mv">
                                                <img src="./assets/img/mv/icon3.jpg" alt="Alex Sensation"
                                                    className="option-all__playlist-item-content-img" />
                                                <div className="option-all__playlist-item-content-name">
                                                    <div className="option-all__playlist-item-content-name1 js__main-color">
                                                        Que Va</div>
                                                    <div className="option-all__playlist-item-content-name2 js__sub-color">
                                                        Alex Sensation, Ozuna</div>
                                                </div>
                                            </div>
                                        </li>
                                    </div>
                                </div>
                            </ul>
                        </div>

                        <div className="option-all__playlist option-all__margin_bot">
                            <div className="option-heading option-all__playlist-heading">
                                <h3 className="option-heading-name js__main-color">Nghệ Sĩ</h3>
                                <div className="more-list mobile-hiden">
                                    <span className="js__main-color">Tất cả</span>
                                    <i className="fas fa-chevron-right js__main-color"></i>
                                </div>
                            </div>
                            <ul className="option-all__playlist-list">
                                <div className="row">
                                    <div className="col l-2-4 m-4 s-6 mobile-margin-bot-30px ">
                                        <li className="option-all__playlist-item option-all__playlist-item-margin_top">
                                            <div
                                                className="option-all__playlist-item-img-wrapper option-all__playlist-item-img-wrapper-mv">
                                                <div className="option-all__playlist-item-img-wrapper-action">
                                                    <i
                                                        className="fas fa-play option-all__playlist-item-img-wrapper-action-icon2"></i>
                                                </div>
                                                <div className="option-all__playlist-item-img option-all__playlist-item-img-singer"></div>
                                            </div>
                                            <div className="option-all__playlist-item-content-singer">
                                                <div
                                                    className="option-all__playlist-item-content-singer-name1 js__main-color">
                                                    Mr.Siro</div>
                                                <div
                                                    className="option-all__playlist-item-content-singer-name2 js__sub-color">
                                                    757K quan tâm</div>
                                                <div className="option-all__playlist-item-content-singer-profile">
                                                    <i className="fas fa-random js__main-color"></i>
                                                    <span className="js__main-color">Góc nhạc</span>
                                                </div>
                                            </div>
                                        </li>
                                    </div>
                                    <div className="col l-2-4 m-4 s-6 mobile-margin-bot-30px ">
                                        <li className="option-all__playlist-item option-all__playlist-item-margin_top">
                                            <div
                                                className="option-all__playlist-item-img-wrapper option-all__playlist-item-img-wrapper-mv">
                                                <div className="option-all__playlist-item-img-wrapper-action">
                                                    <i
                                                        className="fas fa-play option-all__playlist-item-img-wrapper-action-icon2"></i>
                                                </div>
                                                <div className="option-all__playlist-item-img option-all__playlist-item-img-singer"></div>
                                            </div>
                                            <div className="option-all__playlist-item-content-singer">
                                                <div
                                                    className="option-all__playlist-item-content-singer-name1 js__main-color">
                                                    Bích Phương</div>
                                                <div
                                                    className="option-all__playlist-item-content-singer-name2 js__sub-color">
                                                    381K quan tâm</div>
                                                <div className="option-all__playlist-item-content-singer-profile">
                                                    <i className="fas fa-random js__main-color"></i>
                                                    <span className="js__main-color">Góc nhạc</span>
                                                </div>
                                            </div>
                                        </li>
                                    </div>
                                    <div className="col l-2-4 m-4 s-6 mobile-margin-bot-30px ">
                                        <li className="option-all__playlist-item option-all__playlist-item-margin_top">
                                            <div
                                                className="option-all__playlist-item-img-wrapper option-all__playlist-item-img-wrapper-mv">
                                                <div className="option-all__playlist-item-img-wrapper-action">
                                                    <i
                                                        className="fas fa-play option-all__playlist-item-img-wrapper-action-icon2"></i>
                                                </div>
                                                <div className="option-all__playlist-item-img option-all__playlist-item-img-singer"></div>
                                            </div>
                                            <div className="option-all__playlist-item-content-singer">
                                                <div
                                                    className="option-all__playlist-item-content-singer-name1 js__main-color">
                                                    SOOBIN</div>
                                                <div
                                                    className="option-all__playlist-item-content-singer-name2 js__sub-color">
                                                    466K quan tâm</div>
                                                <div className="option-all__playlist-item-content-singer-profile">
                                                    <i className="fas fa-random js__main-color"></i>
                                                    <span className="js__main-color">Góc nhạc</span>
                                                </div>
                                            </div>
                                        </li>
                                    </div>
                                    <div className="col l-2-4 m-4 s-6 mobile-margin-bot-30px ">
                                        <li className="option-all__playlist-item option-all__playlist-item-margin_top">
                                            <div
                                                className="option-all__playlist-item-img-wrapper option-all__playlist-item-img-wrapper-mv">
                                                <div className="option-all__playlist-item-img-wrapper-action">
                                                    <i
                                                        className="fas fa-play option-all__playlist-item-img-wrapper-action-icon2"></i>
                                                </div>
                                                <div className="option-all__playlist-item-img option-all__playlist-item-img-singer"></div>
                                            </div>
                                            <div className="option-all__playlist-item-content-singer">
                                                <div
                                                    className="option-all__playlist-item-content-singer-name1 js__main-color">
                                                    Sơn Tùng M-TP</div>
                                                <div
                                                    className="option-all__playlist-item-content-singer-name2 js__sub-color">
                                                    2.2M quan tâm</div>
                                                <div className="option-all__playlist-item-content-singer-profile">
                                                    <i className="fas fa-random js__main-color"></i>
                                                    <span className="js__main-color">Góc nhạc</span>
                                                </div>
                                            </div>
                                        </li>
                                    </div>
                                    <div className="col l-2-4 m-4 s-6 mobile-margin-bot-30px ">
                                        <li className="option-all__playlist-item option-all__playlist-item-margin_top">
                                            <div
                                                className="option-all__playlist-item-img-wrapper option-all__playlist-item-img-wrapper-mv">
                                                <div className="option-all__playlist-item-img-wrapper-action">
                                                    <i
                                                        className="fas fa-play option-all__playlist-item-img-wrapper-action-icon2"></i>
                                                </div>
                                                <div className="option-all__playlist-item-img option-all__playlist-item-img-singer"></div>
                                            </div>
                                            <div className="option-all__playlist-item-content-singer">
                                                <div
                                                    className="option-all__playlist-item-content-singer-name1 js__main-color">
                                                    Hương Ly</div>
                                                <div
                                                    className="option-all__playlist-item-content-singer-name2 js__sub-color">
                                                    604K quan tâm</div>
                                                <div className="option-all__playlist-item-content-singer-profile">
                                                    <i className="fas fa-random js__main-color"></i>
                                                    <span className="js__main-color">Góc nhạc</span>
                                                </div>
                                            </div>
                                        </li>
                                    </div>
                                </div>
                            </ul>
                        </div>

                    </div>
                </div>

            </div >
        </>
    )
}