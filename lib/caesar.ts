const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const length = alphabet.length;

export const encrypt = (plaintext: string, shift: number): string => {
  return crypt(plaintext, shift, true);
};

export const decrypt = (plaintext: string, shift: number): string => {
  return crypt(plaintext, shift, false);
};

export const crypt = (
  text: string,
  shift: number,
  encrypt: boolean
): string => {
  let newText = '';
  for (let i = 0; i < text.length; i++) {
    const letter = text.charAt(i);
    const num = alphabet.indexOf(letter.toLocaleLowerCase());
    if (num !== -1) {
      const isUpper = letter === letter.toLocaleUpperCase();
      let newNum;
      if (encrypt) newNum = (((num + shift) % length) + length) % length;
      else newNum = (((num - shift) % length) + length) % length;
      const newLetter = alphabet.charAt(newNum);
      newText += isUpper ? newLetter.toLocaleUpperCase() : newLetter;
    } else newText += letter;
  }
  return newText;
};
