export default class DB {
  db = null
  DBOpenRequest = null

  constructor (name, version) {
    this.DBOpenRequest = window.indexedDB.open(name, version)
    this.DBOpenRequest.onupgradeneeded = this.onupgradeneeded.bind(this)
  }

  onReady () {
    return new Promise((resolve, reject) => {
      this.DBOpenRequest.onsuccess = () => {
        // eslint-disable-next-line no-useless-call
        this.onsuccess.call(this)
        resolve()
      }

      this.DBOpenRequest.onerror = () => {
        // eslint-disable-next-line no-useless-call
        this.onerror.call(this)
        // eslint-disable-next-line prefer-promise-reject-errors
        reject()
      }
    })
  }

  onsuccess () {
    this.db = this.DBOpenRequest.result
    this.add()
  }

  onerror () { }

  onupgradeneeded (evt) {
    this.db = evt.target.result
    const { name, db } = this
    if (!db.objectStoreNames.contains(name)) {
      const objectStore = db.createObjectStore('diaryList', { keyPath: 'id', autoIncrement: true })
      objectStore.createIndex('title', 'title')
      objectStore.createIndex('time', 'time')
      objectStore.createIndex('desc', 'desc')
      objectStore.createIndex('editorContent', 'editorContent')
    }
  }

  add (item) {
    if (item) {
      const request = this.objectStore.add(item)
      return new Promise((resolve, reject) => {
        request.onsuccess = resolve
        request.onerror = reject
      })
    }
  }

  delete (id) {
    if (id) {
      const request = this.objectStore.delete(id)
      return new Promise((resolve, reject) => {
        request.onsuccess = resolve
        request.onerror = reject
      })
    }
  }

  update (item) {
    if (item) {
      const request = this.objectStore.put(item)
      return new Promise((resolve, reject) => {
        request.onsuccess = resolve
        request.onerror = reject
      })
    }
  }

  readAll () {
    const request = this.objectStore.openCursor()
    const list = []
    return new Promise((resolve, reject) => {
      request.onsuccess = evt => {
        const cursor = evt.target.result
        if (cursor) {
          list.push(cursor.value)
          cursor.continue()
        } else {
          resolve(list)
        }
      }
      request.onerror = reject
    })
  }

  get objectStore () {
    if (!this.db) {
      return
    }
    const transaction = this.db.transaction(this.db.objectStoreNames, 'readwrite')
    return transaction.objectStore('diaryList')
  }
}
