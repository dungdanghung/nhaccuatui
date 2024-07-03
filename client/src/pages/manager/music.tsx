import "./manager.css"
import { GetSongUpload, SearchManager } from "../../api/music"
import { useEffect, useState } from "react"
import ModalChangeStatus from "../../components/modal/modal_change_status";
import "../../assets/css/material-dashboard.css"
import { GetChartSong, GetChartSongAccept, GetFeaturedSong, GetNewSong, GetRatioSong } from "../../api/manager";
import Chart from 'chart.js/auto';
import { baseIMG } from "../../config/api";

let timeout: any
export default function Manager_music() {
    const [songs, setsongs] = useState([]);
    const [type_display, setType_display] = useState('dashboard')
    const [listNewSong, set_listNewSong] = useState([])
    const [listFeaturedSong, set_listFeaturedSong] = useState([])

    useEffect(() => {
        GetSongUpload()
            .then((rs: any) => {
                setsongs(rs);
            })


    }, [])

    function search(e: React.ChangeEvent<HTMLInputElement>) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            if (e.target.value != '') {
                SearchManager(e.target.value)
                    .then((rs) => {
                        setsongs(rs)
                    })
            } else {
                GetSongUpload()
                    .then((rs: any) => {
                        setsongs(rs);
                    })
            }
        }, 500)
    }


    useEffect(() => {
        if (type_display == 'dashboard') {
            GetChartSong()
                .then((rs) => {
                    const ctx = document.getElementById('chart-bars') as HTMLCanvasElement;
                    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                    const data = {
                        labels: labels,
                        datasets: [{
                            label: 'Song Create',
                            data: rs,
                            fill: false,
                            borderColor: '#000',
                            tension: 0.1
                        }]
                    };

                    const config = {
                        type: 'line',
                        data: data,
                    };

                    new Chart(ctx, config);
                })
        }
    }, [type_display])

    useEffect(() => {
        if (type_display == 'dashboard') {


            GetChartSongAccept()
                .then((rs) => {
                    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                    const data = {
                        labels: labels,
                        datasets: [{
                            label: 'Today Accept',
                            data: rs,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 205, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(201, 203, 207, 0.2)'
                            ],
                            borderColor: [
                                'rgb(255, 99, 132)',
                                'rgb(255, 159, 64)',
                                'rgb(255, 205, 86)',
                                'rgb(75, 192, 192)',
                                'rgb(54, 162, 235)',
                                'rgb(153, 102, 255)',
                                'rgb(201, 203, 207)'
                            ],
                            borderWidth: 1
                        }]
                    };

                    const config = {
                        type: 'bar',
                        data: data,
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        },
                    };
                    const ctx = document.getElementById('chart-line') as HTMLCanvasElement;
                    new Chart(ctx, config);
                })

        }
    }, [type_display])

    useEffect(() => {
        if (type_display == 'dashboard') {

            GetRatioSong()
                .then((rs) => {

                    const data = {
                        labels: ['Accept', 'Pending'],
                        datasets: [
                            {
                                label: 'Author',
                                data: rs,
                                backgroundColor: ['Red', 'Orange'],
                            }
                        ]
                    };

                    const config = {
                        type: 'doughnut',
                        data: data,
                        options: {
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: 'Chart.js Doughnut Chart'
                                }
                            }
                        },
                    };

                    const ctx = document.getElementById('chart-line-tasks') as HTMLCanvasElement;
                    new Chart(ctx, config);
                })
        }

    }, [type_display])


    useEffect(() => {
        GetNewSong()
            .then((rs) => {
                set_listNewSong(rs.songs)
            })
        GetFeaturedSong()
            .then((rs) => {
                set_listFeaturedSong(rs)
            })
    }, [])

    return (
        <div>
            <div className="zm-box zm-mainpage">
                <div style={{ position: 'relative', overflow: 'hidden', width: '100%', height: "100%" }}>
                    <main className="zm-section" id="body-scroll">
                        <div className="container zm-my-music">
                            <div className="container mymusic-overivew">
                                <div style={{ position: "relative" }}>
                                    <div className="header">
                                        <div className="text">
                                            Quản lý bài hát</div><button className="zm-btn button">
                                            <i className="icon">
                                                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                                                    <g filter="url(#filter0_d_3141_46346)">
                                                        <circle cx="22" cy="21" r="18" fill="#FEFFFF">
                                                        </circle></g>
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M18.8449 13.5557C18.1011 13.14 17.7292 12.9322 17.4248 12.9672C17.1591 12.9977 16.9187 13.1388 16.7624 13.3558C16.5833 13.6045 16.5833 14.0305 16.5833 14.8825V27.1179C16.5833 27.9698 16.5833 28.3958 16.7624 28.6445C16.9186 28.8615 17.1591 29.0026 17.4247 29.0331C17.7292 29.0681 18.101 28.8604 18.8447 28.4448L29.7922 22.3277C30.568 21.8942 30.9559 21.6775 31.0849 21.3922C31.1973 21.1434 31.1973 20.8584 31.0849 20.6096C30.956 20.3243 30.5681 20.1076 29.7923 19.674L18.8449 13.5557Z" fill="#141414">
                                                    </path>
                                                    <defs><filter id="filter0_d_3141_46346" x="0" y="0" width="44" height="44" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                        <feFlood floodOpacity="0" result="BackgroundImageFix">
                                                        </feFlood>
                                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha">
                                                        </feColorMatrix>
                                                        <feOffset dy="1">
                                                        </feOffset>
                                                        <feGaussianBlur stdDeviation="2">
                                                        </feGaussianBlur>
                                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0">
                                                        </feColorMatrix>
                                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3141_46346">
                                                        </feBlend>
                                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3141_46346" result="shape">
                                                        </feBlend>
                                                    </filter>
                                                    </defs>
                                                </svg>
                                            </i>
                                        </button>
                                    </div>
                                    <div className="zm-nav-buttons mar-b-20" onClick={() => {
                                        const a = document.querySelector('.zm-nav-buttons .active')
                                        const b = document.querySelector('.zm-nav-buttons .disable')
                                        a?.classList.remove('active')
                                        a?.classList.add('disable')
                                        b?.classList.remove('disable')
                                        b?.classList.add('active')
                                    }}>
                                        <a className="item active" style={{ color: "#fff" }} onClick={() => setType_display('dashboard')}>
                                            Dashboard</a>
                                        <a className="item disable" onClick={() => setType_display('table')}>
                                            table</a>
                                    </div>

                                    <div className="bottom-section">
                                        <div>
                                            {
                                                type_display == "dashboard" ?
                                                    <div>
                                                        <div className="row mt-4">
                                                            <div className="col-lg-4 col-md-6 mt-4 mb-4">
                                                                <div className="card z-index-2 ">
                                                                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                                                                        <div className="shadow-primary border-radius-lg py-3 pe-1" style={{ boxShadow: '3px 8px 15px #000 !important' }}>
                                                                            <div className="chart">
                                                                                <canvas id="chart-bars" className="chart-canvas" height="170"></canvas>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card-body">
                                                                        <h6 className="mb-0 " style={{ fontSize: '18px' }}> Daily song create </h6>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4 col-md-6 mt-4 mb-4">
                                                                <div className="card z-index-2  " style={{ maxHeight: '392px' }}>
                                                                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                                                                        <div className="shadow-success border-radius-lg py-3 pe-1">
                                                                            <div className="chart">
                                                                                <canvas id="chart-line" className="chart-canvas" height="170"></canvas>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card-body">
                                                                        <h6 className="mb-0 " style={{ fontSize: '18px' }}> Daily song online </h6>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4 mt-4 mb-3">
                                                                <div className="card z-index-2 ">
                                                                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                                                                        <div className="shadow-dark border-radius-lg py-3 pe-1">
                                                                            <div className="chart">
                                                                                <canvas id="chart-line-tasks" height="170" style={{ maxHeight: '220px' }}></canvas>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card-body">
                                                                        <h6 className="mb-0 " style={{ fontSize: '18px' }}> Song ratio </h6>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="row mb-4">
                                                            <div className="col-lg-8 col-md-6 mb-md-0 mb-4">
                                                                <div className="card">
                                                                    <div className="card-header pb-0">
                                                                        <div className="row">
                                                                            <div className="col-lg-6 col-7">
                                                                                <h6 style={{ fontSize: '18px' }}>Song create today</h6>
                                                                                {/* <div className="mb-0" style={{ display: "flex", fontSize: "16px", alignItems: 'center', gap: '6px' }}>
                                                                                    <i className="fa fa-check text-info" aria-hidden="true"></i>
                                                                                    <span className="font-weight-bold ms-1">{listNewUser.length} done</span> this month
                                                                                </div> */}
                                                                            </div>
                                                                            <div className="col-lg-6 col-5 my-auto text-end">
                                                                                <div className="dropdown float-lg-end pe-4">
                                                                                    <a className="cursor-pointer" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                        <i className="fa fa-ellipsis-v text-secondary"></i>
                                                                                    </a>
                                                                                    <ul className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5" aria-labelledby="dropdownTable">
                                                                                        <li><a className="dropdown-item border-radius-md" href="javascript:;">Action</a></li>
                                                                                        <li><a className="dropdown-item border-radius-md" href="javascript:;">Another action</a></li>
                                                                                        <li><a className="dropdown-item border-radius-md" href="javascript:;">Something else here</a></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card-body px-0 pb-2">
                                                                        <div className="table-responsive">
                                                                            <table className="table align-items-center mb-0">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th className="font-weight-bolder opacity-7" style={{ fontSize: '16px' }}>Song</th>

                                                                                        <th className="text-center text-uppercase font-weight-bolder opacity-7" style={{ fontSize: '16px' }}>Status</th>
                                                                                        <th className="text-center text-uppercase font-weight-bolder opacity-7" style={{ fontSize: '16px' }}>Date</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {
                                                                                        listNewSong.map((item, index) => {
                                                                                            return (
                                                                                                <tr key={index}>
                                                                                                    <td>
                                                                                                        <div className="d-flex px-2 py-1" style={{ alignItems: 'center' }}>
                                                                                                            <div>
                                                                                                                <img src={`${baseIMG}uploads/image/168x94/${item['avatar']}`} className="avatar avatar-sm me-3" alt="xd" />
                                                                                                            </div>
                                                                                                            <div>
                                                                                                                <span className="font-weight-bold"> {item['title']} </span>
                                                                                                                <span className="font-weight-bold"> {JSON.parse(item['artists']).join(' ')} </span>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </td>

                                                                                                    <td className="align-middle text-center">
                                                                                                        <span className="font-weight-bold"> {item['status']} </span>
                                                                                                    </td>
                                                                                                    <td className="align-middle">
                                                                                                        <div className="progress-wrapper w-75 mx-auto">
                                                                                                            <div className="progress-info">
                                                                                                                <div className="progress-percentage">
                                                                                                                    <span className="font-weight-bold">{item['date_create']}</span>
                                                                                                                </div>
                                                                                                            </div>

                                                                                                        </div>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            )
                                                                                        })
                                                                                    }


                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4 col-md-6">
                                                                <div className="card h-100">
                                                                    <div className="card-header pb-0">
                                                                        <h6 style={{ fontSize: '18px' }}>Featured users</h6>

                                                                    </div>
                                                                    <div className="card-body p-3" style={{ maxHeight: '400px', overflowY: 'scroll' }}>

                                                                        <div className="table-responsive">
                                                                            <table className="table align-items-center mb-0">

                                                                                <tbody>
                                                                                    {
                                                                                        listFeaturedSong.map((item, index) => {
                                                                                            return (
                                                                                                <tr key={index}>
                                                                                                    <td>
                                                                                                        <div className="d-flex px-2 py-1" style={{ alignItems: 'center' }}>
                                                                                                            <div>
                                                                                                                <img src={`${baseIMG}uploads/image/168x94/${item['avatar']}`} className="avatar avatar-sm me-3" alt="xd" />
                                                                                                            </div>
                                                                                                            <div>
                                                                                                                <span className="" style={{ fontSize: '16px' }}> {item['user_name']} </span>
                                                                                                                <span className="" style={{ fontSize: '16px' }}> {JSON.parse(item['artists']).join(' ')} </span>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </td>
                                                                                                    <td>
                                                                                                        {/* <span className="font-weight-bold"> {item['role_name']} </span> */}
                                                                                                    </td>
                                                                                                </tr>
                                                                                            )
                                                                                        })
                                                                                    }


                                                                                </tbody>
                                                                            </table>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className="zm-library-song">
                                                        <div className="list list-border song-list-select">

                                                            <div className="fixed-table-toolbar">
                                                                <div className="float-right search btn-group">
                                                                    <input className="form-control search-input" onChange={search} type="search" aria-label="Search" placeholder="Search" />
                                                                </div>
                                                            </div>

                                                            <table className="table table-dark"
                                                                data-search="true"
                                                            >
                                                                <thead className="thead-dark">
                                                                    <tr>
                                                                        <th scope="col">ID</th>
                                                                        <th scope="col">User Create</th>
                                                                        <th scope="col">Date Create</th>
                                                                        <th scope="col">Status</th>
                                                                        <th scope="col">Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        songs.map((item) => {
                                                                            return (
                                                                                <tr key={item['id']}>
                                                                                    <th scope="row">{item['id']}</th>
                                                                                    <td>{item['user_name']}</td>
                                                                                    <td>{item['date']}</td>
                                                                                    <td>
                                                                                        <ModalChangeStatus type_modal={'song'} type={item['status']} id={item['id']} />
                                                                                    </td>
                                                                                    <td>
                                                                                        <a href={'music/detail/' + item['id']}>
                                                                                            <button type="button" className="btn btn-primary">
                                                                                                View
                                                                                            </button>
                                                                                        </a>
                                                                                        <button type="button" className="btn btn-danger">Delete</button>
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        })
                                                                    }
                                                                </tbody>
                                                            </table>


                                                        </div>
                                                    </div>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </main>
                    <div className="track-horizontal">
                        <div>
                        </div>
                    </div>
                    <div className="track-vertical">
                        <div className="thumb-vertical">
                        </div>
                    </div>
                </div>
            </div >

        </div >
    )
}
