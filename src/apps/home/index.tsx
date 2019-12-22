(async () => {
  const { default: Preloading } = await import(
    /* webpackChunkName: "preloading" */ "app.root/preloading/Preloading"
  );
  new Preloading();
  await import(/* webpackChunkName: "main" */ "app.root/main");
})();
