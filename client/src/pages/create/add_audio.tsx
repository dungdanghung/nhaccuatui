import "./create.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { baseURL, getTokenHeader } from "../../config/api";
import toast from "../../helper/toast";
import { useAppContext } from "../../context";

export default function Add_audio() {
    const [form, setform] = useState<HTMLFormElement | undefined>();
    const [fileInput, setfileInput] = useState<HTMLInputElement | undefined>()
    const [progressArea, serprogressArea] = useState<HTMLSelectElement | undefined>()
    const [uploadedArea, setuploadedArea] = useState<HTMLSelectElement | undefined>()
    const navigate = useNavigate()
    const { song_create } = useAppContext()
    function inputChange({ target }: any) {
        let file = target.files[0];
        if (file) {
            let fileName = file.name;
            if (fileName.length >= 12) {
                let splitName = fileName.split('.');
                fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
            }
            uploadFile(fileName);
        }
    }


    function uploadFile(name: string) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", `${baseURL}music/validate_audio`);
        xhr.upload.addEventListener("progress", ({ loaded, total }) => {
            let fileLoaded = Math.floor((loaded / total) * 100);
            let fileTotal = Math.floor(total / 1000);
            let fileSize;

            (fileTotal < 1024) ? fileSize = fileTotal + " KB" : fileSize = (loaded / (1024 * 1024)).toFixed(2) + " MB";
            let progressHTML = `<li class="row"
                                <div class="content">
                                  <div class="details">
                                    <span class="name">${name} • Uploading</span>
                                    <span class="percent">${fileLoaded}%</span>
                                  </div>
                                  <div class="progress-bar">
                                    <div class="progress" style="width: ${fileLoaded}%"></div>
                                  </div>
                                </div>
                              </li>`;

            uploadedArea?.classList.add("onprogress");
            const progressArea_element = progressArea as HTMLSelectElement
            progressArea_element.innerHTML = progressHTML;
            if (loaded == total) {
                progressArea_element.innerHTML = "";
                let uploadedHTML = `<li class="row">
                                  <div class="content upload">
                                    <div class="details">
                                      <span class="name">${name} • Uploaded</span>
                                      <span class="size">${fileSize}</span>
                                    </div>
                                  </div>
                                  <i class="fas fa-check"></i>
                                </li>`;
                uploadedArea?.classList.remove("onprogress");

                uploadedArea?.insertAdjacentHTML("afterbegin", uploadedHTML);
            }
        });
        xhr.setRequestHeader('Authorization', getTokenHeader());
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    toast.success("Successful")
                } else {
                    toast.error("Something went wrong")
                    const fileInput = document.querySelector(".file-input") as HTMLInputElement
                    fileInput.value = '';
                    document.querySelector(".uploaded-area .row")?.remove()
                }
            }
        };

        let data = new FormData(form);
        xhr.send(data);
    }

    function save() {
        const fileInput = document.querySelector(".file-input") as HTMLInputElement
        const file = fileInput.files as FileList
        song_create.formData?.append('audio', file[0])
        navigate('/create/song')
    }

    useEffect(() => {
        const form = document.querySelector("form") as HTMLFormElement
        const fileInput = document.querySelector(".file-input") as HTMLInputElement
        const progressArea = document.querySelector(".progress-area") as HTMLSelectElement
        const uploadedArea = document.querySelector(".uploaded-area") as HTMLSelectElement
        setform(form);
        setfileInput(fileInput)
        serprogressArea(progressArea)
        setuploadedArea(uploadedArea)
    }, [])

    return (
        <div className="wrap">
            <div className="form" >
                <div className="header-form">
                    <h2>Add Audio</h2>
                </div>
                <div className="form-item form-item-add-audio">
                    <div className="roles">
                        <h3>We allow the following audio file types: </h3>
                        <div className="role">Hight Quality MP3 - 320kbps - 44.1khz</div>
                    </div>
                </div>

                <div className="form-item center">
                    <div className="wrapper">
                        <header>Uploader Audio</header>
                        <form action="#" onClick={() => fileInput?.click()}>
                            <input className="file-input" type="file" name="audio" hidden onChange={inputChange} />
                            <i className="fas fa-cloud-upload-alt"></i>
                            <p>Browse File to Upload</p>
                        </form>
                        <section className="progress-area"></section>
                        <section className="uploaded-area"></section>
                    </div>
                </div>
                <div className="form-item">
                    <div className="save" onClick={save}>
                        <div className="save-btn">Save</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
