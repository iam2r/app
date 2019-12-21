(async () => {
  const { default: Preloading } = await import(
    /* webpackChunkName: "preloading" */ "app.root/preloading/Preloading"
  );

  const preLoad = new Preloading();
  preLoad
    .once("loaded", async () => {
      await import(/* webpackChunkName: "main" */ "app.root/main");
      preLoad.emit("destory");
    })
    .init();
})();
