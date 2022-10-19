//on mobile: fit height of textareas dynamically to content height
export function adaptInputSize() {
  if (window.matchMedia("(max-device-width: 760px)").matches) {
    const tx = document.getElementById("textInput");
    const txtP = document.getElementById("txtParent");
    if (tx && txtP) {
      tx.style.height = "auto";
      tx.style.height = tx.scrollHeight + "px";
      txtP.style.height = "auto";
      txtP.style.height = tx.scrollHeight + 5 + "px";
    }
  }
}

export function adaptResultSize() {
  if (window.matchMedia("(max-device-width: 760px)").matches) {
    const res = document.getElementById("resField");
    const resP = document.getElementById("resParent");
    if (res && resP) {
      res.style.height = "auto";
      res.style.height = res.scrollHeight + "px";
      resP.style.height = "auto";
      resP.style.height = res.scrollHeight + 5 + "px";
    }
  }
}
