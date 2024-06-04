import "./profile.css"
import { baseIMG } from "../../config/api"
import { useAppContext } from "../../context"
import { AddHeart, DeleteComment } from "../../api/post"
import { useEffect, useState } from "react"

export default function Show_all_comment() {
    const { user, post, media } = useAppContext()
    const [listComment, setListComment] = useState([]);


    useEffect(() => {
        setListComment(post.comment)
    }, [post.comment])

    function handlediskplay(e: any) {
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
            media.set({
                'id': undefined,
                "title": undefined,
                "artists": undefined,
                "audio": post.get['media'],
                "image": undefined,
                "heart": undefined
            })

            media.setplay(true)
        } else {
            wrap_disk.style.left = '50%'
            disk.style.left = '25%'
            e.target.classList.remove('play')
            e.target.classList.add('pause')
            media.setplay(false)
        }
    }

    function heart_click() {
        AddHeart(post.get['id'])
        const heart = document.querySelector('.heart i') as HTMLImageElement
        const count_heart = document.querySelector('.countofheart span') as HTMLSpanElement
        if (heart.className.includes('fas')) {
            heart.classList.remove('fas')
            heart.classList.add('far')
            const count = post.get['heart']
            count_heart.textContent = `${count.toString()} Lượt thích`
        } else {
            heart.classList.remove('far')
            heart.classList.add('fas')
            const count = post.get['heart'] + 1
            count_heart.textContent = `${count} Lượt thích`
        }
    }

    return (
        <div className="form_show_all_comment">
            <div className="headeritemcontent">
                <div className="wrapavatar_nameandtime">
                    <div className="avatar">
                        <img src={`${baseIMG}img/avatar/${user.user?.avatar}`} />
                    </div>
                    <div className="nameandtime">
                        <div className="name">{user.user?.user_name}</div>
                    </div>
                </div>
                <button type="reset" className="more" id="closepopupuploadfile">
                    <i className="fas fa-times"></i>
                </button>
            </div>

            <div className="maincontent">
                <div className="content pause" onClick={handlediskplay}>
                    <div className="wrapdisk" >
                        {
                            post.get['image'] ? <img id="wrapdiskuploadthumbnail" className={""} src={`${baseIMG}uploads/image/1280x720/${post.get['image']}`} /> :
                                <img id="wrapdiskuploadthumbnail" className={""} src={`${baseIMG}img/orther/music_128x128.png`} />
                        }
                    </div>
                    <div className="disk" >
                        <img id="diskuploadthumbnail" className={""} src={`${baseIMG}img/orther/disk.png`} />
                    </div>
                </div>
                <img className="thumbnailsong" src="" style={{ display: "none" }} />
            </div>

            {/* <div className="action">
                <div className="wrapaction">
                    <div className="heart" onClick={heart_click}>
                        {
                            post.get['check_heart'] ?
                                <i className="fas fa-heart"></i> :
                                <i className="far fa-heart"></i>
                        }
                    </div>
                    <div className="comment">
                        <i className="fas fa-comments"></i>
                    </div>

                </div>
            </div> */}

            <div className="list_comment">
                {
                    listComment.map((item) => {
                        return (
                            <div key={item['id']} className="comment_item">
                                <div className="comment_detail">
                                    <div className="comment_avatar">
                                        <img src={`${baseIMG}img/avatar/${item['avatar']}`} />
                                    </div>
                                    <div className="detail">
                                        <div className="comment_item_user_name">
                                            <span>{item['user_name']}</span>
                                        </div>
                                        <div className="comment_item_text_content">
                                            <span>{item['text_content']}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="action_comment">
                                    <i className="fas fa-ellipsis-v"></i>
                                    <div className="comment_btn_delete" onClick={() => DeleteComment(item['id'])}>
                                        Delete
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}
