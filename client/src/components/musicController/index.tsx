import "./musicController.css"

export default function MusicController() {
    return (
        <div className="main-music-control">
            <div className="row">
                <div className="col l-3 m-3 s-8">
                    <div className="music-control__left">
                        <div className="music-control__left-img-box">
                            <div className="music-control__left-img"></div>
                        </div>
                        <div className="music-control__left-content">
                            <span className="music-control__left-content-song js__main-color">Cưới luôn được không</span>
                            <span className="music-control__left-content-singer js__sub-color">Út nhị Cover</span>
                        </div>
                        <div className="music-control__left-action tablet-hiden mobile-hiden">
                            <div className="music-control__left-action-tym-box">
                                <i className="fas fa-heart music-control__left-action-tym"></i>
                                <i className="far fa-heart music-control__left-action-tym-non"></i>
                            </div>
                            <i className="fas fa-ellipsis-h music-control__left-action-option js__main-color js__toast"></i>
                        </div>
                    </div>
                </div>
                <div className="col l-6 m-7 s-4 rs__main-music-control-flex-1">
                    <div className="music-control__center">
                        <div className="music-control__center-action music-control__icon">

                            <i className="fas fa-random music-control__icon1 js__music-control__icon1 js__main-color mobile-hiden"></i>
                            <i className="fas fa-caret-left music-control__icon2 js__music-control__icon2 js__main-color"></i>

                            <div className="music-control__icon-play js__music-control__icon-play">
                                <i className="fas fa-play music-control__icon3 js__main-color js__border"></i>
                                <i className="fas fa-pause music-control__icon33 js__main-color js__border"></i>
                            </div>
                            <i className="fas fa-caret-right music-control__icon4 js__music-control__icon4 js__main-color"></i>

                            <i className="fas fa-redo music-control__icon5 js__music-control__icon5 mobile-hiden js__main-color"></i>
                        </div>
                        <div className="music-control__progress mobile-hiden">
                            <span className="music-control__progress-time-start js__music-control__progress-time-start js__main-color">00:00</span>
                            <input id="progress" className="music-control__progress-input" type="range" step="1" min="0" max="100" />
                            <span className="music-control__progress-time-duration js__music-control__progress-time-duration js__main-color">00:00</span>
                        </div>
                        <audio id="audio" src="./assets/music/list-song/0.mp3"></audio>
                    </div>
                </div>
                <div className="col l-3 m-2 s-0">
                    <div className="music-control__right">
                        <i className="music-control__right-icon1 ipad-air-hiden js__main-color js__toast fas fa-photo-video"></i>
                        <i className="music-control__right-icon2 ipad-air-hiden js__main-color js__toast fas fa-microphone"></i>
                        <i className="music-control__right-icon3 ipad-air-hiden js__main-color js__toast far fa-square"></i>
                        <div className="music-control__right-volume-icon">
                            <i className="music-control__right-icon4 js__main-color fas fa-volume-down"></i>
                            <i className="music-control__right-icon5 js__main-color fas fa-volume-mute"></i>
                        </div>
                        <div className="music-control__volume-progress">
                            <input id="progress1" className="music-control__volume-input" type="range" step="1" min="0" max="100" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
