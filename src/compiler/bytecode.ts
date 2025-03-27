import { MAX_UINT16_VALUE, MAX_UINT32_VALUE, MAX_UINT8_VALUE } from "./constants";
import { validateInteger } from "./utils";

export class Bytecode {
  public buffer: number[];
  
  public constructor() {
    this.buffer = [];
  };

  public writeU8(u8: number): void {
    validateInteger(u8, 0, MAX_UINT8_VALUE);

    this.buffer.push(u8);
  };

  public writeU16(u16: number): void {
    validateInteger(u16, 0, MAX_UINT16_VALUE);

    this.buffer.push(u16 & 0xFF);
    this.buffer.push(u16 >> 8 & 0xFF);
  };
  
  public writeU32(u32: number): void {
    validateInteger(u32, 0, MAX_UINT32_VALUE);

    this.buffer.push(u32 & 0xFF);
    this.buffer.push(u32 >> 8 & 0xFF);
    this.buffer.push(u32 >> 16 & 0xFF);
    this.buffer.push(u32 >> 24 & 0xFF);
  };
};