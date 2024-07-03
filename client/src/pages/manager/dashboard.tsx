// import "../../assets/css/nucleo-icons.css"
// import "../../assets/css/nucleo-svg.css"
import "../../assets/css/material-dashboard.css"
import { useEffect, useState } from "react"
import Chart from 'chart.js/auto';
import { GetChartUser, GetChartUserOnline, GetFeaturedUser, GetNewUser, GetRatioUser } from "../../api/manager";
import { baseIMG } from "../../config/api";
import ModalChangeStatusUser from "../../components/modal/modal_change_status_user";
import { GetUserUpload } from "../../api/user";

export default function Dashboard() {
    const [listNewUser, set_listNewUser] = useState([])
    const [listFeaturedUser, set_listFeaturedUser] = useState([])
    const [type_display, setType_display] = useState('dashboard')
    const [users, setUsers] = useState([])

    useEffect(() => {
        GetUserUpload()
            .then((rs: any) => {
                setUsers(rs);
            })


    }, [])

    useEffect(() => {
        GetChartUser()
            .then((rs) => {
                const ctx = document.getElementById('chart-bars') as HTMLCanvasElement;
                const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                const data = {
                    labels: labels,
                    datasets: [{
                        label: 'User Create',
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
    })

    useEffect(() => {

        GetChartUserOnline()
            .then((rs) => {
                const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                const data = {
                    labels: labels,
                    datasets: [{
                        label: 'Today Online',
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


    })

    useEffect(() => {
        GetRatioUser()
            .then((rs) => {
                const DATA_COUNT = 5;
                const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

                const data = {
                    labels: ['Author', 'User'],
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

    })

    useEffect(() => {
        GetNewUser()
            .then((rs) => {
                set_listNewUser(rs.users)
            })
        GetFeaturedUser()
            .then((rs) => {
                set_listFeaturedUser(rs)
            })
    }, [])


    function search(e: React.ChangeEvent<HTMLInputElement>) {
        // clearTimeout(timeout)
        // timeout = setTimeout(() => {
        //     if (e.target.value != '') {
        //         SearchManager(e.target.value)
        //             .then((rs) => {
        //                 setsongs(rs)
        //             })
        //     } else {
        //         GetSongUpload()
        //             .then((rs: any) => {
        //                 setsongs(rs);
        //             })
        //     }
        // }, 500)
    }

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
                                            Quản lý User</div>

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
                                                                        <h6 className="mb-0 " style={{ fontSize: '18px' }}> Daily user create </h6>
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
                                                                        <h6 className="mb-0 " style={{ fontSize: '18px' }}> Daily user online </h6>
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
                                                                        <h6 className="mb-0 " style={{ fontSize: '18px' }}> User ratio </h6>
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
                                                                                <h6 style={{ fontSize: '18px' }}>Users create today</h6>
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
                                                                                        <th className="font-weight-bolder opacity-7" style={{ fontSize: '16px' }}>User</th>
                                                                                        <th className="text-uppercase font-weight-bolder opacity-7 ps-2" style={{ fontSize: '16px' }}>Role</th>
                                                                                        <th className="text-center text-uppercase font-weight-bolder opacity-7" style={{ fontSize: '16px' }}>Status</th>
                                                                                        <th className="text-center text-uppercase font-weight-bolder opacity-7" style={{ fontSize: '16px' }}>Date</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {
                                                                                        listNewUser.map((item, index) => {
                                                                                            return (
                                                                                                <tr key={index}>
                                                                                                    <td>
                                                                                                        <div className="d-flex px-2 py-1" style={{ alignItems: 'center' }}>
                                                                                                            <div>
                                                                                                                <img src={`${baseIMG}img/avatar/${item['avatar']}`} className="avatar avatar-sm me-3" alt="xd" />
                                                                                                            </div>
                                                                                                            <span className="font-weight-bold"> {item['user_name']} </span>
                                                                                                        </div>
                                                                                                    </td>
                                                                                                    <td>
                                                                                                        <span className="font-weight-bold"> {item['role_name']} </span>
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
                                                                        {/* <p style={{ display: "flex", fontSize: "16px", alignItems: 'center', gap: '6px' }}>
                                <i className="fa fa-arrow-up text-success" aria-hidden="true"></i>
                                <span className="font-weight-bold">24%</span> this month
                            </p> */}
                                                                    </div>
                                                                    <div className="card-body p-3">

                                                                        <div className="table-responsive">
                                                                            <table className="table align-items-center mb-0">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th className="font-weight-bolder opacity-7" style={{ fontSize: '16px' }}>User</th>
                                                                                        <th className="text-uppercase font-weight-bolder opacity-7 ps-2" style={{ fontSize: '16px' }}>Role</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {
                                                                                        listFeaturedUser.map((item, index) => {
                                                                                            return (
                                                                                                <tr key={index}>
                                                                                                    <td>
                                                                                                        <div className="d-flex px-2 py-1" style={{ alignItems: 'center' }}>
                                                                                                            <div>
                                                                                                                <img src={`${baseIMG}img/avatar/${item['avatar']}`} className="avatar avatar-sm me-3" alt="xd" />
                                                                                                            </div>
                                                                                                            <span className="font-weight-bold"> {item['user_name']} </span>
                                                                                                        </div>
                                                                                                    </td>
                                                                                                    <td>
                                                                                                        <span className="font-weight-bold"> {item['role_name']} </span>
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
                                                                        <th scope="col">User</th>
                                                                        <th scope="col">Date Create</th>
                                                                        <th scope="col">Status</th>
                                                                        <th scope="col">Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        users.map((item) => {
                                                                            return (
                                                                                <tr key={item['id']}>
                                                                                    <th scope="row">{item['id']}</th>
                                                                                    <td>

                                                                                        <div className="d-flex px-2 py-1" style={{ alignItems: 'center' }}>
                                                                                            <div>
                                                                                                <img src={`${baseIMG}img/avatar/${item['avatar']}`} className="avatar avatar-sm me-3" alt="xd" />
                                                                                            </div>
                                                                                            <div>
                                                                                                <span className="font-weight-bold"> {item['user_name']} </span>

                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>{item['date']}</td>
                                                                                    <td>
                                                                                        <ModalChangeStatusUser type={item['status']} id={item['id']} />
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
