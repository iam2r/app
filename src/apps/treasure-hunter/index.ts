(async () => {
  const { Loader } = await import(
    /* webpackChunkName: "loader" */ "app.root/loader/Loader"
  );
  new Loader()
    .once("load", () => {
      import(/* webpackChunkName: "main" */ "app.root/main");
    })
    .load();
})();
