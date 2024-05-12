import { Link } from "react-router-dom"
import { useAppContext } from '../../context'
import { CreateMv } from "../../api/mv"

export default function Create_mv() {

    const { mv_create } = useAppContext()

    function send() {
        CreateMv(mv_create.formData)
            .then((rs) => {
                if (rs) {
                    mv_create.setFormData(undefined);
                    window.location.reload();
                }
            })
    }

    return (
        <div className='wrap-content'>
            <div className='main-content'>

                <div className='content-item'>
                    <div className='release-details'>
                        <div className='release-detail-header'>
                            <h2 className='title'>Release Details</h2>
                        </div>
                        <div className='release-detail-note'>
                            <span>Complete your release by clicking on the tour steps below and filing in each page</span>
                        </div>
                        <div className='release-detail-option'>
                            <div className='release-detail-option-item'>
                                <Link to={"/create/mv_detail"} className='option'>
                                    MV Details
                                    {
                                        mv_create.formData ?
                                            <div className='check'>
                                                <img src='/src/assets/img/svg/check.svg'></img>
                                            </div> : <></>
                                    }
                                </Link>
                            </div>
                            <div className='release-detail-option-item'>
                                <Link to={"/create/add_mv"} className='option'>
                                    Add MV
                                    {
                                        mv_create.formData?.get('video') ?
                                            <div className='check'>
                                                <img src='/src/assets/img/svg/check.svg'></img>
                                            </div> : <></>
                                    }
                                </Link>
                            </div>
                            <div className='release-detail-option-item'>
                                <Link to={"/create/add_artwork"} className='option'>
                                    Add Artwork
                                    {
                                        mv_create.formData?.get('image') ?
                                            <div className='check'>
                                                <img src='/src/assets/img/svg/check.svg'></img>
                                            </div> : <></>
                                    }
                                </Link>
                            </div>
                            <div className='release-detail-option-item'>
                                <div className='option save_btn' onClick={send}>

                                    SAVE

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
