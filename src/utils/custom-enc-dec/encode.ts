import { customChars, EncodedValue, DecodedValue } from './settings';

function bufferToCustom(buffer: Uint8Array): string {
  let output = '';

  for (let i = 0; i < buffer.length; i += 3) {
    const b1 = buffer[i] || 0;
    const b2 = buffer[i + 1] || 0;
    const b3 = buffer[i + 2] || 0;

    // eslint-disable-next-line no-bitwise
    const combined = (b1 << 16) | (b2 << 8) | b3;

    // eslint-disable-next-line no-bitwise
    const char1 = (combined >> 18) & 63;
    // eslint-disable-next-line no-bitwise
    const char2 = (combined >> 12) & 63;
    // eslint-disable-next-line no-bitwise
    const char3 = (combined >> 6) & 63;
    // eslint-disable-next-line no-bitwise
    const char4 = combined & 63;

    output += customChars[char1] + customChars[char2] + customChars[char3] + customChars[char4];
  }

  return output;
}

function encodeInt64(n: bigint): string {
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setBigInt64(0, n);
  return bufferToCustom(new Uint8Array(buffer));
}

function encodeFloat64(n: number): string {
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setFloat64(0, n);
  return bufferToCustom(new Uint8Array(buffer));
}

function encodeFloat32(n: number): string {
  const buffer = new ArrayBuffer(4);
  const view = new DataView(buffer);
  view.setFloat32(0, n);
  return bufferToCustom(new Uint8Array(buffer));
}

function encodeString(s: string): EncodedValue {
  const buffer = new TextEncoder().encode(s);
  return bufferToCustom(buffer);
}

function encodeBoolean(b: boolean): EncodedValue {
  return b ? 'T' : 'F';
}

function encodeArray(arr: Array<any>): EncodedValue {
  const elements: Array<any> = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const element of arr) {
    // eslint-disable-next-line no-use-before-define
    const encoded = encode(element);
    elements.push(encoded);
  }
  const str = encodeString(elements.join('-'));

  return `A${str}E`;
}

function encodeObject(obj: { [key: string]: any }): EncodedValue {
  const entries: string[] = [];
  Object.entries(obj).forEach(([key, value]) => {
    const fieldName = encodeString(key);
    // eslint-disable-next-line no-use-before-define
    const fieldValue = encode(value);

    entries.push(`${fieldName}_${fieldValue}`);
  });
  const str = encodeString(entries.join('-'));
  return `O${str}`;
}

function encode(val: DecodedValue): EncodedValue {
  switch (typeof val) {
    case 'bigint':
      return `I${encodeInt64(val)}`;
    case 'number':
      return `F64${encodeFloat64(val)}`;
    case 'string':
      return `S${encodeString(val)}`;
    case 'boolean':
      return `B${encodeBoolean(val)}`;
    case 'object':
      if (Array.isArray(val)) {
        return encodeArray(val);
      }
      return encodeObject(val);
    default:
      throw new Error(`Unsupported type: ${typeof val}`);
  }
}

export default encode;
