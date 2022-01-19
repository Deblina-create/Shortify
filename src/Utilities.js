const getFirstNCharacters = (text, n) => {
    if (text) {
        if (text.length <= n)
            return text
        return text.substring(0, n)
    }

    return ""
}
export { getFirstNCharacters }