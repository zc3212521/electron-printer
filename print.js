const { ipcRenderer } = require("electron");    

window.addEventListener("DOMContentLoaded", () => {
    ipcRenderer.on('reply', (event, arc) => {
        let printWrapDom = document.getElementsByClassName("print-wrap")[0];
        printWrapDom.innerHTML = "";

        let imgs = arc.imgs
        for (let i = 0; i < imgs.length; i++) {
            let imgDom = document.createElement("img");
            imgDom.setAttribute("src", imgs[i]);
            imgDom.setAttribute("style", "width: 100%; height: 100%;");
            printWrapDom.appendChild(imgDom);
        }

        ipcRenderer.send('ready-print')
        // printDom.print({
        //     silent: true,
        //     margins: {
        //         marginType: "none"
        //     },
        //     landscape: false, // 横向打印
        //     copies: 1, // 打印份数
        // });



        // let printDom = document.getElementById("printWebview")
        // printDom.openDevTools()

        // printDom.executeJavaScript(
        //     `
        //     printWrapDom = document.getElementsByClassName("print-wrap")[0];
        //     printWrapDom.innerHTML = "";
        //     `
        // )

        // let imgs = arc.imgs
        // for (let i = 0; i < imgs.length; i++) {
        //     printDom.executeJavaScript(
        //         `
        //         imgDom${i} = document.createElement("img");
        //         imgDom${i}.setAttribute("src", "${imgs[i]}");
        //         imgDom${i}.setAttribute("style", "width: 100%; height: 100%;");
        //         printWrapDom.appendChild(imgDom${i});
        //         `
        //     )
        // }

        // printDom.print({
        //     silent: true,
        //     margins: {
        //         marginType: "none"
        //     },
        //     landscape: false, // 横向打印
        //     copies: 1, // 打印份数
        // });
    })
})
