(async () => {
  const { default: Preloading } = await import(
    /* webpackChunkName: "preloading" */ "app.root/preloading/Preloading"
  );
  new Preloading()
    .once("loaded", () => {
      import(/* webpackChunkName: "main" */ "app.root/main");
    })
    .init();
})();
