export default {
    addUrl(value) {
        const reg = /\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/
        let newValue = value ? value.match(reg)[0] : ''
        return newValue && `https:${newValue}`
    }
}