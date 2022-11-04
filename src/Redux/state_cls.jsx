let renderDOM = () => {
}

class Store {
    constructor() {
        this.dialogs = [
            {"id": 1, "name": "Dimych"},
            {"id": 2, "name": "Andrew"},
            {"id": 3, "name": "Sveta"},
            {"id": 4, "name": "Boris"},
            {"id": 5, "name": "Vova"},
        ]

        this.messages = [
            {"id": 1, "message": "Hello!"},
            {"id": 2, "message": "How are you?"},
            {"id": 3, "message": "A'm fine!"},
        ]

        this.posts = [
            {"id": 1, "post": "Hello React!", "likesCount": 11},
            {"id": 2, "post": "This is my first social network!!!", "likesCount": 12},
        ]

        this.newTextPost = ''
    }

    addPost() {
        if (this.newTextPost !== '') {
            this.posts.push({"id": this.posts.length + 1, "post": this.newTextPost, "likesCount": 0})
            this.newTextPost = ''
            renderDOM()
        }
    }

    changeTextArea(text) {
        this.newTextPost = text
        renderDOM()
    }

    getMessages() {
        return this.messages
    }

    getDialogs() {
        return this.dialogs
    }

    getPosts() {
        return this.posts
    }

    getNewTextPost(){
        return this.newTextPost
    }
}


export const subscribe = (observer) => {
    renderDOM = observer
}

export let store = new Store()

// window.store = store
