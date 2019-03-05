var Module = null;

function drawFrame(num) {
  console.log('drawFrame, got: ' + num);
}

function initWasmModule() {
  var importObject = {
    env: {
      _callJS: drawFrame,
      __memory_base: 0,
      tableBase: 0,
      memory: new WebAssembly.Memory({ initial: 256 }),
      table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' }),
    },
  };

  return fetch('main.wasm')
    .then((response) => response.arrayBuffer())
    .then((bytes) => WebAssembly.instantiate(bytes, importObject))
    .then((wasmModule) => {
      Module = wasmModule.instance;
      console.log('1');
    });
}
initWasmModule().then(() => {
  Module.exports._test(3);
});
