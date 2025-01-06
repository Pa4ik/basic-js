const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }


  encrypt(message, key) {
    if (message === undefined || key === undefined) {
      throw new Error('Incorrect arguments!');
    }

    message = message.toUpperCase();
    key = key.toUpperCase();
    let encryptedMessage = '';
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
      if (this.alphabet.includes(message[i])) {
        let shift = this.alphabet.indexOf(key[keyIndex % key.length]);
        let encryptedChar = this.alphabet[(this.alphabet.indexOf(message[i]) + shift) % 26];
        encryptedMessage += encryptedChar;
        keyIndex++;
      } else {
        encryptedMessage += message[i];
      }
    }


    return this.isDirect ? encryptedMessage : encryptedMessage.split('').reverse().join('');
  }


  decrypt(message, key) {
    if (message === undefined || key === undefined) {
      throw new Error('Incorrect arguments!');
    }

    message = message.toUpperCase();
    key = key.toUpperCase();
    let decryptedMessage = '';
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
      if (this.alphabet.includes(message[i])) {
        let shift = this.alphabet.indexOf(key[keyIndex % key.length]);
        let decryptedChar = this.alphabet[(this.alphabet.indexOf(message[i]) - shift + 26) % 26];
        decryptedMessage += decryptedChar;
        keyIndex++;
      } else {
        decryptedMessage += message[i];
      }
    }


    return this.isDirect ? decryptedMessage : decryptedMessage.split('').reverse().join('');
  }
}
module.exports = {
  VigenereCipheringMachine
};
