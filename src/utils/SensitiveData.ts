export const SensitivesDataConst = ['password']

class SensitiveData {
  removeSensitveData(body: any) {
    let arr = Object.keys(body)
    arr = SensitivesDataConst.filter((value) => arr.includes(value))

    arr.map((value) => (body[value] = '****'))

    return body
  }
}

export default new SensitiveData()
