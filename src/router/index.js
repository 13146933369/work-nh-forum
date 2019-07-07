import Vue from "vue";
import Router from "vue-router";
import Index from "../views/Index.vue";
import { homePage } from "./homePage/homePageRouter"
import { microClass } from "./microClass/microClassRouter"
import { broadcast } from "./broadcast/broadcastRouter"
import { microFourm } from "./microFourm/microFourmRouter"
import { microShow } from "./microShow/microShowRouter"

Vue.use(Router);

const router = new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: Index,
      children: [...homePage,]
    },
      ...microClass,
      ...broadcast,
      ...microFourm,
      ...microShow

  ]
});
export default router;
