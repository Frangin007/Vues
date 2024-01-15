
export default {
    videoTitle(videoTitle) {
        return videoTitle.split("_").join(" ")
    },
    copiableField(copiableObj, elementEvent, elementContent) {
        console.log(elementEvent)
        console.log(elementEvent.target.getBoundingClientRect())
        let elementPos = elementEvent.target.getBoundingClientRect()
        //elementEvent.stopPropagation();
        
        //let left = (elementEvent.target.offsetParent.offsetWidth - (elementEvent.target.offsetLeft + (elementEvent.target.offsetWidth/2)) ) + "px";
        let left = (Math.round(elementPos.x) - elementPos.width - 32) + "px";
        //let top = elementEvent.target.offsetTop + (elementEvent.target.offsetHeight/2) + "px";
        let top = (Math.round(elementPos.y) - elementPos.height - 32) + "px";
        copiableObj.showHelp = true;
        copiableObj.targetElement = {
            left : left,
            top : top
        }
        console.log(copiableObj)
        navigator.clipboard.writeText(elementContent)
        setTimeout(()=> {
            copiableObj.showHelp = false;
        }, 500)
        return true
    },
    calculateYear(date) {
        let current = new Date()
        let calculateDate = new Date(date)
        return current.getFullYear() - calculateDate.getFullYear()
    }
}