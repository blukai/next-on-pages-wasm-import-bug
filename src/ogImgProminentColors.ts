import jpegInit, { decode as jpegDecode } from 'jpeg';
import jpegWasm from 'jpeg/jpeg_bg.wasm?module';
import { type MMCQOption, mmcq } from 'mmcq.js';
import mmcqWasm from 'mmcq.js/dist/mmcq_bg.wasm?module';

function createMmcqConfig() {
  const mmcqConfig: Partial<MMCQOption> = {
    count: 2,
    colorDepth: 2,
    useWebAssembly: true,
    wasmPath: mmcqWasm as any,
  };
  return mmcqConfig;
}

export async function extractJpegProminentColors(imageBytes: Uint8Array) {
  await jpegInit(jpegWasm);
  const imageData = jpegDecode(new Uint8Array(imageBytes));
  const prominentColors = await mmcq(imageData.data, createMmcqConfig());
  return prominentColors;
}
