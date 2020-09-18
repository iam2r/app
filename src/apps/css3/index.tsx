import JSXUtils from "@/common/JSXUtils";
import "./index.scss";

const Link = () => (
  <link
    href="https://cdn.bootcss.com/font-awesome/5.11.2/css/all.css"
    rel="stylesheet"
  />
);

document
  .querySelector("head")
  .appendChild(JSXUtils.createElement((Link as any)(JSXUtils.h)));

const App = () => {
  return (
    <nav class="navtab">
      <ul>
        <li class="navtab-item active">
          <i class="fas fa-home"></i>
          <span>Home</span>
        </li>
        <li class="navtab-item">
          <i class="fas fa-compass"></i>
          <span>Explore</span>
        </li>
        <li class="navtab-item">
          <i class="fas fa-bell"></i>
          <span>Notification</span>
        </li>
        <li class="navtab-item">
          <i class="fas fa-user"></i>
          <span>Profile</span>
        </li>
      </ul>
    </nav>
  );
};

const $el = JSXUtils.createElement((App as any)(JSXUtils.h));

document.querySelector("#app").appendChild($el);

const navtab = document.querySelector("nav.navtab");
const navtabItems = document.querySelectorAll("li.navtab-item");
navtabItems.forEach((navtabItem, activeIndex) =>
  navtabItem.addEventListener("click", () => {
    navtabItems.forEach((navtabItem) => navtabItem.classList.remove("active"));
    navtabItem.classList.add("active");
    (navtab as HTMLElement).style.setProperty(
      "--active-index",
      `${activeIndex}`
    );
  })
);
