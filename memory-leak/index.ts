import { getHeapSnapshot, writeHeapSnapshot } from "node:v8";
import path from "node:path";

const stream = getHeapSnapshot();

class MemoryLeakClass {
  public boom!: any;

  constructor() {
    this.boom = new ArrayBuffer(1000000);
  }
}

const unCollect = {};

const timer1 = setInterval(() => {
  unCollect[Date.now()] = new MemoryLeakClass();
}, 1000);

const timer2 = setInterval(() => {
  const filename = path.join(
    __dirname,
    `./heapdump.${Date.now()}.heapsnapshot`
  );
  writeHeapSnapshot(filename);
}, 2000);

setTimeout(() => {
  clearInterval(timer1);
  clearInterval(timer2);
}, 10000);
