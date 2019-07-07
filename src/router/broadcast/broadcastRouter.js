let broadcast = [];
const broadcastDefault = {
    path: "/broadcast/broadcastDefault",
    name: "broadcastDefault",
    component: () => import("../../views/broadcast/BroadcastDefault.vue"),
    meta: { title: "动态播报" }
};
broadcast.push(broadcastDefault);

export { broadcast };
