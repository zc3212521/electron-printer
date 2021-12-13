window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }

    const webview = document.querySelector('#printWebview')

    // console.log(432432, webview)
    // webview.print({ silent: true, printBackground: true, deviceName: 'HP_LaserJet_MFP_M132snw__E86E2A____slchenk_MacBook_Pro' },
    //     (data) => {
    //       console.log("webview success", data);
    //     })
    // })