let homePage = [];
const homePageDefault = {
    path: "/",
    name: "homePageDefault",
    component: () => import("../../views/homePage/HomePageDefault.vue"),
    meta: { title: "首页" }
};
homePage.push(homePageDefault);

export { homePage };
