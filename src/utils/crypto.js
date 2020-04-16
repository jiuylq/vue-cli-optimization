import CryptoJS from 'crypto-js'

/**
 * @param {String | Number} val 需加密的内容
 * @param {Boolean} bool 是否AES加密
 * @param {String} cjkkey 加密密钥
 * @param {String} cjikey 解密密钥
*/
export function cryptoVal (val, bool, cjkkey, cjikey) {
  let cjsret
  // 以下判断默认值存在问题，当值为0时，但当前情况一般不会存在这种情况
  const cjk = cjkkey || 'd4e97dcaed583ed483caf740543a8de9'
  const cji = cjikey || 'a5c3bf85448a3af2b8e53a89e3564be7'

  const key = CryptoJS.enc.Utf8.parse(cjk)
  const iv = CryptoJS.enc.Utf8.parse(cji)

  const cfg = {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    format: CryptoJS.format.Hex
  }

  if (bool) { // AES加密
    const srcs1 = CryptoJS.enc.Utf8.parse(val)
    cjsret = CryptoJS.AES.encrypt(srcs1, key, cfg).toString()
  } else { // AES解密
    const srcs2 = CryptoJS.enc.Hex.parse(val)
    const decryptdata = CryptoJS.AES.decrypt(CryptoJS.lib.CipherParams.create({
      ciphertext: srcs2
    }), key, cfg)
    cjsret = decryptdata.toString(CryptoJS.enc.Utf8)
  }

  return cjsret
}

/**
 * @param {String | Number} val SHA1加密的内容
*/
export function toSHA1 (val) {
  return CryptoJS.SHA1(val).toString(CryptoJS.enc.Hex)
}
