(async () => {
  const { Loader } = await import(
    /* webpackChunkName: "loader" */ "@/apps/treasure-hunter/loader/Loader"
  );
  new Loader()
    .once("load", () => {
      import(/* webpackChunkName: "main" */ "@/apps/treasure-hunter/main");
    })
    .load();
})();
