import moment from 'moment';

class ObjectFormat {
    
    static myTypes = []

    constructor (object) {
        //this.object = object
        Object.keys(object).map( (objectKey) => {
            if (objectKey == 'content') {
                if (object[objectKey] instanceof Function) {
                    this.objContent = object[objectKey]()
                } else {
                    this.objContent = object[objectKey]
                }
            } else {
                this[objectKey] = object[objectKey]
                
            }
        })
    }

    getContent() {
        return this.object.content
    }

    get content() {
        if(this.type == 'bool') {
            return this.objContent ? this.true : this.false 
        }
        if (this.type == 'date') {
            if (!moment(this.objContent).isValid()) {
                return "Not set"
            }
            return moment(this.objContent).format("Do MMM YYYY")
        }
        return this.objContent
    }

    set content(value) {
        this.objContent = value
    }

}


export default ObjectFormat
