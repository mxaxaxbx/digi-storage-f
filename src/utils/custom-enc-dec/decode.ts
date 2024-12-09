import { customChars, EncodedValue, DecodedValue } from './settings';

function customToBuffer(encoded: string): ArrayBuffer {
  const output: number[] = [];
  for (let i = 0; i < encoded.length; i += 4) {
    const char1 = customChars.indexOf(encoded[i]);
    const char2 = customChars.indexOf(encoded[i + 1]);
    const char3 = customChars.indexOf(encoded[i + 2]);
    const char4 = customChars.indexOf(encoded[i + 3]);

    // eslint-disable-next-line no-bitwise
    const combined = (char1 << 18) | (char2 << 12) | (char3 << 6) | char4;

    // eslint-disable-next-line no-bitwise
    output.push((combined >> 16) & 255);

    // eslint-disable-next-line no-bitwise
    if (encoded[i + 2] !== '=') output.push((combined >> 8) & 255);
    // eslint-disable-next-line no-bitwise
    if (encoded[i + 3] !== '=') output.push(combined & 255);
  }
  return new Uint8Array(output).buffer;
}

function decodeInt64(enc: string): bigint {
  const buffer = customToBuffer(enc);
  const view = new DataView(buffer);
  return view.getBigInt64(0);
}

function decodeFloat64(enc: string): number {
  const buffer = customToBuffer(enc);
  const view = new DataView(buffer);
  return view.getFloat64(0);
}

function decodeFloat32(enc: string): number {
  const buffer = customToBuffer(enc);
  const view = new DataView(buffer);
  return view.getFloat32(0);
}

function decodeString(enc: string): string {
  const buffer = customToBuffer(enc);
  let txt = new TextDecoder().decode(buffer);
  // remove trailing spaces
  txt = txt.replace(/\0/g, '');
  return txt.trim();
}

function decodeBoolean(enc: string): boolean {
  return enc === 'T';
}

function decodeArray(enc: string): any[] {
  const str = decodeString(enc.slice(0));
  const spl = str.split('-');
  const elements: Array<any> = [];
  for (let i = 0; i < spl.length; i += 1) {
    // eslint-disable-next-line no-use-before-define
    const { value, length } = decode(spl[i]);
    elements.push(value);
  }
  return elements;
}

function decodeObject(enc: string): { [key: string]: any } {
  const str = decodeString(enc);
  const objSplit = str.split('-');
  const objToReturn: { [key: string]: any } = {};

  for (let i = 0; i < objSplit.length; i += 1) {
    const [key, value] = objSplit[i].split('_');
    // eslint-disable-next-line no-use-before-define
    const decodedKey = decodeString(key);
    // eslint-disable-next-line no-use-before-define
    const decodedValue = decode(value);
    objToReturn[decodedKey] = decodedValue.value;
  }
  return objToReturn;
}

function decode(enc: string): { value: DecodedValue, length: number } {
  const type = enc[0];
  switch (type) {
    // type of integers
    case 'I':
      return { value: decodeInt64(enc.slice(3)), length: 12 };
    // type of floats
    case 'F': {
      // get the first three characters and decode the float
      const tp = enc.slice(0, 3);
      switch (tp) {
        case 'F32':
          return { value: decodeFloat32(enc.slice(3)), length: 8 };
        case 'F64':
          return { value: decodeFloat64(enc.slice(3)), length: 12 };
        default:
          throw new Error(`Invalid float type ${tp}`);
      }
    }
    case 'S': {
      const value = decodeString(enc.slice(1));
      return { value, length: enc.length + 1 };
    }
    case 'B': {
      const value = decodeBoolean(enc.slice(1));
      return { value, length: 2 };
    }
    case 'A': {
      const value = decodeArray(enc.slice(1));
      return { value, length: enc.length + 1 };
    }
    case 'O': {
      const value = decodeObject(enc.slice(1));
      return { value, length: enc.length + 1 };
    }
    case 'T': {
      const value = decodeObject(enc.slice(1));
      return { value, length: enc.length + 1 };
    }
    case 'L': {
      const value = decodeArray(enc.slice(1));
      return { value, length: enc.length + 1 };
    }
    default:
      throw new Error(`Invalid type ${type}`);
  }
}

export default decode;
