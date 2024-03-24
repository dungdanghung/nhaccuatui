import style from "./loader.module.css"

function Loader({ width_height = 50, border = 5, display = false }: any) {
    document.documentElement.style.setProperty("--width_height_loader", `${width_height}px`);
    document.documentElement.style.setProperty("--border_loader", `${border}px`);
    return (
        <div className={[style["loader"], display ? style['loading'] : ''].join(' ')}></div >
    )
}

export default Loader