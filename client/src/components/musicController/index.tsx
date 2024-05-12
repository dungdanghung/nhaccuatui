import "./musicController.css"
import { useAppContext } from "../../context"
import { useEffect, useState, useRef } from "react"
import { baseIMG, baseURL } from "../../config/api"

export default function MusicController() {
    const audio = useRef<HTMLAudioElement>(null);
    const video = useRef<HTMLVideoElement>(null);
    const void_input = useRef<HTMLInputElement>(null);
    const tracktime = useRef<HTMLInputElement>(null);
    const { media } = useAppContext()
    const [Media, set_media] = useState<any>([]);
    const [play, setplay] = useState<boolean>(false)
    const [time, setTime] = useState('00:00')
    const [duration, setduration] = useState('00:00')
    const [allowHandleTracktime, setallowHandleTracktime] = useState(false);
    const [able_action, set_able_action] = useState(false);
    const [show_video, set_show_video] = useState(false)


    function btnPlayClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const a = e.target as HTMLImageElement
        if (a.className.includes('play')) {
            handleVoid
            media.setplay(true);
        } else {
            media.setplay(false);
        }
    }

    function mediaPlay() {
        let media;
        if (Media?.audio) {
            media = audio.current as HTMLAudioElement;
        } else {
            media = video.current as HTMLVideoElement;
        }
        let a = Math.floor(media.currentTime / 60) as any
        let b = Math.floor(media.currentTime - a * 60) as any
        if (a < 10) {
            a = "0" + a
        }
        if (b < 10) {
            b = "0" + b
        }
        setTime(`${a}:${b}`)
        if (allowHandleTracktime) {
            let c = media.currentTime / media.duration * 100 as number
            let d = tracktime.current as HTMLInputElement
            d.value = c.toString();
        }
    }

    function tracktimeDown() {
        setallowHandleTracktime(false)
    }

    function tracktimeUp() {
        const a = document.querySelector("#progress") as HTMLInputElement;
        let b
        if (Media?.audio) {
            b = document.getElementById("audio") as HTMLAudioElement;
        } else {
            b = document.getElementById("video") as HTMLVideoElement;
        }
        const c = b.duration;
        const d = a.value
        const value = (parseInt(d) / 100 * c).toFixed()
        b.currentTime = parseInt(value)
        setallowHandleTracktime(true)
    }

    function setDuration(e: React.SyntheticEvent<HTMLSpanElement, Event>) {
        const audio = e.target as HTMLAudioElement
        let a = Math.floor(audio.duration / 60) as any
        let b = Math.floor(audio.duration - a * 60) as any
        if (a < 10) {
            a = "0" + a
        }
        if (b < 10) {
            b = "0" + b
        }
        setduration(`${a}:${b}`)
    }

    function handleVoid() {
        const a = void_input.current as HTMLInputElement
        if (Media?.audio) {
            const b = audio.current as HTMLAudioElement
            b.volume = parseInt(a.value) / 100
        } else {
            const b = video.current as HTMLVideoElement
            b.volume = parseInt(a.value) / 100
        }
    }

    function showvideo() {
        if (show_video) {
            set_show_video(false)
        } else {
            set_show_video(true)
        }
    }

    useEffect(() => {
        set_media(media.get)
    }, [media.get])

    useEffect(() => {
        if (able_action) {
            if (media.play) {
                if (Media?.audio) {
                    audio.current?.play();
                } else {
                    set_show_video(true)
                    video.current?.play()
                }
                setallowHandleTracktime(true)
                setplay(true)
            } else {
                if (Media?.audio) {
                    audio.current?.pause()
                } else {
                    video.current?.pause()
                }
                setallowHandleTracktime(false)
                setplay(false)
            }
        } else {
            set_able_action(true);
        }
    }, [media.play])


    return (
        <div className="main-music-control">
            <div className="row">
                <div className="col l-3 m-3 s-8" style={{ zIndex: '5' }}>
                    <div className="music-control__left">
                        <div className="music-control__left-img-box">
                            <div className="music-control__left-img">
                                <img className="music-controler-img" src={`${baseIMG}uploads/image/168x94/${Media?.image}`}></img>
                            </div>
                        </div>
                        <div className="music-control__left-content">
                            <span className="music-control__left-content-song js__main-color">{Media?.title}</span>
                            <span className="music-control__left-content-singer js__sub-color">
                                {
                                    Media?.artists ?
                                        JSON.parse(Media?.artists).join(' ') : ''
                                }
                            </span>
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
                <div className="col l-6 m-7 s-4 rs__main-music-control-flex-1" style={{ zIndex: '5' }}>
                    <div className="music-control__center">
                        <div className="music-control__center-action music-control__icon">

                            <i className="fas fa-random music-control__icon1 js__music-control__icon1 js__main-color mobile-hiden"></i>
                            <i className="fas fa-caret-left music-control__icon2 js__music-control__icon2 js__main-color"></i>

                            <div className="music-control__icon-play js__music-control__icon-play" onClick={btnPlayClick}>
                                <i className="fas fa-play music-control__icon3 js__main-color js__border" style={{ display: play ? "none" : "block" }} ></i>
                                <i className="fas fa-pause music-control__icon33 js__main-color js__border" style={{ display: play ? "block" : "none" }}></i>
                            </div>
                            <i className="fas fa-caret-right music-control__icon4 js__music-control__icon4 js__main-color"></i>

                            <i className="fas fa-redo music-control__icon5 js__music-control__icon5 mobile-hiden js__main-color"></i>
                        </div>
                        <div className="music-control__progress mobile-hiden">
                            <span className="music-control__progress-time-start js__music-control__progress-time-start js__main-color">{time}</span>
                            <input id="progress" onMouseDown={tracktimeDown} onMouseUp={tracktimeUp} ref={tracktime} className="music-control__progress-input" type="range" step="1" min="0" max="100" defaultValue={0} />
                            <span className="music-control__progress-time-duration js__music-control__progress-time-duration js__main-color">{duration}</span>
                        </div>
                        {
                            Media?.audio ?
                                <audio id="audio" ref={audio} src={`${baseURL}music/getsong/${Media?.audio}`} onTimeUpdate={mediaPlay} onEnded={() => media.setplay(false)} onLoadedMetadata={setDuration}></audio> :
                                <></>
                        }
                    </div>
                </div>
                <div className="col l-3 m-2 s-0" style={{ zIndex: 5 }}>
                    <div className="music-control__right">
                        <i className="music-control__right-icon1 ipad-air-hiden js__main-color js__toast fas fa-photo-video"></i>
                        <i className="music-control__right-icon2 ipad-air-hiden js__main-color js__toast fas fa-microphone"></i>
                        <i className="music-control__right-icon3 ipad-air-hiden js__main-color js__toast far fa-square"></i>
                        <div className="music-control__right-volume-icon">
                            <i className="music-control__right-icon4 js__main-color fas fa-volume-down"></i>
                            <i className="music-control__right-icon5 js__main-color fas fa-volume-mute"></i>
                        </div>
                        <div className="music-control__volume-progress">
                            <input ref={void_input} id="progress1" className="music-control__volume-input" type="range" step="1" min="0" max="100" defaultValue={30} onChange={handleVoid} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="wrap_video" onClick={showvideo} style={{ display: show_video ? 'flex' : 'none' }}>
                <div className="video">
                    <video ref={video} id="video" src={`${baseURL}mv/getmv/${Media?.video}`} onTimeUpdate={mediaPlay} onEnded={() => media.setplay(false)} onLoadedMetadata={setDuration} />
                </div>
            </div>
        </div >
    )
}
