
export default {

    dropdownPosition(event) {
        console.log(event)
        let right = (event.target.offsetParent.offsetWidth - (event.target.offsetLeft + (event.target.offsetWidth/2)) ) + "px";
        let top = event.target.offsetTop + (event.target.offsetHeight/2) + "px";
        return { 
            right : right,
            top : top
        }
    },

    onTableActions(dropdown) {
        dropdown.isDrop = false
    }



}