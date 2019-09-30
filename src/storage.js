export const bookmark = {
  getChapter() {
    return window.localStorage.getItem('bookmark.chapter')
  },

  setChapter(chapterNum) {
    window.localStorage.setItem('bookmark.chapter', chapterNum)
  },

  getY() {
    return window.localStorage.getItem('bookmark.Y')
  },

  setY(y) {
    window.localStorage.setItem('bookmark.Y', y)
  },
}
