import "./profile.css"
import { baseIMG } from "../../config/api"
import { useEffect, useState, useRef } from "react"
import { useAppContext } from "../../context"
import { AddHeart, AddComment, GetComments } from "../../api/post"

function Profile_Item({ data, itembirthday = false, type }: any) {
    const [comment, setcomment] = useState<string>("")
    const heightofinputcomment = useRef<HTMLTextAreaElement>(null)
    const { media, post } = useAppContext()

    function handlediskplay(e: any) {
        if (type != 'post') {
            const wrap_disk = e.target.children[0]
            const disk = e.target.children[1]
            const pause = e.target.className.includes('pause') ? true : false
            if (pause) {
                wrap_disk.style.left = '41%'
                disk.style.left = '50%'
                e.target.classList.remove('pause')
                e.target.classList.add('play')
                const item_active = document.querySelector('.active') as HTMLDivElement
                if (item_active) {
                    item_active.classList.remove('active')
                }
                e.target.classList.add('active')
                media.set(data)

                media.setplay(true)
            } else {
                wrap_disk.style.left = '50%'
                disk.style.left = '25%'
                e.target.classList.remove('play')
                e.target.classList.add('pause')
                media.setplay(false)
            }
        }
    }

    useEffect(() => {
        const element = heightofinputcomment.current as HTMLTextAreaElement
        if (element) {
            element.style.height = "auto"
            element.style.height = element.scrollHeight + "px"
        }

    }, [comment])

    function formatdate(date: any) {
        let newdate = new Date(date).toLocaleDateString('en-US')
        let newdate_split = newdate.split("/")
        return `${newdate_split[0]} Tháng ${newdate_split[1]}, ${newdate_split[2]}`
    }

    function heart_click(e: any) {
        AddHeart(data['id'], type == 'media' ? 'song' : 'post')
        const heart = document.querySelector(`.heart${data['id']} i`) as HTMLImageElement
        const count_heart = document.querySelector(`.countofheart${data['id']} span`) as HTMLSpanElement
        if (heart.className.includes('fas')) {
            heart.classList.remove('fas')
            heart.classList.add('far')
            const count = data['heart']
            count_heart.textContent = `${count.toString()} Lượt thích`
        } else {
            heart.classList.remove('far')
            heart.classList.add('fas')
            const count = data['heart'] + 1
            count_heart.textContent = `${count} Lượt thích`
        }
    }


    function addComment(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        const Element = e.target as HTMLImageElement
        const parendElement = Element.parentElement as HTMLDivElement
        const firstElement = parendElement.children[0] as HTMLTextAreaElement
        const formdata = new FormData
        formdata.append('post_id', data['id'])
        formdata.append('text_content', firstElement.value)
        AddComment(formdata)
            .then(() => {
                // firstElement.value = ''
                setcomment('')
                firstElement.style.height = "unset"
            })
    }


    function showAllComment() {
        post.set(data);
        GetComments(data['id'], type == 'media' ? 'song' : 'post')
            .then((rs) => {
                post.setComment(rs)
            })
        const modal = document.querySelector('.show_all_comment') as HTMLDivElement
        modal.style.display = "flex"
    }

    return (
        <div className="contentitem">
            <div className="headeritemcontent">
                <div className="wrapavatar_nameandtime">
                    <div className="avatar">
                        <img src={`${baseIMG}img/avatar/${data.avatar}`} />
                    </div>
                    <div className="nameandtime">
                        <div className="name">{data['user_name']}</div>
                        {
                            itembirthday ?
                                <div className="time">{formatdate(data.birth_day)}</div>
                                :
                                <div className="time">{formatdate(data['create_time'])}</div>
                        }
                    </div>
                </div>
                <div className="more">
                    <i className="fas fa-ellipsis-h"></i>
                </div>
            </div>
            {
                itembirthday ?
                    <div className="birthimage">
                        <img src={`${baseIMG}img/orther/birth.jpg`} />
                    </div>
                    :
                    <div className="maincontent">
                        <div className="content pause" onClick={handlediskplay}>
                            <div className="wrapdisk" >
                                {
                                    data['image'] ? <img id="wrapdiskuploadthumbnail" className={""} src={`${baseIMG}uploads/image/1280x720/${data['image']}`} /> :
                                        <img id="wrapdiskuploadthumbnail" className={""} src={`${baseIMG}img/orther/music_128x128.png`} />
                                }
                            </div>
                            <div className="disk" >
                                <img id="diskuploadthumbnail" className={""} src={`${baseIMG}img/orther/disk.png`} />
                            </div>
                        </div>
                        <img className="thumbnailsong" src="" style={{ display: "none" }} />
                    </div>

            }
            {
                itembirthday ? <></> :
                    <>
                        <div className="action">
                            <div className="wrapaction" style={{ gap: '15px' }}>
                                <div className={`heart${data['id']}`} onClick={heart_click}>
                                    {
                                        data['check_heart'] ?
                                            <i className="fas fa-heart"></i> :
                                            <i className="far fa-heart"></i>
                                    }
                                </div>
                                {
                                    type == 'post' ?
                                        <div className="comment">
                                            <i className="fas fa-comments"></i>
                                        </div>
                                        : <></>
                                }

                            </div>

                        </div>
                        <div className={`countofheart${data['id']}`} style={{ color: '#fff', margin: '15px 0' }}>
                            <span>{data['heart']} Lượt thích</span>
                        </div>
                    </>
            }
            {
                itembirthday ?
                    <></>
                    :
                    <div className="textcontent">
                        <span> {data['text_content']} </span>
                    </div>
            }
            {
                itembirthday || type == 'media' ? <></> :
                    <>
                        <div className="countcomment" onClick={showAllComment}>
                            <span>Xem tất cả bình luận</span>
                        </div>
                        <div className="addcomment">
                            <div className="wrapcomment">
                                <textarea
                                    ref={heightofinputcomment}
                                    onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                                        const element = e.target as HTMLTextAreaElement
                                        setcomment(element.value)
                                    }}
                                    placeholder="Thêm bình luận"
                                    value={comment}
                                />
                                <i className="fas fa-location-arrow" onClick={addComment}></i>
                            </div>
                        </div>
                    </>
            }

        </div >
    )
}


export default Profile_Item